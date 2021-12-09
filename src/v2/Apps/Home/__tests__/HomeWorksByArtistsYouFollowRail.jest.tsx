import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeWorksByArtistsYouFollowRailFragmentContainer } from "../Components/HomeWorksByArtistsYouFollowRail"
import { HomeWorksByArtistsYouFollowRail_Test_Query } from "v2/__generated__/HomeWorksByArtistsYouFollowRail_Test_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { getWrapper } = setupTestWrapper<
  HomeWorksByArtistsYouFollowRail_Test_Query
>({
  Component: props => {
    return (
      <HomeWorksByArtistsYouFollowRailFragmentContainer
        homePage={props.homePage!}
      />
    )
  },
  query: graphql`
    query HomeWorksByArtistsYouFollowRail_Test_Query @relay_test_operation {
      homePage {
        ...HomeWorksByArtistsYouFollowRail_homePage
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

describe("HomeWorksByArtistsYouFollowRail", () => {
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
        context_module: "worksByArtistsYouFollowRail",
        context_page_owner_type: "home",
        destination_page_owner_id: '<mock-value-for-field-"internalID">',
        destination_page_owner_slug: '<mock-value-for-field-"slug">',
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
