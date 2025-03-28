import { ExpressCheckoutElement } from "@stripe/react-stripe-js"
import { fireEvent, waitFor } from "@testing-library/react"
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
const mockElementsUpdate = jest.fn()
const mockCreateConfirmationToken = jest.fn(() => {
  return {
    confirmationToken: {
      id: "ctoken_123",
    },
  }
})

jest.mock("@stripe/react-stripe-js", () => {
  return {
    useStripe: jest.fn(() => ({
      createConfirmationToken: mockCreateConfirmationToken,
    })),
    useElements: jest.fn(() => ({
      submit: jest.fn(async () => {
        return {}
      }),
      update: mockElementsUpdate,
    })),
    ExpressCheckoutElement: jest.fn(
      ({ onClick, onCancel, onReady, onConfirm }) => {
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
              data-testid="express-checkout-confirm"
              onClick={() =>
                onConfirm({
                  shippingAddress: {
                    name: "Buyer Name",
                    address: {
                      line1: "401 Broadway",
                      line2: null,
                      city: "New York",
                      state: "NY",
                      postal_code: "10013",
                      country: "US",
                    },
                  },
                  billingDetails: {
                    phone: "1234567890",
                  },
                })
              }
            >
              Confirm
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
      },
    ),
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

  it("updates the order and submits it on confirm", async () => {
    const { mockResolveLastOperation, env } = renderWithRelay({
      Order: () => ({
        ...orderData,
        fulfillmentOptions: [{ type: "SHIPPING_TBD", amount: null }],
      }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-confirm"))

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
      buyerPhoneNumber: "1234567890",
      buyerPhoneNumberCountryCode: null,
      creditCardWalletType: "APPLE_PAY",
      paymentMethod: "CREDIT_CARD",
      shippingAddressLine1: "401 Broadway",
      shippingAddressLine2: null,
      shippingCity: "New York",
      shippingCountry: "US",
      shippingName: "Buyer Name",
      shippingPostalCode: "10013",
      shippingRegion: "NY",
    })

    await flushPromiseQueue()
    expect(mockCreateConfirmationToken).toHaveBeenCalled()

    const mutation = await mockResolveLastOperation({
      submitOrderPayload: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })
    expect(mutation.operationName).toBe("useSubmitOrderMutation")
    expect(mutation.operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      confirmationToken: "ctoken_123",
    })

    await flushPromiseQueue()
    expect(env.mock.getAllOperations()).toHaveLength(0)
  })

  it("unsets the order fulfillment details and uses the result for initial values on load", async () => {
    const { mockResolveLastOperation, env } = renderWithRelay({
      Order: () => ({
        ...orderData,
        fulfillmentOptions: [{ type: "SHIPPING_TBD", amount: null }],
      }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-button"))

    // Need to see a selected option to consider shipping details
    const [toBeSelected, ...fulfillmentOptions] = orderData.fulfillmentOptions
    ;(toBeSelected.selected as any) = true
    const newOrderData = {
      ...orderData,
      fulfillmentOptions: [toBeSelected, ...fulfillmentOptions],
      buyerTotal: {
        minor: 104300,
        currencyCode: "USD",
      },
      itemsTotal: {
        minor: 100000,
        currencyCode: "USD",
      },
      shippingTotal: {
        minor: 4200,
        currencyCode: "USD",
      },
      taxTotal: {
        minor: 100,
        currencyCode: "USD",
      },
    }
    const { operationName, operationVariables } =
      await mockResolveLastOperation({
        updateOrderPayload: () => ({
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: newOrderData,
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
    await waitFor(() => {
      expect(mockResolveOnClick).toHaveBeenCalledWith({
        allowedShippingCountries: ["US"],
        phoneNumberRequired: true,
        shippingAddressRequired: true,
        lineItems: [
          {
            amount: 100000,
            name: "Subtotal",
          },
          {
            amount: 4200,
            name: "Domestic shipping",
          },
          {
            amount: 100,
            name: "Tax",
          },
        ],
        shippingRates: [
          {
            amount: 4200,
            displayName: "Domestic shipping",
            id: "DOMESTIC_FLAT",
          },
        ],
      })
    })
    expect(mockElementsUpdate).toHaveBeenCalledWith({ amount: 104300 })
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
    minor: 104300,
    currencyCode: "USD",
  },
  itemsTotal: {
    minor: 100000,
    currencyCode: "USD",
  },
  shippingTotal: {
    minor: 4200,
    currencyCode: "USD",
  },
  taxTotal: {
    minor: 100,
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
