import { graphql } from "react-relay"
import { ArtistRelatedArtistsRailFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistRelatedArtistsRail"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistRelatedArtistsRailFragmentContainer,
  query: graphql`
    query ArtistRelatedArtistsRail_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistRelatedArtistsRail_artist
      }
    }
  `,
})

describe("ArtistRelatedArtistsRail", () => {
  it("renders the related artists correctly", () => {
    renderWithRelay({
      Artist: () => ({
        related: {
          artistsConnection: [
            {
              slug: "artist-1",
              internalID: "artist-1-id",
              href: "/artist/artist-1",
            },
            {
              slug: "artist-2",
              internalID: "artist-2-id",
              href: "/artist/artist-2",
            },
            {
              slug: "artist-3",
              internalID: "artist-3-id",
              href: "/artist/artist-3",
            },
          ],
        },
      }),
    })

    expect(screen.getByRole("link", { name: "Artist 1" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Artist 2" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Artist 3" })).toBeInTheDocument()
  })

  it("does not render if there are no related artists", () => {
    renderWithRelay({
      Artist: () => ({
        related: { artistsConnection: [] },
      }),
    })

    expect(screen.queryByText("Related Artists")).not.toBeInTheDocument()
  })
})

describe("tracking", () => {
  it("tracks clicks on related artists", () => {
    const trackEvent = jest.fn()
    renderWithRelay({
      Artist: () => ({
        related: {
          artistsConnection: [
            {
              slug: "artist-1",
              internalID: "artist-1-id",
              href: "/artist/artist-1",
            },
          ],
        },
      }),
    })

    screen.getByRole("link", { name: "Artist 1" }).click()

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedArtistGroup",
      context_module: "relatedArtistsRail",
      context_page_owner_id: "example",
      context_page_owner_slug: "example",
      context_page_owner_type: "artist",
      destination_page_owner_id: "artist-1-id",
      destination_page_owner_slug: "artist-1",
      destination_page_owner_type: "artist",
      type: "thumbnail",
    })
  })
})
