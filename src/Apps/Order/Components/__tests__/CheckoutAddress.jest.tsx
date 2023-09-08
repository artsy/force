import { screen, render, fireEvent } from "@testing-library/react"
import { Formik } from "formik"
import {
  CheckoutAddress,
  AddressFormValues,
  INITIAL_ADDRESS,
} from "Apps/Order/Components/CheckoutAddress"

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  Form: ({ children }) => children,
  Formik: jest.fn(),
}))

const defaultFormikProps = {
  errors: {},
  touched: {},
  isSubmitting: false,
  isValid: false,
  handleChange: e => null,
  values: {
    attributes: INITIAL_ADDRESS,
  },
}

const mockOnChange = jest.fn(
  (address: AddressFormValues, key: keyof AddressFormValues) => null
)

const checkoutAddressProps = {
  userCountry: "",
  onChange: mockOnChange,
}

const fireChangeEvent = (input: HTMLElement, value: string) => {
  fireEvent.change(input, {
    target: { value: value },
  })
}

describe("CheckoutAddress form", () => {
  const mockFormik = Formik as jest.Mock

  beforeEach(() => {
    ;(mockFormik as React.FC).displayName = "Formik"
    mockFormik.mockImplementation(({ children }) => {
      return children(defaultFormikProps)
    })

    render(<CheckoutAddress {...checkoutAddressProps} />)
  })

  it("renders each form input with correct title", () => {
    expect(screen.getByText("Add full name")).toBeInTheDocument()
    expect(screen.getByText("Country")).toBeInTheDocument()
    expect(screen.getByText("Address line 1")).toBeInTheDocument()
    expect(screen.getByText("Address line 2 (optional)")).toBeInTheDocument()
    expect(screen.getByText("Postal Code")).toBeInTheDocument()
    expect(screen.getByText("City")).toBeInTheDocument()
    expect(screen.getByText("State, Province, or Region")).toBeInTheDocument()
  })

  it("renders correct placeholders", () => {
    expect(screen.queryByPlaceholderText("Enter name")).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("Add street address")
    ).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("Add apt, floor, suite, etc.")
    ).toBeInTheDocument()
    expect(screen.queryByPlaceholderText("Add postal code")).toBeInTheDocument()
    expect(screen.queryByPlaceholderText("Add city")).toBeInTheDocument()
    expect(
      screen.queryByPlaceholderText("Add state, province, or region")
    ).toBeInTheDocument()
  })

  describe("change handler fired correctly", () => {
    it("for name", () => {
      const nameInput = screen.getByLabelText("address-name-input")
      fireChangeEvent(nameInput, "John Doe")
      expect(mockOnChange).toHaveBeenCalledWith(
        {
          name: "John Doe",
          country: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          postalCode: "",
          region: "",
        },
        "name"
      )
    })

    it("for 1st address line", () => {
      const addressLineInput = screen.getByLabelText("address-street-input")
      fireChangeEvent(addressLineInput, "Weserstr. 175")
      expect(mockOnChange).toHaveBeenCalledWith(
        {
          name: "",
          country: "",
          addressLine1: "Weserstr. 175",
          addressLine2: "",
          city: "",
          postalCode: "",
          region: "",
        },
        "addressLine1"
      )
    })

    it("for 2nd address line", () => {
      const addressLineInput2nd = screen.getByLabelText(
        "address-optional-second-line-input"
      )
      fireChangeEvent(addressLineInput2nd, "Hinterhaus, links")
      expect(mockOnChange).toHaveBeenCalledWith(
        {
          name: "",
          country: "",
          addressLine1: "",
          addressLine2: "Hinterhaus, links",
          city: "",
          postalCode: "",
          region: "",
        },
        "addressLine2"
      )
    })

    it("for postal code", () => {
      const postalCodeInput = screen.getByLabelText("address-postal-code-input")
      fireChangeEvent(postalCodeInput, "12045")
      expect(mockOnChange).toHaveBeenCalledWith(
        {
          name: "",
          country: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          postalCode: "12045",
          region: "",
        },
        "postalCode"
      )
    })

    it("for city", () => {
      const cityInput = screen.getByLabelText("address-city-input")
      fireChangeEvent(cityInput, "Berlin")
      expect(mockOnChange).toHaveBeenCalledWith(
        {
          name: "",
          country: "",
          addressLine1: "",
          addressLine2: "",
          city: "Berlin",
          postalCode: "",
          region: "",
        },
        "city"
      )
    })

    it("for region", () => {
      const regionInput = screen.getByLabelText("address-state-or-region-input")
      fireChangeEvent(regionInput, "Berlin")
      expect(mockOnChange).toHaveBeenCalledWith(
        {
          name: "",
          country: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          postalCode: "",
          region: "Berlin",
        },
        "region"
      )
    })
  })
})
