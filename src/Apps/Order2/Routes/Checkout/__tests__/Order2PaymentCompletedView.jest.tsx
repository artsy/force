import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2PaymentCompletedViewTestQuery } from "__generated__/Order2PaymentCompletedViewTestQuery.graphql"
import { graphql } from "react-relay"
import { Order2CheckoutRoute } from "../Order2CheckoutRoute"

jest.unmock("react-relay")

const mockElements = {
  getElement: () => ({
    collapse: jest.fn(),
  }),
  submit: jest.fn(),
  update: jest.fn(),
}

jest.mock("@stripe/react-stripe-js", () => {
  const originalModule = jest.requireActual("@stripe/react-stripe-js")
  const mockPaymentElement = jest.fn(() => {
    return <div data-testid="payment-element">Mock Payment Element</div>
  })
  return {
    ...originalModule,
    useStripe: jest.fn(() => ({})),
    useElements: jest.fn(() => mockElements),
    PaymentElement: mockPaymentElement,
    Elements: jest.fn(({ children }) => <div>{children}</div>),
  }
})

const { renderWithRelay } =
  setupTestWrapperTL<Order2PaymentCompletedViewTestQuery>({
    Component: (props: any) => <Order2CheckoutRoute {...props} />,
    query: graphql`
      query Order2PaymentCompletedViewTestQuery @relay_test_operation {
        viewer {
          ...Order2CheckoutRoute_viewer @arguments(orderID: "order-id")
        }
      }
    `,
  })

describe("Order2PaymentCompletedView", () => {
  describe("credit card payment method", () => {
    it("displays credit card details with last 4 digits and expiration date", async () => {
      const props = {
        ...baseProps,
        me: {
          ...baseProps.me,
          order: {
            ...baseProps.me.order,
            paymentMethod: "CREDIT_CARD",
            paymentMethodDetails: {
              __typename: "CreditCard",
              brand: "Visa",
              lastDigits: "4242",
              expirationMonth: 12,
              expirationYear: 2025,
            },
          },
        },
      }

      renderWithRelay({
        Viewer: () => props,
      })

      expect(screen.getByText("•••• 4242 Exp 12/25")).toBeInTheDocument()
      expect(screen.getAllByText("Payment").length).toBeGreaterThan(0)
    })
  })

  describe("bank account payment method", () => {
    it("displays US bank account details with bank name and last 4 digits", async () => {
      const props = {
        ...baseProps,
        me: {
          ...baseProps.me,
          order: {
            ...baseProps.me.order,
            paymentMethod: "US_BANK_ACCOUNT",
            paymentMethodDetails: {
              __typename: "BankAccount",
              last4: "6789",
              bankName: "Chase Bank",
            },
          },
        },
      }

      renderWithRelay({
        Viewer: () => props,
      })

      expect(screen.getByText(/Chase Bank •••• 6789/)).toBeInTheDocument()
    })

    it("displays SEPA debit details with bank name and last 4 digits", async () => {
      const props = {
        ...baseProps,
        me: {
          ...baseProps.me,
          order: {
            ...baseProps.me.order,
            paymentMethod: "SEPA_DEBIT",
            paymentMethodDetails: {
              __typename: "BankAccount",
              last4: "1234",
              bankName: "Deutsche Bank",
            },
          },
        },
      }

      renderWithRelay({
        Viewer: () => props,
      })

      expect(screen.getByText(/Deutsche Bank •••• 1234/)).toBeInTheDocument()
    })
  })

  describe("wire transfer payment method", () => {
    it("displays wire transfer text", async () => {
      const props = {
        ...baseProps,
        me: {
          ...baseProps.me,
          order: {
            ...baseProps.me.order,
            paymentMethod: "WIRE_TRANSFER",
            paymentMethodDetails: {
              __typename: "WireTransfer",
              isManualPayment: true,
            },
          },
        },
      }

      renderWithRelay({
        Viewer: () => props,
      })

      expect(screen.getAllByText("Wire Transfer").length).toBeGreaterThan(0)
    })
  })
})

const baseProps = {
  me: {
    order: {
      internalID: "order-id",
      paymentMethod: null,
      paymentMethodDetails: null,
    },
  },
}
