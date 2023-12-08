import {
  screen,
  render,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  FulfillmentDetailsForm,
  FulfillmentDetailsFormProps,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetailsForm"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"
import {
  FulfillmentType,
  ShipValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useTracking } from "react-tracking"

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(() => {
    return {
      key: "smarty-api-key",
    }
  }),
}))

const mockTrackEvent = jest.fn()

jest.mock("react-tracking")

const mockOnSubmit = jest.fn()
const mockOnAddressVerificationComplete = jest.fn()
let testProps: FulfillmentDetailsFormProps
let mockShippingContext: ShippingContextProps

jest.mock("Apps/Order/Routes/Shipping2/Hooks/useShippingContext", () => ({
  useShippingContext: () => mockShippingContext,
}))

// Mock relay-connected component
jest.mock("Apps/Order/Routes/Shipping2/SavedAddresses2", () => ({
  SavedAddressesFragmentContainer: () => <div />,
}))

const renderTree = testProps => {
  const wrapper = render(<FulfillmentDetailsForm {...testProps} />)
  return { wrapper }
}

beforeEach(() => {
  mockOnSubmit.mockReset()
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: mockTrackEvent,
  }))
  mockOnAddressVerificationComplete.mockReset()
  testProps = {
    forceNewAddressFormMode: false,
    availableFulfillmentTypes: [FulfillmentType.SHIP],
    initialValues: {
      fulfillmentType: "SHIP",
      attributes: {
        country: "US",
      },
    } as any,
    onSubmit: mockOnSubmit,
    onAddressVerificationComplete: mockOnAddressVerificationComplete,
    verifyAddressNow: false,
    me: {
      addressConnection: {
        edges: [],
      },
    } as any,
  }
  mockShippingContext = {
    parsedOrderData: {
      isArtsyShipping: false,
      shippingQuotes: [],
    },

    helpers: {
      fulfillmentDetails: {
        setFulfillmentFormHelpers: jest.fn(),
      },
    },
  } as any
})

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
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      ).toBeVisible()
    })

    it("has name and phone number fields", async () => {
      renderTree(testProps)
      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      )
      const fullNameField = await screen.findByPlaceholderText("Full name")
      const phoneNumberField = await screen.findByPlaceholderText(
        "Add phone number including country code"
      )

      expect(fullNameField).toBeVisible()
      expect(phoneNumberField).toBeVisible()
      expect(
        screen.getByText("Required for pickup logistics")
      ).toBeInTheDocument()
    })

    it("sends the values when the user submits a valid form", async () => {
      renderTree(testProps)
      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      )
      const fullNameField = await screen.findByPlaceholderText("Full name")
      const phoneNumberField = await screen.findByPlaceholderText(
        "Add phone number including country code"
      )

      await userEvent.type(fullNameField, "John Doe")
      await userEvent.type(phoneNumberField, "1234567890")

      // we have to submit the form manually because its submit button is on the shipping route main screen
      await fireEvent.submit(screen.getByTestId("FulfillmentDetails_form"))
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          {
            fulfillmentType: "PICKUP",
            attributes: {
              name: "John Doe",
              phoneNumber: "1234567890",
            },
          },
          expect.anything()
        )
      })
    })

    it("does not submit an invalid form", async () => {
      renderTree(testProps)
      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      )

      // we have to submit the form manually because its submit button is on the shipping route main screen
      await fireEvent.submit(screen.getByTestId("FulfillmentDetails_form"))
      await screen.findByText("Full name is required")
      await screen.findByText("Phone number is required")
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it.todo("user can select shipping and fill out form")
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

      it("shows the saved addresses", async () => {
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
      })
    })

    it("does not show delivery/pickup selector", async () => {
      renderTree(testProps)

      expect(screen.queryByText("Delivery method")).not.toBeInTheDocument()
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
          "Add phone number including country code"
        )[0]
      })

      it("sends the values when the user submits a valid form", async () => {
        renderTree(testProps)
        await waitFor(() => {
          const line1Input = screen.getByPlaceholderText("Street address")
          expect(line1Input).toBeEnabled()
        })
        const address = {
          name: "John Doe",
          country: "US",
          addressLine1: "401 Broadway",
          addressLine2: "Floor 25",
          city: "New York",
          region: "NY",
          postalCode: "10013",
          phoneNumber: "1234567890",
        }
        const name = screen.getByPlaceholderText("Full name")
        const country = screen.getByTestId("AddressForm_country")
        const addressLine1 = screen.getByPlaceholderText("Street address")
        const addressLine2 = screen.getByPlaceholderText(
          "Apt, floor, suite, etc."
        )
        const city = screen.getByPlaceholderText("City")
        const region = screen.getByPlaceholderText("State")
        const postalCode = screen.getByPlaceholderText("ZIP code")
        const phoneNumber = screen.getAllByPlaceholderText(
          "Add phone number including country code"
        )[0]

        await userEvent.paste(name, address.name)
        await userEvent.selectOptions(country, [address.country])
        await userEvent.paste(addressLine1, address.addressLine1)
        await userEvent.paste(addressLine2, address.addressLine2)
        await userEvent.paste(city, address.city)
        await userEvent.paste(region, address.region)
        await userEvent.paste(postalCode, address.postalCode)
        await userEvent.paste(phoneNumber, address.phoneNumber)

        await fireEvent.submit(screen.getByTestId("FulfillmentDetails_form"))

        await waitFor(() => {
          expect(mockOnSubmit).toHaveBeenCalledWith(
            {
              fulfillmentType: "SHIP",
              attributes: {
                name: address.name,
                country: address.country,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                city: address.city,
                region: address.region,
                postalCode: address.postalCode,
                phoneNumber: address.phoneNumber,
              },
            },
            expect.anything()
          )
        })
      })
    })
  })
  describe("Address autocomplete", () => {
    let mockFetch: jest.Mock
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
      ;(useFeatureFlag as jest.Mock).mockImplementation(
        featureName => featureName === "address_autocomplete_us"
      )
    })

    it("tracks when a user selects an address and the first time they edit it", async () => {
      renderTree(testProps)
      await waitFor(async () => {
        const line1Input = screen.getByPlaceholderText("Street address")
        expect(line1Input).toBeEnabled()
      })
      await userEvent.paste(
        screen.getByPlaceholderText("Street address"),
        "401 Broadway"
      )

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      const option = within(dropdown).getByText(
        "401 Broadway, New York NY 10013"
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
      mockTrackEvent.mockClear()

      // Make 2 edits to the address; track the 1st
      const line2Input = screen.getByPlaceholderText("Apt, floor, suite, etc.")
      await userEvent.type(line2Input, "Floor 25")

      const postalCode = screen.getByPlaceholderText("ZIP code")
      await userEvent.type(postalCode, "-4456")

      await flushPromiseQueue()
      expect(mockTrackEvent).toHaveBeenCalledTimes(1)
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "editedAutocompletedAddress",
        context_module: "ordersShipping",
        context_owner_id: "",
        context_owner_type: "orders-shipping",
        field: "addressLine2",
      })
    })
  })
})
