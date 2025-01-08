import { AuctionsApp } from "Apps/Auctions/AuctionsApp"
import { MockBoot } from "DevTools/MockBoot"
import { useSystemContext as baseUseSystemContext } from "System/Hooks/useSystemContext"
import { mount } from "enzyme"
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
  const getWrapper = () => {
    const wrapper = mount(
      <MockBoot>
        <AuctionsApp />
      </MockBoot>,
    )

    return { wrapper }
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
    const { wrapper } = getWrapper()
    expect(wrapper.find("AuctionsMeta").length).toBe(1)
  })

  it("renders the Current Auctions tab by default", () => {
    const { wrapper } = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Current Auctions")
  })

  it("renders the Upcoming tab by default", () => {
    const { wrapper } = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Upcoming")
  })

  it("renders the Past tab by default", () => {
    const { wrapper } = getWrapper()
    const html = wrapper.html()

    expect(html).toContain("Past")
  })

  it("redirects to the Bid At Auction page", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find("RouterLink")).toBeDefined()
    expect(wrapper.find("RouterLink").first().props().to).toBe(
      "https://support.artsy.net/s/article/The-Complete-Guide-to-Auctions-on-Artsy",
    )
  })

  it("renders TrendingLots even if user is logged out", () => {
    useSystemContext.mockImplementation(() => ({
      user: null,
    }))

    const { wrapper } = getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Trending Lots")
  })

  it("renders StandoutLots even if user is logged out", () => {
    useSystemContext.mockImplementation(() => ({
      user: null,
    }))

    const { wrapper } = getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Curators’ Picks")
  })

  it("does not render auctions if they are not present", () => {
    const { wrapper } = getWrapper()

    const html = wrapper.html()

    expect(html).not.toContain("Starts")
    expect(html).not.toContain("Ends")
    expect(html).not.toContain("Ended")
    expect(html).not.toContain("In Progress")
  })

  it("does not render MyBids or WorksByFollowedArtists if user logged out", () => {
    useSystemContext.mockImplementation(() => ({
      user: null,
    }))

    const { wrapper } = getWrapper()

    expect(wrapper.find("MyBidsFragmentContainer").length).toBe(0)
    expect(
      wrapper.find("WorksByArtistsYouFollowRailFragmentContainer").length,
    ).toBe(0)
  })
})
