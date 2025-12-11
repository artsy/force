import { Theme } from "@artsy/palette"
import { render, screen } from "@testing-library/react"
import { OrderErrorApp } from "Apps/Order2/Components/Order2ErrorApp"

describe("Order2ErrorApp", () => {
  it("renders the default error message", () => {
    render(
      <Theme>
        <OrderErrorApp />
      </Theme>,
    )

    expect(
      screen.getByText("Sorry, we couldn't find that order."),
    ).toBeInTheDocument()
  })

  it("renders with a custom error code and message", () => {
    render(
      <Theme>
        <OrderErrorApp code={404} message="Custom error message" />
      </Theme>,
    )

    expect(screen.getByText("Custom error message")).toBeInTheDocument()
    expect(screen.getByText("404")).toBeInTheDocument()
  })
})
