import { ExpressCheckoutElement } from "@stripe/react-stripe-js"
import { fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ExpressCheckoutUI_Test_Query } from "__generated__/ExpressCheckoutUI_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ExpressCheckoutUI } from "../ExpressCheckoutUI"

jest.mock("react-tracking")

jest.unmock("react-relay")

const mockExpressCheckoutElement = ExpressCheckoutElement as jest.Mock
const mockResolveOnClick = jest.fn()
jest.mock("@stripe/react-stripe-js", () => {
  return {
    useStripe: jest.fn(() => ({})),
    useElements: jest.fn(),
    ExpressCheckoutElement: jest.fn(({ onClick, onCancel }) => {
      return (
        <div>
          <button
            type="button"
            data-testid="express-checkout-button"
            onClick={() =>
              onClick({
                expressPaymentType: "apple_pay",
                resolve: mockResolveOnClick,
              })
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
    }),
  }
})

const { renderWithRelay } = setupTestWrapperTL<ExpressCheckoutUI_Test_Query>({
  Component: ({ me }) => me?.order && <ExpressCheckoutUI order={me.order!} />,
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

  it("passes correct props to ExpressCheckoutElement", async () => {
    renderWithRelay({
      Order: () => ({ ...orderData }),
    })

    const elementProps = mockExpressCheckoutElement.mock.calls[0][0]

    expect(elementProps.options).toEqual({
      buttonTheme: { applePay: "white-outline" },
      buttonHeight: 50,
    })

    fireEvent.click(screen.getByTestId("express-checkout-button"))

    // Where we load initial values into the express checkout element
    expect(mockResolveOnClick).toHaveBeenCalledWith({
      allowedShippingCountries: ["US"],
      phoneNumberRequired: true,
      shippingAddressRequired: true,
      shippingRates: [
        { amount: 4200, displayName: "Domestic shipping", id: "DOMESTIC_FLAT" },
      ],
    })
  })

  it("tracks an express checkout click event", () => {
    renderWithRelay({
      Order: () => ({ ...orderData }),
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
      Order: () => ({ ...orderData }),
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

const orderData = {
  internalID: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
  buyerTotal: {
    minor: 100000,
    currencyCode: "USD",
  },
  itemsTotal: {
    minor: 100000,
    currencyCode: "USD",
  },
  source: "ARTWORK_PAGE",
  mode: "BUY",
  availableShippingCountries: ["US"],
  fulfillmentOptions: [
    {
      type: "DOMESTIC_FLAT",
      amount: {
        minor: 4200,
        currencyCode: "USD",
      },
      selected: null,
    },
  ],
  lineItems: [
    {
      artwork: {
        internalID: "artwork123",
        slug: "artwork-slug",
      },
    },
  ],
}
