import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeFeaturedMarketNewsFragmentContainer } from "../Components/HomeFeaturedMarketNews"
import { HomeFeaturedMarketNews_Test_Query } from "v2/__generated__/HomeFeaturedMarketNews_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeFeaturedMarketNews_Test_Query>({
  Component: HomeFeaturedMarketNewsFragmentContainer,
  query: graphql`
    query HomeFeaturedMarketNews_Test_Query {
      articles {
        ...HomeFeaturedMarketNews_articles
      }
    }
  `,
})

describe("HomeFeaturedMarketNews", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Article: () => ({
        href: "/article/example-article",
        title: "Example Article",
        publishedAt: "Jun 23, 2021",
      }),
    })

    expect(wrapper.text()).toContain("Market News")
    expect(wrapper.text()).toContain("Explore Editorial")
    expect(wrapper.html()).toContain("/article/example-article")
  })
})
