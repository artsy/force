import { Formik } from "formik"
import {
  CheckoutAddress,
  Address,
  INITIAL_ADDRESS,
} from "Apps/Order/Components/CheckoutAddress"
import { screen, render } from "@testing-library/react"

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
  values: {
    attributes: INITIAL_ADDRESS,
  },
}

const checkoutAddressProps = {
  userCountry: "",
  onChange: (address: Address, key: keyof Address) => null,
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
})
