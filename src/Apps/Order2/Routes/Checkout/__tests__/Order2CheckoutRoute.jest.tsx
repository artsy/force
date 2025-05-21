import { act, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2CheckoutRouteTestQuery } from "__generated__/Order2CheckoutRouteTestQuery.graphql"
import { merge } from "lodash"
import { graphql } from "react-relay"
import { Order2CheckoutRoute } from "../Order2CheckoutRoute"

jest.unmock("react-relay")
jest.useFakeTimers()

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
        jest.runAllTimers()
      })

      await waitFor(() => {
        expect(
          screen.queryByLabelText("Checkout loading skeleton"),
        ).not.toBeInTheDocument()
      })
    })
  })

  describe("with loading complete", () => {
    const renderWithLoadingComplete = async props => {
      const renderResult = await renderWithRelay({ Viewer: () => props })

      act(() => {
        jest.runAllTimers()
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

      expect(screen.getAllByText("Supreme skateboard, 2023")).toHaveLength(2)
    })

    describe("Checkout with pickup", () => {
      const testIDs = {
        phoneCountryPicker: "country-picker",
        fulfillmentDetailsStep: "FulfillmentDetailsStep",
        fulfillmentDetailsStepTabs: "FulfillmentDetailsStepTabs",
        pickupDetailsForm: "PickupDetailsForm",
        // Use with screen.getByRole
        phoneCountryPickerListRole: "listbox",
      }

      const orderMutationSuccess = (initialValues, newValues) => {
        return {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: merge(initialValues, newValues),
          },
        }
      }

      it("allows the user to progress through order submission with pickup", async () => {
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

        expect(screen.queryByText("Shipping Method")).toBeVisible()

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
        await screen.findByText("Phone Number is required")

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
            screen.queryByText("Phone Number is required"),
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
        expect(screen.queryByText("Shipping Method")).not.toBeInTheDocument()
      })

      it("shows the pickup details pre-filled if they exist", async () => {
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
                  countryCode: "de",
                },
              },
              selectedFulfillmentOption: {
                type: "PICKUP",
              },
            },
          },
        })

        act(() => {
          userEvent.click(screen.getByText("Edit"))
        })

        const pickupTab = within(
          screen.getByTestId(testIDs.fulfillmentDetailsStepTabs),
        ).getByText("Pickup")
        act(() => {
          userEvent.click(pickupTab)
        })

        expect(screen.getByText("Free pickup")).toBeInTheDocument()

        // Verify that the phone number is pre-filled
        const phoneCountryPicker = screen.getByTestId(
          testIDs.phoneCountryPicker,
        )
        expect(phoneCountryPicker).toHaveTextContent("🇩🇪")
        expect(screen.getByTestId("PickupPhoneNumberInput")).toHaveValue(
          "03012345678",
        )
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
