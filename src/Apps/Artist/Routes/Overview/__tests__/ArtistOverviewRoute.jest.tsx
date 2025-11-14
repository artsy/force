import { ArtistOverviewRouteFragmentContainer } from "Apps/Artist/Routes/Overview/ArtistOverviewRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
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
            description: "Description 1",
            label: "Label 1",
            kind: "KIND",
          },
          {
            entities: ["example"],
            description: "Description 2",
            label: "Label 2",
            kind: "KIND",
          },
          {
            entities: ["example"],
            description: "Description 3",
            label: "Label 3",
            kind: "KIND",
          },
          {
            entities: ["example"],
            description: "Description 4",
            label: "Label 4",
            kind: "KIND",
          },
          {
            entities: ["example"],
            description: "Description 5",
            label: "Label 5",
            kind: "KIND",
          },
        ],
        artistSeriesConnection: { totalCount: 1 },
        articlesConnection: { totalCount: 1 },
        counts: { articles: 1, relatedArtists: 1 },
        showsConnection: { totalCount: 1 },
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
        meta: { title: "title", description: "description" },
        filterArtworksConnection: { edges: [] },
        insights: [],
        artistSeriesConnection: { totalCount: 0 },
        showsConnection: { totalCount: 0 },
        counts: { articles: 0, relatedArtists: 0 },
        related: { genes: { edges: [] } },
      }),
    })

    expect(
      screen.getByText(
        "We’ll update this area when more information is available.",
      ),
    ).toBeInTheDocument()
  })
})
