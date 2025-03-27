import { ExpressCheckoutElement } from "@stripe/react-stripe-js"
import { fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ExpressCheckoutUI_Test_Query } from "__generated__/ExpressCheckoutUI_Test_Query.graphql"
import { useEffect } from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ExpressCheckoutUI } from "../ExpressCheckoutUI"

jest.mock("react-tracking")

jest.unmock("react-relay")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerSlug: "artwork-slug-from-context",
  })),
}))

const mockExpressCheckoutElement = ExpressCheckoutElement as jest.Mock
const mockResolveOnClick = jest.fn()

jest.mock("@stripe/react-stripe-js", () => {
  return {
    useStripe: jest.fn(() => ({})),
    useElements: jest.fn(() => ({})),
    ExpressCheckoutElement: jest.fn(({ onClick, onCancel, onReady }) => {
      useEffect(() => {
        if (onReady) {
          onReady({
            availablePaymentMethods: { applePay: true },
          })
        }
      }, [onReady])

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
            onClick={() => onCancel()}
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
    trackEvent.mockClear()
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
  })

  it("unsets the order fulfillment details and uses the result for initial values on load", async () => {
    const { mockResolveLastOperation, env } = renderWithRelay({
      Order: () => ({
        ...orderData,
        fulfillmentOptions: [{ type: "SHIPPING_TBD", amount: null }],
      }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-button"))

    const { operationName, operationVariables } =
      await mockResolveLastOperation({
        updateOrderPayload: () => ({
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: orderData,
          },
        }),
      })
    expect(operationName).toBe("useUpdateOrderMutation")
    expect(operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      buyerPhoneNumber: null,
      buyerPhoneNumberCountryCode: null,
      shippingAddressLine1: null,
      shippingAddressLine2: null,
      shippingCity: null,
      shippingCountry: null,
      shippingName: null,
      shippingPostalCode: null,
      shippingRegion: null,
    })

    // Where we load initial values into the express checkout element
    await flushPromiseQueue()
    expect(mockResolveOnClick).toHaveBeenCalledWith({
      allowedShippingCountries: ["US"],
      phoneNumberRequired: true,
      shippingAddressRequired: true,
      shippingRates: [
        { amount: 4200, displayName: "Domestic shipping", id: "DOMESTIC_FLAT" },
      ],
    })
    await flushPromiseQueue()
    expect(env.mock.getAllOperations()).toHaveLength(0)
  })

  it("tracks an express checkout viewed event", () => {
    renderWithRelay({
      Order: () => ({ ...orderData }),
    })

    expect(trackEvent).toHaveBeenCalledWith({
      action: "expressCheckoutViewed",
      context_page_owner_id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      context_page_owner_slug: "artwork-slug-from-context",
      context_page_owner_type: "orders-shipping",
      flow: "Buy now",
      credit_card_wallet_types: ["applePay"],
    })
  })

  it("tracks an express checkout click event", () => {
    renderWithRelay({
      Order: () => ({ ...orderData }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-button"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedExpressCheckout",
      context_page_owner_id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      context_page_owner_slug: "artwork-slug-from-context",
      context_page_owner_type: "orders-shipping",
      flow: "Buy now",
      credit_card_wallet_type: "apple_pay",
    })
  })

  it("tracks an express checkout cancel event", async () => {
    const { mockResolveLastOperation } = renderWithRelay({
      Order: () => ({ ...orderData }),
    })

    // We have to do the fake open before we can do the fake cancel
    // because opening sets the express checkout type (payment_method)
    fireEvent.click(screen.getByTestId("express-checkout-button"))

    await mockResolveLastOperation({
      updateOrderPayload: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-cancel"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedCancelExpressCheckout",
      context_page_owner_id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      context_page_owner_slug: "artwork-slug-from-context",
      context_page_owner_type: "orders-shipping",
      flow: "Buy now",
      credit_card_wallet_type: "apple_pay",
    })
  })

  it("resets the order fulfillment details when the cancel button is clicked", async () => {
    const { mockResolveLastOperation, env } = renderWithRelay({
      Order: () => orderData,
    })

    fireEvent.click(screen.getByTestId("express-checkout-cancel"))

    const { operationName, operationVariables } =
      await mockResolveLastOperation({
        setOrderFulfillmentOptionPayload: () => ({
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: orderData,
          },
        }),
      })
    expect(operationName).toBe("useUpdateOrderMutation")
    expect(operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      buyerPhoneNumber: null,
      buyerPhoneNumberCountryCode: null,
      shippingAddressLine1: null,
      shippingAddressLine2: null,
      shippingCity: null,
      shippingCountry: null,
      shippingName: null,
      shippingPostalCode: null,
      shippingRegion: null,
    })

    await flushPromiseQueue()
    expect(env.mock.getAllOperations()).toHaveLength(0)
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
