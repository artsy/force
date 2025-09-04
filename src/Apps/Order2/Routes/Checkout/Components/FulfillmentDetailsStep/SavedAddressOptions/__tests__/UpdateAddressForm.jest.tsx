import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UpdateAddressForm } from "../UpdateAddressForm"
import { useOrder2UpdateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserAddressMutation"
import { useOrder2DeleteUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2DeleteUserAddressMutation"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { ProcessedUserAddress } from "../../utils"

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserAddressMutation",
)
jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2DeleteUserAddressMutation",
)
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")
jest.mock("Utils/logger")

const mockUpdateUserAddress = jest.fn()
const mockDeleteUserAddress = jest.fn()
const mockSetUserAddressMode = jest.fn()

const mockUseOrder2UpdateUserAddressMutation =
  useOrder2UpdateUserAddressMutation as jest.MockedFunction<
    typeof useOrder2UpdateUserAddressMutation
  >
const mockUseOrder2DeleteUserAddressMutation =
  useOrder2DeleteUserAddressMutation as jest.MockedFunction<
    typeof useOrder2DeleteUserAddressMutation
  >
const mockUseCheckoutContext = useCheckoutContext as jest.MockedFunction<
  typeof useCheckoutContext
>

const mockUSAddress: ProcessedUserAddress = {
  internalID: "address-id-123",
  phoneNumber: "555-1234",
  phoneNumberCountryCode: "+1",
  isValid: true,
  isDefault: false,
  address: {
    name: "John Doe",
    addressLine1: "123 Main St",
    addressLine2: "Apt 4B",
    city: "New York",
    region: "NY",
    postalCode: "10001",
    country: "US",
  },
}

const mockDEAddress: ProcessedUserAddress = {
  internalID: "address-id-456",
  phoneNumber: "030 12345678",
  phoneNumberCountryCode: "+49",
  isValid: true,
  isDefault: false,
  address: {
    name: "Hans Mueller",
    addressLine1: "Unter den Linden 1",
    addressLine2: "",
    city: "Berlin",
    region: "",
    postalCode: "10117",
    country: "DE",
  },
}

const mockUSProps = {
  address: mockUSAddress,
  onSaveAddress: jest.fn(),
  onDeleteAddress: jest.fn(),
}

const mockDEProps = {
  address: mockDEAddress,
  onSaveAddress: jest.fn(),
  onDeleteAddress: jest.fn(),
}

describe("UpdateAddressForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockUseOrder2UpdateUserAddressMutation.mockReturnValue({
      submitMutation: mockUpdateUserAddress,
    } as any)

    mockUseOrder2DeleteUserAddressMutation.mockReturnValue({
      submitMutation: mockDeleteUserAddress,
    } as any)

    mockUseCheckoutContext.mockReturnValue({
      setUserAddressMode: mockSetUserAddressMode,
    } as any)
  })

  describe("Core form functionality", () => {
    it("renders form with US address data", () => {
      render(<UpdateAddressForm {...mockUSProps} />)

      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument()
      expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument()
      expect(screen.getByDisplayValue("New York")).toBeInTheDocument()
    })

    it("renders form with German address data", () => {
      render(<UpdateAddressForm {...mockDEProps} />)

      expect(screen.getByDisplayValue("Hans Mueller")).toBeInTheDocument()
      expect(screen.getByDisplayValue("Unter den Linden 1")).toBeInTheDocument()
      expect(screen.getByDisplayValue("Berlin")).toBeInTheDocument()
      expect(screen.getByDisplayValue("10117")).toBeInTheDocument()
    })

    it("calls onSaveAddress when form is submitted successfully", async () => {
      mockUpdateUserAddress.mockResolvedValue({
        updateUserAddress: {
          userAddressOrErrors: {
            __typename: "UserAddress",
            internalID: "address-id-123",
          },
        },
      })

      render(<UpdateAddressForm {...mockUSProps} />)

      const saveButton = screen.getByText("Save Address")
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockUSProps.onSaveAddress).toHaveBeenCalled()
      })
    })

    it("allows editing address fields", async () => {
      render(<UpdateAddressForm {...mockUSProps} />)

      const nameField = screen.getByDisplayValue("John Doe")
      const addressField = screen.getByDisplayValue("123 Main St")
      const cityField = screen.getByDisplayValue("New York")

      await userEvent.clear(nameField)
      await userEvent.type(nameField, "Jane Smith")

      await userEvent.clear(addressField)
      await userEvent.type(addressField, "456 Oak Ave")

      await userEvent.clear(cityField)
      await userEvent.type(cityField, "Boston")

      expect(screen.getByDisplayValue("Jane Smith")).toBeInTheDocument()
      expect(screen.getByDisplayValue("456 Oak Ave")).toBeInTheDocument()
      expect(screen.getByDisplayValue("Boston")).toBeInTheDocument()
    })

    it("calls onSaveAddress with updated values when form is submitted", async () => {
      mockUpdateUserAddress.mockResolvedValue({
        updateUserAddress: {
          userAddressOrErrors: {
            __typename: "UserAddress",
            internalID: "address-id-123",
          },
        },
      })

      render(<UpdateAddressForm {...mockUSProps} />)

      const nameField = screen.getByDisplayValue("John Doe")
      await userEvent.clear(nameField)
      await userEvent.type(nameField, "Jane Smith")

      const saveButton = screen.getByText("Save Address")
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(mockUSProps.onSaveAddress).toHaveBeenCalledWith(
          expect.objectContaining({
            address: expect.objectContaining({
              name: "Jane Smith",
            }),
          }),
          "address-id-123",
        )
      })
    })

    it("handles form validation errors", async () => {
      render(<UpdateAddressForm {...mockUSProps} />)

      const nameField = screen.getByDisplayValue("John Doe")
      await userEvent.clear(nameField)

      const saveButton = screen.getByText("Save Address")
      await userEvent.click(saveButton)

      await waitFor(() => {
        expect(screen.getByText("Full name is required")).toBeInTheDocument()
      })

      expect(mockUSProps.onSaveAddress).not.toHaveBeenCalled()
    })

    it("closes form when cancel button is clicked", async () => {
      render(<UpdateAddressForm {...mockUSProps} />)

      const cancelButton = screen.getByText("Cancel")
      await userEvent.click(cancelButton)

      expect(mockSetUserAddressMode).toHaveBeenCalledWith(null)
    })
  })

  describe("Delete functionality", () => {
    it("shows delete confirmation dialog when delete is clicked", async () => {
      render(<UpdateAddressForm {...mockUSProps} />)

      const deleteButton = screen.getByText("Delete address")
      await userEvent.click(deleteButton)

      expect(screen.getByText("Delete address?")).toBeInTheDocument()
      expect(
        screen.getByText(
          "This will remove this address from your saved addresses.",
        ),
      ).toBeInTheDocument()
    })

    it("calls onDeleteAddress callback on successful deletion", async () => {
      mockDeleteUserAddress.mockResolvedValue({
        deleteUserAddress: {
          userAddressOrErrors: {
            __typename: "UserAddress",
            internalID: "address-id-123",
          },
        },
      })

      render(<UpdateAddressForm {...mockUSProps} />)

      const deleteButton = screen.getByText("Delete address")
      await userEvent.click(deleteButton)

      const confirmButton = screen.getByText("Delete")
      await userEvent.click(confirmButton)

      await waitFor(() => {
        expect(mockUSProps.onDeleteAddress).toHaveBeenCalledWith(
          "address-id-123",
        )
      })
    })

    it("closes dialog and resets form after successful deletion", async () => {
      mockDeleteUserAddress.mockResolvedValue({
        deleteUserAddress: {
          userAddressOrErrors: {
            __typename: "UserAddress",
            internalID: "address-id-123",
          },
        },
      })

      render(<UpdateAddressForm {...mockUSProps} />)

      const deleteButton = screen.getByText("Delete address")
      await userEvent.click(deleteButton)

      const confirmButton = screen.getByText("Delete")
      await userEvent.click(confirmButton)

      await waitFor(() => {
        expect(mockSetUserAddressMode).toHaveBeenCalledWith(null)
      })

      await waitFor(() => {
        expect(screen.queryByText("Delete address?")).not.toBeInTheDocument()
      })
    })
  })

  describe("Delete error handling", () => {
    it("shows 'Address already deleted' error for missing address", async () => {
      mockDeleteUserAddress.mockResolvedValue({
        deleteUserAddress: {
          userAddressOrErrors: {
            __typename: "Errors",
            errors: [{ message: "Couldn't find Address with id=123" }],
          },
        },
      })

      render(<UpdateAddressForm {...mockUSProps} />)

      const deleteButton = screen.getByText("Delete address")
      await userEvent.click(deleteButton)

      const confirmButton = screen.getByText("Delete")
      await userEvent.click(confirmButton)

      await waitFor(() => {
        expect(screen.getByText("Address already deleted")).toBeInTheDocument()
        expect(screen.getByText("Please refresh the page.")).toBeInTheDocument()
      })
    })

    it("shows 'Address already deleted' error for null field error", async () => {
      mockDeleteUserAddress.mockResolvedValue({
        deleteUserAddress: {
          userAddressOrErrors: {
            __typename: "Errors",
            errors: [{ message: "Cannot return null for non-nullable field" }],
          },
        },
      })

      render(<UpdateAddressForm {...mockUSProps} />)

      const deleteButton = screen.getByText("Delete address")
      await userEvent.click(deleteButton)

      const confirmButton = screen.getByText("Delete")
      await userEvent.click(confirmButton)

      await waitFor(() => {
        expect(screen.getByText("Address already deleted")).toBeInTheDocument()
        expect(screen.getByText("Please refresh the page.")).toBeInTheDocument()
      })
    })

    it("shows generic error for other errors", async () => {
      mockDeleteUserAddress.mockResolvedValue({
        deleteUserAddress: {
          userAddressOrErrors: {
            __typename: "Errors",
            errors: [{ message: "Some other error" }],
          },
        },
      })

      render(<UpdateAddressForm {...mockUSProps} />)

      const deleteButton = screen.getByText("Delete address")
      await userEvent.click(deleteButton)

      const confirmButton = screen.getByText("Delete")
      await userEvent.click(confirmButton)

      await waitFor(() => {
        expect(screen.getByText("An error occurred")).toBeInTheDocument()
        expect(screen.getByText("Please try again later.")).toBeInTheDocument()
      })
    })

    it("handles network errors gracefully", async () => {
      mockDeleteUserAddress.mockRejectedValue(new Error("Network error"))

      render(<UpdateAddressForm {...mockUSProps} />)

      const deleteButton = screen.getByText("Delete address")
      await userEvent.click(deleteButton)

      const confirmButton = screen.getByText("Delete")
      await userEvent.click(confirmButton)

      await waitFor(() => {
        expect(screen.getByText("An error occurred")).toBeInTheDocument()
        expect(screen.getByText("Please try again later.")).toBeInTheDocument()
      })
    })

    it("clears error when dialog is closed", async () => {
      mockDeleteUserAddress.mockResolvedValue({
        deleteUserAddress: {
          userAddressOrErrors: {
            __typename: "Errors",
            errors: [{ message: "Some error" }],
          },
        },
      })

      render(<UpdateAddressForm {...mockUSProps} />)

      const deleteButton = screen.getByText("Delete address")
      await userEvent.click(deleteButton)

      const confirmButton = screen.getByText("Delete")
      await userEvent.click(confirmButton)

      await waitFor(() => {
        expect(screen.getByText("An error occurred")).toBeInTheDocument()
      })

      const closeButton = screen.getByRole("button", { name: /close/i })
      await userEvent.click(closeButton)

      // Reopen dialog to check error is cleared
      const deleteButtonAgain = screen.getByText("Delete address")
      await userEvent.click(deleteButtonAgain)

      expect(screen.queryByText("An error occurred")).not.toBeInTheDocument()
    })
  })
})
