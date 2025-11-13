import {
  OfferInput,
  type OfferInputProps,
} from "Apps/Order/Components/OfferInput"
import { fireEvent, render, screen } from "@testing-library/react"

const setInputValue = (input: HTMLInputElement, value: string) => {
  fireEvent.change(input, { target: { value } })
}

describe("Offer input", () => {
  const renderComponent = (props: Partial<OfferInputProps>) =>
    render(
      <OfferInput
        id="whatever"
        showError={false}
        onChange={() => undefined}
        {...props}
      />
    )

  it("calls onChange when the user enters values", () => {
    const onChange = jest.fn()
    renderComponent({ onChange })

    const input = screen.getByRole("textbox")

    setInputValue(input as HTMLInputElement, "1")
    expect(onChange).toHaveBeenCalledWith(1)

    setInputValue(input as HTMLInputElement, "12")
    expect(onChange).toHaveBeenCalledWith(12)

    setInputValue(input as HTMLInputElement, "2389274922")
    expect(onChange).toHaveBeenCalledWith(2389274922)
  })

  it("displays the value with comma separators at the thousands", () => {
    let { unmount } = renderComponent({ value: 12 })
    let input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toBe("12")
    unmount()
    ;({ unmount } = renderComponent({ value: 4200 }))
    input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toBe("4,200")
    unmount()

    renderComponent({ value: 2389274922 })
    input = screen.getByRole("textbox") as HTMLInputElement
    expect(input.value).toBe("2,389,274,922")
  })

  it("shows no error message when showError is false", () => {
    renderComponent({ showError: false })

    expect(
      screen.queryByText("Offer amount missing or invalid.")
    ).not.toBeInTheDocument()
  })

  it("shows an error message when showError is true", () => {
    renderComponent({ showError: true })

    expect(
      screen.getByText("Offer amount missing or invalid.")
    ).toBeInTheDocument()
  })

  it("ignores non-numeric characters", () => {
    const onChange = jest.fn()
    renderComponent({ onChange })

    const input = screen.getByRole("textbox")

    setInputValue(input as HTMLInputElement, "1d")
    expect(onChange).toHaveBeenCalledWith(1)

    setInputValue(input as HTMLInputElement, "1d2")
    expect(onChange).toHaveBeenCalledWith(12)

    setInputValue(input as HTMLInputElement, "2139hello8729")
    expect(onChange).toHaveBeenCalledWith(21398729)
  })
})
