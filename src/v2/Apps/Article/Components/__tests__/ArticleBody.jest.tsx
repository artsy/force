import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { ArticleBodyFragmentContainer } from "../ArticleBody"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticleBodyFragmentContainer,
  query: graphql`
    query ArticleBody_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleBody_article
      }
    }
  `,
})

describe("ArticleBody", () => {
  it("renders the article", () => {
    renderWithRelay({
      Article: () => ({
        publishedAt: "March 20th, 2020",
        byline: "Example Author",
      }),
    })

    expect(screen.getByText("March 20th, 2020")).toBeInTheDocument()
    expect(screen.getByText("—Example Author")).toBeInTheDocument()
  })
})
