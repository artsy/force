import { screen, render, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  FulfillmentDetailsForm,
  FulfillmentDetailsFormProps,
} from "Apps/Order/Routes/Shipping2/FulfillmentDetailsForm"
import { ShippingContextProps } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { FulfillmentType } from "Apps/Order/Routes/Shipping2/shippingUtils"

const mockOnSubmit = jest.fn()
const mockOnAddressVerificationComplete = jest.fn()
let testProps: FulfillmentDetailsFormProps
let mockShippingContext: ShippingContextProps

jest.mock("Apps/Order/Routes/Shipping2/ShippingContext", () => ({
  useShippingContext: () => mockShippingContext,
}))

// Mock relay-connected component
jest.mock("Apps/Order/Routes/Shipping2/SavedAddresses2", () => ({
  SavedAddressesFragmentContainer: () => <div />,
}))

beforeEach(() => {
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
    computedOrderData: {
      isArtsyShipping: false,
      shippingQuotes: [],
    },
  } as any
})

const renderTree = testProps => {
  const wrapper = render(<FulfillmentDetailsForm {...testProps} />)
  return { wrapper }
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
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      ).toBeVisible()
    })
    it("has a full name field", async () => {
      renderTree(testProps)
      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      )
      let fullNameField
      let phoneNumberField
      await waitFor(() => {
        fullNameField = screen.getByPlaceholderText("Full name")
        phoneNumberField = screen.getByPlaceholderText(
          "Add phone number including country code"
        )
        expect(fullNameField).toBeVisible()
        expect(phoneNumberField).toBeVisible()
      })
      expect(screen.getByText("Required for pickup logistics")).toBeVisible()

      await userEvent.paste(fullNameField, "John Doe")
      await userEvent.paste(phoneNumberField, "1234567890")
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
    it.todo("has a phone number field")
  })
})
