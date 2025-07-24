import { AuctionsApp } from "Apps/Auctions/AuctionsApp"
import { MockBoot } from "DevTools/MockBoot"
import { useSystemContext as baseUseSystemContext } from "System/Hooks/useSystemContext"
import { render, screen } from "@testing-library/react"
import { useTracking as baseUseTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")

jest.mock("Apps/Auctions/Components/TrendingLotsRail", () => ({
  TrendingLotsRailQueryRenderer: () => <div>Trending Lots</div>,
}))

jest.mock("Apps/Auctions/Components/StandoutLotsRail", () => ({
  StandoutLotsRailQueryRenderer: () => <div>Standout Lots</div>,
}))

describe("AuctionsApp", () => {
  const renderComponent = () => {
    return render(
      <MockBoot>
        <AuctionsApp />
      </MockBoot>,
    )
  }

  const useTracking = baseUseTracking as jest.Mock
  const useSystemContext = baseUseSystemContext as jest.Mock
  const trackEvent = jest.fn()

  beforeAll(() => {
    useTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    useSystemContext.mockImplementation(() => {
      return {}
    })
  })

  afterEach(() => {
    trackEvent.mockReset()
  })

  it("displays the auctions landing page", () => {
    renderComponent()
    expect(screen.getByText("Auctions")).toBeInTheDocument()
  })

  it("renders the Current Auctions tab by default", () => {
    const { container } = renderComponent()
    expect(container.textContent).toContain("Current Auctions")
  })

  it("renders the Upcoming tab by default", () => {
    const { container } = renderComponent()
    expect(container.textContent).toContain("Upcoming")
  })

  it("renders the Past tab by default", () => {
    const { container } = renderComponent()
    expect(container.textContent).toContain("Past")
  })

  it("redirects to the Bid At Auction page", () => {
    renderComponent()
    const link = screen.getByText("Learn more about bidding on Artsy")
    expect(link.closest("a")).toHaveAttribute(
      "href",
      "https://support.artsy.net/s/article/The-Complete-Guide-to-Auctions-on-Artsy",
    )
  })

  it("renders TrendingLots even if user is logged out", () => {
    useSystemContext.mockImplementation(() => ({
      user: null,
    }))

    renderComponent()
    expect(screen.getByText("Trending Lots")).toBeInTheDocument()
  })

  it("renders StandoutLots even if user is logged out", () => {
    useSystemContext.mockImplementation(() => ({
      user: null,
    }))

    renderComponent()
    expect(screen.getByText("Standout Lots")).toBeInTheDocument()
  })

  it("does not render auctions if they are not present", () => {
    const { container } = renderComponent()

    expect(container.textContent).not.toMatch(/\bStarts\b/)
    expect(container.textContent).not.toMatch(/\bEnds\b/)
    expect(container.textContent).not.toMatch(/\bEnded\b/)
    expect(container.textContent).not.toMatch(/\bIn Progress\b/)
  })

  it("does not render MyBids or WorksByFollowedArtists if user logged out", () => {
    useSystemContext.mockImplementation(() => ({
      user: null,
    }))

    renderComponent()

    expect(screen.queryByText("Your Auctions and Bids")).not.toBeInTheDocument()
    expect(
      screen.queryByText("Works by Artists You Follow"),
    ).not.toBeInTheDocument()
  })
})
