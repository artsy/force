import { ExpressCheckoutElement } from "@stripe/react-stripe-js"
import { fireEvent, waitFor } from "@testing-library/react"
import { screen } from "@testing-library/react"
import { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2ExpressCheckoutUI_Test_Query } from "__generated__/Order2ExpressCheckoutUI_Test_Query.graphql"
import { useEffect } from "react"
import React from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Order2ExpressCheckoutUI } from "../Order2ExpressCheckoutUI"

jest.mock("react-tracking")

jest.unmock("react-relay")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerSlug: "artwork-slug-from-context",
    contextPageOwnerId: "order-id-from-context",
    contextPageOwnerType: "owner-type-from-context",
  })),
}))

jest.mock("Apps/Order2/Utils/confirmationTokenUtils", () => ({
  fetchAndSetConfirmationToken: jest.fn(
    async (tokenId, environment, setConfirmationToken) => {
      setConfirmationToken({
        confirmationToken: {
          id: tokenId,
          paymentMethodPreview: {
            __typename: "Card",
            displayBrand: "visa",
            last4: "4242",
          },
        },
      })
      return Promise.resolve()
    },
  ),
}))

let shippingRateId = "DOMESTIC_FLAT"

const mockRedirectToOrderDetails = jest.fn()
const mockSetExpressCheckoutLoaded = jest.fn()
const mockSetShowOrderSubmittingSpinner = jest.fn()
const mockSetCheckoutMode = jest.fn()
const mockSetConfirmationToken = jest.fn()
const mockCheckoutContext = {
  setExpressCheckoutLoaded: mockSetExpressCheckoutLoaded,
  setExpressCheckoutSubmitting: mockSetShowOrderSubmittingSpinner,
  redirectToOrderDetails: mockRedirectToOrderDetails,
  setCheckoutMode: mockSetCheckoutMode,
  setConfirmationToken: mockSetConfirmationToken,
} as any

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => {
    const checkoutTracking = useCheckoutTracking({
      source: "artwork page",
      mode: "BUY",
    })
    return {
      checkoutTracking,
      ...mockCheckoutContext,
    }
  },
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
                  expressPaymentType: "apple_pay",
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
                  shippingRate: {
                    id: shippingRateId,
                    amount: 4200,
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

const { renderWithRelay } =
  setupTestWrapperTL<Order2ExpressCheckoutUI_Test_Query>({
    Component: ({ me }) =>
      me?.order && <Order2ExpressCheckoutUI order={me.order!} />,
    query: graphql`
      query Order2ExpressCheckoutUI_Test_Query @raw_response_type {
        me {
          order(id: "123") {
            ...Order2ExpressCheckoutUI_order
          }
        }
      }
    `,
  })

describe("ExpressCheckoutUI", () => {
  const mockTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()
  let locationDescriptor: PropertyDescriptor | undefined

  beforeEach(() => {
    jest.clearAllMocks()
    mockTracking.mockImplementation(() => ({ trackEvent }))
    trackEvent.mockClear()
    locationDescriptor = Object.getOwnPropertyDescriptor(window, "location")
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...window.location,
        reload: jest.fn(),
      },
    })
  })

  afterEach(() => {
    if (locationDescriptor) {
      Object.defineProperty(window, "location", locationDescriptor)
    }
  })

  it("passes correct props to ExpressCheckoutElement", async () => {
    renderWithRelay({
      Order: () => ({ ...orderData }),
    })

    const elementProps = mockExpressCheckoutElement.mock.calls[0][0]

    expect(elementProps.options).toEqual({
      buttonTheme: { applePay: "white-outline", googlePay: "white" },
      buttonHeight: 50,
      paymentMethods: {
        applePay: "always",
        googlePay: "always",
        link: "never",
        amazonPay: "never",
        paypal: "never",
      },
      buttonType: {
        googlePay: "plain",
      },
      layout: {
        overflow: "never",
      },
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

    await flushPromiseQueue()

    // First, test the payment method update
    const paymentMethodUpdate = await mockResolveLastOperation({
      setOrderPayment: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    expect(paymentMethodUpdate.operationName).toBe(
      "useOrder2ExpressCheckoutSetOrderPaymentMutation",
    )
    expect(paymentMethodUpdate.operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      paymentMethod: "CREDIT_CARD",
      creditCardWalletType: "APPLE_PAY",
      stripeConfirmationToken: "ctoken_123",
    })

    // Second, test the shipping address update
    const shippingAddressUpdate = await mockResolveLastOperation({
      updateOrderShippingAddress: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    expect(shippingAddressUpdate.operationName).toBe(
      "useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation",
    )
    expect(shippingAddressUpdate.operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      buyerPhoneNumber: "1234567890",
      buyerPhoneNumberCountryCode: null,
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

    // Third, test the order submission
    const orderSubmission = await mockResolveLastOperation({
      submitOrder: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    expect(orderSubmission.operationName).toBe(
      "useOrder2ExpressCheckoutSubmitOrderMutation",
    )
    expect(orderSubmission.operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      confirmationToken: "ctoken_123",
    })

    await flushPromiseQueue()
    expect(env.mock.getAllOperations()).toHaveLength(0)
    expect(mockRedirectToOrderDetails).toHaveBeenCalled()
  })

  it("omits shipping data when order is pickup", async () => {
    shippingRateId = "PICKUP"
    const { mockResolveLastOperation, env } = renderWithRelay({
      Order: () => ({
        ...orderData,
        fulfillmentOptions: [
          {
            type: "PICKUP",
            amount: {
              minor: 4200,
              currencyCode: "USD",
            },
            selected: true,
          },
        ],
      }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-confirm"))

    await flushPromiseQueue()

    // First, test the payment method update
    const paymentMethodUpdate = await mockResolveLastOperation({
      setOrderPayment: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    expect(paymentMethodUpdate.operationName).toBe(
      "useOrder2ExpressCheckoutSetOrderPaymentMutation",
    )
    expect(paymentMethodUpdate.operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      paymentMethod: "CREDIT_CARD",
      creditCardWalletType: "APPLE_PAY",
      stripeConfirmationToken: "ctoken_123",
    })

    // Second, test the shipping address update
    const { operationName, operationVariables } =
      await mockResolveLastOperation({
        updateOrderShippingAddress: () => ({
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: orderData,
          },
        }),
      })
    expect(operationName).toBe(
      "useOrder2ExpressCheckoutUpdateOrderShippingAddressMutation",
    )
    expect(operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      buyerPhoneNumber: "1234567890",
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
    expect(mockCreateConfirmationToken).toHaveBeenCalledWith(
      expect.objectContaining({
        params: {
          shipping: {
            address: {
              line1: null,
              line2: null,
              city: null,
              postal_code: null,
              state: null,
              country: null,
            },
            name: null,
          },
        },
      }),
    )

    const mutation = await mockResolveLastOperation({
      submitOrderPayload: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })
    expect(mutation.operationName).toBe(
      "useOrder2ExpressCheckoutSubmitOrderMutation",
    )
    expect(mutation.operationVariables.input).toEqual({
      id: "a5aaa8b0-93ff-4f2a-8bb3-9589f378d229",
      confirmationToken: "ctoken_123",
    })

    await flushPromiseQueue()
    expect(env.mock.getAllOperations()).toHaveLength(0)
  })

  it("uses the itemTotal for initial values on load", async () => {
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
      context_page_owner_id: "order-id-from-context",
      context_page_owner_slug: "artwork-slug-from-context",
      context_page_owner_type: "owner-type-from-context",
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
      context_page_owner_id: "order-id-from-context",
      context_page_owner_type: "owner-type-from-context",
      flow: "Buy now",
      credit_card_wallet_type: "apple_pay",
    })
  })

  it("tracks an express checkout submitted event", async () => {
    const { mockResolveLastOperation } = renderWithRelay({
      Order: () => ({
        ...orderData,
        fulfillmentOptions: [{ type: "SHIPPING_TBD", amount: null }],
      }),
    })

    fireEvent.click(screen.getByTestId("express-checkout-confirm"))

    await flushPromiseQueue()

    // First, test the payment method update
    await mockResolveLastOperation({
      setOrderPayment: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    await flushPromiseQueue()

    // Resolve the update shipping address mutation
    await mockResolveLastOperation({
      updateOrderShippingAddress: () => ({
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

    expect(trackEvent).toHaveBeenCalledWith({
      action: "submittedOrder",
      order_id: "order-id-from-context",
      context_page_owner_type: "owner-type-from-context",
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

    await flushPromiseQueue()

    // Resolve the payment method update mutation
    await mockResolveLastOperation({
      setOrderPayment: () => ({
        orderOrError: {
          __typename: "OrderMutationSuccess",
          order: orderData,
        },
      }),
    })

    // Resolve the update order mutation
    await mockResolveLastOperation({
      updateOrderShippingAddress: () => ({
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

    expect(mockRedirectToOrderDetails).toHaveBeenCalled()
  })

  describe("Express checkout is canceled", () => {
    beforeEach(() => {
      jest
        .spyOn(window.sessionStorage.__proto__, "setItem")
        .mockImplementation(() => {})
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
        context_page_owner_id: "order-id-from-context",
        context_page_owner_type: "owner-type-from-context",
        flow: "Buy now",
        credit_card_wallet_type: "apple_pay",
      })
    })

    it("stores error when there is an error", async () => {
      const mockErrorRef = { current: "test_error_code" }
      jest.spyOn(React, "useRef").mockReturnValue(mockErrorRef)

      renderWithRelay({
        Order: () => ({ ...orderData }),
      })

      fireEvent.click(screen.getByTestId("express-checkout-cancel"))

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "expressCheckoutError",
        "test_error_code",
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
      "useOrder2ExpressCheckoutUnsetOrderPaymentMethodMutation",
    )
    expect(unsetFulfillmentMutation.operationName).toBe(
      "useOrder2ExpressCheckoutUnsetOrderFulfillmentOptionMutation",
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

  describe("Error message handling by error code", () => {
    beforeEach(() => {
      jest
        .spyOn(window.sessionStorage.__proto__, "setItem")
        .mockImplementation(() => {})
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("shows payment failed message for backend processing errors", async () => {
      const mockErrorRef = { current: "processing_error" }
      jest.spyOn(React, "useRef").mockReturnValue(mockErrorRef)

      renderWithRelay({
        Order: () => ({ ...orderData }),
      })

      fireEvent.click(screen.getByTestId("express-checkout-cancel"))

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "expressCheckoutError",
        "processing_error",
      )
    })

    it("shows payment verification failed for confirmation token errors", async () => {
      const mockErrorRef = { current: "confirmation_token_error" }
      jest.spyOn(React, "useRef").mockReturnValue(mockErrorRef)

      renderWithRelay({
        Order: () => ({ ...orderData }),
      })

      fireEvent.click(screen.getByTestId("express-checkout-cancel"))

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "expressCheckoutError",
        "confirmation_token_error",
      )
    })

    it("shows fallback message for unhandled errors", async () => {
      const mockErrorRef = { current: "unknown_error" }
      jest.spyOn(React, "useRef").mockReturnValue(mockErrorRef)

      renderWithRelay({
        Order: () => ({ ...orderData }),
      })

      fireEvent.click(screen.getByTestId("express-checkout-cancel"))

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        "expressCheckoutError",
        "unknown_error",
      )
    })
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
