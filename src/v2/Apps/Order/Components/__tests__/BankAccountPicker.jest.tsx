import { BorderedRadio, Collapse } from "@artsy/palette"
import { BankAccountPickerTestQueryRawResponse } from "v2/__generated__/BankAccountPickerTestQuery.graphql"
import {
  BuyOrderPickup,
  BuyOrderWithBankDebitDetails,
} from "v2/Apps/__tests__/Fixtures/Order"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import { graphql } from "react-relay"
import { BankAccountPickerFragmentContainer } from "../BankAccountPicker"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { BankAccountPicker_me } from "v2/__generated__/BankAccountPicker_me.graphql"

jest.unmock("react-relay")
jest.unmock("react-tracking")

class BankAccountPickerTestPage extends RootTestPage {
  get radios() {
    return this.find(BorderedRadio)
  }

  async clickRadio(atIndex: number) {
    this.find(BorderedRadio).at(atIndex).simulate("click")
    await this.update()
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

const defaultData: BankAccountPickerTestQueryRawResponse = {
  me: {
    id: "my-id",
    bankAccounts: {
      edges: [],
    },
  },
  order: {
    ...BuyOrderWithBankDebitDetails,
  },
}

describe("BankAccountFragmentContainer", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <BankAccountPickerFragmentContainer
          order={props.order}
          me={props.me}
          onSetPaymentSuccess={jest.fn()}
          onSetPaymentError={jest.fn()}
        />
      </MockBoot>
    ),
    query: graphql`
      query BankAccountPickerTestQuery
        @raw_response_type
        @relay_test_operation {
        me {
          ...BankAccountPicker_me
        }
        order: commerceOrder(id: "unused") {
          ...BankAccountPicker_order
        }
      }
    `,
  })

  describe("user has no existing bank accounts", () => {
    it("renders", () => {
      const wrapper = getWrapper({
        CommerceOrder: () => defaultData.order,
        Me: () => defaultData.me,
      })
      const page = new BankAccountPickerTestPage(wrapper)

      expect(page.radios).toHaveLength(0)
    })
    it.todo("does not render radio selection")
    it.todo("renders bank element form")

    describe("user has existing bank accounts", () => {
      const bankAccounts: Array<
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        BankAccountPicker_me["bankAccounts"]["edges"][0]["node"]
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
        const wrapper = getWrapper({
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
          `"InstitutionBank transfer •••• 1234"`
        )
        expect(page.radios.at(1).text()).toMatchInlineSnapshot(
          `"InstitutionBank transfer •••• 2345"`
        )
        expect(page.radios.at(2).text()).toMatchInlineSnapshot(
          `"Add another bank account."`
        )
      })

      it("shows the bank element when user selects 'add another bank account'", async () => {
        const wrapper = getWrapper({
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

      it("hides the bank element section if user selects a saved bank account", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => BuyOrderPickup,
          Me: () => ({
            bankAccounts: {
              edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
            },
          }),
        })
        const page = new BankAccountPickerTestPage(wrapper)
        page.clickRadio(0)
        expect(page.find(Collapse).at(0).props().open).toBeFalsy()
      })

      it("the bank account associated with the order is selected when user navigates back to payment page", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => orderWithBankAccount,
          Me: () => ({
            bankAccounts: {
              edges: [{ node: bankAccounts[0] }, { node: bankAccounts[1] }],
            },
          }),
        })
        const page = new BankAccountPickerTestPage(wrapper)
        expect(page.radios.at(1).props().selected).toBeTruthy()
        expect(page.radios.at(2).props().selected).toBeFalsy()
        expect(page.radios.at(0).props().selected).toBeFalsy()
      })
      it.todo("the first bank account is selected by default")
      it.todo("calls setPayment mutation when user clicks 'save and continue'")
    })
  })
})
