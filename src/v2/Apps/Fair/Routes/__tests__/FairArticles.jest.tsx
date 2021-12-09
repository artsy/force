import { FairArticlesPaginationContainer } from "../FairArticles"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairArticlesPaginationContainer,
  query: graphql`
    query FairArticles_test_Query($id: String!, $first: Int!, $after: String)
      @relay_test_operation {
      fair(id: $id) {
        ...FairArticles_fair @arguments(first: $first, after: $after)
      }
    }
  `,
  variables: {
    id: "example",
    first: 10,
  },
})

describe("FairArticles", () => {
  it("renders the articles", () => {
    const wrapper = getWrapper({
      Article: () => ({ title: "Example Article" }),
      Author: () => ({ name: "Example Author" }),
    })

    const html = wrapper.html()

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(html).toContain("Example Article")
    expect(html).toContain("Example Author")
  })

  it("renders an empty state when there are no articles", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        articlesConnection: {
          totalCount: 0,
          edges: [],
        },
      }),
    })

    const html = wrapper.html()

    expect(html).not.toContain("Example Article")
    expect(html).not.toContain("Example Author")
    expect(html).toContain("There aren’t any articles at this time.")
  })
})
