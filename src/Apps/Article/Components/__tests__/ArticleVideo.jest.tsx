import { ArticleVideoFragmentContainer } from "Apps/Article/Components/ArticleVideo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("../../useArticleTracking", () => ({
  useArticleTracking: () => ({}),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticleVideoFragmentContainer,
  query: graphql`
    query ArticleVideo_test_Query @relay_test_operation {
      article(id: "example") {
        ...ArticleVideo_article
      }
    }
  `,
})

describe("ArticleVideo", () => {
  it("renders the article", () => {
    renderWithRelay({
      Article: () => ({
        media: {
          description: "Example description",
        },
      }),
    })

    expect(screen.getByText("About the Film")).toBeInTheDocument()
    expect(screen.getByText("Example description")).toBeInTheDocument()
    expect(
      screen.getByText("Presented in Partnership with"),
    ).toBeInTheDocument()
  })
})
