import { screen, render } from "@testing-library/react"
import { InsufficientFundsError } from "../InsufficientFundsError"

describe("InsufficientFundsError", () => {
  it("renders correct error messages", () => {
    render(<InsufficientFundsError />)
    expect(
      screen.queryByText("This bank account doesn’t have enough funds.")
    ).toBeInTheDocument()
    expect(
      screen.queryByText(
        "Please choose or link to another bank account or select another payment method."
      )
    ).toBeInTheDocument()
  })
})
