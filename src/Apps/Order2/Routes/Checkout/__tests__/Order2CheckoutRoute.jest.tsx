import { act, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2CheckoutRouteTestQuery } from "__generated__/Order2CheckoutRouteTestQuery.graphql"
import { merge } from "lodash"
import { useEffect } from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Order2ExpressCheckout as MockExpressCheckout } from "../Components/ExpressCheckout/Order2ExpressCheckout"
import { Order2CheckoutRoute } from "../Order2CheckoutRoute"

jest.unmock("react-relay")
jest.useFakeTimers()
jest.mock("react-tracking")

const mockStripe = {
  createConfirmationToken: jest.fn(),
}

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
}

jest.mock("@stripe/react-stripe-js", () => {
  const originalModule = jest.requireActual("@stripe/react-stripe-js")
  const mockPaymentElement = jest.fn(({ options: _options, onChange }) => {
    return (
      <button
        type="button"
        onClick={() =>
          onChange({
            elementType: "payment",
            value: { type: "card" },
          })
        }
      >
        Mock enter credit card
      </button>
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

const orderMutationSuccess = (initialValues, newValues) => {
  return {
    orderOrError: {
      __typename: "OrderMutationSuccess",
      order: merge(initialValues, newValues),
    },
  }
}

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

    // TODO: Make our mock more strategic if necessary.
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

  describe("with loading complete", () => {
    const renderWithLoadingComplete = async props => {
      const renderResult = await renderWithRelay({ Viewer: () => props })

      act(() => {
        // CheckoutContext MINIMUM_LOADING_MS
        jest.advanceTimersByTime(1000)
      })
      await waitFor(() => {
        expect(
          screen.queryByLabelText("Checkout loading skeleton"),
        ).not.toBeInTheDocument()
      })
      return renderResult
    }

    it("renders the Order2CheckoutRoute with order data", async () => {
      const props = { ...baseProps }
      props.me.order.lineItems[0].artworkVersion.title = "Supreme skateboard"
      props.me.order.lineItems[0].artworkVersion.artistNames = "Artist Name"
      props.me.order.lineItems[0].artworkVersion.date = "2023"

      await renderWithLoadingComplete(props)

      // There are 3 different summaries on the page. 1 in the collapsible
      // mobile summary at the top and 2 different review steps for mobile and desktop.
      const artworkTitles = screen.getAllByText("Supreme skateboard, 2023")
      expect(artworkTitles).toHaveLength(3)
    })

    describe("Checkout with pickup", () => {
      it("allows the user to progress through order submission with pickup + credit card", async () => {
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
        const initialOrder = props.me.order

        const { mockResolveLastOperation } =
          await renderWithLoadingComplete(props)
        expect(screen.queryByText("Shipping method")).toBeInTheDocument()

        // Click pickup tab
        expect(screen.queryByText("Free pickup")).not.toBeInTheDocument()
        act(() => {
          userEvent.click(screen.getByText("Pickup"))
        })
        expect(screen.getByText("Free pickup")).toBeInTheDocument()

        // Verify submit button is present and disabled
        const submitButton = screen.getByText("Continue to Payment")

        // Verify submit button does not work
        act(() => {
          userEvent.click(submitButton)
        })
        await screen.findByText("Phone number is required")

        // Select country code
        expect(screen.queryByText(/🇩🇪/)).not.toBeInTheDocument()
        const countryPicker = screen.getByTestId(testIDs.phoneCountryPicker)
        act(() => {
          userEvent.click(countryPicker)
        })

        const germanyOption = screen.getByText(/🇩🇪/)
        act(() => {
          userEvent.click(germanyOption)
        })

        // Type a phone number, error goes away
        const phoneInput = screen.getByTestId("PickupPhoneNumberInput")

        act(() => {
          // TODO: Does not trigger phone validation mutation - why?
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
            "useSetOrderFulfillmentOptionMutation",
          )
          expect(setFulfilmentTypeOperation.operationVariables.input).toEqual({
            id: "order-id",
            fulfillmentOption: { type: "PICKUP" },
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
                      countryCode: "de",
                    },
                  },
                }),
            })
          })

          expect(setPickupDetailsOperation.operationName).toBe(
            "useSetOrderPickupDetailsMutation",
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

        mockElements.submit.mockResolvedValueOnce({
          error: null,
        })
        mockStripe.createConfirmationToken.mockResolvedValueOnce({
          error: null,
          confirmationToken: {
            id: "confirmation-token-id",
            paymentMethodPreview: {
              card: {
                displayBrand: "Visa",
                last4: "5309",
              },
            },
          },
        })

        await userEvent.click(screen.getByText("Save and Continue"))

        expect(mockElements.submit).toHaveBeenCalled()
        expect(mockStripe.createConfirmationToken).toHaveBeenCalled()

        await act(async () => {
          const confirmationTokenQuery = await waitFor(() => {
            return mockResolveLastOperation({
              Me: () => {
                return {
                  confirmationToken: {
                    paymentMethodPreview: {
                      card: {
                        displayBrand: "Visa",
                        last4: "5309",
                      },
                    },
                  },
                }
              },
            })
          })

          expect(confirmationTokenQuery.operationName).toBe(
            "Order2PaymentFormConfirmationTokenQuery",
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
                }),
            })
          expect(updateOrderPaymentMethodMutation.operationName).toBe(
            "useUpdateOrderMutation",
          )
          expect(
            updateOrderPaymentMethodMutation.operationVariables.input,
          ).toEqual({
            id: "order-id",
            paymentMethod: "CREDIT_CARD",
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
            "useSubmitOrderMutation",
          )
          expect(submitOrderMutation.operationVariables.input).toEqual({
            id: "order-id",
            confirmationToken: "confirmation-token-id",
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
          "/orders2/order-id/details",
        )
      })

      it("shows the pickup details pre-filled if they exist and allows clicking edit", async () => {
        await renderWithLoadingComplete({
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
        })

        const editPickup = within(
          screen.getByTestId(testIDs.fulfillmentDetailsStep),
        ).getByText("Edit")

        act(() => {
          userEvent.click(editPickup)
        })

        expectTrackedEvents({ mockTrackEvent }, [
          {
            action: "orderProgressionViewed",
            context_module: "ordersFulfillment",
            context_page_owner_id: "order-id",
            flow: "Buy now",
          },
          {
            action: "clickedChangeShippingAddress",
            context_module: "ordersCheckout",
            context_page_owner_id: "order-id",
          },
        ])

        const pickupTab = within(
          screen.getByTestId(testIDs.fulfillmentDetailsStepTabs),
        ).getByText("Pickup")

        act(() => {
          userEvent.click(pickupTab)
        })

        expect(screen.getByText("Free pickup")).toBeVisible()

        // Verify that the phone number is pre-filled
        const phoneCountryPicker = screen.getByTestId(
          testIDs.phoneCountryPicker,
        )
        expect(phoneCountryPicker).toHaveTextContent("🇩🇪")
        expect(screen.getByTestId("PickupPhoneNumberInput")).toHaveValue(
          "03012345678",
        )
        expect(screen.queryByText("Shipping method")).not.toBeInTheDocument()
        act(() => {
          userEvent.click(screen.getByText("Delivery"))
        })
        expect(screen.queryByText("Shipping method")).toBeInTheDocument()
        expectTrackedEvents({ mockTrackEvent }, [
          {
            action: "clickedFulfillmentTab",
            context_page_owner_id: "order-id",
            flow: "Buy now",
            method: "Delivery",
          },
        ])
      })
    })

    describe("within the payment section", () => {
      it.todo(
        // TODO: Example of this assertion is above for clickedChangeShippingAddress
        "Allows clicking the edit button to change payment method",
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
            },
          }
          const initialOrder = props.me.order

          const { mockResolveLastOperation } =
            await renderWithLoadingComplete(props)

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
                        countryCode: "de",
                      },
                    },
                  }),
              })
            })

            await flushPromiseQueue()
          })

          await userEvent.click(screen.getByText("Save and Continue"))
          expect(
            screen.getByText("Select a payment method"),
          ).toBeInTheDocument()

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
  })
})

const baseProps = {
  me: {
    order: {
      id: "ORDER:RELAY-ID-MAKES-TEST-WORK",

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
    },
    addressConnection: {
      edges: [],
    },
  },
}
