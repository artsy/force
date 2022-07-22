import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ArticleSeriesFragmentContainer } from "../ArticleSeries"

jest.unmock("react-relay")

jest.mock("../../useArticleTracking", () => ({
  useArticleTracking: () => ({}),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticleSeriesFragmentContainer,
  query: graphql`
    query ArticleSeries_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleSeries_article
      }
    }
  `,
})

describe("ArticleSeries", () => {
  it("renders the article", () => {
    renderWithRelay({
      Article: () => ({
        title: "Example Series",
        byline: "Artsy Editorial",
        relatedArticles: [],
        series: {
          description: "<p>A description of the series</p>",
        },
      }),
    })

    expect(screen.getByText("Example Series")).toBeInTheDocument()
    expect(screen.getByText("Artsy Editorial")).toBeInTheDocument()
    expect(screen.getByText("A description of the series")).toBeInTheDocument()
  })
})
