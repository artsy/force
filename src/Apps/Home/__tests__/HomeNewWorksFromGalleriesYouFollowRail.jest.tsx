import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { HomeNewWorksFromGalleriesYouFollowRailFragmentContainer } from "Apps/Home/Components/HomeNewWorksFromGalleriesYouFollowRail"
import { HomeNewWorksFromGalleriesYouFollowRail_Test_Query } from "__generated__/HomeNewWorksFromGalleriesYouFollowRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<
  HomeNewWorksFromGalleriesYouFollowRail_Test_Query
>({
  Component: props => {
    return (
      <HomeNewWorksFromGalleriesYouFollowRailFragmentContainer
        newWorksFromGalleriesYouFollowConnection={
          props.me?.newWorksFromGalleriesYouFollowConnection!
        }
      />
    )
  },
  query: graphql`
    query HomeNewWorksFromGalleriesYouFollowRail_Test_Query
      @relay_test_operation {
      me {
        newWorksFromGalleriesYouFollowConnection(first: 20) {
          ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection
        }
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

describe("HomeNewWorksFromGalleriesYouFollowRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper()

    expect(wrapper.html()).toContain("/new-works-from-galleries-you-follow")

    expect(wrapper.text()).toContain("title")
  })

  describe("tracking", () => {
    it("tracks view all clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").at(1).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "newWorksByGalleriesYouFollowRail",
        destination_page_owner_type: "newWorksFromGalleriesYouFollow",
        type: "viewAll",
      })
    })

    it("tracks item clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").at(2).simulate("click")

      expect(trackEvent).toBeCalledWith({
        action: "clickedArtworkGroup",
        context_module: "newWorksByGalleriesYouFollowRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Artwork-mock-id-1>",
        destination_page_owner_slug: "<Artwork-mock-id-2>",
        destination_page_owner_type: "artwork",
        type: "thumbnail",
      })
    })
  })
})
