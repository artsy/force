import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeRecentlyViewedRailFragmentContainer } from "../Components/HomeRecentlyViewedRail"
import { HomeRecentlyViewedRail_Test_Query } from "v2/__generated__/HomeRecentlyViewedRail_Test_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { getWrapper } = setupTestWrapper<HomeRecentlyViewedRail_Test_Query>({
  Component: props => {
    return (
      <HomeRecentlyViewedRailFragmentContainer homePage={props.homePage!} />
    )
  },
  query: graphql`
    query HomeRecentlyViewedRail_Test_Query {
      homePage {
        ...HomeRecentlyViewedRail_homePage
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

describe("HomeRecentlyViewedRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      HomePage: () => ({
        artworkModule: {
          results: [
            {
              title: "Test Artist",
              href: "test-href",
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Test Artist")
    expect(wrapper.html()).toContain("test-href")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "recentlyViewedRail",
        context_page_owner_type: "home",
        destination_page_owner_id: '<mock-value-for-field-"internalID">',
        destination_page_owner_slug: '<mock-value-for-field-"slug">',
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
