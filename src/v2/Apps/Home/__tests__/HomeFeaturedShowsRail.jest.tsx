import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeFeaturedShowsRailFragmentContainer } from "../Components/HomeFeaturedShowsRail"
import { HomeFeaturedShowsRail_Test_Query } from "v2/__generated__/HomeFeaturedShowsRail_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeFeaturedShowsRail_Test_Query>({
  Component: HomeFeaturedShowsRailFragmentContainer,
  query: graphql`
    query HomeFeaturedShowsRail_Test_Query {
      orderedSet(id: "example") {
        ...HomeFeaturedShowsRail_orderedSet
      }
    }
  `,
})

describe("HomeFeaturedShowsRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Show: () => ({
        name: "Example Show",
        formattedStartAt: "Jun 9",
        formattedEndAt: "25",
        href: "/show/partner-show",
      }),
      Partner: () => ({
        name: "Example Partner",
      }),
    })

    expect(wrapper.text()).toContain("Featured shows")
    expect(wrapper.text()).toContain("Explore All Shows")
    expect(wrapper.text()).toContain("Example Show")
    expect(wrapper.text()).toContain("Example Partner")
    expect(wrapper.text()).toContain("Jun 9–25")
    expect(wrapper.html()).toContain("/show/partner-show")
  })
})
