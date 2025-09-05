import { act, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2DeliveryFormTestQuery } from "__generated__/Order2DeliveryFormTestQuery.graphql"
import { graphql } from "react-relay"
import {
  orderMutationError,
  orderMutationSuccess,
} from "../../../__tests__/utils"
import { Order2DeliveryForm } from "../Order2DeliveryForm"

jest.unmock("react-relay")
jest.useFakeTimers()

const mockCheckoutContext: any = {
  setCheckoutMode: jest.fn(),
  checkoutTracking: {
    clickedOrderProgression: jest.fn(),
  },
  setFulfillmentDetailsComplete: jest.fn(),
  setUserAddressMode: jest.fn(),
  userAddressMode: null,
}

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

beforeEach(() => {
  jest.clearAllMocks()
  jest.runAllTimers()
  mockCheckoutContext.userAddressMode = null
})

const { renderWithRelay } = setupTestWrapperTL<Order2DeliveryFormTestQuery>({
  Component: (props: any) => (
    <Order2DeliveryForm order={props.me.order} me={props.me} />
  ),
  query: graphql`
    query Order2DeliveryFormTestQuery @relay_test_operation {
      me {
        ...Order2DeliveryForm_me
        order(id: "order-id") {
          ...Order2DeliveryForm_order
        }
      }
    }
  `,
})

describe("Order2DeliveryForm", () => {
  const baseOrderProps = {
    internalID: "order-id",
    selectedFulfillmentOption: null,
    availableShippingCountries: ["US", "CA", "DE"],
    fulfillmentDetails: null,
  }

  describe("with no saved addresses", () => {
    const baseMeProps = {
      addressConnection: {
        edges: [],
      },
    }

    it("renders the delivery form", async () => {
      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Delivery address")).toBeInTheDocument()
      })

      expect(screen.getByText("See Shipping Methods")).toBeInTheDocument()
      expect(screen.getByPlaceholderText("Add full name")).toBeInTheDocument()
      expect(screen.getByLabelText("Street address")).toBeInTheDocument()
      expect(screen.getByLabelText("City")).toBeInTheDocument()
    })

    it("pre-fills form with existing fulfillment details", async () => {
      const fulfillmentDetails = {
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
      }

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
            fulfillmentDetails,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument()
      })

      expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument()
      expect(screen.getByDisplayValue("Apt 4")).toBeInTheDocument()
      expect(screen.getByDisplayValue("New York")).toBeInTheDocument()
      expect(screen.getByDisplayValue("NY")).toBeInTheDocument()
      expect(screen.getByDisplayValue("10001")).toBeInTheDocument()
      expect(screen.getByDisplayValue("5551234567")).toBeInTheDocument()
    })

    describe("form submission", () => {
      it("calls setCheckoutMode during form submission", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          Me: () => ({
            ...baseMeProps,
            order: {
              ...baseOrderProps,
              fulfillmentDetails: {
                name: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                region: "",
                postalCode: "",
                country: "US",
                phoneNumber: {
                  regionCode: "us",
                  originalNumber: "",
                },
              },
            },
          }),
        })

        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        // Fill out the form with valid data
        await userEvent.type(
          screen.getByPlaceholderText("Add full name"),
          "Jane Smith",
        )
        await userEvent.type(
          screen.getByLabelText("Street address"),
          "456 Oak Ave",
        )
        await userEvent.type(screen.getByLabelText("City"), "Los Angeles")
        await userEvent.selectOptions(screen.getByLabelText("Country"), "US")
        await userEvent.type(
          screen.getByLabelText("State, region or province"),
          "CA",
        )
        await userEvent.type(screen.getByLabelText("ZIP/Postal code"), "90210")
        await userEvent.type(
          screen.getByTestId("addressFormFields.phoneNumber"),
          "5559876543",
        )

        // Click the button to submit the form
        act(() => {
          userEvent.click(screen.getByText("See Shipping Methods"))
        })

        // Wait for the form submission to start and resolve the mutations
        await waitFor(() => {
          mockResolveLastOperation({
            updateOrderShippingAddressPayload: () =>
              orderMutationSuccess(baseOrderProps, {
                fulfillmentDetails: {
                  name: "Jane Smith",
                  addressLine1: "456 Oak Ave",
                  addressLine2: "",
                  city: "Los Angeles",
                  region: "CA",
                  postalCode: "90210",
                  country: "US",
                  phoneNumber: {
                    regionCode: "us",
                    originalNumber: "5559876543",
                  },
                },
              }),
          })
        })
        await flushPromiseQueue()

        await waitFor(() => {
          mockResolveLastOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "new-address-id",
              },
            }),
          })
        })
        await flushPromiseQueue()

        // setCheckoutMode should be called during form submission
        expect(mockCheckoutContext.setCheckoutMode).toHaveBeenCalledWith(
          "standard",
        )
      })

      it("triggers tracking when form is submitted with valid data", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          Me: () => ({
            ...baseMeProps,
            order: {
              ...baseOrderProps,
              fulfillmentDetails: {
                name: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                region: "",
                postalCode: "",
                country: "US",
                phoneNumber: {
                  regionCode: "us",
                  originalNumber: "",
                },
              },
            },
          }),
        })

        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        // Fill out the form with valid data
        await userEvent.type(
          screen.getByPlaceholderText("Add full name"),
          "Jane Smith",
        )
        await userEvent.type(
          screen.getByLabelText("Street address"),
          "456 Oak Ave",
        )
        await userEvent.type(screen.getByLabelText("City"), "Los Angeles")
        await userEvent.selectOptions(screen.getByLabelText("Country"), "US")
        await userEvent.type(
          screen.getByLabelText("State, region or province"),
          "CA",
        )
        await userEvent.type(screen.getByLabelText("ZIP/Postal code"), "90210")
        await userEvent.type(
          screen.getByTestId("addressFormFields.phoneNumber"),
          "5559876543",
        )

        // Click submit button
        act(() => {
          userEvent.click(screen.getByText("See Shipping Methods"))
        })

        await waitFor(() => {
          mockResolveLastOperation({
            updateOrderShippingAddressPayload: () =>
              orderMutationSuccess(baseOrderProps, {
                fulfillmentDetails: {
                  name: "Jane Smith",
                  addressLine1: "456 Oak Ave",
                  addressLine2: "",
                  city: "Los Angeles",
                  region: "CA",
                  postalCode: "90210",
                  country: "US",
                  phoneNumber: {
                    regionCode: "us",
                    originalNumber: "5559876543",
                  },
                },
              }),
          })
        })
        await flushPromiseQueue()

        await waitFor(() => {
          mockResolveLastOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "new-address-id",
              },
            }),
          })
        })
        await flushPromiseQueue()

        // Should trigger tracking during form submission
        expect(mockCheckoutContext.setCheckoutMode).toHaveBeenCalledWith(
          "standard",
        )
        expect(
          mockCheckoutContext.checkoutTracking.clickedOrderProgression,
        ).toHaveBeenCalled()
      })

      it("does not trigger tracking for invalid form data", async () => {
        renderWithRelay({
          Me: () => ({
            ...baseMeProps,
            order: {
              ...baseOrderProps,
            },
          }),
        })

        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        // Try to submit without filling required fields
        await userEvent.click(screen.getByText("See Shipping Methods"))

        // Should not trigger tracking because form validation should prevent submission
        expect(
          mockCheckoutContext.checkoutTracking.clickedOrderProgression,
        ).not.toHaveBeenCalled()
        expect(
          mockCheckoutContext.setFulfillmentDetailsComplete,
        ).not.toHaveBeenCalled()
      })

      it("successfully submits form with valid data and triggers correct mutations", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          Me: () => ({
            ...baseMeProps,
            order: {
              ...baseOrderProps,
              fulfillmentDetails: {
                name: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                region: "",
                postalCode: "",
                country: "US",
                phoneNumber: {
                  regionCode: "us",
                  originalNumber: "",
                },
              },
            },
          }),
        })

        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        // Fill out the form with valid data
        await userEvent.type(
          screen.getByPlaceholderText("Add full name"),
          "Jane Smith",
        )
        await userEvent.type(
          screen.getByLabelText("Street address"),
          "456 Oak Ave",
        )
        await userEvent.type(screen.getByLabelText("City"), "Los Angeles")
        await userEvent.type(
          screen.getByLabelText("State, region or province"),
          "CA",
        )
        await userEvent.type(screen.getByLabelText("ZIP/Postal code"), "90210")
        await userEvent.type(
          screen.getByTestId("addressFormFields.phoneNumber"),
          "5559876543",
        )

        act(() => {
          userEvent.click(screen.getByText("See Shipping Methods"))
        })

        let shippingAddressMutation
        await waitFor(() => {
          shippingAddressMutation = mockResolveLastOperation({
            updateOrderShippingAddressPayload: () =>
              orderMutationSuccess(baseOrderProps, {
                fulfillmentDetails: {
                  name: "Jane Smith",
                  addressLine1: "456 Oak Ave",
                  addressLine2: "",
                  city: "Los Angeles",
                  region: "CA",
                  postalCode: "90210",
                  country: "US",
                  phoneNumber: {
                    regionCode: "us",
                    originalNumber: "5559876543",
                  },
                },
              }),
          })
        })
        await flushPromiseQueue()

        expect(shippingAddressMutation.operationName).toBe(
          "useOrder2SetOrderDeliveryAddressMutation",
        )
        expect(shippingAddressMutation.operationVariables.input).toEqual({
          id: "order-id",
          buyerPhoneNumber: "5559876543",
          buyerPhoneNumberCountryCode: "us",
          shippingAddressLine1: "456 Oak Ave",
          shippingAddressLine2: "",
          shippingCity: "Los Angeles",
          shippingRegion: "CA",
          shippingPostalCode: "90210",
          shippingCountry: "US",
          shippingName: "Jane Smith",
        })

        let createAddressMutation
        await waitFor(() => {
          createAddressMutation = mockResolveLastOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "UserAddress",
                internalID: "new-address-id",
                name: "Jane Smith",
                addressLine1: "456 Oak Ave",
                addressLine2: "",
                city: "Los Angeles",
                region: "CA",
                postalCode: "90210",
                country: "US",
                phoneNumber: "5559876543",
                phoneNumberCountryCode: "us",
              },
            }),
          })
        })
        await flushPromiseQueue()

        expect(createAddressMutation.operationName).toBe(
          "useOrder2CreateUserAddressMutation",
        )
        expect(createAddressMutation.operationVariables.input).toEqual({
          attributes: {
            name: "Jane Smith",
            addressLine1: "456 Oak Ave",
            addressLine2: "",
            city: "Los Angeles",
            region: "CA",
            postalCode: "90210",
            country: "US",
            phoneNumber: "5559876543",
            phoneNumberCountryCode: "us",
          },
        })

        // Should trigger tracking and context updates
        expect(mockCheckoutContext.setCheckoutMode).toHaveBeenCalledWith(
          "standard",
        )
        expect(
          mockCheckoutContext.setFulfillmentDetailsComplete,
        ).toHaveBeenCalledWith({})
      })

      it("continues checkout even if saving address to user profile fails", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          Me: () => ({
            ...baseMeProps,
            order: {
              ...baseOrderProps,
              fulfillmentDetails: {
                name: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                region: "",
                postalCode: "",
                country: "US",
                phoneNumber: {
                  regionCode: "us",
                  originalNumber: "",
                },
              },
            },
          }),
        })

        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        await userEvent.type(
          screen.getByPlaceholderText("Add full name"),
          "Jane Smith",
        )
        await userEvent.type(
          screen.getByLabelText("Street address"),
          "456 Oak Ave",
        )
        await userEvent.type(screen.getByLabelText("City"), "Los Angeles")
        await userEvent.type(
          screen.getByLabelText("State, region or province"),
          "CA",
        )
        await userEvent.type(screen.getByLabelText("ZIP/Postal code"), "90210")
        await userEvent.type(
          screen.getByTestId("addressFormFields.phoneNumber"),
          "5559876543",
        )

        act(() => {
          userEvent.click(screen.getByText("See Shipping Methods"))
        })

        await waitFor(() => {
          mockResolveLastOperation({
            updateOrderShippingAddressPayload: () =>
              orderMutationSuccess(baseOrderProps, {
                fulfillmentDetails: {
                  name: "Jane Smith",
                  addressLine1: "456 Oak Ave",
                  addressLine2: "",
                  city: "Los Angeles",
                  region: "CA",
                  postalCode: "90210",
                  country: "US",
                  phoneNumber: {
                    regionCode: "us",
                    originalNumber: "5559876543",
                  },
                },
              }),
          })
        })
        await flushPromiseQueue()

        let createAddressMutation
        await waitFor(() => {
          createAddressMutation = mockResolveLastOperation({
            CreateUserAddressPayload: () => ({
              userAddressOrErrors: {
                __typename: "Errors",
                errors: [{ message: "Address creation failed" }],
              },
            }),
          })
        })
        await flushPromiseQueue()

        expect(createAddressMutation.operationName).toBe(
          "useOrder2CreateUserAddressMutation",
        )

        expect(mockCheckoutContext.setCheckoutMode).toHaveBeenCalledWith(
          "standard",
        )
        expect(
          mockCheckoutContext.setFulfillmentDetailsComplete,
        ).toHaveBeenCalledWith({})
      })

      it("unsets existing fulfillment option before setting address when fulfillment exists", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          Me: () => ({
            ...baseMeProps,
            order: {
              ...baseOrderProps,
              selectedFulfillmentOption: {
                type: "SHIPPING_TBD",
              },
              fulfillmentDetails: {
                name: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                region: "",
                postalCode: "",
                country: "US",
                phoneNumber: {
                  regionCode: "us",
                  originalNumber: "",
                },
              },
            },
          }),
        })

        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        // Fill out the form with valid data
        await userEvent.type(
          screen.getByPlaceholderText("Add full name"),
          "Jane Smith",
        )
        await userEvent.type(
          screen.getByLabelText("Street address"),
          "456 Oak Ave",
        )
        await userEvent.type(screen.getByLabelText("City"), "Los Angeles")
        await userEvent.type(
          screen.getByLabelText("State, region or province"),
          "CA",
        )
        await userEvent.type(screen.getByLabelText("ZIP/Postal code"), "90210")
        await userEvent.type(
          screen.getByTestId("addressFormFields.phoneNumber"),
          "5559876543",
        )

        // Submit the form
        act(() => {
          userEvent.click(screen.getByText("See Shipping Methods"))
        })

        // First mutation: unset existing fulfillment option
        let unsetMutation
        await waitFor(() => {
          unsetMutation = mockResolveLastOperation({
            unsetOrderFulfillmentOptionPayload: () =>
              orderMutationSuccess(baseOrderProps, {
                selectedFulfillmentOption: null,
              }),
          })
        })
        await flushPromiseQueue()

        expect(unsetMutation.operationName).toBe(
          "useOrder2UnsetOrderFulfillmentOptionMutation",
        )
        expect(unsetMutation.operationVariables.input).toEqual({
          id: "order-id",
        })

        // Second mutation: set delivery address
        let addressMutation
        await act(async () => {
          await waitFor(() => {
            addressMutation = mockResolveLastOperation({
              updateOrderShippingAddressPayload: () =>
                orderMutationSuccess(baseOrderProps, {
                  selectedFulfillmentOption: null,
                  fulfillmentDetails: {
                    name: "Jane Smith",
                    addressLine1: "456 Oak Ave",
                    city: "Los Angeles",
                    region: "CA",
                    postalCode: "90210",
                    country: "US",
                    phoneNumber: {
                      regionCode: "us",
                      originalNumber: "5559876543",
                    },
                  },
                }),
            })
          })
          await flushPromiseQueue()
        })

        expect(addressMutation.operationName).toBe(
          "useOrder2SetOrderDeliveryAddressMutation",
        )
        expect(addressMutation.operationVariables.input).toEqual({
          id: "order-id",
          buyerPhoneNumber: "5559876543",
          buyerPhoneNumberCountryCode: "us",
          shippingAddressLine1: "456 Oak Ave",
          shippingAddressLine2: "",
          shippingCity: "Los Angeles",
          shippingRegion: "CA",
          shippingPostalCode: "90210",
          shippingCountry: "US",
          shippingName: "Jane Smith",
        })

        await act(async () => {
          await waitFor(() => {
            mockResolveLastOperation({
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

        // Should trigger context updates after all mutations complete
        expect(
          mockCheckoutContext.setFulfillmentDetailsComplete,
        ).toHaveBeenCalledWith({})
      })

      it("handles mutation errors gracefully", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          Me: () => ({
            ...baseMeProps,
            order: {
              ...baseOrderProps,
              fulfillmentDetails: {
                name: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                region: "",
                postalCode: "",
                country: "US",
                phoneNumber: {
                  regionCode: "us",
                  originalNumber: "",
                },
              },
            },
          }),
        })

        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        // Fill out the form with valid data, will trigger server error via mock
        await userEvent.type(
          screen.getByPlaceholderText("Add full name"),
          "Jane Smith",
        )
        await userEvent.type(
          screen.getByLabelText("Street address"),
          "456 Oak Ave",
        )
        await userEvent.type(screen.getByLabelText("City"), "Los Angeles")
        await userEvent.type(
          screen.getByLabelText("State, region or province"),
          "CA",
        )
        await userEvent.type(screen.getByLabelText("ZIP/Postal code"), "90210")
        await userEvent.type(
          screen.getByTestId("addressFormFields.phoneNumber"),
          "5559876543",
        )

        // Submit the form
        act(() => {
          userEvent.click(screen.getByText("See Shipping Methods"))
        })

        let mutation
        await waitFor(() => {
          mutation = mockResolveLastOperation({
            updateOrderShippingAddressPayload: () =>
              orderMutationError({ code: "missing_postal_code" }),
          })
        })
        await flushPromiseQueue()

        expect(mutation.operationName).toBe(
          "useOrder2SetOrderDeliveryAddressMutation",
        )

        // Should display error message
        await waitFor(() => {
          expect(
            screen.getByText("Postal code is required"),
          ).toBeInTheDocument()
        })

        // Should not trigger context updates when mutation fails
        expect(
          mockCheckoutContext.setFulfillmentDetailsComplete,
        ).not.toHaveBeenCalled()
      })
    })

    describe("form validation", () => {
      it("shows validation errors for required fields", async () => {
        renderWithRelay({
          Me: () => ({
            ...baseMeProps,
            order: {
              ...baseOrderProps,
              fulfillmentDetails: null, // Ensure clean state
            },
          }),
        })

        await waitFor(() => {
          expect(screen.getByText("Delivery address")).toBeInTheDocument()
        })

        // Try to submit without filling required fields
        act(() => {
          userEvent.click(screen.getByText("See Shipping Methods"))
        })

        // Advance timers to trigger validation
        act(() => {
          jest.advanceTimersByTime(250)
        })

        await waitFor(() => {
          expect(screen.getByText("Full name is required")).toBeInTheDocument()
          expect(
            screen.getByText("Phone number is required"),
          ).toBeInTheDocument()
        })
      })
    })
  })

  describe("with saved addresses", () => {
    const baseMeProps = {
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
    }

    it("renders the form with saved addresses", async () => {
      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Delivery address")).toBeInTheDocument()
      })
      screen.getByText("Berlin, Berlin, 56789")
      screen.getByText("New York, NY, 10001")
      screen.getByText("Germany")
    })

    it("pre-selects a matching saved address", async () => {
      const { mockResolveLastOperation } = renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
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
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Delivery address")).toBeInTheDocument()
      })

      // Click the button to submit the form
      act(() => {
        userEvent.click(screen.getByText("See Shipping Methods"))
      })

      let mutation
      await waitFor(() => {
        mutation = mockResolveLastOperation({
          updateOrderShippingAddressPayload: () =>
            orderMutationSuccess(baseOrderProps, {
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

      await waitFor(() => {
        mockResolveLastOperation({
          CreateUserAddressPayload: () => ({
            userAddressOrErrors: {
              __typename: "UserAddress",
              internalID: "new-address-id",
            },
          }),
        })
      })
      await flushPromiseQueue()

      expect(
        mockCheckoutContext.setFulfillmentDetailsComplete,
      ).toHaveBeenCalledWith({})
    })

    it("handles address selection from saved addresses", async () => {
      const { mockResolveLastOperation } = renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
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
          },
        }),
      })
      await waitFor(() => {
        expect(screen.getByText("Delivery address")).toBeInTheDocument()
      })
      userEvent.click(screen.getByText("Berlin, Berlin, 56789"))
      userEvent.click(screen.getByText("See Shipping Methods"))

      let mutation
      await waitFor(() => {
        mutation = mockResolveLastOperation({
          updateOrderShippingAddressPayload: () =>
            orderMutationSuccess(baseOrderProps, {
              fulfillmentDetails: {
                name: "John Doe",
                addressLine1: "345 Marx Str",
                addressLine2: "Apt 4",
                city: "Berlin",
                region: "Berlin",
                postalCode: "56789",
                country: "DE",
                phoneNumber: {
                  regionCode: "de",
                  originalNumber: "5559876543",
                },
              },
            }),
        })
      })
      await flushPromiseQueue()

      expect(mutation.operationName).toBe(
        "useOrder2SetOrderDeliveryAddressMutation",
      )
      expect(mutation.operationVariables.input).toEqual({
        id: "order-id",
        buyerPhoneNumber: "5559876543",
        buyerPhoneNumberCountryCode: "de",
        shippingAddressLine1: "345 Marx Str",
        shippingAddressLine2: "Apt 4",
        shippingCity: "Berlin",
        shippingRegion: "Berlin",
        shippingPostalCode: "56789",
        shippingCountry: "DE",
        shippingName: "John Doe",
      })

      await waitFor(() => {
        mockResolveLastOperation({
          CreateUserAddressPayload: () => ({
            userAddressOrErrors: {
              __typename: "UserAddress",
              internalID: "new-address-id",
            },
          }),
        })
      })
      await flushPromiseQueue()

      expect(
        mockCheckoutContext.setFulfillmentDetailsComplete,
      ).toHaveBeenCalledWith({})
    })

    it("shows edit buttons for saved addresses", async () => {
      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Delivery address")).toBeInTheDocument()
      })

      const editButtons = screen.getAllByText("Edit")
      expect(editButtons).toHaveLength(2)
    })

    it("switches to edit mode when edit button is clicked", async () => {
      const mockSetUserAddressMode = jest.fn()
      mockCheckoutContext.setUserAddressMode = mockSetUserAddressMode

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Delivery address")).toBeInTheDocument()
      })

      const editButtons = screen.getAllByText("Edit")
      await userEvent.click(editButtons[0])

      expect(mockSetUserAddressMode).toHaveBeenCalledWith({
        mode: "edit",
        address: expect.objectContaining({
          internalID: "address-1",
          address: expect.objectContaining({
            name: "John Doe",
            addressLine1: "123 Main St",
          }),
        }),
      })
    })

    it("shows edit form when in edit mode", async () => {
      mockCheckoutContext.userAddressMode = {
        mode: "edit",
        address: {
          internalID: "address-1",
          isValid: true,
          phoneNumber: "5551234567",
          phoneNumberCountryCode: "us",
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
      }

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Edit address")).toBeInTheDocument()
      })

      expect(screen.getByText("Save Address")).toBeInTheDocument()
      expect(screen.getByText("Cancel")).toBeInTheDocument()
      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument()
      expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument()
    })

    it("cancels edit mode when cancel button is clicked", async () => {
      const mockSetUserAddressMode = jest.fn()
      mockCheckoutContext.setUserAddressMode = mockSetUserAddressMode
      mockCheckoutContext.userAddressMode = {
        mode: "edit",
        address: {
          internalID: "address-1",
          isValid: true,
          phoneNumber: "5551234567",
          phoneNumberCountryCode: "us",
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
      }

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Save Address")).toBeInTheDocument()
      })

      await userEvent.click(screen.getByText("Cancel"))

      expect(mockSetUserAddressMode).toHaveBeenCalledWith(null)
    })

    it("shows save and cancel buttons when in edit mode", async () => {
      mockCheckoutContext.userAddressMode = {
        mode: "edit",
        address: {
          internalID: "address-1",
          isValid: true,
          phoneNumber: "5551234567",
          phoneNumberCountryCode: "us",
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
      }

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Save Address")).toBeInTheDocument()
        expect(screen.getByText("Cancel")).toBeInTheDocument()
      })

      // Verify the form fields are pre-populated
      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument()
      expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument()
      expect(screen.getByDisplayValue("Apt 4")).toBeInTheDocument()
      expect(screen.getByDisplayValue("New York")).toBeInTheDocument()
      expect(screen.getByDisplayValue("NY")).toBeInTheDocument()
      expect(screen.getByDisplayValue("10001")).toBeInTheDocument()
      expect(screen.getByDisplayValue("5551234567")).toBeInTheDocument()
    })

    it("shows add new address button", async () => {
      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Delivery address")).toBeInTheDocument()
      })

      expect(screen.getByText("Add new address")).toBeInTheDocument()
    })

    it("switches to add mode when add new address button is clicked", async () => {
      const mockSetUserAddressMode = jest.fn()
      mockCheckoutContext.setUserAddressMode = mockSetUserAddressMode

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Delivery address")).toBeInTheDocument()
      })

      await userEvent.click(screen.getByText("Add new address"))

      expect(mockSetUserAddressMode).toHaveBeenCalledWith({
        mode: "add",
      })
    })

    it("shows add address form when in add mode", async () => {
      mockCheckoutContext.userAddressMode = {
        mode: "add",
      }

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Add address")).toBeInTheDocument()
      })

      expect(screen.getByText("Cancel")).toBeInTheDocument()

      // Verify form fields are present with empty values (except potential location defaults)
      expect(screen.getByPlaceholderText("Add full name")).toBeInTheDocument()
      expect(screen.getByLabelText("Street address")).toBeInTheDocument()
      expect(screen.getByLabelText("City")).toBeInTheDocument()
      expect(
        screen.getByLabelText("State, region or province"),
      ).toBeInTheDocument()
      expect(screen.getByLabelText("ZIP/Postal code")).toBeInTheDocument()
      expect(
        screen.getByTestId("addressFormFields.country"),
      ).toBeInTheDocument()
    })

    it("cancels add mode when cancel button is clicked", async () => {
      const mockSetUserAddressMode = jest.fn()
      mockCheckoutContext.setUserAddressMode = mockSetUserAddressMode
      mockCheckoutContext.userAddressMode = {
        mode: "add",
      }

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Add address")).toBeInTheDocument()
      })

      await userEvent.click(screen.getByText("Cancel"))

      expect(mockSetUserAddressMode).toHaveBeenCalledWith(null)
    })

    it("shows appropriate button text for add vs edit modes", async () => {
      // Test add mode
      mockCheckoutContext.userAddressMode = {
        mode: "add",
      }

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Add address")).toBeInTheDocument()
      })

      // Clean up and test edit mode separately
      mockCheckoutContext.userAddressMode = {
        mode: "edit",
        address: {
          internalID: "address-1",
          isValid: true,
          phoneNumber: "5551234567",
          phoneNumberCountryCode: "us",
          address: {
            name: "John Doe",
            addressLine1: "123 Main St",
            addressLine2: "Apt 4",
            city: "New York",
            region: "NY",
            postalCode: "10001",
            country: "US",
          },
        },
      }

      renderWithRelay({
        Me: () => ({
          ...baseMeProps,
          order: {
            ...baseOrderProps,
          },
        }),
      })

      await waitFor(() => {
        expect(screen.getByText("Edit address")).toBeInTheDocument()
      })
    })
  })
})
