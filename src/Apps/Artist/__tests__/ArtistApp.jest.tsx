import { screen } from "@testing-library/react"
import { ArtistAppFragmentContainer } from "Apps/Artist/ArtistApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { findCurrentRoute } from "System/Router/Utils/routeUtils"
import type { ArtistApp_Test_Query } from "__generated__/ArtistApp_Test_Query.graphql"
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

  const { renderWithRelay } = setupTestWrapperTL<ArtistApp_Test_Query>({
    Component: ArtistAppFragmentContainer,
    query: graphql`
      query ArtistApp_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistApp_artist
        }
      }
    `,
  })

  describe("for default routes", () => {
    it("renders correct components", () => {
      mockfindCurrentRoute.mockImplementation(() => ({}))

      renderWithRelay(
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

      expect(screen.getByText("Artworks")).toBeInTheDocument()
      expect(screen.getByText("Auction Results")).toBeInTheDocument()
      expect(screen.getByText("About")).toBeInTheDocument()
    })

    it("tabs navigate to the correct urls", () => {
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

      expect(screen.getByRole("link", { name: "Artworks" })).toHaveAttribute(
        "href",
        "/artist/artist-slug",
      )
      expect(
        screen.getByRole("link", { name: "Auction Results" }),
      ).toHaveAttribute("href", "/artist/artist-slug/auction-results")
      expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
        "href",
        "/artist/artist-slug/about",
      )
    })
  })
})
