import { act, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import {
  orderMutationError,
  orderMutationSuccess,
} from "Apps/Order2/Routes/Checkout/__tests__/utils"
import {
  handleBackNavigation,
  preventHardReload,
} from "Apps/Order2/Utils/navigationGuards"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import mockStripe from "DevTools/mockStripe"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2CheckoutRouteTestQuery } from "__generated__/Order2CheckoutRouteTestQuery.graphql"
import { useEffect } from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Order2ExpressCheckout as MockExpressCheckout } from "../Components/ExpressCheckout/Order2ExpressCheckout"
import { Order2CheckoutRoute } from "../Order2CheckoutRoute"

jest.unmock("react-relay")
jest.useFakeTimers()
jest.mock("react-tracking")

jest.mock("System/Hooks/useAnalyticsContext", () => {
  const actual = jest.requireActual("System/Hooks/useAnalyticsContext")
  const { OwnerType } = jest.requireActual("@artsy/cohesion")
  // This value is set in src/System/Contexts/AnalyticsContext
  const contextPageOwnerType = OwnerType.ordersCheckout
  return {
    ...actual,
    useAnalyticsContext: () => ({
      ...actual.useAnalyticsContext(),
      contextPageOwnerType,
    }),
  }
})

const mockElements = {
  getElement: () => ({
    collapse: jest.fn(),
  }),
  submit: jest.fn(),
  update: jest.fn(),
}

jest.mock("@stripe/react-stripe-js", () => {
  const originalModule = jest.requireActual("@stripe/react-stripe-js")
  const mockPaymentElement = jest.fn(({ onChange }) => {
    return (
      <div data-testid="payment-element">
        <button
          type="button"
          data-testid="mock-credit-card"
          onClick={() => {
            const changeEvent = {
              elementType: "payment",
              collapsed: false,
              value: { type: "card" },
            }
            onChange(changeEvent)
          }}
        >
          Mock enter credit card
        </button>
        <button
          type="button"
          data-testid="mock-ach"
          onClick={() => {
            const changeEvent = {
              elementType: "payment",
              collapsed: false,
              value: { type: "us_bank_account" },
            }
            onChange(changeEvent)
          }}
        >
          Mock ACH
        </button>
      </div>
    )
  })
  return {
    ...originalModule,
    useStripe: jest.fn(() => mockStripe),
    useElements: jest.fn(() => mockElements),
    PaymentElement: mockPaymentElement,
    Elements: jest.fn(({ children }) => <div>{children}</div>),
  }
})

const mockRouter = {
  replace: jest.fn(),
}
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    router: mockRouter,
  }),
}))

// For now express checkout is entirely mocked and just instantly registers
// no available payment methods. We can make this more refined if necessary later.
jest.mock(
  "Apps/Order2/Routes/Checkout/Components/ExpressCheckout/Order2ExpressCheckout",
  () => {
    const MockExpressCheckout = jest.fn(() => {
      const { setExpressCheckoutLoaded, expressCheckoutPaymentMethods } =
        useCheckoutContext()
      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
        setExpressCheckoutLoaded([])
      }, [])
      return expressCheckoutPaymentMethods == null ? (
        <div>MockExpressCheckout</div>
      ) : null
    })

    return {
      Order2ExpressCheckout: MockExpressCheckout,
    }
  },
)
jest.mock("Utils/Hooks/useUserLocation", () => ({
  useUserLocation: jest.fn(() => ({
    location: { country: "Mexico" },
    loading: false,
  })),
}))

const mockTrackEvent = jest.fn()
beforeEach(() => {
  mockTrackEvent.mockClear()
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: mockTrackEvent,
  }))
  ;(MockExpressCheckout as jest.Mock).mockClear()
})

const { renderWithRelay } = setupTestWrapperTL<Order2CheckoutRouteTestQuery>({
  Component: (props: any) => <Order2CheckoutRoute {...props} />,
  query: graphql`
    query Order2CheckoutRouteTestQuery @relay_test_operation {
      viewer {
        ...Order2CheckoutRoute_viewer @arguments(orderID: "order-id")
      }
    }
  `,
})

/**
 *  Assert that the given events were tracked in order.
 *  Then clear the mock for the next assertion.
 */
function expectTrackedEvents(
  {
    mockTrackEvent,
    standardValues = { context_page_owner_type: "orders-checkout" },
    exact = true,
  }: {
    mockTrackEvent: jest.Mock
    standardValues?: any
    exact?: boolean
  },
  expectedEvents,
) {
  const mockTrackEventCalls = mockTrackEvent.mock.calls.map(call => call[0])
  expect(mockTrackEventCalls.map(call => call.action)).toEqual(
    expectedEvents.map(event => event.action),
  )

  expectedEvents.forEach((event, index) => {
    if (exact) {
      expect(mockTrackEventCalls[index]).toEqual({
        ...standardValues,
        ...event,
      })
    } else {
      // If not exact, we only check that the event contains the expected values
      expect(mockTrackEvent.mock.calls[index][0]).toMatchObject({
        ...standardValues,
        ...event,
      })
    }
  })
  mockTrackEvent.mockClear()
}

const testIDs = {
  phoneCountryPicker: "country-picker",
  fulfillmentDetailsStep: "FulfillmentDetailsStep",
  fulfillmentDetailsStepTabs: "FulfillmentDetailsStepTabs",
  pickupDetailsForm: "PickupDetailsForm",
  // Use with screen.getByRole
  phoneCountryPickerListRole: "listbox",
  paymentFormWire: "PaymentFormWire",
  deliveryOptionsStep: "DeliveryOptionsStep",
}

const helpers = {
  async waitForLoadingComplete() {
    act(() => {
      // CheckoutContext MINIMUM_LOADING_MS
      jest.advanceTimersByTime(1000)
    })

    await waitFor(() => {
      expect(
        screen.queryByLabelText("Checkout loading skeleton"),
      ).not.toBeInTheDocument()
    })
  },

  async selectCountryCode(countryPicker, optionText: string) {
    act(() => {
      userEvent.click(countryPicker)
    })

    const countryOptions = screen.getAllByText(optionText, {
      exact: false,
    })

    // To account for the possibility that country option is showing something
    // in its input value, take the second
    const countryOption = countryOptions[countryOptions.length - 1]

    act(() => {
      userEvent.click(countryOption)
    })
  },

  async fillInMockCreditCard({
    mockResolveLastOperation,
    initialOrder,
    oneTimeUse = false,
  }) {
    await userEvent.click(screen.getByText("Mock enter credit card"))

    mockElements.submit.mockResolvedValueOnce({
      error: null,
    })
    mockStripe.createConfirmationToken.mockResolvedValueOnce({
      error: null,
      confirmationToken: {
        id: "confirmation-token-id",
        paymentMethodPreview: {
          __typename: "Card",
          displayBrand: "Visa",
          last4: "5309",
        },
      },
    })

    if (oneTimeUse) {
      await userEvent.click(screen.getByText("Save credit card for later use"))
    }

    await userEvent.click(screen.getByText("Continue to Review"))

    expect(mockElements.submit).toHaveBeenCalled()
    expect(mockStripe.createConfirmationToken).toHaveBeenCalled()

    await act(async () => {
      const confirmationTokenQuery = await waitFor(() => {
        return mockResolveLastOperation({
          Me: () => {
            return {
              confirmationToken: {
                paymentMethodPreview: {
                  __typename: "Card",
                  displayBrand: "Visa",
                  last4: "5309",
                },
              },
            }
          },
        })
      })

      expect(confirmationTokenQuery.operationName).toBe(
        "confirmationTokenUtilsQuery",
      )
      expect(confirmationTokenQuery.operation.request.variables).toEqual({
        id: "confirmation-token-id",
      })
      await flushPromiseQueue()

      const updateOrderPaymentMethodMutation = await mockResolveLastOperation({
        updateOrderPayload: () =>
          orderMutationSuccess(initialOrder, {
            paymentMethod: "CREDIT_CARD",
          }),
      })
      expect(updateOrderPaymentMethodMutation.operationName).toBe(
        "useOrder2SetOrderPaymentMutation",
      )
      expect(updateOrderPaymentMethodMutation.operationVariables.input).toEqual(
        {
          id: "order-id",
          paymentMethod: "CREDIT_CARD",
          stripeConfirmationToken: "confirmation-token-id",
        },
      )

      await flushPromiseQueue()
    })

    // Verify that the payment step is complete
    const creditCardPreviewText = await screen.findByText("•••• 5309")
    expect(creditCardPreviewText).toBeInTheDocument()
  },

  async fillInWireTransfer({ mockResolveLastOperation, initialOrder }) {
    await userEvent.click(screen.getByTestId(testIDs.paymentFormWire))
    await userEvent.click(screen.getByText("Continue to Review"))

    await act(async () => {
      const wireTransferMutation = await waitFor(() => {
        return mockResolveLastOperation({
          commerceSetPaymentPayload: () =>
            orderMutationSuccess(initialOrder, {
              paymentMethod: "WIRE_TRANSFER",
            }),
        })
      })

      expect(wireTransferMutation.operationName).toBe("useSetPaymentMutation")
      expect(wireTransferMutation.operationVariables.input).toEqual({
        id: "order-id",
        paymentMethod: "WIRE_TRANSFER",
      })

      await flushPromiseQueue()
    })

    // Verify that the payment step is complete by checking for the payment completed view
    await waitFor(() => {
      expect(screen.getByText("Continue to Review")).toBeInTheDocument()
    })
  },

  async submitOrder({
    mockResolveLastOperation,
    initialOrder,
    isWireTransfer = false,
  }) {
    const reviewOrderSubmitButton = screen.getAllByText("Submit")[0]
    await userEvent.click(reviewOrderSubmitButton)

    await act(async () => {
      const submitOrderMutation = await waitFor(() => {
        return mockResolveLastOperation({
          submitOrder: () => orderMutationSuccess(initialOrder, {}),
        })
      })

      expect(submitOrderMutation.operationName).toBe(
        "useOrder2SubmitOrderMutation",
      )

      const expectedInput = {
        id: "order-id",
        confirmationToken: isWireTransfer ? undefined : "confirmation-token-id",
        oneTimeUse: !!isWireTransfer,
      }

      expect(submitOrderMutation.operationVariables.input).toEqual(
        expectedInput,
      )

      await flushPromiseQueue()
    })
  },
}

describe("Order2CheckoutRoute", () => {
  describe("loading process", () => {
    it("renders the Order2CheckoutRoute skeleton, then the real component after some time", async () => {
      await renderWithRelay({
        Viewer: () => ({
          ...baseProps,
        }),
      })

      expect(
        screen.getByLabelText("Checkout loading skeleton"),
      ).toBeInTheDocument()

      act(() => {
        // CheckoutContext MINIMUM_LOADING_MS
        jest.advanceTimersByTime(1000)
      })

      await waitFor(() => {
        expect(
          screen.queryByLabelText("Checkout loading skeleton"),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("express checkout", () => {
    it("renders express checkout if eligible but not if it isn't eligible", async () => {
      const props = {
        ...baseProps,
      }
      props.me.order.lineItems[0].artwork.isFixedShippingFeeOnly = true

      await renderWithRelay({
        Viewer: () => props,
      })
      expect(
        screen.getByLabelText("Checkout loading skeleton"),
      ).toBeInTheDocument()

      expect(MockExpressCheckout).toHaveBeenCalled()
    })

    it("does not render express checkout if not eligible", async () => {
      const props = {
        ...baseProps,
      }
      props.me.order.mode = "BUY"
      props.me.order.lineItems[0].artwork.isFixedShippingFeeOnly = false

      await renderWithRelay({
        Viewer: () => props,
      })

      expect(
        screen.getByLabelText("Checkout loading skeleton"),
      ).toBeInTheDocument()

      expect(MockExpressCheckout).not.toHaveBeenCalled()
    })
  })

  it("renders the Order2CheckoutRoute with order data", async () => {
    const props = { ...baseProps }
    props.me.order.lineItems[0].artworkVersion.title = "Supreme skateboard"
    props.me.order.lineItems[0].artworkVersion.artistNames = "Artist Name"
    props.me.order.lineItems[0].artworkVersion.date = "2023"

    renderWithRelay({ Viewer: () => props })

    await helpers.waitForLoadingComplete()

    // There are 3 different summaries on the page. 1 in the collapsible
    // mobile summary at the top and 2 different review steps for mobile and desktop.
    const artworkTitles = screen.getAllByText("Supreme skateboard, 2023")
    expect(artworkTitles).toHaveLength(3)
  })

  describe("Checkout with pickup", () => {
    it.each([
      ["", false],
      [" one time use", true],
    ])(
      "allows the user to progress through order submission with pickup +%s credit card",
      async (_, oneTimeUse) => {
        const props = {
          ...baseProps,
          me: {
            ...baseProps.me,
            order: {
              ...baseProps.me.order,
              fulfillmentOptions: [
                {
                  type: "PICKUP",
                  __typename: "PickupFulfillmentOption",
                },
                { type: "DOMESTIC_FLAT" },
              ],
              fulfillmentDetails: null,
              selectedFulfillmentOption: null,
              stripeConfirmationToken: null,
            },
            creditCards: {
              edges: [
                {
                  node: {
                    id: "credit-card-id",
                    brand: "Visa",
                    lastDigits: "1234",
                  },
                },
              ],
            },
          },
        }
        const initialOrder = props.me.order

        const { mockResolveLastOperation } = renderWithRelay({
          Viewer: () => props,
        })

        await helpers.waitForLoadingComplete()

        expect(screen.queryByText("Shipping method")).toBeInTheDocument()

        // Click pickup tab
        expect(screen.queryByText("Free pickup")).not.toBeInTheDocument()
        act(() => {
          userEvent.click(screen.getByText("Pickup"))
        })
        expect(screen.getByText("Free pickup")).toBeInTheDocument()
        expect(screen.queryByText("Eagle, CO, US")).toBeInTheDocument()

        // Verify submit button is present and disabled
        const submitButton = screen.getByText("Continue to Payment")

        // Verify submit button does not work
        act(() => {
          userEvent.click(submitButton)
        })
        await screen.findByText("Phone number is required")

        helpers.selectCountryCode(
          screen.getByTestId(testIDs.phoneCountryPicker),
          "+ 49",
        )

        // Type a phone number, error goes away
        const phoneInput = screen.getByTestId("PickupPhoneNumberInput")

        act(() => {
          // TODO: Does not trigger phone validation mutation - why? Maybe related to jest timers.
          userEvent.type(phoneInput, "03012345678")
        })

        await waitFor(() => {
          expect(
            screen.queryByText("Phone number is required"),
          ).not.toBeInTheDocument()
        })
        expect(submitButton).not.toBeDisabled()

        // Submit form again (why waitFor? says no pointer events otherwise)
        const pickupCompleteMessage =
          "After your order is confirmed, a specialist will contact you within 2 business days to coordinate pickup."
        expect(
          screen.queryByText(pickupCompleteMessage),
        ).not.toBeInTheDocument()
        await waitFor(() => {
          act(() => {
            userEvent.click(screen.getByText("Continue to Payment"))
          })
        })

        // Run back-to-back mutations and verify they happened in the correct order
        await act(async () => {
          const setFulfilmentTypeOperation = await waitFor(() => {
            return mockResolveLastOperation({
              setOrderFulfillmentOptionPayload: () =>
                orderMutationSuccess(initialOrder, {
                  selectedFulfillmentOption: {
                    type: "PICKUP",
                  },
                }),
            })
          })

          expect(setFulfilmentTypeOperation.operationName).toBe(
            "useOrder2SetOrderFulfillmentOptionMutation",
          )
          expect(setFulfilmentTypeOperation.operationVariables.input).toEqual({
            fulfillmentOption: {
              type: "PICKUP",
            },
            id: "order-id",
          })
        })

        await act(async () => {
          const setPickupDetailsOperation = await waitFor(() => {
            return mockResolveLastOperation({
              updateOrderShippingAddressPayload: () =>
                orderMutationSuccess(initialOrder, {
                  selectedFulfillmentOption: {
                    type: "PICKUP",
                  },
                  fulfillmentDetails: {
                    phoneNumber: {
                      originalNumber: "03012345678",
                      regionCode: "de",
                    },
                  },
                }),
            })
          })

          expect(setPickupDetailsOperation.operationName).toBe(
            "useOrder2SetOrderPickupDetailsMutation",
          )
          expect(setPickupDetailsOperation.operationVariables.input).toEqual({
            id: "order-id",
            buyerPhoneNumber: "03012345678",
            buyerPhoneNumberCountryCode: "de",
          })
          await flushPromiseQueue()
        })

        // Verify that the step is complete
        await screen.findByText(pickupCompleteMessage)
        expect(screen.queryByText("Shipping method")).not.toBeInTheDocument()

        await userEvent.click(screen.getByText("Mock enter credit card"))

        // For pickup orders, billing address form is required - fill it in
        await waitFor(() => {
          expect(screen.getByText("Billing address")).toBeInTheDocument()
          expect(
            screen.getByTestId("addressFormFields.name"),
          ).toBeInTheDocument()
        })

        await userEvent.type(
          screen.getByTestId("addressFormFields.name"),
          "John Doe",
        )
        await userEvent.type(
          screen.getByTestId("addressFormFields.addressLine1"),
          "123 Main St",
        )
        await userEvent.type(
          screen.getByTestId("addressFormFields.city"),
          "New York",
        )
        await userEvent.type(
          screen.getByTestId("addressFormFields.region"),
          "NY",
        )
        await userEvent.type(
          screen.getByTestId("addressFormFields.postalCode"),
          "10001",
        )

        mockElements.submit.mockResolvedValueOnce({
          error: null,
        })
        mockStripe.createConfirmationToken.mockResolvedValueOnce({
          error: null,
          confirmationToken: {
            id: "confirmation-token-id",
            paymentMethodPreview: {
              __typename: "Card",
              displayBrand: "Visa",
              last4: "5309",
            },
          },
        })

        if (oneTimeUse) {
          await userEvent.click(
            screen.getByText("Save credit card for later use"),
          )
        }

        await userEvent.click(screen.getByText("Continue to Review"))

        expect(mockElements.submit).toHaveBeenCalled()
        expect(mockStripe.createConfirmationToken).toHaveBeenCalled()

        await act(async () => {
          const confirmationTokenQuery = await waitFor(() => {
            return mockResolveLastOperation({
              Me: () => {
                return {
                  confirmationToken: {
                    paymentMethodPreview: {
                      __typename: "Card",
                      displayBrand: "Visa",
                      last4: "5309",
                    },
                  },
                }
              },
            })
          })

          expect(confirmationTokenQuery.operationName).toBe(
            "confirmationTokenUtilsQuery",
          )
          expect(confirmationTokenQuery.operation.request.variables).toEqual({
            id: "confirmation-token-id",
          })
          await flushPromiseQueue()

          const updateOrderPaymentMethodMutation =
            await mockResolveLastOperation({
              updateOrderPayload: () =>
                orderMutationSuccess(initialOrder, {
                  paymentMethod: "CREDIT_CARD",
                  stripeConfirmationToken: "confirmation-token-id",
                }),
            })
          expect(updateOrderPaymentMethodMutation.operationName).toBe(
            "useOrder2SetOrderPaymentMutation",
          )
          expect(
            updateOrderPaymentMethodMutation.operationVariables.input,
          ).toEqual({
            id: "order-id",
            paymentMethod: "CREDIT_CARD",
            stripeConfirmationToken: "confirmation-token-id",
          })

          await flushPromiseQueue()
        })

        // Verify that the payment step is complete
        const creditCardPreviewText = await screen.findByText("•••• 5309")
        expect(await creditCardPreviewText).toBeInTheDocument()

        const reviewOrderSubmitButton = screen.getAllByText("Submit")[0]
        await userEvent.click(reviewOrderSubmitButton)

        await act(async () => {
          const submitOrderMutation = await waitFor(() => {
            return mockResolveLastOperation({
              submitOrder: () => orderMutationSuccess(initialOrder, {}),
            })
          })

          expect(submitOrderMutation.operationName).toBe(
            "useOrder2SubmitOrderMutation",
          )
          expect(submitOrderMutation.operationVariables.input).toEqual({
            id: "order-id",
            confirmationToken: "confirmation-token-id",
            oneTimeUse: oneTimeUse,
          })

          await flushPromiseQueue()
        })

        await flushPromiseQueue()

        expectTrackedEvents({ mockTrackEvent }, [
          {
            action: "orderProgressionViewed",
            context_module: "ordersFulfillment",
            context_page_owner_id: "order-id",
            flow: "Buy now",
          },
          {
            action: "clickedFulfillmentTab",
            context_page_owner_id: "order-id",
            flow: "Buy now",
            method: "Pickup",
          },
          {
            action: "clickedOrderProgression",
            context_module: "ordersFulfillment",
            context_page_owner_id: "order-id",
            flow: "Buy now",
          },
          {
            action: "savedPaymentMethodViewed",
            context_page_owner_id: "order-id",
            flow: "Buy now",
            payment_methods: ["CREDIT_CARD"],
          },
          {
            action: "orderProgressionViewed",
            context_module: "ordersPayment",
            context_page_owner_id: "order-id",
            flow: "Buy now",
          },
          {
            action: "clickedPaymentMethod",
            amount: '<mock-value-for-field-"minor">',
            currency: '<mock-value-for-field-"currencyCode">',
            flow: "Buy now",
            order_id: "order-id",
            payment_method: "CREDIT_CARD",
            subject: "click payment method",
          },
          {
            action: "clickedOrderProgression",
            context_module: "ordersPayment",
            context_page_owner_id: "order-id",
            flow: "Buy now",
          },
          {
            action: "orderProgressionViewed",
            context_module: "ordersReview",
            context_page_owner_id: "order-id",
            flow: "Buy now",
          },
          {
            action: "clickedOrderProgression",
            context_module: "ordersReview",
            context_page_owner_id: "order-id",
            flow: "Buy now",
          },
          {
            action: "submittedOrder",
            flow: "Buy now",
            order_id: "order-id",
          },
        ])

        expect(mockRouter.replace).toHaveBeenCalledWith(
          "/orders/order-id/details",
        )
      },
    )

    it("shows the pickup details pre-filled if they exist", async () => {
      renderWithRelay({
        Viewer: () => ({
          ...baseProps,
          me: {
            ...baseProps.me,
            order: {
              ...baseProps.me.order,
              fulfillmentOptions: [
                {
                  type: "PICKUP",
                  __typename: "PickupFulfillmentOption",
                  selected: true,
                },
                { type: "DOMESTIC_FLAT" },
              ],
              fulfillmentDetails: {
                phoneNumber: {
                  originalNumber: "03012345678",
                  regionCode: "de",
                },
              },
              selectedFulfillmentOption: {
                type: "PICKUP",
              },
            },
          },
        }),
      })

      await helpers.waitForLoadingComplete()

      const pickupTab = within(
        screen.getByTestId(testIDs.fulfillmentDetailsStepTabs),
      ).getByText("Pickup")

      act(() => {
        userEvent.click(pickupTab)
      })

      // Verify that the phone number is pre-filled
      const phoneCountryPicker = screen.getByTestId(testIDs.phoneCountryPicker)
      expect(phoneCountryPicker).toHaveTextContent("🇩🇪")
      expect(screen.getByTestId("PickupPhoneNumberInput")).toHaveValue(
        "03012345678",
      )
    })

    it("shows location-based phone country code when no existing pickup details exist", async () => {
      const props = {
        ...baseProps,
        me: {
          ...baseProps.me,
          order: {
            ...baseProps.me.order,
            fulfillmentOptions: [
              {
                type: "PICKUP",
                __typename: "PickupFulfillmentOption",
              },
              { type: "DOMESTIC_FLAT" },
            ],
            fulfillmentDetails: null,
            selectedFulfillmentOption: null,
          },
        },
      }

      renderWithRelay({
        Viewer: () => props,
      })

      await helpers.waitForLoadingComplete()

      act(() => {
        userEvent.click(screen.getByText("Pickup"))
      })

      expect(screen.getByText("Free pickup")).toBeInTheDocument()

      await waitFor(() => {
        const phoneCountryPicker = screen.getByTestId(
          testIDs.phoneCountryPicker,
        )

        expect(phoneCountryPicker).toHaveTextContent("+ 52")
      })
    })
  })

  describe("Checkout with flat-rate shipping", () => {
    it("allows the user to progress through order submission with flat-rate shipping + credit card", async () => {
      const props = {
        ...baseProps,
        me: {
          ...baseProps.me,
          order: {
            ...baseProps.me.order,
            fulfillmentOptions: [
              {
                type: "DOMESTIC_FLAT",
              },
            ],
            fulfillmentDetails: null,
            selectedFulfillmentOption: null,
          },
          creditCards: {
            edges: [],
          },
        },
      }
      const initialOrder = props.me.order

      const { mockResolveLastOperation } = renderWithRelay({
        Viewer: () => props,
      })

      await helpers.waitForLoadingComplete()

      expect(screen.getByText("Shipping method")).toBeInTheDocument()

      const submitButton = screen.getByText("See Shipping Methods")

      // Verify submit button does not work
      act(() => {
        userEvent.click(submitButton)
      })

      await screen.findByText("Phone number is required")
      let requiredMessages = screen.getAllByText("required", {
        exact: false,
      })

      expect(requiredMessages.map(el => el.textContent)).toEqual([
        "Full name is required",
        "*Required",
        "Street address is required",
        "City is required",
        "State is required",
        "ZIP code is required",
        "Phone number is required",
      ])

      const addressInputValue = {
        name: "John Doe",
        country: "US",
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        city: "New York",
        region: "NY",
        postalCode: "10001",
        phoneNumberCountryCode: "🇺🇸 + 1",
        phoneNumber: "1234567890",
      }

      const countrySelect = screen.getByLabelText("Country")

      await act(async () => {
        userEvent.selectOptions(countrySelect, addressInputValue.country)
      })

      const [
        nameInput,
        addressLine1Input,
        addressLine2Input,
        cityInput,
        regionInput,
        postalCodeInput,
        phoneNumberInput,
        countryPicker,
      ] = await Promise.all([
        screen.findByPlaceholderText("Add full name"),
        screen.findByLabelText("Street address"),
        screen.findByLabelText("Apt, floor, suite, etc. (optional)"),
        screen.findByLabelText("City"),
        screen.findByLabelText("State, region or province"),
        screen.findByLabelText("ZIP/Postal code"),
        screen.findByTestId("addressFormFields.phoneNumber"),
        screen.findByTestId(testIDs.phoneCountryPicker),
      ])

      helpers.selectCountryCode(
        countryPicker,
        addressInputValue.phoneNumberCountryCode,
      )

      await act(async () => {
        userEvent.type(nameInput, addressInputValue.name)
        userEvent.type(addressLine1Input, addressInputValue.addressLine1)
        userEvent.type(addressLine2Input, addressInputValue.addressLine2)
        userEvent.type(cityInput, addressInputValue.city)
        userEvent.type(regionInput, addressInputValue.region)
        userEvent.type(postalCodeInput, addressInputValue.postalCode)
        userEvent.type(phoneNumberInput, addressInputValue.phoneNumber)
        userEvent.selectOptions(countrySelect, addressInputValue.country)
      })

      // Theory: This is required because the phone input
      // validation is debounced which must be blocking every other validation
      // update.
      act(() => {
        jest.advanceTimersByTime(250)
      })

      await waitFor(() => {
        requiredMessages = screen.getAllByText("required", {
          exact: false,
        })

        expect(
          requiredMessages.filter(el => el.textContent !== "*Required").length,
        ).toEqual(0)
      })

      act(() => {
        userEvent.click(submitButton)
      })

      let setShippingAddressOperation
      await act(async () => {
        const operation = await waitFor(() => {
          return mockResolveLastOperation({
            updateOrderShippingAddressPayload: () =>
              orderMutationSuccess(initialOrder, {
                selectedFulfillmentOption: {
                  type: "DOMESTIC_FLAT",
                },
                fulfillmentDetails: {
                  phoneNumber: {
                    originalNumber: "1234567890",
                    regionCode: "us",
                  },
                  address: {
                    name: "John Doe",
                    addressLine1: "123 Main St",
                    addressLine2: "Apt 4B",
                    city: "New York",
                    region: "NY",
                    postalCode: "10001",
                    country: "US",
                  },
                },
              }),
          })
        })
        await flushPromiseQueue()
        setShippingAddressOperation = operation
      })

      expect(setShippingAddressOperation.operationName).toBe(
        "useOrder2SetOrderDeliveryAddressMutation",
      )

      await act(async () => {
        await waitFor(() => {
          return mockResolveLastOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "new-address-id",
              },
            }),
          })
        })
        await flushPromiseQueue()
      })

      // Complete shipping option step
      const submitPaymentButton = await screen.findByText("Continue to Payment")

      let setFulfillmentOptionOperation
      userEvent.click(submitPaymentButton)

      await act(async () => {
        // Shipping MUTATIONS
        const operation = await waitFor(() => {
          return mockResolveLastOperation({
            setOrderFulfillmentOptionPayload: () =>
              orderMutationSuccess(initialOrder, {
                selectedFulfillmentOption: {
                  type: "DOMESTIC_FLAT",
                },
              }),
          })
        })
        await flushPromiseQueue()
        setFulfillmentOptionOperation = operation
      })

      expect(setFulfillmentOptionOperation.operationName).toBe(
        "useOrder2SetOrderFulfillmentOptionMutation",
      )

      await helpers.fillInMockCreditCard({
        mockResolveLastOperation,
        initialOrder,
      })

      await helpers.submitOrder({
        mockResolveLastOperation,
        initialOrder,
      })

      expectTrackedEvents({ mockTrackEvent, exact: false }, [
        {
          action: "orderProgressionViewed",
          context_module: "ordersFulfillment",
        },
        {
          action: "clickedOrderProgression",
          context_module: "ordersFulfillment",
        },
        {
          action: "orderProgressionViewed",
          context_module: "ordersShippingMethods",
        },
        {
          action: "clickedOrderProgression",
          context_module: "ordersShippingMethods",
        },
        {
          action: "orderProgressionViewed",
          context_module: "ordersPayment",
        },
        {
          action: "clickedPaymentMethod",
          payment_method: "CREDIT_CARD",
        },
        {
          action: "clickedOrderProgression",
          context_module: "ordersPayment",
        },
        {
          action: "orderProgressionViewed",
          context_module: "ordersReview",
        },
        {
          action: "clickedOrderProgression",
          context_module: "ordersReview",
        },
        {
          action: "submittedOrder",
        },
      ])
    })

    it("displays a missing_postal_code error from the server", async () => {
      const props = {
        ...baseProps,
        me: {
          ...baseProps.me,
          order: {
            ...baseProps.me.order,
            fulfillmentOptions: [
              {
                type: "DOMESTIC_FLAT",
              },
            ],
            fulfillmentDetails: null,
            selectedFulfillmentOption: null,
          },
          creditCards: {
            edges: [],
          },
        },
      }

      const { mockResolveLastOperation } = renderWithRelay({
        Viewer: () => props,
      })

      await helpers.waitForLoadingComplete()

      expect(screen.getByText("Shipping method")).toBeInTheDocument()

      const submitButton = screen.getByText("See Shipping Methods")

      const addressInputValue = {
        name: "John Doe",
        country: "DE",
        addressLine1: "123 Main St",
        addressLine2: "Apt 4B",
        city: "New York",
        region: "NY",
        phoneNumberCountryCode: "🇺🇸 + 1",
        phoneNumber: "1234567890",
      }

      const countrySelect = screen.getByLabelText("Country")

      await act(async () => {
        userEvent.selectOptions(countrySelect, addressInputValue.country)
      })

      await flushPromiseQueue()
      const [
        nameInput,
        addressLine1Input,
        addressLine2Input,
        cityInput,
        regionInput,
        phoneNumberInput,
        countryPicker,
      ] = await Promise.all([
        screen.findByPlaceholderText("Add full name"),
        screen.findByLabelText("Street address"),
        screen.findByLabelText("Apt, floor, suite, etc. (optional)"),
        screen.findByLabelText("City"),
        screen.findByLabelText("State, region or province"),
        screen.findByTestId("addressFormFields.phoneNumber"),
        screen.findByTestId(testIDs.phoneCountryPicker),
      ])

      helpers.selectCountryCode(
        countryPicker,
        addressInputValue.phoneNumberCountryCode,
      )

      act(() => {
        userEvent.type(nameInput, addressInputValue.name)
        userEvent.type(addressLine1Input, addressInputValue.addressLine1)
        userEvent.type(addressLine2Input, addressInputValue.addressLine2)
        userEvent.type(cityInput, addressInputValue.city)
        userEvent.type(regionInput, addressInputValue.region)
        userEvent.type(phoneNumberInput, addressInputValue.phoneNumber)
        userEvent.selectOptions(countrySelect, addressInputValue.country)
      })

      act(() => {
        jest.advanceTimersByTime(250)
      })

      let requiredMessages
      await waitFor(() => {
        requiredMessages = screen.getAllByText("required", {
          exact: false,
        })

        expect(
          requiredMessages.filter(el => el.textContent !== "*Required").length,
        ).toEqual(0)
      })

      act(() => {
        userEvent.click(submitButton)
      })

      let mutation

      await act(async () => {
        await waitFor(() => {
          mutation = mockResolveLastOperation({
            updateOrderShippingAddressPayload: () =>
              orderMutationError({ code: "missing_postal_code" }),
          })
        })
        await flushPromiseQueue()
      })

      expect(mutation.operationName).toBe(
        "useOrder2SetOrderDeliveryAddressMutation",
      )

      jest.advanceTimersByTime(250)
      await screen.findByText("Postal code is required")
    })
    describe("with saved address", () => {
      it("allows the user to proceed with a saved address", async () => {
        const props = {
          ...baseProps,
          me: {
            ...baseProps.me,
            order: {
              ...baseProps.me.order,
              availableShippingCountries: ["US", "DE"],
              fulfillmentOptions: [
                {
                  type: "DOMESTIC_FLAT",
                },
              ],
              fulfillmentDetails: null,
              selectedFulfillmentOption: null,
            },
            creditCards: {
              edges: [],
            },
            addressConnection: {
              edges: [
                {
                  node: {
                    internalID: "address-1",
                    name: "John Doe",
                    addressLine1: "123 Main St",
                    addressLine2: "Apt 4",
                    city: "New York",
                    region: "NY",
                    postalCode: "10001",
                    country: "US",
                    phoneNumber: "5551234567",
                    phoneNumberCountryCode: "us",
                  },
                },
                {
                  node: {
                    internalID: "address-2",
                    name: "John Doe",
                    addressLine1: "345 Marx Str",
                    addressLine2: "Apt 4",
                    city: "Berlin",
                    region: "Berlin",
                    postalCode: "56789",
                    country: "DE",
                    phoneNumber: "5559876543",
                    phoneNumberCountryCode: "de",
                  },
                },
              ],
            },
          },
        }

        const { mockResolveLastOperation } = renderWithRelay({
          Viewer: () => props,
        })
        await helpers.waitForLoadingComplete()
        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })
        await userEvent.click(screen.getByText("See Shipping Methods"))

        let mutation
        await act(async () => {
          await waitFor(() => {
            mutation = mockResolveLastOperation({
              updateOrderShippingAddressPayload: () =>
                orderMutationSuccess(props.me.order, {
                  fulfillmentDetails: {
                    name: "John Doe",
                    addressLine1: "123 Main St",
                    addressLine2: "Apt 4",
                    city: "New York",
                    region: "NY",
                    postalCode: "10001",
                    country: "US",
                    phoneNumber: {
                      regionCode: "us",
                      originalNumber: "5551234567",
                    },
                  },
                }),
            })
          })
          await flushPromiseQueue()
        })

        expect(mutation.operationName).toBe(
          "useOrder2SetOrderDeliveryAddressMutation",
        )
        expect(mutation.operationVariables.input).toEqual({
          id: "order-id",
          buyerPhoneNumber: "5551234567",
          buyerPhoneNumberCountryCode: "us",
          shippingAddressLine1: "123 Main St",
          shippingAddressLine2: "Apt 4",
          shippingCity: "New York",
          shippingRegion: "NY",
          shippingPostalCode: "10001",
          shippingCountry: "US",
          shippingName: "John Doe",
        })
      })

      it("allows the user to edit a saved address", async () => {
        const props = {
          ...baseProps,
          me: {
            ...baseProps.me,
            order: {
              ...baseProps.me.order,
              availableShippingCountries: ["US", "DE"],
              fulfillmentOptions: [
                {
                  type: "DOMESTIC_FLAT",
                },
              ],
              fulfillmentDetails: null,
              selectedFulfillmentOption: null,
            },
            creditCards: {
              edges: [],
            },
            addressConnection: {
              edges: [
                {
                  node: {
                    internalID: "address-1",
                    name: "John Doe",
                    addressLine1: "123 Main St",
                    addressLine2: "Apt 4",
                    city: "New York",
                    region: "NY",
                    postalCode: "10001",
                    country: "US",
                    phoneNumber: "5551234567",
                    phoneNumberCountryCode: "us",
                  },
                },
              ],
            },
          },
        }

        const { mockResolveLastOperation } = renderWithRelay({
          Viewer: () => props,
        })
        await helpers.waitForLoadingComplete()
        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        // Click edit button on saved address
        const editButtons = screen.getAllByText("Edit")
        await userEvent.click(editButtons[0])

        // Verify edit form is shown
        await waitFor(() => {
          expect(screen.getByText("Save Address")).toBeInTheDocument()
          expect(screen.getByText("Cancel")).toBeInTheDocument()
        })

        // Verify form fields are pre-populated
        expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument()
        expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument()
        expect(screen.getByDisplayValue("Apt 4")).toBeInTheDocument()
        expect(screen.getByDisplayValue("New York")).toBeInTheDocument()
        expect(screen.getByDisplayValue("NY")).toBeInTheDocument()
        expect(screen.getByDisplayValue("10001")).toBeInTheDocument()
        expect(screen.getByDisplayValue("5551234567")).toBeInTheDocument()

        // Modify the name field
        const nameField = screen.getByDisplayValue("John Doe")
        await userEvent.clear(nameField)
        await userEvent.type(nameField, "John Smith")

        // Save the address
        await userEvent.click(screen.getByText("Save Address"))

        // Mock the address update mutation
        await act(async () => {
          await waitFor(() => {
            mockResolveLastOperation({
              UpdateUserAddressPayload: () => ({
                userAddressOrErrors: {
                  internalID: "address-1",
                  name: "John Smith",
                  addressLine1: "123 Main St",
                  addressLine2: "Apt 4",
                  city: "New York",
                  region: "NY",
                  postalCode: "10001",
                  country: "US",
                  phoneNumber: "5551234567",
                  phoneNumberCountryCode: "us",
                },
              }),
            })
          })
          await flushPromiseQueue()
        })

        // Verify we're back to the address selection view
        await waitFor(() => {
          expect(screen.getByText("See Shipping Methods")).toBeInTheDocument()
        })
      })
    })
  })

  describe("Checkout with wire transfer", () => {
    it("allows the user to progress through order submission with pickup + wire transfer", async () => {
      const props = {
        ...baseProps,
        me: {
          ...baseProps.me,
          order: {
            ...baseProps.me.order,
            fulfillmentOptions: [
              {
                type: "PICKUP",
                __typename: "PickupFulfillmentOption",
                selected: true,
              },
              { type: "DOMESTIC_FLAT" },
            ],
            fulfillmentDetails: {
              phoneNumber: {
                originalNumber: "03012345678",
                regionCode: "de",
              },
            },
            selectedFulfillmentOption: {
              type: "PICKUP",
            },
            stripeConfirmationToken: null,
          },
          creditCards: {
            edges: [],
          },
          bankAccounts: {
            edges: [],
          },
        },
      }
      const initialOrder = props.me.order

      const { mockResolveLastOperation } = renderWithRelay({
        Viewer: () => props,
      })

      await helpers.waitForLoadingComplete()

      // Skip to payment step since pickup is pre-configured
      await waitFor(() => {
        act(() => {
          userEvent.click(screen.getByText("Continue to Payment"))
        })
      })

      // PICKUP MUTATIONS
      await act(async () => {
        await waitFor(() => {
          return mockResolveLastOperation({
            setOrderFulfillmentOptionPayload: () =>
              orderMutationSuccess(initialOrder, {
                selectedFulfillmentOption: {
                  type: "PICKUP",
                },
              }),
          })
        })
        await flushPromiseQueue()
      })

      await act(async () => {
        await waitFor(() => {
          return mockResolveLastOperation({
            updateOrderShippingAddressPayload: () =>
              orderMutationSuccess(initialOrder, {
                selectedFulfillmentOption: {
                  type: "PICKUP",
                },
                fulfillmentDetails: {
                  phoneNumber: {
                    originalNumber: "03012345678",
                    regionCode: "de",
                  },
                },
              }),
          })
        })
        await flushPromiseQueue()
      })

      await helpers.fillInWireTransfer({
        mockResolveLastOperation,
        initialOrder,
      })

      await helpers.submitOrder({
        mockResolveLastOperation,
        initialOrder,
        isWireTransfer: true,
      })

      expectTrackedEvents({ mockTrackEvent }, [
        {
          action: "orderProgressionViewed",
          context_module: "ordersFulfillment",
          context_page_owner_id: "order-id",
          flow: "Buy now",
        },
        {
          action: "clickedOrderProgression",
          context_module: "ordersFulfillment",
          context_page_owner_id: "order-id",
          flow: "Buy now",
        },
        {
          action: "orderProgressionViewed",
          context_module: "ordersPayment",
          context_page_owner_id: "order-id",
          flow: "Buy now",
        },
        {
          action: "clickedPaymentMethod",
          amount: '<mock-value-for-field-"minor">',
          currency: '<mock-value-for-field-"currencyCode">',
          flow: "Buy now",
          order_id: "order-id",
          payment_method: "WIRE_TRANSFER",
          subject: "click payment method",
        },
        {
          action: "clickedOrderProgression",
          context_module: "ordersPayment",
          context_page_owner_id: "order-id",
          flow: "Buy now",
        },
        {
          action: "orderProgressionViewed",
          context_module: "ordersReview",
          context_page_owner_id: "order-id",
          flow: "Buy now",
        },
        {
          action: "clickedOrderProgression",
          context_module: "ordersReview",
          context_page_owner_id: "order-id",
          flow: "Buy now",
        },
        {
          action: "submittedOrder",
          flow: "Buy now",
          order_id: "order-id",
        },
      ])

      expect(mockRouter.replace).toHaveBeenCalledWith(
        "/orders/order-id/details",
      )
    })
  })

  describe("within the payment section", () => {
    it.todo(
      // TODO: Example of this assertion is above for clickedChangeShippingAddress
      "Allows clicking the edit button to change payment method, but only tracks savedPaymentMethodViewed one time for a user with saved credit cards",
    )

    describe("error handling when saving and continuing", () => {
      it("shows an error if no payment method is selected", async () => {
        const props = {
          ...baseProps,
          me: {
            ...baseProps.me,
            order: {
              ...baseProps.me.order,
              fulfillmentOptions: [
                {
                  type: "PICKUP",
                  __typename: "PickupFulfillmentOption",
                  selected: true,
                },
                { type: "DOMESTIC_FLAT" },
              ],
              fulfillmentDetails: {
                phoneNumber: {
                  originalNumber: "03012345678",
                  regionCode: "de",
                },
              },
              selectedFulfillmentOption: {
                type: "PICKUP",
              },
            },
            creditCards: {
              edges: [],
            },
            bankAccounts: {
              edges: [],
            },
          },
        }
        const initialOrder = props.me.order

        const { mockResolveLastOperation } = await renderWithRelay({
          Viewer: () => props,
        })
        await helpers.waitForLoadingComplete()

        await waitFor(() => {
          act(() => {
            userEvent.click(screen.getByText("Continue to Payment"))
          })
        })

        // PICKUP MUTATIONS
        await act(async () => {
          await waitFor(() => {
            return mockResolveLastOperation({
              setOrderFulfillmentOptionPayload: () =>
                orderMutationSuccess(initialOrder, {
                  selectedFulfillmentOption: {
                    type: "PICKUP",
                  },
                }),
            })
          })
          await flushPromiseQueue()
        })

        await act(async () => {
          await waitFor(() => {
            return mockResolveLastOperation({
              updateOrderShippingAddressPayload: () =>
                orderMutationSuccess(initialOrder, {
                  selectedFulfillmentOption: {
                    type: "PICKUP",
                  },
                  fulfillmentDetails: {
                    phoneNumber: {
                      originalNumber: "03012345678",
                      regionCode: "de",
                    },
                  },
                }),
            })
          })

          await flushPromiseQueue()
        })

        await userEvent.click(screen.getByText("Continue to Review"))
        expect(screen.getByText("Select a payment method")).toBeInTheDocument()

        const wirePaymentOption = screen.getByTestId(testIDs.paymentFormWire)
        act(() => {
          userEvent.click(wirePaymentOption)
        })
        await waitFor(() => {
          expect(
            screen.queryByLabelText("Select a payment method"),
          ).not.toBeInTheDocument()
        })
      })
    })
  })

  describe("Navigation guards", () => {
    let addEventListenerSpy: jest.SpyInstance
    let removeEventListenerSpy: jest.SpyInstance
    let preventHardReloadMock: jest.Mock
    let handleBackNavigationMock: jest.Mock

    beforeEach(() => {
      preventHardReloadMock = jest.fn()
      handleBackNavigationMock = jest.fn()

      addEventListenerSpy = jest.spyOn(window, "addEventListener")
      removeEventListenerSpy = jest.spyOn(window, "removeEventListener")

      addEventListenerSpy.mockImplementation(event => {
        if (event === "beforeunload") {
          Object.defineProperty(window, "preventHardReload", {
            value: preventHardReloadMock,
            configurable: true,
          })
        }

        if (event === "popstate") {
          Object.defineProperty(window, "handleBackNavigation", {
            value: handleBackNavigationMock,
            configurable: true,
          })
        }
      })
    })

    afterEach(() => {
      addEventListenerSpy.mockRestore()
      removeEventListenerSpy.mockRestore()
      jest.restoreAllMocks()
    })

    it("adds event listeners on mount", async () => {
      await renderWithRelay({
        Viewer: () => ({
          ...baseProps,
        }),
      })

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "beforeunload",
        preventHardReload,
      )
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "popstate",
        handleBackNavigation,
      )
    })
  })
})

const baseProps = {
  me: {
    order: {
      id: "ORDER:RELAY-ID-MAKES-TEST-WORK",

      availableShippingCountries: ["US", "DE"],
      availablePaymentMethods: ["CREDIT_CARD", "WIRE_TRANSFER"],
      internalID: "order-id",
      mode: "BUY",
      source: "ARTWORK_PAGE",
      fulfillmentOptions: [
        {
          type: "PICKUP",
          __typename: "PickupFulfillmentOption",
        },
        { type: "DOMESTIC_FLAT" },
      ],
      fulfillmentDetails: null,
      selectedFulfillmentOption: null,
      pricingBreakdown: [
        {
          __typename: "SubtotalLine",
          displayName: "Subtotal",
          amount: { amount: "1000", currencySymbol: "$" },
        },
        {
          __typename: "ShippingLine",
          displayName: "Shipping",
          amountFallbackText: "Calculated at checkout",
          amount: null,
        },
        {
          __typename: "TaxLine",
          displayName: "Tax",
          amountFallbackText: "Calculated at checkout",
          amount: null,
        },
        {
          __typename: "TotalLine",
          displayName: "Total",
          amountFallbackText: "Waiting for final totals",
          amount: null,
        },
      ],
      lineItems: [
        {
          artwork: {
            slug: "artwork-slug",
            isFixedShippingFeeOnly: true,
          },
          artworkVersion: {
            internalID: "artwork-version-1",
            title: "Artwork Title",
            artistNames: "Artist Name",
            date: "2023",
            image: {
              resized: {
                width: 185,
                height: 138,
                url: "https://example.com/image.jpg",
              },
            },
          },
        },
      ],
      shippingOrigin: "Eagle, CO, US",
    },
    addressConnection: {
      edges: [],
    },
  },
}
