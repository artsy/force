import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import { Formik } from "formik"
import type { ProcessedUserAddress } from "../../utils"
import { SavedAddressOptions } from "../Order2SavedAddressOptions"

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")

jest.mock("../UpdateAddressForm", () => ({
  UpdateAddressForm: ({
    onDeleteAddress,
    address,
  }: {
    onDeleteAddress: (id: string) => Promise<void>
    address: ProcessedUserAddress
  }) => (
    <button type="button" onClick={() => onDeleteAddress(address.internalID)}>
      Delete address
    </button>
  ),
}))

let mockCheckoutContext: ReturnType<typeof useCheckoutContext>
let onSelectAddress: jest.Mock
let onSelectInvalidAddress: jest.Mock

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
    isValid: true,
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
    isValid: true,
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
    isValid: true,
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
    name: "Unshippable Address",
    addressLine1: "789 Invalid St",
    addressLine2: "",
    city: "Invalid City",
    region: "XX",
    postalCode: "99999",
    country: "XX",
  },
  phoneNumberParsed: {
    display: "+1 555-9999",
    isValid: true,
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

type SavedAddressOptionsProps = React.ComponentProps<typeof SavedAddressOptions>

const renderSavedAddressOptions = (
  props: Partial<SavedAddressOptionsProps> = {},
) => {
  return render(
    <TestWrapper>
      <SavedAddressOptions
        hasDeliveryAddress={true}
        savedAddresses={[mockUSAddress1, mockUSAddress2]}
        initialSelectedAddress={mockUSAddress1}
        onSelectAddress={onSelectAddress}
        onSelectInvalidAddress={onSelectInvalidAddress}
        newAddressInitialValues={mockNewAddressInitialValues}
        {...props}
      />
    </TestWrapper>,
  )
}

describe("SavedAddressOptions", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    onSelectAddress = jest.fn()
    onSelectInvalidAddress = jest.fn()

    mockCheckoutContext = {
      setUserAddressMode: jest.fn(),
      userAddressMode: null,
      setSectionErrorMessage: jest.fn(),
      checkoutTracking: {
        clickedShippingAddress: jest.fn(),
        savedAddressViewed: jest.fn(),
        clickedAddNewShippingAddress: jest.fn(),
      },
      steps: [
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
      ],
      isInitialAutoSaveComplete: true,
      setInitialAutoSaveComplete: jest.fn(),
    } as any

    mockUseCheckoutContext.mockReturnValue(mockCheckoutContext)
  })

  describe("Address list rendering", () => {
    it("displays address details correctly", () => {
      renderSavedAddressOptions({ savedAddresses: [mockUSAddress1] })

      expect(screen.getByText("123 Main St")).toBeInTheDocument()
      expect(screen.getByText("Apt 4B")).toBeInTheDocument()
      expect(screen.getByText("New York, NY 10001")).toBeInTheDocument()
      expect(screen.getByText("United States")).toBeInTheDocument()
      expect(screen.getByText("+1 555-1234")).toBeInTheDocument()
    })

    it("renders multiple addresses", () => {
      renderSavedAddressOptions()

      expect(screen.getByText("John Doe")).toBeInTheDocument()
      expect(screen.getByText("Jane Smith")).toBeInTheDocument()
    })
  })

  describe("Address selection", () => {
    it("tracks onSelectAddress when clicking an address", async () => {
      renderSavedAddressOptions()

      const secondAddress = screen.getByRole("radio", { name: /Jane Smith/i })
      await userEvent.click(secondAddress)

      await waitFor(() => {
        expect(onSelectAddress).toHaveBeenCalledWith(mockUSAddress2)
      })
    })

    it("tracks shipping address click", async () => {
      renderSavedAddressOptions()

      const secondAddress = screen.getByRole("radio", { name: /Jane Smith/i })
      await userEvent.click(secondAddress)

      expect(
        mockCheckoutContext.checkoutTracking.clickedShippingAddress,
      ).toHaveBeenCalled()
    })
  })

  describe("Error handling", () => {
    it("displays error banner when selecting an invalid address", async () => {
      renderSavedAddressOptions({
        savedAddresses: [mockUSAddress1, mockInvalidAddress],
      })

      const invalidAddress = screen.getByRole("radio", {
        name: /Invalid Address/i,
      })
      await userEvent.click(invalidAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setSectionErrorMessage).toHaveBeenCalledWith(
          {
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: {
              title: "Missing required information",
              message: "Edit your address and/or phone number to continue.",
            },
          },
        )
      })

      expect(onSelectInvalidAddress).toHaveBeenCalled()
      expect(onSelectAddress).not.toHaveBeenCalled()
    })

    it("displays error banner when selecting an unshippable address in non-OFFER mode", async () => {
      mockUseCheckoutContext.mockReturnValue({
        ...mockCheckoutContext,
        orderData: { mode: "BUY" },
      })

      renderSavedAddressOptions({
        savedAddresses: [mockUSAddress1, mockUnshippableAddress],
      })

      const unshippableAddress = screen.getByRole("radio", {
        name: /Unshippable Address/i,
      })
      await userEvent.click(unshippableAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setSectionErrorMessage).toHaveBeenCalledWith(
          {
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: {
              title: "Unable to ship to this address",
              message:
                "Select a different address or add a new one to continue.",
            },
          },
        )
      })

      expect(onSelectInvalidAddress).toHaveBeenCalled()
      expect(onSelectAddress).not.toHaveBeenCalled()
    })

    it("does not display error banner when selecting an unshippable address in OFFER mode", async () => {
      mockUseCheckoutContext.mockReturnValue({
        ...mockCheckoutContext,
        orderData: { mode: "OFFER" },
      })

      renderSavedAddressOptions({
        savedAddresses: [mockUSAddress1, mockUnshippableAddress],
      })

      const unshippableAddress = screen.getByRole("radio", {
        name: /Unshippable Address/i,
      })
      await userEvent.click(unshippableAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setSectionErrorMessage).toHaveBeenCalledWith(
          {
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: null,
          },
        )
      })

      expect(onSelectAddress).toHaveBeenCalledWith(mockUnshippableAddress)
      expect(onSelectInvalidAddress).not.toHaveBeenCalled()
    })

    it("clears error banner when selecting a valid and shippable address", async () => {
      renderSavedAddressOptions()

      const validAddress = screen.getByRole("radio", { name: /Jane Smith/i })
      await userEvent.click(validAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setSectionErrorMessage).toHaveBeenCalledWith(
          {
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: null,
          },
        )
      })
    })
  })

  describe("Address editing validation", () => {
    it("re-validates address after editing and clears error if now valid", async () => {
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

      renderSavedAddressOptions({
        savedAddresses: [mockUSAddress1, mockInvalidAddressWithMissingCity],
      })

      const invalidAddress = screen.getByRole("radio", {
        name: /Test User/i,
      })
      await userEvent.click(invalidAddress)

      await waitFor(() => {
        expect(mockCheckoutContext.setSectionErrorMessage).toHaveBeenCalledWith(
          {
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: {
              title: "Missing required information",
              message: "Edit your address and/or phone number to continue.",
            },
          },
        )
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
            mockCheckoutContext.setSectionErrorMessage({
              section: CheckoutStepName.FULFILLMENT_DETAILS,
              error: null,
            })
          }
        }
      })

      await mockOnSaveAddress(
        updatedValidAddress,
        mockInvalidAddressWithMissingCity.internalID,
      )

      expect(
        mockCheckoutContext.setSectionErrorMessage,
      ).toHaveBeenLastCalledWith({
        section: CheckoutStepName.FULFILLMENT_DETAILS,
        error: null,
      })
    })

    it("shows error when editing a valid address to make it invalid", async () => {
      renderSavedAddressOptions({
        savedAddresses: [mockUSAddress1],
        availableShippingCountries: ["US"],
      })

      // The validation effect fires on mount with error: null for the valid address
      await waitFor(() => {
        expect(mockCheckoutContext.setSectionErrorMessage).toHaveBeenCalledWith(
          {
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: null,
          },
        )
      })

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
          mockCheckoutContext.setSectionErrorMessage({
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: {
              title: "Unable to ship to this address",
              message:
                "Select a different address or add a new one to continue.",
            },
          })
        } else if (!isValid) {
          mockCheckoutContext.setSectionErrorMessage({
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: {
              title: "Missing required information",
              message: "Edit your address and/or phone number to continue.",
            },
          })
        } else {
          mockCheckoutContext.setSectionErrorMessage({
            section: CheckoutStepName.FULFILLMENT_DETAILS,
            error: null,
          })
        }
      })

      await mockOnSaveAddress(updatedInvalidAddress)

      expect(
        mockCheckoutContext.setSectionErrorMessage,
      ).toHaveBeenLastCalledWith({
        section: CheckoutStepName.FULFILLMENT_DETAILS,
        error: {
          title: "Missing required information",
          message: "Edit your address and/or phone number to continue.",
        },
      })
    })
  })

  describe("Single saved address behavior", () => {
    it("opens edit form on mount for single invalid address", async () => {
      const mockSingleInvalidAddress: ProcessedUserAddress = {
        ...mockUSAddress1,
        isValid: false,
        address: { ...mockUSAddress1.address, city: "" },
      }

      renderSavedAddressOptions({
        savedAddresses: [mockSingleInvalidAddress],
        initialSelectedAddress: mockSingleInvalidAddress,
      })

      await waitFor(() => {
        expect(mockCheckoutContext.setUserAddressMode).toHaveBeenCalledWith({
          mode: "edit",
          address: mockSingleInvalidAddress,
        })
      })
    })

    it("does not open edit form on mount for single valid address", async () => {
      renderSavedAddressOptions({ savedAddresses: [mockUSAddress1] })

      await waitFor(() => {
        expect(mockCheckoutContext.setUserAddressMode).not.toHaveBeenCalledWith(
          expect.objectContaining({ mode: "edit" }),
        )
      })
    })
  })

  describe("Auto-save on mount when no fulfillment details", () => {
    it("calls onSelectAddress with the first valid address on mount", async () => {
      renderSavedAddressOptions({ hasDeliveryAddress: false })

      await waitFor(() => {
        expect(onSelectAddress).toHaveBeenCalledWith(mockUSAddress1)
      })
      expect(onSelectAddress).toHaveBeenCalledTimes(1)
    })

    it("calls onSelectInvalidAddress on mount when no shippable+valid address is available", async () => {
      const unshippable = {
        ...mockUSAddress1,
        internalID: "unshippable",
        isShippable: false,
      }

      renderSavedAddressOptions({
        hasDeliveryAddress: false,
        savedAddresses: [unshippable],
        initialSelectedAddress: unshippable,
      })

      await waitFor(() => {
        expect(onSelectInvalidAddress).toHaveBeenCalled()
      })
      expect(onSelectAddress).not.toHaveBeenCalled()
    })

    it("skips unshippable addresses and selects the first valid shippable one", async () => {
      const unshippable = {
        ...mockUSAddress1,
        internalID: "unshippable",
        isShippable: false,
      }

      renderSavedAddressOptions({
        hasDeliveryAddress: false,
        savedAddresses: [unshippable, mockUSAddress2],
        initialSelectedAddress: unshippable,
      })

      await waitFor(() => {
        expect(onSelectAddress).toHaveBeenCalledWith(mockUSAddress2)
      })
    })

    it("does not auto-save when fulfillment details already exist", async () => {
      renderSavedAddressOptions()

      await new Promise(resolve => setTimeout(resolve, 50))
      expect(onSelectAddress).not.toHaveBeenCalled()
    })

    it("does not auto-save when the step is not yet ACTIVE (e.g. UPCOMING in offer flow)", async () => {
      mockUseCheckoutContext.mockReturnValue({
        ...mockCheckoutContext,
        steps: [
          {
            name: CheckoutStepName.FULFILLMENT_DETAILS,
            state: CheckoutStepState.UPCOMING,
          },
        ],
      })

      renderSavedAddressOptions({ hasDeliveryAddress: false })

      await new Promise(resolve => setTimeout(resolve, 50))
      expect(onSelectAddress).not.toHaveBeenCalled()
    })
  })

  describe("Address deletion", () => {
    const mockUSAddress3: ProcessedUserAddress = {
      internalID: "address-id-abc",
      phoneNumber: "555-1111",
      phoneNumberCountryCode: "+1",
      isValid: true,
      isShippable: true,
      isDefault: false,
      address: {
        name: "Alice Johnson",
        addressLine1: "789 Pine Rd",
        addressLine2: "",
        city: "Chicago",
        region: "IL",
        postalCode: "60601",
        country: "US",
      },
      phoneNumberParsed: {
        display: "+1 555-1111",
        isValid: true,
      },
    }

    it("preserves the selected address when a different address is deleted", async () => {
      mockUseCheckoutContext.mockReturnValue({
        ...mockCheckoutContext,
        userAddressMode: { mode: "edit", address: mockUSAddress3 },
      })

      renderSavedAddressOptions({
        savedAddresses: [mockUSAddress1, mockUSAddress2, mockUSAddress3],
        initialSelectedAddress: mockUSAddress2,
      })

      await userEvent.click(
        screen.getByRole("button", { name: /Delete address/i }),
      )

      expect(onSelectAddress).not.toHaveBeenCalled()
    })

    it("selects another valid address when the selected address is deleted", async () => {
      mockUseCheckoutContext.mockReturnValue({
        ...mockCheckoutContext,
        userAddressMode: { mode: "edit", address: mockUSAddress1 },
      })

      renderSavedAddressOptions()

      await userEvent.click(
        screen.getByRole("button", { name: /Delete address/i }),
      )

      await waitFor(() => {
        expect(onSelectAddress).toHaveBeenCalledWith(mockUSAddress2)
      })
    })
  })

  describe("Tracking", () => {
    const setupTrackingContext = (stepState: CheckoutStepState) => {
      const mockSavedAddressViewed = jest.fn()
      mockCheckoutContext = {
        ...mockCheckoutContext,
        checkoutTracking: {
          ...mockCheckoutContext.checkoutTracking,
          savedAddressViewed: mockSavedAddressViewed,
        },
        steps: [
          { name: CheckoutStepName.FULFILLMENT_DETAILS, state: stepState },
        ],
      } as any

      mockUseCheckoutContext.mockReturnValue(mockCheckoutContext)
      return mockSavedAddressViewed
    }

    it("tracks savedAddressViewed when saved addresses are displayed and step is active", async () => {
      const mockSavedAddressViewed = setupTrackingContext(
        CheckoutStepState.ACTIVE,
      )

      renderSavedAddressOptions()

      await waitFor(() => {
        expect(mockSavedAddressViewed).toHaveBeenCalledTimes(1)
        expect(mockSavedAddressViewed).toHaveBeenCalledWith([
          mockUSAddress1,
          mockUSAddress2,
        ])
      })
    })

    it("does not track savedAddressViewed when step is not active", async () => {
      const mockSavedAddressViewed = setupTrackingContext(
        CheckoutStepState.UPCOMING,
      )

      renderSavedAddressOptions()

      await waitFor(() => {
        expect(mockSavedAddressViewed).not.toHaveBeenCalled()
      })
    })
  })
})
