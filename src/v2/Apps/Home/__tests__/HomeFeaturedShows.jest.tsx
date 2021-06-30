import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeFeaturedShowsFragmentContainer } from "../Components/HomeFeaturedShows"
import { HomeFeaturedShows_Test_Query } from "v2/__generated__/HomeFeaturedShows_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeFeaturedShows_Test_Query>({
  Component: HomeFeaturedShowsFragmentContainer,
  query: graphql`
    query HomeFeaturedShows_Test_Query {
      orderedSet(id: "example") {
        ...HomeFeaturedShows_orderedSet
      }
    }
  `,
})

describe("HomeFeaturedShows", () => {
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
    expect(wrapper.text()).toContain("Explore all shows")
    expect(wrapper.text()).toContain("Example Show")
    expect(wrapper.text()).toContain("Example Partner")
    expect(wrapper.text()).toContain("Jun 9–25")
    expect(wrapper.html()).toContain("/show/partner-show")
  })
})
