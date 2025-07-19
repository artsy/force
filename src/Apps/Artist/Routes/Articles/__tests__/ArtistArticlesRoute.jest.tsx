import { screen, within } from "@testing-library/react"
import { ArtistArticlesRouteFragmentContainer } from "Apps/Artist/Routes/Articles/ArtistArticlesRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistArticlesRoute_Test_Query } from "__generated__/ArtistArticlesRoute_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/Pagination", () => ({
  PaginationFragmentContainer: () => null,
}))

describe("ArtistArticlesRoute", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<ArtistArticlesRoute_Test_Query>({
      Component: ArtistArticlesRouteFragmentContainer,
      query: graphql`
        query ArtistArticlesRoute_Test_Query @relay_test_operation {
          artist(id: "example") {
            ...ArtistArticlesRoute_artist
          }
        }
      `,
    })

  it("render a zero state if no articles", () => {
    const { container } = renderWithRelay({
      Artist: () => ({
        articlesConnection: { edges: null },
      }),
    })
    expect(container.textContent).toContain("articles at this time")
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Example Artist",
      }),
      Article: () => ({
        thumbnailTitle: "Example Article",
      }),
    })

    expect(screen.getByText("Example Artist Articles")).toBeInTheDocument()
    expect(screen.getByText("Example Article")).toBeInTheDocument()
  })
})
