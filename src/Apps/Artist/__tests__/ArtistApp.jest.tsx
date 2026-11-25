import { screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ArtistApp } from "Apps/Artist/ArtistApp"
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
  ArtistHeaderFragmentContainer: () => <div data-testid="artist-header" />,
}))

jest.mock("../Components/ArtistStoryHeader/ArtistStoryHeader", () => ({
  ArtistStoryHeader: () => <div data-testid="artist-story-header" />,
}))

jest.mock("../Components/ArtistBackLink.tsx", () => ({
  ArtistBackLinkFragmentContainer: () => null,
}))

describe("ArtistApp", () => {
  const mockfindCurrentRoute = findCurrentRoute as jest.Mock
  const mockUseFlag = useFlag as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL<ArtistAppTestQuery>({
    Component: ArtistApp,
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

  describe("header", () => {
    beforeEach(() => {
      mockfindCurrentRoute.mockImplementation(() => ({}))
    })

    afterEach(() => {
      mockUseFlag.mockReturnValue(false)
    })

    const COVER_ARTWORK = {
      imageTitle: "Cover artwork",
      image: { src: "https://example.com/cover.jpg", width: 800, height: 1000 },
    }

    const renderWithArtist = (artist: Record<string, unknown>) => {
      return renderWithRelay(
        {
          Artist: () => ({
            featuredStory: null,
            coverArtwork: null,
            ...artist,
          }),
        },
        { match: { params: { artworkId: undefined } } },
      )
    }

    describe("with the fireworksq4_artist-story flag on", () => {
      beforeEach(() => {
        mockUseFlag.mockImplementation(
          flag => flag === "fireworksq4_artist-story",
        )
      })

      it("shows the Story header for an artist with an image, even without a Story", () => {
        renderWithArtist({ coverArtwork: COVER_ARTWORK })

        expect(screen.getByTestId("artist-story-header")).toBeInTheDocument()
        expect(screen.queryByTestId("artist-header")).not.toBeInTheDocument()
      })

      it("keeps today's header for an artist with no image", () => {
        renderWithArtist({})

        expect(screen.getByTestId("artist-header")).toBeInTheDocument()
        expect(
          screen.queryByTestId("artist-story-header"),
        ).not.toBeInTheDocument()
      })
    })

    describe("with the flag off", () => {
      it("shows today's header even with an image", () => {
        renderWithArtist({ coverArtwork: COVER_ARTWORK })

        expect(screen.getByTestId("artist-header")).toBeInTheDocument()
        expect(
          screen.queryByTestId("artist-story-header"),
        ).not.toBeInTheDocument()
      })
    })
  })
})
