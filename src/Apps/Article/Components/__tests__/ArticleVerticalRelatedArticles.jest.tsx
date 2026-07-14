import { screen } from "@testing-library/react"
import { ArticleVerticalRelatedArticlesFragmentContainer } from "Apps/Article/Components/ArticleVerticalRelatedArticles"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticleVerticalRelatedArticlesFragmentContainer,
  query: graphql`
    query ArticleVerticalRelatedArticles_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleVerticalRelatedArticles_article
      }
    }
  `,
})

describe("ArticleVerticalRelatedArticles", () => {
  it("renders a related article with a vertical-specific heading", () => {
    renderWithRelay({
      Article: () => ({
        vertical: "Art Market",
        verticalRelatedArticles: [{}],
      }),
    })

    expect(screen.getAllByRole("link")).toHaveLength(1)
    expect(screen.getByText(/Further Reading in/)).toBeInTheDocument()
  })

  it("renders nothing when there are no related articles", () => {
    const { container } = renderWithRelay({
      Article: () => ({
        verticalRelatedArticles: [],
      }),
    })

    expect(container).toBeEmptyDOMElement()
  })
})
