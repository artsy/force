import { render, screen } from "@testing-library/react"
import { NotificationsEmptyStateByType } from "Components/Notifications/NotificationsEmptyStateByType"

describe("NotificationsEmptyStateByType", () => {
  it("should render correct state when type is 'All'", () => {
    render(<NotificationsEmptyStateByType type="all" />)
    const title = "Stay up to date with the artists and artworks you love"
    const message =
      "Follow artists and galleries to keep track of their latest updates. Or create an alert and we’ll let you know when there’s a matching work."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it("should render correct state when type is 'Alerts'", () => {
    render(<NotificationsEmptyStateByType type="alerts" />)
    const title = "Hunting for a particular artwork?"
    const message =
      "Create alerts on an artist or artwork page and get notifications here when there’s a match."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()
  })
})

describe("NotificationsEmptyStateByType Follows alerts", () => {
  it("should render correct state when type is 'Follows'", () => {
    render(<NotificationsEmptyStateByType type="follows" />)
    const title = "Follow artists and galleries to stay up to date"
    const message =
      "Keep track of the art and events you love, and get recommendations based on who you follow."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()
  })
})
