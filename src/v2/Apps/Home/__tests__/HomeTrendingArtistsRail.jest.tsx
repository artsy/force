import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeTrendingArtistsRailFragmentContainer } from "../Components/HomeTrendingArtistsRail"
import { HomeTrendingArtistsRail_Test_Query } from "v2/__generated__/HomeTrendingArtistsRail_Test_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Components/FollowButton/FollowArtistButton", () => ({
  FollowArtistButtonQueryRenderer: () => <>Following</>,
}))

const { getWrapper } = setupTestWrapper<HomeTrendingArtistsRail_Test_Query>({
  Component: props => {
    return <HomeTrendingArtistsRailFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeTrendingArtistsRail_Test_Query @relay_test_operation {
      viewer {
        ...HomeTrendingArtistsRail_viewer
      }
    }
  `,
})

const trackEvent = jest.fn()

beforeEach(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomeTrendingArtistsRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artist: () => ({
        name: "Test Artist",
        href: "test-href",
      }),
    })

    expect(wrapper.text()).toContain("Trending Artists on Artsy")
    expect(wrapper.text()).toContain("View All Artists")
    expect(wrapper.text()).toContain("Test Artist")
    expect(wrapper.text()).toContain("Following")
    expect(wrapper.html()).toContain("test-href")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      const wrapper = getWrapper({
        Artist: () => ({
          internalID: "test-artist-id",
          slug: "test-artist-slug",
        }),
      })

      wrapper.find("RouterLink").last().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtistGroup",
        context_module: "trendingArtistsRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "test-artist-id",
        destination_page_owner_slug: "test-artist-slug",
        destination_page_owner_type: "artist",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      const wrapper = getWrapper()

      wrapper.find("RouterLink").first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtistGroup",
        context_module: "trendingArtistsRail",
        context_page_owner_type: "home",
        destination_page_owner_type: "artists",
        type: "viewAll",
      })
    })
  })
})
