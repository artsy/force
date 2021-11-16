import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeFeaturedGalleriesRailFragmentContainer } from "../Components/HomeFeaturedGalleriesRail"
import { HomeFeaturedGalleriesRail_Test_Query } from "v2/__generated__/HomeFeaturedGalleriesRail_Test_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { getWrapper } = setupTestWrapper<HomeFeaturedGalleriesRail_Test_Query>({
  Component: props => {
    return (
      <HomeFeaturedGalleriesRailFragmentContainer
        orderedSet={props.orderedSet!}
      />
    )
  },
  query: graphql`
    query HomeFeaturedGalleriesRail_Test_Query {
      orderedSet(id: "example") {
        ...HomeFeaturedGalleriesRail_orderedSet
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

describe("HomeFeaturedGalleriesRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Partner: () => ({
        name: "Test Gallery",
        href: "/test-href",
      }),
    })

    expect(wrapper.text()).toContain("Featured Galleries")
    expect(wrapper.text()).toContain("View All Galleries")
    expect(wrapper.text()).toContain("Test Gallery")
    expect(wrapper.text()).toContain("Following")
    expect(wrapper.html()).toContain("test-href")
  })

  it("shows initials if no images", () => {
    const wrapper = getWrapper({
      Profile: () => ({
        owner: {
          initials: "initials",
        },
        image: {
          cropped: {
            src: null,
          },
        },
      }),
    })

    expect(wrapper.html()).toContain("initials")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").last().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedGalleryGroup",
        context_module: "featuredGalleriesRail",
        context_page_owner_type: "home",
        destination_page_owner_id: '<mock-value-for-field-"internalID">',
        destination_page_owner_slug: '<mock-value-for-field-"slug">',
        destination_page_owner_type: "galleries",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedGalleryGroup",
        context_module: "featuredGalleriesRail",
        context_page_owner_type: "home",
        destination_page_owner_type: "galleries",
        type: "viewAll",
      })
    })
  })
})
