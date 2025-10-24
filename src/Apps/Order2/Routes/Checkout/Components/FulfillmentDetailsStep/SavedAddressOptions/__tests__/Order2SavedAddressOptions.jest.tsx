import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

    it("does not allow selecting invalid addresses", () => {
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

      const invalidAddressRadio = screen.getByRole("radio", {
        name: /Invalid Address/i,
      })

      expect(invalidAddressRadio).toHaveAttribute("disabled")

      expect(onSelectAddress).not.toHaveBeenCalled()
    })
  })
})
