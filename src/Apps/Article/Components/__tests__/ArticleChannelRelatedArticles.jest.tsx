import { screen } from "@testing-library/react"
import { ArticleChannelRelatedArticlesFragmentContainer } from "Apps/Article/Components/ArticleChannelRelatedArticles"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticleChannelRelatedArticlesFragmentContainer,
  query: graphql`
    query ArticleChannelRelatedArticles_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleChannelRelatedArticles_article
      }
    }
  `,
})

describe("ArticleChannelRelatedArticles", () => {
  it("renders a related article with a channel-specific heading", () => {
    renderWithRelay({
      Article: () => ({
        channelArticles: [{}],
      }),
    })

    expect(screen.getAllByRole("link")).toHaveLength(1)
    expect(screen.getByText(/More From/)).toBeInTheDocument()
  })

  it("renders nothing when there are no related articles", () => {
    const { container } = renderWithRelay({
      Article: () => ({
        channelArticles: [],
      }),
    })

    expect(container).toBeEmptyDOMElement()
  })
})
