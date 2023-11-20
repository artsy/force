import { screen, render, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ShipValues } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import {
  FulfillmentDetailsForm,
  FulfillmentDetailsFormProps,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetailsForm"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/Utils/ShippingContext"
import { FulfillmentType } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"

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
  mockOnAddressVerificationComplete.mockReset()
  testProps = {
    availableFulfillmentTypes: [FulfillmentType.SHIP],
    initialValues: {
      fulfillmentType: "SHIP",
      attributes: {
        country: "US",
      },
    } as any, // todo
    onSubmit: mockOnSubmit,
    onAddressVerificationComplete: mockOnAddressVerificationComplete,
    verifyAddressNow: false,
    me: {
      addressConnection: {
        edges: [],
      },
    } as any, // todo: get rid of relay dependency
  }
  mockShippingContext = {
    parsedOrderData: {
      isArtsyShipping: false,
      shippingQuotes: [],
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
  })
  describe("Pickup not available", () => {
    beforeEach(() => {
      testProps.availableFulfillmentTypes = [FulfillmentType.SHIP]
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
})
