import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddAddressForm } from "../AddAddressForm"
import { useOrder2CreateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation"
import { useOrder2UpdateUserDefaultAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserDefaultAddressMutation"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation",
)
jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserDefaultAddressMutation",
)
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")
jest.mock("Utils/logger")

const mockCreateUserAddress = jest.fn()
const mockUpdateUserDefaultAddress = jest.fn()
const mockSetUserAddressMode = jest.fn()
const mockOnSaveAddress = jest.fn()

const mockUseOrder2CreateUserAddressMutation =
  useOrder2CreateUserAddressMutation as jest.MockedFunction<
    typeof useOrder2CreateUserAddressMutation
  >
const mockUseOrder2UpdateUserDefaultAddressMutation =
  useOrder2UpdateUserDefaultAddressMutation as jest.MockedFunction<
    typeof useOrder2UpdateUserDefaultAddressMutation
  >
const mockUseCheckoutContext = useCheckoutContext as jest.MockedFunction<
  typeof useCheckoutContext
>

const initialValues: FormikContextWithAddress = {
  address: {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "US",
  },
  phoneNumber: "",
  phoneNumberCountryCode: "us",
  setAsDefault: false,
}

const mockProps = {
  initialValues,
  onSaveAddress: mockOnSaveAddress,
}

describe("AddAddressForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockUseOrder2CreateUserAddressMutation.mockReturnValue({
      submitMutation: mockCreateUserAddress,
    } as any)

    mockUseOrder2UpdateUserDefaultAddressMutation.mockReturnValue({
      submitMutation: mockUpdateUserDefaultAddress,
    } as any)

    mockUseCheckoutContext.mockReturnValue({
      setUserAddressMode: mockSetUserAddressMode,
    } as any)
  })

  it("renders the add address form with setAsDefault checkbox", () => {
    render(<AddAddressForm {...mockProps} />)

    expect(screen.getByText("Add address")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Add full name")).toBeInTheDocument()
    expect(screen.getByLabelText("Street address")).toBeInTheDocument()
    expect(screen.getByText("Save Address")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()

    // Check that setAsDefault checkbox is present
    const checkbox = screen.getByTestId("setAsDefault")
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
    expect(screen.getByText("Set as default address")).toBeInTheDocument()
  })

  it("calls only createUserAddress when setAsDefault is false", async () => {
    mockCreateUserAddress.mockResolvedValue({
      createUserAddress: {
        userAddressOrErrors: {
          __typename: "UserAddress",
          internalID: "new-address-id",
        },
      },
    })

    render(<AddAddressForm {...mockProps} />)

    // Fill out the form
    await userEvent.type(
      screen.getByPlaceholderText("Add full name"),
      "Jane Smith",
    )
    await userEvent.type(screen.getByLabelText("Street address"), "456 Oak Ave")
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

    // Verify setAsDefault is unchecked (default)
    const checkbox = screen.getByTestId("setAsDefault")
    expect(checkbox).not.toBeChecked()

    // Submit the form
    await userEvent.click(screen.getByText("Save Address"))

    await waitFor(() => {
      expect(mockCreateUserAddress).toHaveBeenCalledWith({
        variables: {
          input: {
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
          },
        },
      })
    })

    // Should NOT call updateUserDefaultAddress since setAsDefault is false
    expect(mockUpdateUserDefaultAddress).not.toHaveBeenCalled()

    // Should call onSaveAddress callback
    expect(mockOnSaveAddress).toHaveBeenCalledWith(
      expect.objectContaining({
        address: expect.objectContaining({
          name: "Jane Smith",
          addressLine1: "456 Oak Ave",
        }),
        setAsDefault: false,
      }),
      "new-address-id",
    )
  })

  it("calls both createUserAddress and updateUserDefaultAddress when setAsDefault is true", async () => {
    mockCreateUserAddress.mockResolvedValue({
      createUserAddress: {
        userAddressOrErrors: {
          __typename: "UserAddress",
          internalID: "new-address-id",
        },
      },
    })

    mockUpdateUserDefaultAddress.mockResolvedValue({
      updateUserDefaultAddress: {
        userAddressOrErrors: {
          __typename: "UserAddress",
          internalID: "new-address-id",
        },
      },
    })

    render(<AddAddressForm {...mockProps} />)

    // Fill out the form
    await userEvent.type(
      screen.getByPlaceholderText("Add full name"),
      "Jane Smith",
    )
    await userEvent.type(screen.getByLabelText("Street address"), "456 Oak Ave")
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

    // Check the setAsDefault checkbox
    const checkbox = screen.getByTestId("setAsDefault")
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    // Submit the form
    await userEvent.click(screen.getByText("Save Address"))

    // Should call createUserAddress first
    await waitFor(() => {
      expect(mockCreateUserAddress).toHaveBeenCalledWith({
        variables: {
          input: {
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
          },
        },
      })
    })

    // Should ALSO call updateUserDefaultAddress since setAsDefault is true
    await waitFor(() => {
      expect(mockUpdateUserDefaultAddress).toHaveBeenCalledWith({
        variables: {
          input: {
            userAddressID: "new-address-id",
          },
        },
      })
    })

    // Should call onSaveAddress callback
    expect(mockOnSaveAddress).toHaveBeenCalledWith(
      expect.objectContaining({
        address: expect.objectContaining({
          name: "Jane Smith",
          addressLine1: "456 Oak Ave",
        }),
        setAsDefault: true,
      }),
      "new-address-id",
    )
  })

  it("allows checking and unchecking the setAsDefault checkbox", async () => {
    render(<AddAddressForm {...mockProps} />)

    const checkbox = screen.getByTestId("setAsDefault")

    // Initially unchecked
    expect(checkbox).not.toBeChecked()

    // Check it
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    // Uncheck it
    await userEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it("calls setUserAddressMode(null) when cancel button is clicked", async () => {
    render(<AddAddressForm {...mockProps} />)

    await userEvent.click(screen.getByText("Cancel"))

    expect(mockSetUserAddressMode).toHaveBeenCalledWith(null)
  })

  it("handles createUserAddress errors gracefully", async () => {
    mockCreateUserAddress.mockResolvedValue({
      createUserAddress: {
        userAddressOrErrors: {
          __typename: "Errors",
          errors: [{ message: "Address creation failed" }],
        },
      },
    })

    render(<AddAddressForm {...mockProps} />)

    // Fill out the form
    await userEvent.type(
      screen.getByPlaceholderText("Add full name"),
      "Jane Smith",
    )
    await userEvent.type(screen.getByLabelText("Street address"), "456 Oak Ave")
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
    await userEvent.click(screen.getByText("Save Address"))

    await waitFor(() => {
      expect(mockCreateUserAddress).toHaveBeenCalled()
    })

    // Should not call updateUserDefaultAddress or onSaveAddress when creation fails
    expect(mockUpdateUserDefaultAddress).not.toHaveBeenCalled()
    expect(mockOnSaveAddress).not.toHaveBeenCalled()
  })

  it("calls onSaveAddress with new address ID to make it selected", async () => {
    const newAddressID = "newly-created-address-123"

    mockCreateUserAddress.mockResolvedValue({
      createUserAddress: {
        userAddressOrErrors: {
          __typename: "UserAddress",
          internalID: newAddressID,
        },
      },
    })

    render(<AddAddressForm {...mockProps} />)

    // Fill out the form
    await userEvent.type(
      screen.getByPlaceholderText("Add full name"),
      "John Doe",
    )
    await userEvent.type(screen.getByLabelText("Street address"), "123 Main St")
    await userEvent.type(screen.getByLabelText("City"), "New York")
    await userEvent.type(
      screen.getByLabelText("State, region or province"),
      "NY",
    )
    await userEvent.type(screen.getByLabelText("ZIP/Postal code"), "10001")
    await userEvent.type(
      screen.getByTestId("addressFormFields.phoneNumber"),
      "5551234567",
    )

    // Submit the form
    await userEvent.click(screen.getByText("Save Address"))

    // Verify onSaveAddress is called with the newly created address ID
    await waitFor(() => {
      expect(mockOnSaveAddress).toHaveBeenCalledWith(
        expect.objectContaining({
          address: expect.objectContaining({
            name: "John Doe",
            addressLine1: "123 Main St",
            city: "New York",
            region: "NY",
            postalCode: "10001",
          }),
        }),
        newAddressID,
      )
    })
  })
})
