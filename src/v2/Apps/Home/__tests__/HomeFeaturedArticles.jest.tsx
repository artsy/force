import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeFeaturedArticlesFragmentContainer } from "../Components/HomeFeaturedArticles"
import { HomeFeaturedArticles_Test_Query } from "v2/__generated__/HomeFeaturedArticles_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeFeaturedArticles_Test_Query>({
  Component: HomeFeaturedArticlesFragmentContainer,
  query: graphql`
    query HomeFeaturedArticles_Test_Query {
      articles {
        ...HomeFeaturedArticles_articles
      }
    }
  `,
})

describe("HomeFeaturedArticles", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Article: () => ({
        href: "/article/example-article",
        title: "Example Article",
        publishedAt: "Jun 23, 2021",
      }),
    })

    expect(wrapper.text()).toContain("Artsy editorial")
    expect(wrapper.text()).toContain("Explore editorial")
    expect(wrapper.html()).toContain("/article/example-article")
  })
})
