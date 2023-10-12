import { ReactWrapper, mount } from "enzyme"
import { OfferInput, OfferInputProps } from "Apps/Order/Components/OfferInput"

// https://github.com/airbnb/enzyme/issues/218#issuecomment-388481390
const setInputValue = (
  inputWrapper: ReactWrapper,
  value: string,
  setSelectionRangeMock = jest.fn()
) => {
  ;(inputWrapper.getDOMNode() as any).value = value
  ;(inputWrapper.getDOMNode() as any).setSelectionRange = setSelectionRangeMock
  inputWrapper.simulate("change")
}

describe("Offer input", () => {
  const render = (props: Partial<OfferInputProps>) =>
    mount(
      <OfferInput
        id="whatever"
        showError={false}
        onChange={() => undefined}
        {...props}
      />
    )

  it("calls onChange when the user enters values", () => {
    const onChange = jest.fn()
    const input = render({ onChange })

    setInputValue(input.find("input"), "1")
    expect(onChange).toHaveBeenCalledWith(1)

    setInputValue(input.find("input"), "12")
    expect(onChange).toHaveBeenCalledWith(12)

    setInputValue(input.find("input"), "2389274922")
    expect(onChange).toHaveBeenCalledWith(2389274922)
  })

  it("displays the value with comma separators at the thousands", () => {
    let input = render({ value: 12 })

    let inputValue = input.find("input").prop("value")
    expect(inputValue).toBe("12")

    input = render({ value: 4200 })

    inputValue = input.find("input").prop("value")
    expect(inputValue).toBe("4,200")

    input = render({ value: 2389274922 })

    inputValue = input.find("input").prop("value")
    expect(inputValue).toBe("2,389,274,922")
  })

  it("shows no error message when showError is false", () => {
    const input = render({ showError: false })

    expect(input.text()).not.toMatch("Offer amount missing or invalid.")
  })

  it("shows an error message when showError is true", () => {
    const input = render({ showError: true })

    expect(input.text()).toMatch("Offer amount missing or invalid.")
  })

  it("ignores non-numeric characters", () => {
    const onChange = jest.fn()
    const input = render({ onChange })

    setInputValue(input.find("input"), "1d")
    expect(onChange).toHaveBeenCalledWith(1)

    setInputValue(input.find("input"), "1d2")
    expect(onChange).toHaveBeenCalledWith(12)

    setInputValue(input.find("input"), "2139hello8729")
    expect(onChange).toHaveBeenCalledWith(21398729)
  })
})
