import { FairArticlesPaginationContainer } from "Apps/Fair/Routes/FairArticles"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairArticlesPaginationContainer,
  query: graphql`
    query FairArticles_test_Query($id: String!, $page: Int!)
      @relay_test_operation {
      fair(id: $id) {
        ...FairArticles_fair @arguments(page: $page)
      }
    }
  `,
})

describe("FairArticles", () => {
  it("renders the articles", () => {
    const { wrapper } = getWrapper({
      Article: () => ({
        thumbnailTitle: "Example Article",
        byline: "Example Author",
      }),
    })

    const html = wrapper.html()

    expect(html).toContain("Example Article")
    expect(html).toContain("Example Author")
  })

  it("renders an empty state when there are no articles", () => {
    const { wrapper } = getWrapper({
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
