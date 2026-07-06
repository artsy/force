import { fireEvent, screen } from "@testing-library/react"
import { Order2PaymentCompletedView } from "Apps/Order2/Routes/Checkout/Components/PaymentStep/Order2PaymentCompletedView"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2PaymentCompletedViewTestQuery } from "__generated__/Order2PaymentCompletedViewTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

// The view is context-free (props only), so it's rendered directly. `onEditProp`
// is toggled per-test to cover the Edit affordance in both directions.
let onEditProp: (() => void) | undefined

const { renderWithRelay } =
  setupTestWrapperTL<Order2PaymentCompletedViewTestQuery>({
    Component: (props: any) => {
      return (
        <Order2PaymentCompletedView
          order={props.me.order}
          onEdit={onEditProp}
        />
      )
    },
    query: graphql`
      query Order2PaymentCompletedViewTestQuery @relay_test_operation {
        me {
          order(id: "order-id") {
            ...Order2PaymentCompletedView_order
          }
        }
      }
    `,
  })

beforeEach(() => {
  onEditProp = undefined
})

const creditCard = {
  Order: () => ({
    paymentMethod: "CREDIT_CARD",
    paymentMethodDetails: {
      __typename: "CreditCard",
      brand: "Visa",
      lastDigits: "4242",
      expirationMonth: 12,
      expirationYear: 2025,
    },
  }),
}

const usBankAccount = {
  Order: () => ({
    paymentMethod: "US_BANK_ACCOUNT",
    paymentMethodDetails: {
      __typename: "BankAccount",
      last4: "6789",
      bankName: "Chase Bank",
    },
  }),
}

const sepaDebit = {
  Order: () => ({
    paymentMethod: "SEPA_DEBIT",
    paymentMethodDetails: {
      __typename: "BankAccount",
      last4: "1234",
      bankName: "Deutsche Bank",
    },
  }),
}

const wireTransfer = {
  Order: () => ({
    paymentMethod: "WIRE_TRANSFER",
    paymentMethodDetails: {
      __typename: "WireTransfer",
      isManualPayment: true,
    },
  }),
}

describe("Order2PaymentCompletedView", () => {
  describe("payment method details", () => {
    it("displays credit card details with last 4 digits and expiration date", () => {
      renderWithRelay(creditCard)
      expect(screen.getByText("•••• 4242 Exp 12/25")).toBeInTheDocument()
    })

    it("displays US bank account details with bank name and last 4 digits", () => {
      renderWithRelay(usBankAccount)
      expect(screen.getByText(/Chase Bank •••• 6789/)).toBeInTheDocument()
    })

    it("displays SEPA debit details with last 4 digits", () => {
      renderWithRelay(sepaDebit)
      expect(screen.getByText(/•••• 1234/)).toBeInTheDocument()
    })

    it("displays wire transfer text", () => {
      renderWithRelay(wireTransfer)
      expect(screen.getByText("Wire transfer")).toBeInTheDocument()
    })
  })

  describe("Edit affordance", () => {
    it("renders Edit and calls onEdit when clicked", () => {
      const onEdit = jest.fn()
      onEditProp = onEdit
      renderWithRelay(creditCard)

      fireEvent.click(
        screen.getByRole("button", { name: "Edit payment method" }),
      )

      expect(onEdit).toHaveBeenCalledTimes(1)
    })

    it("does not render Edit when onEdit is omitted (view-only)", () => {
      renderWithRelay(creditCard)

      expect(
        screen.queryByRole("button", { name: "Edit payment method" }),
      ).not.toBeInTheDocument()
    })
  })
})
