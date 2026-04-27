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
      screen.getByText("The world’s largest online art marketplace"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Transparent art pricing and market data"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Secure art buying, every time"),
    ).toBeInTheDocument()
  })
})
