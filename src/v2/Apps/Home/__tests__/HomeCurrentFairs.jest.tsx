import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeCurrentFairsFragmentContainer } from "../Components/HomeCurrentFairs"
import { HomeCurrentFairs_Test_Query } from "v2/__generated__/HomeCurrentFairs_Test_Query.graphql"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { getWrapper } = setupTestWrapper<HomeCurrentFairs_Test_Query>({
  Component: props => {
    return <HomeCurrentFairsFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeCurrentFairs_Test_Query @relay_test_operation {
      viewer {
        ...HomeCurrentFairs_viewer
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

describe("HomeCurrentFairs", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Viewer: () => ({
        fairs: [
          {
            name: "Test Fair",
            href: "/fair/test-href",
          },
        ],
      }),
    })

    expect(wrapper.text()).toContain("Current Fairs")
    expect(wrapper.text()).toContain("View All Fairs")
    expect(wrapper.text()).toContain("Test Fair")
    expect(wrapper.html()).toContain("/fair/test-href")
  })

  it("returns null when no data is received", () => {
    const wrapper = getWrapper({
      Viewer: () => ({
        fairs: null,
      }),
    })

    expect(wrapper.isEmptyRender()).toBe(true)
  })

  describe("tracking", () => {
    it("tracks item clicks", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").last().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedFairGroup",
        context_module: "fairRail",
        context_page_owner_type: "home",
        destination_page_owner_id: '<mock-value-for-field-"internalID">',
        destination_page_owner_slug: '<mock-value-for-field-"slug">',
        destination_page_owner_type: "fair",
        type: "thumbnail",
      })
    })

    it("tracks view all", () => {
      const wrapper = getWrapper()
      wrapper.find("RouterLink").first().simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedFairGroup",
        context_module: "fairRail",
        context_page_owner_type: "home",
        destination_page_owner_type: "fairs",
        type: "viewAll",
      })
    })
  })
})
