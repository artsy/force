import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { CellArticleFragmentContainer_Test_Query } from "__generated__/CellArticleFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  CellArticleFragmentContainer_Test_Query
>({
  Component: CellArticleFragmentContainer,
  query: graphql`
    query CellArticleFragmentContainer_Test_Query @relay_test_operation {
      article(id: "example") {
        ...CellArticle_article
      }
    }
  `,
})

describe("CellArticle", () => {
  it("renders the component", () => {
    renderWithRelay({
      Article: () => ({
        vertical: "Art",
        thumbnailTitle: "Example Article",
        byline: "Artsy Editorial",
      }),
    })

    expect(screen.getByText("Art")).toBeInTheDocument()
    expect(screen.getByText("Example Article")).toBeInTheDocument()
    expect(screen.getByText("By Artsy Editorial")).toBeInTheDocument()
  })
})
