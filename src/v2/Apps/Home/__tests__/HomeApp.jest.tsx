import { graphql } from "relay-runtime"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeAppFragmentContainer } from "../HomeApp"
import { HomeApp_Test_Query } from "v2/__generated__/HomeApp_Test_Query.graphql"
import { useSystemContext } from "v2/System/useSystemContext"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.mock("v2/System/useSystemContext")
jest.mock("v2/System/Analytics/useTracking")
jest.unmock("react-relay")

const mockuseSystemContext = useSystemContext as jest.Mock

const trackEvent = jest.fn()

beforeEach(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  trackEvent.mockClear()
})

describe("HomeApp", () => {
  const { getWrapper } = setupTestWrapper<HomeApp_Test_Query>({
    Component: props => (
      <MockBoot>
        <HomeAppFragmentContainer {...props} />
      </MockBoot>
    ),
    query: graphql`
      query HomeApp_Test_Query @relay_test_operation {
        homePage {
          ...HomeApp_homePage
        }
        featuredEventsOrderedSet: orderedSet(id: "example") {
          ...HomeApp_featuredEventsOrderedSet
        }
      }
    `,
  })

  describe.skip("logged out", () => {
    beforeAll(() => {
      mockuseSystemContext.mockImplementation(() => ({
        mediator: { on: jest.fn() },
        isLoggedIn: false,
      }))
    })

    it("renders the info blurb", () => {
      const wrapper = getWrapper()

      expect(wrapper.text()).toContain(
        "Collect art from leading galleries, fairs, and auctions"
      )

      expect(wrapper.text()).toContain(
        "Sign up to get updates about your favorite artists"
      )
    })

    it("renders the events", () => {
      const wrapper = getWrapper({
        FeaturedLink: () => ({
          title: "Exclusively on Artsy",
          subtitle: "Example Event",
        }),
      })

      expect(wrapper.text()).toContain("Exclusively on Artsy")
      expect(wrapper.text()).toContain("Example Event")
    })
  })

  describe("logged in", () => {
    beforeAll(() => {
      mockuseSystemContext.mockImplementation(() => ({
        mediator: { on: jest.fn() },
        isLoggedIn: true,
      }))
    })

    it("does not render the info blurb", () => {
      const wrapper = getWrapper()

      expect(wrapper.text()).not.toContain(
        "Collect art from leading galleries, fairs, and auctions"
      )

      expect(wrapper.text()).not.toContain(
        "Sign up to get updates about your favorite artists"
      )
    })
  })
})
