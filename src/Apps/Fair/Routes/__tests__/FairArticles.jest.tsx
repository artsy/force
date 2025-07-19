import { FairArticlesPaginationContainer } from "Apps/Fair/Routes/FairArticles"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairArticles_test_Query } from "__generated__/FairArticles_test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FairArticles_test_Query>({
  Component: ({ fair }) => <FairArticlesPaginationContainer fair={fair!} />,
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
