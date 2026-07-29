import { render, screen } from "@testing-library/react"
import { Order2OfferExpiryTimer } from "Apps/Order2/Components/Order2OfferExpiryTimer"

describe("Order2OfferExpiryTimer", () => {
  it("renders the stopwatch variant by default", () => {
    render(<Order2OfferExpiryTimer remainingTime="2d 3h" />)

    expect(screen.getByText("Exp. 2d 3h")).toBeInTheDocument()
  })

  it("renders the icon variant", () => {
    render(<Order2OfferExpiryTimer remainingTime="2d 3h" variant="icon" />)

    expect(screen.getByText("Exp. 2d 3h")).toBeInTheDocument()
  })

  it("renders the inline variant wrapped in parentheses", () => {
    render(<Order2OfferExpiryTimer remainingTime="2d 3h" variant="inline" />)

    expect(screen.getByText("(Exp. 2d 3h)")).toBeInTheDocument()
  })
})
