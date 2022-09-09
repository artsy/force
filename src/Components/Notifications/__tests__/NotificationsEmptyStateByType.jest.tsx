import { render, screen } from "@testing-library/react"
import { NotificationsEmptyStateByType } from "../NotificationsEmptyStateByType"

describe("NotificationsEmptyStateByType", () => {
  it("should render correct state when type is 'All'", () => {
    render(<NotificationsEmptyStateByType type="all" />)

    const title = "You haven't followed any artists, galleries or fairs yet."
    const message =
      "Follow artists to keep track of their latest work and career highlights. Following artists helps Artsy to recommend works you might like."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it("should render correct state when type is 'Alerts'", () => {
    render(<NotificationsEmptyStateByType type="alerts" />)

    const title = "You haven't created any Alerts yet."
    const message =
      "Filter for the artworks you love on an Artist Page and tap 'Create Alert' to be notified when new works are added to Artsy."

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()
  })
})
