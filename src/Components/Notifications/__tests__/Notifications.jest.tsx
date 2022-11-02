import { render, screen } from "@testing-library/react"
import { Notifications } from "Components/Notifications/Notifications"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("Notifications", () => {
  it("should render tabs", () => {
    render(<Notifications mode="page" unreadCounts={0} />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
  })

  it("should display new notifications message", () => {
    render(<Notifications mode="page" unreadCounts={5} />)

    expect(screen.getByText("New notifications")).toBeInTheDocument()
  })
})
