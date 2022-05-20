import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeAuctionLotsRailFragmentContainer } from "../Components/HomeAuctionLotsRail"
import { HomeAuctionLotsRail_Test_Query } from "v2/__generated__/HomeAuctionLotsRail_Test_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { getWrapper } = setupTestWrapper<HomeAuctionLotsRail_Test_Query>({
  Component: props => {
    return <HomeAuctionLotsRailFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeAuctionLotsRail_Test_Query @relay_test_operation {
      viewer {
        ...HomeAuctionLotsRail_viewer
      }
    }
  `,
})

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomeAuctionLotsRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Viewer: () => ({
        artworksConnection: {
          edges: [
            {
              node: {
                title: "Test Auction",
                href: "test-href",
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Auction Lots")
    expect(wrapper.text()).toContain("View All Auctions")
    expect(wrapper.text()).toContain("Test Auction")
    expect(wrapper.html()).toContain("test-href")
  })

  describe("tracking", () => {
    it("tracks artwork click", () => {
      const wrapper = getWrapper({
        Viewer: () => ({
          artworksConnection: {
            edges: [
              {
                node: {
                  internalID: "test-internal-id",
                  title: "Test Auction",
                  slug: "test-href",
                  href: "test-href",
                },
              },
            ],
          },
        }),
      })

      wrapper.find("Shelf").find("RouterLink").first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "auctionLots",
        context_page_owner_type: "home",
        destination_page_owner_id: "test-internal-id",
        destination_page_owner_slug: "test-href",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      const wrapper = getWrapper({
        Viewer: () => ({
          artworksConnection: {
            edges: [
              {
                node: {
                  title: "Test Auction",
                  href: "test-href",
                },
              },
            ],
          },
        }),
      })

      wrapper.find("RouterLink").first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "auctionLots",
        context_page_owner_type: "home",
        destination_page_owner_type: "auctions",
        type: "viewAll",
      })
    })
  })
})
