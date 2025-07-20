import { FairArticlesPaginationContainer } from "Apps/Fair/Routes/FairArticles"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairArticlesTestQuery } from "__generated__/FairArticlesTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FairArticlesTestQuery>({
  Component: ({ fair }) => <FairArticlesPaginationContainer fair={fair!} />,
  query: graphql`
    query FairArticlesTestQuery($id: String!, $page: Int!)
    @relay_test_operation {
      fair(id: $id) {
        ...FairArticles_fair @arguments(page: $page)
      }
    }
  `,
})

describe("FairArticles", () => {
  it("renders the articles", () => {
    const { container } = renderWithRelay({
      Article: () => ({
        thumbnailTitle: "Example Article",
        byline: "Example Author",
      }),
    })

    const html = container.innerHTML

    expect(html).toContain("Example Article")
    expect(html).toContain("Example Author")
  })

  it("renders an empty state when there are no articles", () => {
    const { container } = renderWithRelay({
      Fair: () => ({
        articlesConnection: {
          totalCount: 0,
          edges: [],
        },
      }),
    })

    const html = container.innerHTML

    expect(html).not.toContain("Example Article")
    expect(html).not.toContain("Example Author")
    expect(container.textContent).toMatch(/There.*any articles.*time/)
  })
})
