import { render, screen } from "@testing-library/react"
import { SignupValueProps } from "../SignupValueProps"

describe("SignupValueProps", () => {
  it("renders the section title", () => {
    render(<SignupValueProps />)
    expect(screen.getByText("Why Choose Artsy")).toBeInTheDocument()
  })

  it("renders all three value proposition cards", () => {
    render(<SignupValueProps />)

    expect(
      screen.getByText("The World's Largest Online Art Marketplace"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Transparent Art Pricing and Market Data"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Secure Art Buying, Every Time"),
    ).toBeInTheDocument()
  })
})
