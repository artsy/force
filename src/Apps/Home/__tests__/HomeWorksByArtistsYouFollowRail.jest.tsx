import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { HomeWorksByArtistsYouFollowRailFragmentContainer } from "Apps/Home/Components/HomeWorksByArtistsYouFollowRail"
import { HomeWorksByArtistsYouFollowRail_Test_Query } from "__generated__/HomeWorksByArtistsYouFollowRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

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

beforeAll(() => {
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
        destination_page_owner_id: "<Artwork-mock-id-1>",
        destination_page_owner_slug: "<Artwork-mock-id-2>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
