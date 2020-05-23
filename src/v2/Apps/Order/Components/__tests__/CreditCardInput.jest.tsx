import { Sans } from "@artsy/palette"
import { shallow } from "enzyme"
import React from "react"
import { CreditCardInput, StyledCardElement } from "../CreditCardInput"

describe("CreditCardInput", () => {
  it("does not show an error message when onChange is fired with undefined response", () => {
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
    const creditCardInput = shallow(
      <CreditCardInput error={{ message: "Card number is invalid" } as any} />
    )

    expect(creditCardInput.find(Sans).html()).toMatch("Card number is invalid")
  })
})
