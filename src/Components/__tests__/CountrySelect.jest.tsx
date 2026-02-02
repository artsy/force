import {
  CountrySelect,
  COUNTRY_SELECT_OPTIONS,
  SMS_UNSUPPORTED_COUNTRY_CODES,
  EU_COUNTRY_SELECT_OPTIONS,
} from "Components/CountrySelect"
import { render, fireEvent } from "@testing-library/react"

describe("CountrySelect", () => {
  it("renders a select element with all countries by default", () => {
    const { container } = render(<CountrySelect />)
    const select = container.querySelector("select")!
    const options = select.querySelectorAll("option")

    expect(select).toBeInTheDocument()
    expect(options.length).toBe(COUNTRY_SELECT_OPTIONS.length)
  })

  it("renders with euShippingOnly prop to show only EU countries", () => {
    const { container } = render(<CountrySelect euShippingOnly />)
    const select = container.querySelector("select")!
    const options = select.querySelectorAll("option")

    // Verify some EU countries are present
    const optionValues = Array.from(options).map(opt => opt.value)
    expect(optionValues).toContain("DE") // Germany
    expect(optionValues).toContain("FR") // France
    expect(optionValues).toContain("IT") // Italy

    // Verify non-EU countries are not present
    expect(optionValues).not.toContain("US") // United States
    expect(optionValues).not.toContain("CA") // Canada

    expect(options.length).toBe(EU_COUNTRY_SELECT_OPTIONS.length)
  })

  it("renders with smsSupported prop to show only SMS-supported countries", () => {
    const { container } = render(<CountrySelect smsSupported />)
    const select = container.querySelector("select")!
    const options = select.querySelectorAll("option")

    // Should have all countries minus SMS unsupported ones
    const expectedCount =
      COUNTRY_SELECT_OPTIONS.length - SMS_UNSUPPORTED_COUNTRY_CODES.length
    expect(options.length).toBe(expectedCount)

    const optionValues = Array.from(options).map(opt => opt.value)

    // Verify SMS-unsupported countries are not present
    expect(optionValues).not.toContain("AF") // Afghanistan
    expect(optionValues).not.toContain("CU") // Cuba

    // Verify SMS-supported countries are present
    expect(optionValues).toContain("US") // United States
    expect(optionValues).toContain("CA") // Canada
  })

  it("triggers onSelect callback on change", () => {
    const mockOnSelect = jest.fn()
    const { container } = render(<CountrySelect onSelect={mockOnSelect} />)

    const select = container.querySelector("select")!
    fireEvent.change(select, { target: { value: "US" } })

    expect(mockOnSelect).toHaveBeenCalled()
  })

  it("passes through additional SelectProps like disabled", () => {
    const { container } = render(<CountrySelect disabled />)
    const select = container.querySelector("select")!

    expect(select).toBeDisabled()
  })

  it("renders with a default empty option", () => {
    const { container } = render(<CountrySelect />)
    const select = container.querySelector("select")!
    const firstOption = select.querySelector("option")!

    expect(firstOption.value).toBe("")
    expect(firstOption.textContent).toBe("")
  })
})
