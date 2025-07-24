import { screen } from "@testing-library/react"
import { BankAccountPickerFragmentContainer } from "Apps/Order/Components/BankAccountPicker"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"
import type { BankAccountSelection } from "Apps/Order/Routes/Payment/index"
import {
  BuyOrderPickup,
  UntouchedBuyOrder,
} from "Apps/__tests__/Fixtures/Order"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { BankAccountPickerTestEQuery$rawResponse } from "__generated__/BankAccountPickerTestEQuery.graphql"
import type { BankAccountPicker_me$data } from "__generated__/BankAccountPicker_me.graphql"
import { graphql } from "react-relay"

jest.mock("Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext")

jest.unmock("react-relay")
jest.unmock("react-tracking")

jest.mock("../../Mutations/useSetPayment", () => {
  const originalUseSetPayment = jest.requireActual(
    "../../Mutations/useSetPayment",
  )

  return {
    useSetPayment: jest
      .fn()
      .mockImplementation(originalUseSetPayment.useSetPayment),
  }
})

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

const defaultData: BankAccountPickerTestEQuery$rawResponse = {
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
  query BankAccountPickerTestEQuery @raw_response_type @relay_test_operation {
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
    const { renderWithRelay } = setupTestWrapperTL({
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
      renderWithRelay({
        CommerceOrder: () => defaultData.order,
        Me: () => defaultData.me,
      })

      expect(screen.queryAllByRole("radio")).toHaveLength(0)
    })

    it("renders bank element form", () => {
      renderWithRelay({
        CommerceOrder: () => defaultData.order,
        Me: () => defaultData.me,
      })

      // Check that the bank form elements are visible
      expect(
        document.querySelector('[data-test="paymentSectionUsBankAccount"]'),
      ).toBeInTheDocument()
    })
  })

  describe("user has existing bank accounts", () => {
    const { renderWithRelay } = setupTestWrapperTL({
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
      renderWithRelay({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })

      const radios = screen.getAllByRole("radio")
      expect(radios).toHaveLength(3)
      expect(screen.getByText("Bank transfer •••• 1234")).toBeInTheDocument()
      expect(screen.getByText("Bank transfer •••• 2345")).toBeInTheDocument()
      expect(screen.getByText("Add another bank account.")).toBeInTheDocument()
    })

    it("shows the bank element when user selects 'add another bank account'", async () => {
      const { user } = renderWithRelay({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })

      const addAnotherRadio = screen
        .getByText("Add another bank account.")
        .closest('[role="radio"]')
      await user.click(addAnotherRadio!)

      // Check that the bank form section is now expanded
      expect(
        document.querySelector('[data-test="paymentSectionUsBankAccount"]'),
      ).toBeInTheDocument()
    })

    it("the users first bank account is selected by default", async () => {
      mockBankAccountSelection = {
        id: "bank-id-1",
        type: "existing",
      }

      renderWithRelay({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })

      const radios = screen.getAllByRole("radio")
      expect(radios[0]).toBeChecked()
      expect(radios[1]).not.toBeChecked()
      expect(radios[2]).not.toBeChecked()
    })

    it("hides the bank element section if user selects a saved bank account", async () => {
      mockBankAccountSelection = {
        id: "bank-id-2",
        type: "existing",
      }

      renderWithRelay({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })

      // Bank form should not be rendered when existing account selected
      const bankFormSection = document.querySelector(
        '[data-test="paymentSectionUsBankAccount"]',
      )
      expect(bankFormSection).not.toBeInTheDocument()
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

      renderWithRelay({
        CommerceOrder: () => orderWithBankAccount,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })

      const radios = screen.getAllByRole("radio")
      expect(radios[0]).toBeChecked()
      expect(radios[1]).not.toBeChecked()
      expect(radios[2]).not.toBeChecked()
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

      const { user } = renderWithRelay({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })

      const secondRadio = screen
        .getByText("Bank transfer •••• 2345")
        .closest('[role="radio"]')
      await user.click(secondRadio!)

      const submitButton = screen.getByRole("button", {
        name: /save and continue/i,
      })
      await user.click(submitButton)

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

      const { user } = renderWithRelay({
        CommerceOrder: () => BuyOrderPickup,
        Me: () => ({
          bankAccounts: {
            edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
          },
        }),
      })

      const secondRadio = screen
        .getByText("Bank transfer •••• 2345")
        .closest('[role="radio"]')
      await user.click(secondRadio!)

      const submitButton = screen.getByRole("button", {
        name: /save and continue/i,
      })
      await user.click(submitButton)

      expect(mockOnError).toHaveBeenCalled()
    })
  })
})
