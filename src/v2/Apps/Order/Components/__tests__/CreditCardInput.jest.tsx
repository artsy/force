import { Text } from "@artsy/palette"
import { shallow } from "enzyme"
import { CreditCardInput, StyledCardElement } from "../CreditCardInput"

describe("CreditCardInput", () => {
  const formik = require("formik")

  it("does not show an error message when onChange is fired with undefined response", () => {
    jest.spyOn(formik, "useFormikContext").mockImplementation(() => ({
      errors: undefined,
      setFieldError: jest.fn(),
    }))

    const onChangeMock = jest.fn()
    const creditCardInput = shallow(<CreditCardInput onChange={onChangeMock} />)

    creditCardInput
      .find(StyledCardElement)
      .simulate("change", { complete: false, empty: false, error: undefined })

    expect(onChangeMock).toHaveBeenCalledWith({
      complete: false,
      empty: false,
      error: undefined,
    })
  })

  it("shows an error message when error.message prop is present", () => {
    jest.spyOn(formik, "useFormikContext").mockImplementation(() => ({
      errors: {
        creditCard: "Card number is invalid",
      },
      setFieldError: jest.fn(),
    }))

    const creditCardInput = shallow(<CreditCardInput />)

    expect(creditCardInput.find(Text).html()).toMatch("Card number is invalid")
  })
})
