import { MockBoot } from "DevTools/MockBoot"
import { AuctionsAppFragmentContainer } from "Apps/Auctions/AuctionsApp"
import { graphql } from "react-relay"
import { AuctionsApp_Test_Query } from "__generated__/AuctionsApp_Test_Query.graphql"
import { useTracking as baseUseTracking } from "react-tracking"
import { useSystemContext as baseUseSystemContext } from "System/Hooks/useSystemContext"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")

describe("AuctionsApp", () => {
  const { getWrapper } = setupTestWrapper<AuctionsApp_Test_Query>({
    Component: (props: any) => {
      return (
        <MockBoot>
          <AuctionsAppFragmentContainer viewer={props.viewer} />
        </MockBoot>
      )
    },
    query: graphql`
      query AuctionsApp_Test_Query @relay_test_operation {
        viewer {
          ...AuctionsApp_viewer
        }
      }
    `,
  })

  const useTracking = baseUseTracking as jest.Mock
  let useSystemContext = baseUseSystemContext as jest.Mock
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
      "https://support.artsy.net/s/article/How-do-I-place-a-bid-in-an-auction"
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
    const { wrapper } = getWrapper({
      salesConnection: () => ({ edges: [] }),
    })

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
      wrapper.find("WorksByArtistsYouFollowRailFragmentContainer").length
    ).toBe(0)
  })
})
