import { screen } from "@testing-library/react"
import { render } from "DevTools/setupTestWrapper"
import { Notifications } from "../Notifications"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("Notifications", () => {
  it("should render tabs", () => {
    render(<Notifications mode="page" unreadCounts={0} />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
  })

  it("should display the count of unread notifications", () => {
    render(<Notifications mode="page" unreadCounts={5} />)

    expect(screen.getByText("5 new notifications")).toBeInTheDocument()
  })
})
