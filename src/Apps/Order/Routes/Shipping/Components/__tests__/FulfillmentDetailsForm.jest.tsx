import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useFlag } from "@unleash/proxy-client-react"
import {
  FulfillmentDetailsForm,
  type FulfillmentDetailsFormProps,
} from "Apps/Order/Routes/Shipping/Components/FulfillmentDetailsForm"
import type { ShippingContextProps } from "Apps/Order/Routes/Shipping/ShippingContext"
import {
  FulfillmentType,
  type ShipValues,
} from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { fillAddressForm } from "Components/__tests__/Utils/addressForm2"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import type { DeepPartial } from "Utils/typeSupport"
import { useTracking } from "react-tracking"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(() => {
    return {
      key: "smarty-api-key",
    }
  }),
}))

const mockTrackEvent = jest.fn()

const mockOnSubmit = jest.fn()
const mockOnAddressVerificationComplete = jest.fn()
const mockScrollIntoView = jest.fn()
let testProps: DeepPartial<FulfillmentDetailsFormProps>
let mockShippingContext: ShippingContextProps

jest.mock("Apps/Order/Routes/Shipping/Hooks/useShippingContext", () => ({
  useShippingContext: () => mockShippingContext,
}))

// Mock relay-connected component
jest.mock("Apps/Order/Routes/Shipping/Components/SavedAddresses", () => ({
  SavedAddresses: () => <div />,
}))

const renderTree = testProps => {
  const wrapper = render(<FulfillmentDetailsForm {...testProps} />)
  return { wrapper }
}

/*
We have to submit the form element manually because the submit button
is on the shipping route main screen
*/
const submitForm = async () => {
  await fireEvent.submit(screen.getByTestId("FulfillmentDetails_form"))
}

beforeEach(() => {
  mockOnSubmit.mockReset()
  mockTrackEvent.mockReset()
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: mockTrackEvent,
  }))
  mockOnAddressVerificationComplete.mockReset()
  testProps = {
    availableFulfillmentTypes: [FulfillmentType.SHIP],
    initialValues: {
      fulfillmentType: FulfillmentType.SHIP,
      attributes: {
        name: "",
        phoneNumber: "",
        addressLine1: "",
        city: "",
        region: "",
        postalCode: "",
        country: "US",
      },
      meta: {},
    },
    onSubmit: mockOnSubmit,
    onAddressVerificationComplete: mockOnAddressVerificationComplete,
    verifyAddressNow: false,
    me: {
      addressConnection: {
        totalCount: 0,
      },
    },
  }
  mockShippingContext = {
    actions: {
      setFulfillmentDetailsFormikContext: jest.fn(),
      goBackToFulfillmentDetails: jest.fn(),
    },
    orderData: {
      shippingQuotes: [],
    },
    meData: { addressList: [] },

    state: {
      shippingFormMode: "saved_addresses",
    },
  } as unknown as ShippingContextProps

  HTMLElement.prototype.scrollIntoView = mockScrollIntoView
})

const addressFormErrors = {
  name: "Full name is required",
  addressLine1: "Street address is required",
  city: "City is required",
  region: "State is required",
  postalCode: "ZIP code is required",
  phoneNumber: "Phone number is required",
}

const validAddress = {
  name: "John Doe",
  country: "US",
  addressLine1: "401 Broadway",
  addressLine2: "Floor 25",
  city: "New York",
  region: "NY",
  postalCode: "10013",
  phoneNumber: "1234567890",
}

describe("FulfillmentDetailsForm", () => {
  describe("Pickup available", () => {
    beforeEach(() => {
      testProps.availableFulfillmentTypes = [
        FulfillmentType.PICKUP,
        FulfillmentType.SHIP,
      ]
    })

    it("shows pickup option", async () => {
      renderTree(testProps)

      expect(screen.getByText("Delivery method")).toBeVisible()
      expect(screen.getByRole("radio", { name: "Shipping" })).toBeVisible()
      expect(
        screen.getByRole("radio", { name: /Arrange for pickup/ }),
      ).toBeVisible()
    })

    it("has phone number field", async () => {
      renderTree(testProps)

      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ }),
      )

      const phoneNumberField = await screen.findByTestId(
        "AddressForm_pickupPhoneNumber",
      )

      expect(phoneNumberField).toBeVisible()
      expect(screen.getByText("*Required")).toBeInTheDocument()
    })

    it("tries to go back to fulfillment details when the user clicks pickup", async () => {
      renderTree(testProps)

      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ }),
      )

      expect(
        mockShippingContext.actions.goBackToFulfillmentDetails,
      ).toHaveBeenCalled()
    })

    it("will not submit without required fields", async () => {
      renderTree(testProps)

      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ }),
      )

      expect(
        screen.getByRole("radio", { name: /Arrange for pickup/ }),
      ).toBeChecked()

      await flushPromiseQueue()

      await submitForm()

      await flushPromiseQueue()

      await waitFor(() => {
        expect(screen.getByText("Phone number is required")).toBeInTheDocument()
      })

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it("calls the submit handler when the user submits a valid form", async () => {
      renderTree(testProps)
      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ }),
      )
      const phoneNumberField = await screen.findByTestId(
        "AddressForm_pickupPhoneNumber",
      )

      await userEvent.type(phoneNumberField, "1234567890")

      // we have to submit the form manually because its submit button is on the shipping route main screen
      await submitForm()
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          {
            fulfillmentType: "PICKUP",
            attributes: {
              name: "",
              phoneNumber: "1234567890",
              city: "",
              region: "",
              postalCode: "",
              country: "",
              addressLine1: "",
              addressLine2: "",
            },
            meta: {},
          },
          expect.anything(),
        )
      })
    })

    it("does not submit an invalid form", async () => {
      renderTree(testProps)
      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ }),
      )

      // we have to submit the form manually because its submit button is on the shipping route main screen
      await submitForm()
      await screen.findByText("Phone number is required")
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it("user can select shipping and see shipping fields", async () => {
      renderTree(testProps)
      await userEvent.click(screen.getByRole("radio", { name: "Shipping" }))

      // find address form fields
      await waitFor(() => {
        expect(screen.getByPlaceholderText("City")).toBeVisible()
      })
    })

    it("user can select shipping if pickup fulfillment is already saved to order", async () => {
      testProps.initialValues!.fulfillmentType = FulfillmentType.PICKUP
      testProps.initialValues!.attributes = {
        name: "John Doe",
        phoneNumber: "1234567890",
        addressLine1: "401 Broadway",
        city: "New York",
        region: "NY",
        postalCode: "10013",
        country: "US",
      }
      renderTree(testProps)

      const shippingRadio: HTMLElement = await screen.findByRole("radio", {
        name: "Shipping",
      })

      await userEvent.click(shippingRadio)
      await waitFor(() => {
        expect(screen.getByPlaceholderText("City")).toBeVisible()
      })
    })
  })

  describe("Pickup not available", () => {
    beforeEach(() => {
      testProps.availableFulfillmentTypes = [FulfillmentType.SHIP]
    })
    describe("User has saved addresses", () => {
      beforeEach(() => {
        testProps.me = {
          addressConnection: {
            edges: [
              {
                node: {
                  id: "123",
                  internalID: "123",
                  name: "John Doe",
                  addressLine1: "401 Broadway",
                  addressLine2: "Floor 25",
                  addressLine3: undefined,
                  city: "New York",
                  region: "NY",
                  postalCode: "10013",
                  phoneNumber: "1234567890",
                  country: "US",
                  isDefault: true,
                },
              },
            ],
          },
        } as any
      })

      it("shows the saved addresses or plain address form depending on the passed prop", async () => {
        mockShippingContext.state.shippingFormMode = "saved_addresses"
        renderTree(testProps)
        // Note - SavedAddresses is mocked out.
        await waitFor(() => {
          expect(screen.getByTestId("savedAddressesCollapse")).toHaveStyle({
            height: "auto",
          })
          expect(screen.getByTestId("addressFormCollapse")).toHaveStyle({
            height: "0px",
          })
        })

        cleanup()

        mockShippingContext.state.shippingFormMode = "new_address"
        renderTree(testProps)
        await waitFor(() => {
          expect(screen.getByTestId("savedAddressesCollapse")).toHaveStyle({
            height: "0px",
          })
          expect(screen.getByTestId("addressFormCollapse")).toHaveStyle({
            height: "auto",
          })
        })
      })
    })

    it("does not show delivery/pickup selector", async () => {
      renderTree(testProps)

      expect(screen.queryByText("Delivery method")).not.toBeInTheDocument()
    })
    describe("form validations", () => {
      it("will not submit without required fields", async () => {
        renderTree(testProps)

        await submitForm()

        await waitFor(() => {
          ;[
            "Full name is required",
            "Street address is required",
            "City is required",
            "State is required",
            "ZIP code is required",
            "Phone number is required",
          ].forEach(error => {
            expect(screen.getByText(error)).toBeInTheDocument()
          })
        })
        expect(mockOnSubmit).not.toHaveBeenCalled()
      })

      it("does not submit an incomplete form", async () => {
        renderTree(testProps)

        await fillAddressForm({ ...validAddress, name: "" })
        await submitForm()

        await waitFor(() => {
          screen.getByText(addressFormErrors.name)
        })
        expect(mockOnSubmit).not.toHaveBeenCalled()
      })

      // // TODO: New custom postal code validator needs to be relaxed to pass this
      it("allows a missing postal code and state/province if the selected country is not US or Canada", async () => {
        renderTree(testProps)

        await fillAddressForm({
          ...validAddress,
          name: "Joelle Van Dyne",
          addressLine1: "401 Broadway",
          addressLine2: "",
          city: "New York",
          region: "",
          postalCode: "",
          phoneNumber: "5555937743",
          country: "AQ",
        })

        await submitForm()

        await waitFor(() => {
          expect(
            screen.queryByText(/[\w\s]is required/),
          ).not.toBeInTheDocument()

          expect(mockOnSubmit).toHaveBeenCalledWith(
            {
              fulfillmentType: "SHIP",
              attributes: {
                name: "Joelle Van Dyne",
                country: "AQ",
                addressLine1: "401 Broadway",
                city: "New York",
                region: "",
                postalCode: "",
                phoneNumber: "5555937743",
              },
              meta: {},
            },
            expect.anything(),
          )
        })
      })

      it("only shows validation errors on touched inputs before submission", async () => {
        renderTree(testProps)

        const name = screen.getByPlaceholderText("Full name")
        userEvent.type(name, "First Last")
        userEvent.clear(name)
        userEvent.tab()

        await waitFor(async () => {
          expect(
            screen.queryAllByText(/is required/).map(el => el.textContent),
          ).toEqual(["Full name is required"])
        })
      })
    })

    describe("US form", () => {
      beforeEach(() => {
        ;(testProps.initialValues as ShipValues).attributes.country = "US"
      })

      it("shows all address fields, including US-specific fields", async () => {
        renderTree(testProps)

        await waitFor(() => {
          const line1Input = screen.getByPlaceholderText("Street address")
          expect(line1Input).toBeEnabled()
        })
        screen.getByPlaceholderText("Full name")
        screen.getByTestId("AddressForm_country")
        screen.getByPlaceholderText("Street address")
        screen.getByPlaceholderText("Apt, floor, suite, etc.")
        screen.getByPlaceholderText("City")
        screen.getByPlaceholderText("State")
        screen.getByPlaceholderText("ZIP code")
        screen.getAllByPlaceholderText(
          "Add phone number including country code",
        )[0]
      })

      it("calls the submit handler when the user submits a valid form", async () => {
        renderTree(testProps)
        await waitFor(() => {
          const line1Input = screen.getByPlaceholderText("Street address")
          expect(line1Input).toBeEnabled()
        })

        await fillAddressForm(validAddress)

        await submitForm()

        await waitFor(() => {
          expect(mockOnSubmit).toHaveBeenCalledWith(
            {
              fulfillmentType: "SHIP",
              attributes: {
                name: validAddress.name,
                country: validAddress.country,
                addressLine1: validAddress.addressLine1,
                addressLine2: validAddress.addressLine2,
                city: validAddress.city,
                region: validAddress.region,
                postalCode: validAddress.postalCode,
                phoneNumber: validAddress.phoneNumber,
              },
              meta: {},
            },
            expect.anything(),
          )
        })
      })
    })
  })

  describe("Address autocomplete", () => {
    let mockFetch: jest.Mock

    beforeAll(() => {
      ;(useFlag as jest.Mock).mockImplementation(
        featureName => featureName === "address_autocomplete_us",
      )
    })

    beforeEach(() => {
      mockFetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          suggestions: [
            {
              city: "New York",
              entries: 2,
              secondary: "Fl 25",
              state: "NY",
              street_line: "401 Broadway",
              zipcode: "10013",
            },
          ],
        }),
      })

      global.fetch = mockFetch
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("tries to go back to fulfillment details when the user selects an autocomplete address", async () => {
      renderTree(testProps)
      await waitFor(async () => {
        const line1Input = screen.getByPlaceholderText("Street address")
        expect(line1Input).toBeEnabled()
      })
      await userEvent.paste(
        screen.getByPlaceholderText("Street address"),
        "401 Broadway",
      )

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      const option = within(dropdown).getByText(
        "401 Broadway, New York NY 10013",
      )

      await userEvent.click(option)
      await flushPromiseQueue()

      expect(
        mockShippingContext.actions.goBackToFulfillmentDetails,
      ).toHaveBeenCalled()
    })

    it("tracks when a user selects an address", async () => {
      renderTree(testProps)
      await waitFor(async () => {
        const line1Input = screen.getByPlaceholderText("Street address")
        expect(line1Input).toBeEnabled()
      })
      await userEvent.paste(
        screen.getByPlaceholderText("Street address"),
        "401 Broadway",
      )

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      const option = within(dropdown).getByText(
        "401 Broadway, New York NY 10013",
      )

      await userEvent.click(option)
      await flushPromiseQueue()

      expect(mockTrackEvent).toHaveBeenCalledTimes(2)

      expect(mockTrackEvent).toHaveBeenNthCalledWith(1, {
        action: "addressAutoCompletionResult",
        context_module: "ordersShipping",
        context_owner_id: "",
        context_owner_type: "orders-shipping",
        input: "401 Broadway",
        suggested_addresses_results: 1,
      })
      expect(mockTrackEvent).toHaveBeenNthCalledWith(2, {
        action: "selectedItemFromAddressAutoCompletion",
        context_module: "ordersShipping",
        context_owner_id: "",
        context_owner_type: "orders-shipping",
        input: "401 Broadway",
        item: "401 Broadway, New York NY 10013",
      })
    })
  })
})
