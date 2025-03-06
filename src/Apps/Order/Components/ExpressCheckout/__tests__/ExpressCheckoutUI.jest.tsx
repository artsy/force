import { fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ExpressCheckoutUI_Test_Query } from "__generated__/ExpressCheckoutUI_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ExpressCheckoutUI } from "../ExpressCheckoutUI"

jest.mock("react-tracking")

jest.mock("@stripe/react-stripe-js", () => {
  return {
    useStripe: jest.fn(() => ({})),
    useElements: jest.fn(),
    ExpressCheckoutElement: ({ onClick, onCancel }) => {
      return (
        <div>
          <button
            type="button"
            data-testid="express-checkout-button"
            onClick={() =>
              onClick({ expressPaymentType: "apple_pay", resolve: jest.fn() })
            }
          >
            Apple Pay
          </button>
          <button
            type="button"
            data-testid="express-checkout-cancel"
            onClick={() => onCancel({ expressPaymentType: "apple_pay" })}
          >
            Cancel
          </button>
        </div>
      )
    },
  }
})

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  graphql: jest.fn(),
  useFragment: jest.fn(() => ({
    internalID: "order123",
    mode: "BUY",
    source: "artwork_page",
    lineItems: {
      edges: [
        {
          node: {
            artwork: {
              slug: "artwork-slug",
              internalID: "artwork123",
            },
          },
        },
      ],
    },
  })),
}))

const { renderWithRelay } = setupTestWrapperTL<ExpressCheckoutUI_Test_Query>({
  Component: ({ me }) =>
    me?.order && <ExpressCheckoutUI order={me.order!} pickup={false} />,
  query: graphql`
    query ExpressCheckoutUI_Test_Query @raw_response_type {
      me {
        order(id: "123") {
          ...ExpressCheckoutUI_order
        }
      }
    }
  `,
})

describe("ExpressCheckoutUI", () => {
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))
  })

  it("tracks an express checkout click event", () => {
    renderWithRelay({
      CommerceOrder: () => ({}),
    })

    fireEvent.click(screen.getByTestId("express-checkout-button"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedExpressCheckout",
      context_page_owner_id: "artwork123",
      context_page_owner_slug: "artwork-slug",
      context_page_owner_type: "orders-shipping",
      flow: "Buy now",
      payment_method: "apple_pay",
    })
  })

  it("tracks an express checkout cancel event", () => {
    renderWithRelay({
      CommerceOrder: () => ({}),
    })

    fireEvent.click(screen.getByTestId("express-checkout-cancel"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedCancelExpressCheckout",
      context_page_owner_id: "artwork123",
      context_page_owner_slug: "artwork-slug",
      context_page_owner_type: "orders-shipping",
      flow: "Buy now",
      payment_method: "apple_pay",
    })
  })
})
