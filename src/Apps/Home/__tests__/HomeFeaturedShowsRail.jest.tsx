import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { HomeFeaturedShowsRailFragmentContainer } from "Apps/Home/Components/HomeFeaturedShowsRail"
import { HomeFeaturedShowsRail_Test_Query } from "__generated__/HomeFeaturedShowsRail_Test_Query.graphql"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<HomeFeaturedShowsRail_Test_Query>({
  Component: HomeFeaturedShowsRailFragmentContainer,
  query: graphql`
    query HomeFeaturedShowsRail_Test_Query @relay_test_operation {
      orderedSet(id: "example") {
        ...HomeFeaturedShowsRail_orderedSet
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

describe("HomeFeaturedShowsRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Show: () => ({
        name: "Example Show",
        exhibitionPeriod: "June 9 – 25",
        href: "/show/partner-show",
      }),
      Partner: () => ({
        name: "Example Partner",
      }),
    })

    expect(wrapper.text()).toContain("Featured Shows")
    expect(wrapper.text()).toContain("Explore All Shows")
    expect(wrapper.text()).toContain("Example Show")
    expect(wrapper.text()).toContain("Example Partner")
    expect(wrapper.text()).toContain("June 9 – 25")
    expect(wrapper.html()).toContain("/show/partner-show")
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").last().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedShowGroup",
        context_module: "featuredShowsRail",
        context_page_owner_type: "home",
        destination_page_owner_id: "<Show-mock-id-1>",
        destination_page_owner_slug: "<Show-mock-id-2>",
        destination_page_owner_type: "show",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedShowGroup",
        context_module: "featuredShowsRail",
        context_page_owner_type: "home",
        destination_page_owner_type: "shows",
        type: "viewAll",
      })
    })
  })
})
