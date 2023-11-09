import { BorderedRadio, Button } from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import { BankAccountPickerTestQuery$rawResponse } from "__generated__/BankAccountPickerTestQuery.graphql"
import {
  BuyOrderPickup,
  UntouchedBuyOrder,
} from "Apps/__tests__/Fixtures/Order"
import { expectOne, RootTestPage } from "DevTools/RootTestPage"
import { graphql } from "react-relay"
import { BankAccountPickerFragmentContainer } from "Apps/Order/Components/BankAccountPicker"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { BankAccountPicker_me$data } from "__generated__/BankAccountPicker_me.graphql"
import { BankDebitProvider } from "Components/BankDebitForm/BankDebitProvider"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import { BankAccountSelection } from "Apps/Order/Routes/Payment/index"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"

jest.mock("Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext")

jest.unmock("react-relay")
jest.unmock("react-tracking")

jest.mock("../../Mutations/useSetPayment", () => {
  const originalUseSetPayment = jest.requireActual(
    "../../Mutations/useSetPayment"
  )

  return {
    useSetPayment: jest
      .fn()
      .mockImplementation(originalUseSetPayment.useSetPayment),
  }
})

class BankAccountPickerTestPage extends RootTestPage {
  get radios() {
    return this.find(BorderedRadio)
  }

  async clickRadio(atIndex: number) {
    this.find(BorderedRadio).at(atIndex).simulate("click")
    await this.update()
  }

  get submitButton() {
    return expectOne(this.find(Button).last())
  }
}

const orderBankAccount = {
  bankAccountId: "bank-id-2",
  paymentMethodDetails: {
    __typename: "BankAccount",
    last4: "2345",
    bankName: "Bank of America",
    accountHolderName: "Dr. Collector",
    id: "relay-node-id",
    internalID: "gravity-bank-account-id",
  },
}

const orderWithBankAccount = {
  ...BuyOrderPickup,
  ...orderBankAccount,
}

const defaultData: BankAccountPickerTestQuery$rawResponse = {
  me: {
    id: "my-id",
    bankAccounts: {
      edges: [],
    },
  },
  order: {
    ...UntouchedBuyOrder,
  },
}

const testQuery = graphql`
  query BankAccountPickerTestQuery @raw_response_type @relay_test_operation {
    me {
      ...BankAccountPicker_me
    }
    order: commerceOrder(id: "unused") {
      ...BankAccountPicker_order
    }
  }
`

let mockBankAccountSelection: BankAccountSelection = {
  type: "new",
}

const mockOnError = jest.fn()

describe("BankAccountFragmentContainer", () => {
  beforeAll(() => {
    ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
      return {
        selectedPaymentMethod: "US_BANK_ACCOUNT",
        setBalanceCheckComplete: jest.fn(),
        bankAccountHasInsufficientFunds: false,
        bankAccountSelection: mockBankAccountSelection,
        setBankAccountHasInsufficientFunds: jest.fn(),
        setSelectedBankAccountId: jest.fn(),
        setBankAccountSelection: jest.fn(),
        setIsSavingPayment: jest.fn(),
      }
    })
  })

  describe("user has no existing bank accounts", () => {
    const { getWrapper } = setupTestWrapper({
      Component: (props: any) => (
        <MockBoot>
          <BankAccountPickerFragmentContainer
            order={props.order}
            me={props.me}
            onError={mockOnError}
          />
        </MockBoot>
      ),
      query: testQuery,
    })

    it("does not render bank account selection", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => defaultData.order,
        Me: () => defaultData.me,
      })
      const page = new BankAccountPickerTestPage(wrapper)

      expect(page.radios).toHaveLength(0)
    })

    it("renders bank element form", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => defaultData.order,
        Me: () => defaultData.me,
      })
      const page = new BankAccountPickerTestPage(wrapper)

      const bankDebitCollapse = page.find(BankDebitProvider).closest(Collapse)
      expect(bankDebitCollapse.first().props().open).toBe(true)
    })
  })

  describe("user has existing bank accounts", () => {
    const { getWrapper } = setupTestWrapper({
      Component: (props: any) => (
        <MockBoot>
          <BankAccountPickerFragmentContainer
            order={props.order}
            me={props.me}
            onError={jest.fn()}
          />
        </MockBoot>
      ),
      query: testQuery,
    })

    const bankAccounts: Array<
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      BankAccountPicker_me$data["bankAccounts"]["edges"][0]["node"]
    > = [
      {
        internalID: "bank-id-1",
        last4: "1234",
      },
      {
        internalID: "bank-id-2",
        last4: "2345",
      },
    ]

    it("renders a list of the users saved bank accounts", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })
      const page = new BankAccountPickerTestPage(wrapper)
      expect(page.radios).toHaveLength(3)
      expect(page.radios.at(0).text()).toMatchInlineSnapshot(
        `"Bank transfer •••• 1234"`
      )
      expect(page.radios.at(1).text()).toMatchInlineSnapshot(
        `"Bank transfer •••• 2345"`
      )
      expect(page.radios.at(2).text()).toMatchInlineSnapshot(
        `"Add another bank account."`
      )
    })

    it("shows the bank element when user selects 'add another bank account'", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })
      const page = new BankAccountPickerTestPage(wrapper)
      page.clickRadio(2)
      expect(page.find(Collapse).at(0).props().open).toBeTruthy()
    })

    it("the users first bank account is selected by default", async () => {
      mockBankAccountSelection = {
        id: "bank-id-1",
        type: "existing",
      }

      const { wrapper } = getWrapper({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })
      const page = new BankAccountPickerTestPage(wrapper)
      expect(page.radios.at(0).props().selected).toBeTruthy()
      expect(page.radios.at(1).props().selected).toBeFalsy()
      expect(page.radios.at(2).props().selected).toBeFalsy()
    })

    it("hides the bank element section if user selects a saved bank account", async () => {
      mockBankAccountSelection = {
        id: "bank-id-2",
        type: "existing",
      }

      const { wrapper } = getWrapper({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })
      const page = new BankAccountPickerTestPage(wrapper)
      // page.clickRadio(0)
      expect(page.find(Collapse).at(0).props().open).toBeFalsy()
    })

    it("the bank account associated with the order is selected when user navigates back to payment page", async () => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "US_BANK_ACCOUNT",
          bankAccountSelection: {
            type: "existing",
            id: "gravity-bank-account-id",
          },
        }
      })

      const { wrapper } = getWrapper({
        CommerceOrder: () => orderWithBankAccount,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })

      const page = new BankAccountPickerTestPage(wrapper)
      expect(page.radios.at(0).props().selected).toBeTruthy()
      expect(page.radios.at(1).props().selected).toBeFalsy()
      expect(page.radios.at(2).props().selected).toBeFalsy()
    })

    it("sets the bank account on the order when user clicks 'Save and Continue'", async () => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "US_BANK_ACCOUNT",
          setBalanceCheckComplete: jest.fn(),
          bankAccountSelection: mockBankAccountSelection,
          setSelectedBankAccountId: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: jest.fn(),
        }
      })

      const submitMutationMock = jest.fn().mockResolvedValue({
        commerceSetPayment: {
          orderOrError: {
            id: 1234,
          },
        },
      })
      ;(useSetPayment as jest.Mock).mockImplementation(() => ({
        submitMutation: submitMutationMock,
      }))

      const { wrapper } = getWrapper({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })
      const page = new BankAccountPickerTestPage(wrapper)
      page.clickRadio(1)
      page.submitButton.simulate("click")
      page.update()
      expect(submitMutationMock).toHaveBeenCalledWith({
        variables: {
          input: {
            id: "2939023",
            paymentMethod: "US_BANK_ACCOUNT",
            paymentMethodId: "bank-id-2",
          },
        },
      })
    })

    it("calls payment route error logger when setPayment mutation fails", async () => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "US_BANK_ACCOUNT",
          setBalanceCheckComplete: jest.fn(),
          setSelectedBankAccountId: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: jest.fn(),
          bankAccountSelection: mockBankAccountSelection,
        }
      })

      const submitMutationMock = jest.fn().mockResolvedValue({
        commerceSetPayment: {
          orderOrError: {
            error: {
              message: "a problem occured",
            },
          },
        },
      })
      ;(useSetPayment as jest.Mock).mockImplementation(() => ({
        submitMutation: submitMutationMock,
      }))

      const { wrapper } = getWrapper({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })
      const page = new BankAccountPickerTestPage(wrapper)
      page.clickRadio(1)
      page.submitButton.simulate("click")
      page.update()
      expect(mockOnError).toHaveBeenCalled()
    })
  })
})
