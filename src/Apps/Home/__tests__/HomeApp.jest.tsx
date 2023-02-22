import { graphql } from "react-relay"
import { MockBoot } from "DevTools"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { HomeAppFragmentContainer } from "Apps/Home/HomeApp"
import { HomeApp_Test_Query } from "__generated__/HomeApp_Test_Query.graphql"
import { useSystemContext } from "System/useSystemContext"
import { useTracking } from "react-tracking"

jest.mock("System/useSystemContext")
jest.mock("react-tracking")
jest.unmock("react-relay")

const mockuseSystemContext = useSystemContext as jest.Mock

const trackEvent = jest.fn()

beforeAll(() => {
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
