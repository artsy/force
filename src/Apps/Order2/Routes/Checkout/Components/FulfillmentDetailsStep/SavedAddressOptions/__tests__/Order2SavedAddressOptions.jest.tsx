import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import { Formik } from "formik"
import type { ProcessedUserAddress } from "../../utils"
import { SavedAddressOptions } from "../Order2SavedAddressOptions"

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")

let mockCheckoutContext: ReturnType<typeof useCheckoutContext>

const mockUseCheckoutContext = useCheckoutContext as jest.MockedFunction<
  typeof useCheckoutContext
>

const mockUSAddress1: ProcessedUserAddress = {
  internalID: "address-id-123",
  phoneNumber: "555-1234",
  phoneNumberCountryCode: "+1",
  isValid: true,
  isShippable: true,
  isDefault: true,
  address: {
    name: "John Doe",
    addressLine1: "123 Main St",
    addressLine2: "Apt 4B",
    city: "New York",
    region: "NY",
    postalCode: "10001",
    country: "US",
  },
  phoneNumberParsed: {
    display: "+1 555-1234",
  },
}

const mockUSAddress2: ProcessedUserAddress = {
  internalID: "address-id-456",
  phoneNumber: "555-5678",
  phoneNumberCountryCode: "+1",
  isValid: true,
  isShippable: true,
  isDefault: false,
  address: {
    name: "Jane Smith",
    addressLine1: "456 Oak Ave",
    addressLine2: "",
    city: "Boston",
    region: "MA",
    postalCode: "02101",
    country: "US",
  },
  phoneNumberParsed: {
    display: "+1 555-5678",
  },
}

const mockInvalidAddress: ProcessedUserAddress = {
  internalID: "address-id-789",
  phoneNumber: "555-9999",
  phoneNumberCountryCode: "+1",
  isValid: false,
  isShippable: true,
  isDefault: false,
  address: {
    name: "Invalid Address",
    addressLine1: "789 Invalid St",
    addressLine2: "",
    city: "Invalid City",
    region: "XX",
    postalCode: "99999",
    country: "XX",
  },
  phoneNumberParsed: {
    display: "+1 555-9999",
  },
}

const mockUnshippableAddress: ProcessedUserAddress = {
  internalID: "address-id-789",
  phoneNumber: "555-9999",
  phoneNumberCountryCode: "+1",
  isValid: true,
  isShippable: false,
  isDefault: false,
  address: {
    name: "Invalid Address",
    addressLine1: "789 Invalid St",
    addressLine2: "",
    city: "Invalid City",
    region: "XX",
    postalCode: "99999",
    country: "XX",
  },
  phoneNumberParsed: {
    display: "+1 555-9999",
  },
}

const mockNewAddressInitialValues: FormikContextWithAddress = {
  phoneNumber: "",
  phoneNumberCountryCode: "+1",
  address: {
    name: "",
    country: "US",
    postalCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
  },
}

const TestWrapper = ({
  children,
  initialValues = mockUSAddress1,
}: {
  children: React.ReactNode
  initialValues?: FormikContextWithAddress
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={jest.fn()}
      validateOnChange
      validateOnBlur
    >
      {children}
    </Formik>
  )
}

describe("SavedAddressOptions", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockCheckoutContext = {
      setUserAddressMode: jest.fn(),
      userAddressMode: null,
      setStepErrorMessage: jest.fn(),
      checkoutTracking: {
        clickedShippingAddress: jest.fn(),
      },
    } as any

    mockUseCheckoutContext.mockReturnValue(mockCheckoutContext)
  })

  describe("Address list rendering", () => {
    it("displays address details correctly", () => {
      const onSelectAddress = jest.fn()

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
          />
        </TestWrapper>,
      )

      expect(screen.getByText("123 Main St")).toBeInTheDocument()
      expect(screen.getByText("Apt 4B")).toBeInTheDocument()
      expect(screen.getByText("New York, NY, 10001")).toBeInTheDocument()
      expect(screen.getByText("United States")).toBeInTheDocument()
      expect(screen.getByText("+1 555-1234")).toBeInTheDocument()
    })

    it("renders multiple addresses", () => {
      const onSelectAddress = jest.fn()

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1, mockUSAddress2]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
          />
        </TestWrapper>,
      )

      expect(screen.getByText("John Doe")).toBeInTheDocument()
      expect(screen.getByText("Jane Smith")).toBeInTheDocument()
    })
  })

  describe("Address selection", () => {
    it("tracks onSelectAddress when clicking an address", async () => {
      const onSelectAddress = jest.fn()

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1, mockUSAddress2]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
          />
        </TestWrapper>,
      )

      const secondAddress = screen.getByRole("radio", { name: /Jane Smith/i })
      await userEvent.click(secondAddress)

      await waitFor(() => {
        expect(onSelectAddress).toHaveBeenCalledWith(mockUSAddress2)
      })
    })

    it("tracks shipping address click", async () => {
      const onSelectAddress = jest.fn()

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1, mockUSAddress2]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
          />
        </TestWrapper>,
      )

      const secondAddress = screen.getByRole("radio", { name: /Jane Smith/i })
      await userEvent.click(secondAddress)

      expect(
        mockCheckoutContext.checkoutTracking.clickedShippingAddress,
      ).toHaveBeenCalled()
    })
  })

  describe("Error handling", () => {
    it("displays error banner when selecting an invalid address", async () => {
      const onSelectAddress = jest.fn()

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1, mockInvalidAddress]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
          />
        </TestWrapper>,
      )

      const invalidAddress = screen.getByRole("radio", {
        name: /Invalid Address/i,
      })
      await userEvent.click(invalidAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setStepErrorMessage).toHaveBeenCalledWith({
          step: CheckoutStepName.FULFILLMENT_DETAILS,
          error: {
            title: "Invalid address",
            message:
              "This address is missing required information. Edit your address to continue.",
          },
        })
      })
    })

    it("displays error banner when selecting an unshippable address", async () => {
      const onSelectAddress = jest.fn()

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1, mockUnshippableAddress]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
          />
        </TestWrapper>,
      )

      const unshippableAddress = screen.getByRole("radio", {
        name: /Invalid Address/i,
      })
      await userEvent.click(unshippableAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setStepErrorMessage).toHaveBeenCalledWith({
          step: CheckoutStepName.FULFILLMENT_DETAILS,
          error: {
            title: "Unable to ship to this address",
            message: "Select a different address or add a new one to continue.",
          },
        })
      })
    })

    it("clears error banner when selecting a valid and shippable address", async () => {
      const onSelectAddress = jest.fn()

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1, mockUSAddress2]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
          />
        </TestWrapper>,
      )

      const validAddress = screen.getByRole("radio", { name: /Jane Smith/i })
      await userEvent.click(validAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setStepErrorMessage).toHaveBeenCalledWith({
          step: CheckoutStepName.FULFILLMENT_DETAILS,
          error: null,
        })
      })
    })
  })

  describe("Address editing validation", () => {
    it("re-validates address after editing and clears error if now valid", async () => {
      const onSelectAddress = jest.fn()
      const mockInvalidAddressWithMissingCity: ProcessedUserAddress = {
        ...mockInvalidAddress,
        address: {
          ...mockInvalidAddress.address,
          name: "Test User",
          country: "US",
          addressLine1: "123 Test St",
          city: "",
          region: "CA",
          postalCode: "90210",
        },
        isValid: false,
        isShippable: true,
      }

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1, mockInvalidAddressWithMissingCity]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
          />
        </TestWrapper>,
      )

      const invalidAddress = screen.getByRole("radio", {
        name: /Test User/i,
      })
      await userEvent.click(invalidAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setStepErrorMessage).toHaveBeenCalledWith({
          step: CheckoutStepName.FULFILLMENT_DETAILS,
          error: {
            title: "Invalid address",
            message:
              "This address is missing required information. Edit your address to continue.",
          },
        })
      })

      const updatedValidAddress: FormikContextWithAddress = {
        ...mockInvalidAddressWithMissingCity,
        address: {
          ...mockInvalidAddressWithMissingCity.address,
          city: "Los Angeles",
        },
      }

      const mockUpdatedAddress: ProcessedUserAddress = {
        ...mockInvalidAddressWithMissingCity,
        ...updatedValidAddress,
        isValid: true,
      }

      const mockOnSaveAddress = jest.fn(async (values, addressID) => {
        await onSelectAddress(values)

        const address = mockUpdatedAddress

        if (address) {
          const { isShippable, isValid } = address

          if (isShippable && isValid) {
            mockCheckoutContext.setStepErrorMessage({
              step: CheckoutStepName.FULFILLMENT_DETAILS,
              error: null,
            })
          }
        }
      })

      await mockOnSaveAddress(
        updatedValidAddress,
        mockInvalidAddressWithMissingCity.internalID,
      )

      expect(mockCheckoutContext.setStepErrorMessage).toHaveBeenLastCalledWith({
        step: CheckoutStepName.FULFILLMENT_DETAILS,
        error: null,
      })
    })

    it("shows error when editing a valid address to make it invalid", async () => {
      const onSelectAddress = jest.fn()

      render(
        <TestWrapper>
          <SavedAddressOptions
            savedAddresses={[mockUSAddress1]}
            initialSelectedAddress={mockUSAddress1}
            onSelectAddress={onSelectAddress}
            newAddressInitialValues={mockNewAddressInitialValues}
            availableShippingCountries={["US"]}
          />
        </TestWrapper>,
      )

      expect(mockCheckoutContext.setStepErrorMessage).not.toHaveBeenCalled()

      const updatedInvalidAddress: FormikContextWithAddress = {
        ...mockUSAddress1,
        address: {
          ...mockUSAddress1.address,
          city: "",
        },
      }

      const mockOnSaveAddress = jest.fn(async values => {
        await onSelectAddress(values)

        const isValid =
          !!values.address.name &&
          !!values.address.country &&
          !!values.address.addressLine1 &&
          !!values.address.city &&
          !!values.phoneNumber &&
          !!values.phoneNumberCountryCode

        const isShippable = ["US"].includes(values.address.country)

        if (!isShippable) {
          mockCheckoutContext.setStepErrorMessage({
            step: CheckoutStepName.FULFILLMENT_DETAILS,
            error: {
              title: "Unable to ship to this address",
              message:
                "Select a different address or add a new one to continue.",
            },
          })
        } else if (!isValid) {
          mockCheckoutContext.setStepErrorMessage({
            step: CheckoutStepName.FULFILLMENT_DETAILS,
            error: {
              title: "Invalid address",
              message:
                "This address is missing required information. Edit your address to continue.",
            },
          })
        } else {
          mockCheckoutContext.setStepErrorMessage({
            step: CheckoutStepName.FULFILLMENT_DETAILS,
            error: null,
          })
        }
      })

      await mockOnSaveAddress(updatedInvalidAddress)

      expect(mockCheckoutContext.setStepErrorMessage).toHaveBeenLastCalledWith({
        step: CheckoutStepName.FULFILLMENT_DETAILS,
        error: {
          title: "Invalid address",
          message:
            "This address is missing required information. Edit your address to continue.",
        },
      })
    })
  })
})
