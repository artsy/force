import { screen } from "@testing-library/react"
import { render } from "DevTools/setupTestWrapper"
import { Notifications } from "../Notifications"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("MarkAllAsReadPanel", () => {
  it("should the empty state", () => {
    render(<Notifications mode="page" unreadCounts={0} />)

    expect(screen.getByText("No new notifications")).toBeInTheDocument()
  })

  it("should the single state", () => {
    render(<Notifications mode="page" unreadCounts={1} />)

    expect(screen.getByText("1 new notification")).toBeInTheDocument()
  })

  it("should the multiple state", () => {
    render(<Notifications mode="page" unreadCounts={5} />)

    expect(screen.getByText("5 new notifications")).toBeInTheDocument()
  })
})
