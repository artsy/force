import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { CellArticleFragmentContainer_Test_Query } from "__generated__/CellArticleFragmentContainer_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<CellArticleFragmentContainer_Test_Query>({
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
