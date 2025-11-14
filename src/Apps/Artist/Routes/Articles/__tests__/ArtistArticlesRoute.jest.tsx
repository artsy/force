import { ArtistArticlesRouteFragmentContainer } from "Apps/Artist/Routes/Articles/ArtistArticlesRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ArtistArticlesRouteTestQuery } from "__generated__/ArtistArticlesRouteTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("Components/Pagination", () => ({
  PaginationFragmentContainer: () => null,
}))

describe("ArtistArticlesRoute", () => {
  const { renderWithRelay } = setupTestWrapperTL<ArtistArticlesRouteTestQuery>({
    Component: ArtistArticlesRouteFragmentContainer,
    query: graphql`
      query ArtistArticlesRouteTestQuery @relay_test_operation {
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
