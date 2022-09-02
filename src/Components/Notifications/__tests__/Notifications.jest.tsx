import { render, screen } from "@testing-library/react"
import { Notifications } from "../Notifications"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("Notifications", () => {
  it("should render tabs", () => {
    render(<Notifications mode="page" />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
  })
})
