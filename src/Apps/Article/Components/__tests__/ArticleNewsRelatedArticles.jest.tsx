import { screen } from "@testing-library/react"
import { ArticleNewsRelatedArticlesFragmentContainer } from "Apps/Article/Components/ArticleNewsRelatedArticles"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticleNewsRelatedArticlesFragmentContainer,
  query: graphql`
    query ArticleNewsRelatedArticles_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleNewsRelatedArticles_article
      }
    }
  `,
})

describe("ArticleNewsRelatedArticles", () => {
  it("renders a related article", () => {
    renderWithRelay({
      Article: () => ({
        newsRelatedArticles: [{}],
      }),
    })

    expect(screen.getAllByRole("link")).toHaveLength(1)
  })

  it("renders nothing when there are no related articles", () => {
    const { container } = renderWithRelay({
      Article: () => ({
        newsRelatedArticles: [],
      }),
    })

    expect(container).toBeEmptyDOMElement()
  })
})
