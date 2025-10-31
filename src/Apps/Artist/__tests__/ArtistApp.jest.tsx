import { screen } from "@testing-library/react"
import { ArtistAppFragmentContainer } from "Apps/Artist/ArtistApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"
import type { ArtistAppTestQuery } from "__generated__/ArtistAppTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Router/Utils/routeUtils")

jest.mock("Apps/Artist/Components/ArtistMeta/ArtistMeta", () => ({
  ArtistMetaFragmentContainer: () => null,
}))

jest.mock("../Components/ArtistHeader/ArtistHeader", () => ({
  ArtistHeaderFragmentContainer: () => null,
}))

jest.mock("../Components/ArtistBackLink.tsx", () => ({
  ArtistBackLinkFragmentContainer: () => null,
}))

describe("ArtistApp", () => {
  const mockfindCurrentRoute = findCurrentRoute as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL<ArtistAppTestQuery>({
    Component: ArtistAppFragmentContainer,
    query: graphql`
      query ArtistAppTestQuery @relay_test_operation {
        artist(id: "example") {
          ...ArtistApp_artist
        }
      }
    `,
  })

  describe("for default routes", () => {
    it("renders core layout elements", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))

      const { container } = renderWithRelay(
        {
          Artist: () => ({
            statuses: {
              auctionLots: true,
              artworks: true,
            },
          }),
        },
        { match: { params: { artworkId: undefined } } },
      )

      // The app-level shell renders a jump target for nested routes
      expect(
        container.querySelector("#JUMP--artistContentArea"),
      ).toBeInTheDocument()
    })

    it("does not render navigation tabs at the app level", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
      renderWithRelay(
        {
          Artist: () => ({
            slug: "artist-slug",
            statuses: {
              auctionLots: true,
              artworks: true,
            },
          }),
        },
        { match: { params: { artworkId: undefined } } },
      )

      expect(
        screen.queryByRole("link", { name: "Artworks" }),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("link", { name: "Auction Results" }),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("link", { name: "About" }),
      ).not.toBeInTheDocument()
    })
  })
})
