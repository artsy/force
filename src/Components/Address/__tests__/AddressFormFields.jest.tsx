import { act, render, screen } from "@testing-library/react"
import { AddressFormFields } from "Components/Address/AddressFormFields"

jest.mock("formik", () => {
  return {
    useFormikContext: jest.fn(() => ({
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      values: {
        address: {},
      },
      touched: {},
      setValues: jest.fn(),
      setFieldValue: jest.fn(),
    })),
  }
})

const INPUT_EXPECTATIONS = [
  { label: "Full name", placeholder: "Add full name" },
  {
    label: "Country",
    placeholder: null,
  },
  {
    label: "ZIP/Postal code",
    placeholder: "Add ZIP/Postal code",
  },
  {
    label: "Street address",
    placeholder: "Add street address",
  },
  {
    label: "Apt, floor, suite, etc. (optional)",
    placeholder: "Add apartment, floor, suite, etc.",
  },
  { label: "City", placeholder: "Add city" },
  {
    label: "State, region or province",
    placeholder: "Add state, region or province",
  },
  { label: "Phone number", placeholder: "Add phone number" },
]

describe("AddressForm", () => {
  it("renders the correct components with label & placeholder copy", () => {
    render(<AddressFormFields />)

    INPUT_EXPECTATIONS.forEach(({ label, placeholder }) => {
      const input = screen.getByLabelText(label)
      expect(input).toBeInTheDocument()
      if (placeholder) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(input).toHaveAttribute("placeholder", placeholder)
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(input).not.toHaveAttribute("placeholder")
      }
    })
  })
})
