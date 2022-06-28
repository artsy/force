import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeNewWorksForYouRailFragmentContainer } from "../Components/HomeNewWorksForYouRail"
import { HomeNewWorksForYouRail_Test_Query } from "v2/__generated__/HomeNewWorksForYouRail_Test_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { getWrapper } = setupTestWrapper<HomeNewWorksForYouRail_Test_Query>({
  Component: props => {
    return (
      <HomeNewWorksForYouRailFragmentContainer
        artworksForUser={props.artworksForUser!}
      />
    )
  },
  query: graphql`
    query HomeNewWorksForYouRail_Test_Query @relay_test_operation {
      artworksForUser(includeBackfill: true, first: 20) {
        ...HomeNewWorksForYouRail_artworksForUser
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

describe("HomeNewWorksForYouRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      ArtworkConnection: () => ({
        edges: [
          {
            node: {
              title: "Test Artist",
              href: "test-href",
            },
          },
        ],
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
        context_module: "newWorksForYouRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Artwork-mock-id-1>",
        destination_page_owner_slug: "<Artwork-mock-id-2>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
