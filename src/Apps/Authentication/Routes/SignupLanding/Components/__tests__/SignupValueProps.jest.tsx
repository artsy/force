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

  it("renders the buyer guarantee link", () => {
    render(<SignupValueProps />)

    const link = screen.getByText("Learn more about the Artsy Guarantee.")
    expect(link).toBeInTheDocument()
    expect(link.closest("a")).toHaveAttribute("href", "/buyer-guarantee")
  })

  it("renders all three icons", () => {
    const { container } = render(<SignupValueProps />)

    // Check that 3 icon circles are rendered
    const iconCircles = container.querySelectorAll('[width="48"][height="48"]')
    expect(iconCircles).toHaveLength(3)
  })
})
