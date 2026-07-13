import { fireEvent, screen } from "@testing-library/react"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2PaymentStepTestQuery } from "__generated__/Order2PaymentStepTestQuery.graphql"
import { graphql } from "react-relay"
import { Order2PaymentStep } from "../Order2PaymentStep"

jest.unmock("react-relay")

let mockCheckoutContext: any
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

// Stub the editable form (Stripe/Formik heavy) — this test focuses on the
// step rendering the *completed* view with the right props.
jest.mock(
  "Apps/Order2/Routes/Checkout/Components/PaymentStep/Order2PaymentForm",
  () => ({
    Order2PaymentForm: () => {
      return <div data-testid="payment-form" />
    },
  }),
)

const editStep = jest.fn()
const clickedChangePaymentMethod = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  mockCheckoutContext = {
    steps: [
      { name: CheckoutStepName.PAYMENT, state: CheckoutStepState.COMPLETED },
    ],
    editStep,
    checkoutTracking: { clickedChangePaymentMethod },
    confirmationToken: null,
  }
})

const creditCardOrder = {
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

const { renderWithRelay } = setupTestWrapperTL<Order2PaymentStepTestQuery>({
  Component: (props: any) => {
    return <Order2PaymentStep order={props.me.order} me={props.me} />
  },
  query: graphql`
    query Order2PaymentStepTestQuery @relay_test_operation {
      me {
        ...Order2PaymentStep_me
        order(id: "order-id") {
          ...Order2PaymentStep_order
        }
      }
    }
  `,
})

describe("Order2PaymentStep", () => {
  describe("COMPLETED", () => {
    it("renders the completed view with the payment method and an editable affordance", () => {
      renderWithRelay(creditCardOrder)

      expect(screen.getByText("•••• 4242 Exp 12/25")).toBeInTheDocument()
      // role queries exclude `hidden` elements, so this confirms the COMPLETED
      // box is shown (not the hidden ACTIVE box) and `onEdit` was wired.
      expect(
        screen.getByRole("button", { name: "Edit payment method" }),
      ).toBeInTheDocument()
    })

    it("wires Edit to tracking + editStep", () => {
      renderWithRelay(creditCardOrder)

      fireEvent.click(
        screen.getByRole("button", { name: "Edit payment method" }),
      )

      expect(clickedChangePaymentMethod).toHaveBeenCalled()
      expect(editStep).toHaveBeenCalledWith(CheckoutStepName.PAYMENT)
    })
  })

  describe("ACTIVE", () => {
    it("hides the completed view and shows the form", () => {
      mockCheckoutContext.steps = [
        { name: CheckoutStepName.PAYMENT, state: CheckoutStepState.ACTIVE },
      ]
      renderWithRelay(creditCardOrder)

      expect(
        screen.queryByRole("button", { name: "Edit payment method" }),
      ).not.toBeInTheDocument()
      expect(screen.getByTestId("payment-form")).toBeInTheDocument()
    })
  })
})
