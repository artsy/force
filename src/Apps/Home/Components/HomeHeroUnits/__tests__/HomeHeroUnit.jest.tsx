import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { HomeHeroUnit_Test_Query } from "__generated__/HomeHeroUnit_Test_Query.graphql"
import { HomeHeroUnitFragmentContainer } from "Apps/Home/Components/HomeHeroUnits/HomeHeroUnit"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-head", () => ({
  Link: () => null,
}))
jest.mock("react-tracking")

const { getWrapper } = setupTestWrapper<HomeHeroUnit_Test_Query>({
  Component: props => {
    return (
      <HomeHeroUnitFragmentContainer
        heroUnit={props.homePage!.heroUnits?.[0]!}
        layout="a"
        index={0}
      />
    )
  },
  query: graphql`
    query HomeHeroUnit_Test_Query @relay_test_operation {
      homePage {
        heroUnits(platform: DESKTOP) {
          ...HomeHeroUnit_heroUnit
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

describe("HomeHeroUnit", () => {
  it("tracks on click", () => {
    const wrapper = getWrapper()
    wrapper.find("RouterLink").forEach(link => {
      link.simulate("click")
      expect(trackEvent).toBeCalledWith({
        action: "clickedPromoSpace",
        context_module: "banner",
        context_screen_owner_type: "home",
        destination_path: '<mock-value-for-field-"href">',
        subject: "clicking on the promo banner",
      })
    })
  })
})
