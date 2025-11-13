import { HomeWorksForYouTabBar } from "Apps/Home/Components/HomeWorksForYouTabBar"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("Apps/Home/Components/HomeNewWorksForYouRail", () => ({
  HomeNewWorksForYouRailQueryRenderer: () => (
    <div data-testid="new-works-rail" />
  ),
}))
jest.mock("Apps/Home/Components/HomeRecentlyViewedRail", () => ({
  HomeRecentlyViewedRailQueryRenderer: () => (
    <div data-testid="recently-viewed-rail" />
  ),
}))
jest.mock("Apps/Home/Components/HomeWorksByArtistsYouFollowRail", () => ({
  HomeWorksByArtistsYouFollowRailQueryRenderer: () => (
    <div data-testid="works-by-artists-rail" />
  ),
}))
jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn().mockReturnValue({ user: true }),
}))

describe("HomeWorksForYouTabBar", () => {
  const getWrapper = () => {
    return render(<HomeWorksForYouTabBar />)
  }

  it("renders the new for you tab by default", () => {
    const { container } = getWrapper()

    expect(container.textContent).toContain("New Works for You")
    expect(container.textContent).toContain("New Works by Artists You Follow")
    expect(container.textContent).toContain("Recently Viewed")

    expect(screen.getByTestId("new-works-rail")).toBeInTheDocument()
    expect(
      screen.queryByTestId("works-by-artists-rail")
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId("recently-viewed-rail")).not.toBeInTheDocument()
  })

  it("renders other tabs when clicking", () => {
    getWrapper()
    const buttons = screen.getAllByRole("button")

    // Click on "Recently Viewed" tab (3rd button)
    fireEvent.click(buttons[2])
    expect(screen.getByTestId("recently-viewed-rail")).toBeInTheDocument()

    // Click on "New Works by Artists You Follow" tab (2nd button)
    fireEvent.click(buttons[1])
    expect(screen.getByTestId("works-by-artists-rail")).toBeInTheDocument()

    // Click on "New Works for You" tab (1st button)
    fireEvent.click(buttons[0])
    expect(screen.getByTestId("new-works-rail")).toBeInTheDocument()
  })
})
