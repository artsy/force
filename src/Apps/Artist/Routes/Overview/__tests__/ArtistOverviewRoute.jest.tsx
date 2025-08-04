import { screen } from "@testing-library/react"
import { ArtistOverviewRouteFragmentContainer } from "Apps/Artist/Routes/Overview/ArtistOverviewRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistOverviewRouteFragmentContainer,
  query: graphql`
    query ArtistOverviewRoute_Test_Query {
      artist(id: "test") {
        ...ArtistOverviewRoute_artist
      }
    }
  `,
})

jest.mock("../Components/ArtistCareerHighlights", () => ({
  ArtistCareerHighlightsQueryRenderer: () => <div>ArtistCareerHighlights</div>,
}))

jest.mock("Components/ArtistSeriesRail/ArtistSeriesRail", () => ({
  ArtistSeriesRailQueryRenderer: () => <div>ArtistSeriesRail</div>,
}))

jest.mock("../Components/ArtistEditorialNewsGrid", () => ({
  ArtistEditorialNewsGridQueryRenderer: () => (
    <div>ArtistEditorialNewsGrid</div>
  ),
}))

jest.mock("../Components/ArtistCurrentShowsRail", () => ({
  ArtistCurrentShowsRailQueryRenderer: () => <div>ArtistCurrentShowsRail</div>,
}))

jest.mock("../Components/ArtistRelatedArtistsRail", () => ({
  ArtistRelatedArtistsRailQueryRenderer: () => (
    <div>ArtistRelatedArtistsRail</div>
  ),
}))

jest.mock("../Components/ArtistRelatedGeneCategories", () => ({
  ArtistRelatedGeneCategoriesQueryRenderer: () => (
    <div>ArtistRelatedGeneCategories</div>
  ),
}))

describe("ArtistOverviewRoute", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
        nationality: "American",
        birthday: "1990-01-01",
        deathday: null,
        alternateNames: ["Alt Name"],
        href: "/artist/artistslug",
        isInSeoExperiment: false,
        meta: { title: "Artist Name", description: "Artist description" },
        coverArtwork: {
          image: { large: "https://example.com/image.jpg" },
        },
        filterArtworksConnection: {
          edges: [
            {
              node: {
                internalID: "1234",
              },
            },
          ],
        },
        insights: [
          {
            entities: ["example"],
            description: "Description",
            label: "Label",
            kind: "KIND",
          },
        ],
        artistSeriesConnection: { totalCount: 1 },
        articlesConnection: { totalCount: 1 },
        showsConnection: { totalCount: 1 },
        counts: { artworks: "100", relatedArtists: 5, articles: 3 },
        related: { genes: { edges: [{ node: { __typename: "Gene" } }] } },
      }),
    })

    expect(screen.getByText("ArtistCareerHighlights")).toBeInTheDocument()
    expect(screen.getByText("ArtistSeriesRail")).toBeInTheDocument()
    expect(screen.getByText("ArtistEditorialNewsGrid")).toBeInTheDocument()
    expect(screen.getByText("ArtistCurrentShowsRail")).toBeInTheDocument()
    expect(screen.getByText("ArtistRelatedArtistsRail")).toBeInTheDocument()
    expect(screen.getByText("ArtistRelatedGeneCategories")).toBeInTheDocument()
  })

  it("renders empty state", () => {
    renderWithRelay({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
        nationality: null,
        birthday: null,
        deathday: null,
        alternateNames: [],
        href: "/artist/artistslug",
        isInSeoExperiment: false,
        meta: { title: "title", description: "description" },
        coverArtwork: null,
        filterArtworksConnection: { edges: [] },
        insights: [],
        artistSeriesConnection: { totalCount: 0 },
        showsConnection: { totalCount: 0 },
        counts: { articles: 0, relatedArtists: 0, artworks: null },
        related: { genes: { edges: [] } },
      }),
    })

    expect(
      screen.getByText(
        "We‘ll update this page when more information is available.",
      ),
    ).toBeInTheDocument()
  })
})
