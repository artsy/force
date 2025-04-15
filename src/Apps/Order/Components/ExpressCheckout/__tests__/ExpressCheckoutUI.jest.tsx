import { ExpressCheckoutElement } from "@stripe/react-stripe-js"
import { fireEvent, waitFor } from "@testing-library/react"
import { screen } from "@testing-library/react"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ExpressCheckoutUI_Test_Query } from "__generated__/ExpressCheckoutUI_Test_Query.graphql"
import { useEffect } from "react"
import React from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ExpressCheckoutUI } from "../ExpressCheckoutUI"

const mockRouterPush = jest.fn()

jest.mock("react-tracking")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    router: {
      push: mockRouterPush,
    },
  }),
}))

jest.unmock("react-relay")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerSlug: "artwork-slug-from-context",
    contextPageOwnerId: "artwork-id-from-context",
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
    mockRouterPush.mockClear()
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

  it("uses the itemTotal and 'calculating shipping...' for initial values on load", async () => {
    const { env } = renderWithRelay({
      Order: () => ({
        ...orderData,
        itemsTotal: {
          minor: 12345,
        },
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
      }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-button"))

    // Where we load initial values into the express checkout element
    await waitFor(() => {
      expect(mockResolveOnClick).toHaveBeenCalledWith({
        allowedShippingCountries: ["US"],
        phoneNumberRequired: true,
        shippingAddressRequired: true,
        business: { name: "Artsy" },
        lineItems: [{ amount: 12345, name: "Subtotal" }],
        shippingRates: [
          {
            amount: 0,
            displayName: "Calculating shipping...",
            id: "CALCULATING_SHIPPING",
          },
        ],
      })
    })
    expect(mockElementsUpdate).toHaveBeenCalledWith({ amount: 12345 })
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

  it("navigates to the status page after successful order submission", async () => {
    const { mockResolveLastOperation } = renderWithRelay({
      Order: () => ({
        ...orderData,
        fulfillmentOptions: [{ type: "SHIPPING_TBD", amount: null }],
      }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-confirm"))

    // Resolve the update order mutation
    await mockResolveLastOperation({
      updateOrderPayload: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    await flushPromiseQueue()
    expect(mockCreateConfirmationToken).toHaveBeenCalled()

    // Resolve the submit order mutation
    await mockResolveLastOperation({
      submitOrderPayload: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    await flushPromiseQueue()

    expect(mockRouterPush).toHaveBeenCalledWith(
      `/orders/${orderData.internalID}/status`,
    )
  })

  describe("Express checkout is canceled", () => {
    beforeEach(() => {
      jest
        .spyOn(window.sessionStorage.__proto__, "setItem")
        .mockImplementation(() => {})
      Object.defineProperty(window, "location", {
        configurable: true,
        value: {
          ...window.location,
          reload: jest.fn(),
        },
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("tracks express checkout cancel event", async () => {
      renderWithRelay({
        Order: () => ({ ...orderData }),
      })

      fireEvent.click(screen.getByTestId("express-checkout-button"))

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

    it("stores error and tracks error message viewed event when there is an error", async () => {
      const mockErrorRef = { current: "test_error_code" }
      jest.spyOn(React, "useRef").mockReturnValue(mockErrorRef)

      renderWithRelay({
        Order: () => ({ ...orderData }),
      })

      fireEvent.click(screen.getByTestId("express-checkout-cancel"))

      expect(trackEvent).toHaveBeenCalledWith({
        action: "errorMessageViewed",
        context_owner_id: "artwork-id-from-context",
        context_owner_type: "orders-shipping",
        error_code: "test_error_code",
        title: "An error occurred",
        message:
          "Something went wrong. Please try again or contact orders@artsy.net",
        flow: "Express checkout",
      })

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "expressCheckoutError",
        JSON.stringify({
          title: "An error occurred",
        }),
      )
    })
  })

  it("resets the order and reloads the page", async () => {
    const { mockResolveLastOperation, env } = renderWithRelay({
      Order: () => orderData,
    })

    fireEvent.click(screen.getByTestId("express-checkout-cancel"))

    const unsetPaymentMutation = await mockResolveLastOperation({
      unsetOrderPaymentMethodPayload: () => ({
        orderOrError: { __typename: "OrderMutationSuccess", order: orderData },
      }),
    })

    const unsetFulfillmentMutation = await mockResolveLastOperation({
      unsetOrderFulfillmentOptionPayload: () => ({
        orderOrError: { __typename: "OrderMutationSuccess", order: orderData },
      }),
    })

    expect(unsetPaymentMutation.operationName).toBe(
      "useUnsetOrderPaymentMethodMutation",
    )
    expect(unsetFulfillmentMutation.operationName).toBe(
      "useUnsetOrderFulfillmentOptionMutation",
    )

    expect(unsetPaymentMutation.operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
    })
    expect(unsetFulfillmentMutation.operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
    })

    await flushPromiseQueue()
    expect(env.mock.getAllOperations()).toHaveLength(0)
    expect(window.location.reload).toHaveBeenCalled()
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
