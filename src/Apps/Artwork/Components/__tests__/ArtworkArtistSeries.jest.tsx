import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtworkArtistSeriesFragmentContainer } from "Apps/Artwork/Components/ArtworkArtistSeries"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"

jest.mock("react-tracking")
jest.unmock("react-relay")
jest.mock(
  "Apps/Artwork/Components/ArtworkArtistSeries/ArtistSeriesArtworkRail",
  () => ({
    ArtistSeriesArtworkRailFragmentContainer: () => (
      <div>ArtistSeriesArtworkRail</div>
    ),
  })
)
jest.mock("Components/ArtistSeriesRail/ArtistSeriesRail", () => ({
  ArtistSeriesRailFragmentContainer: () => <div>ArtistSeriesRail</div>,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtworkArtistSeriesFragmentContainer,
  query: graphql`
    query ArtworkArtistSeries_Query @relay_test_operation {
      artwork(id: "example") {
        ...ArtworkArtistSeries_artwork
      }
    }
  `,
})

describe("ArtworkArtistSeries", () => {
  let trackEvent
  beforeAll(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("includes both rails when there is data", () => {
    renderWithRelay()

    expect(screen.getByText("ArtistSeriesArtworkRail")).toBeInTheDocument()
    expect(screen.getByText("ArtistSeriesRail")).toBeInTheDocument()
  })

  it("includes just the series rail if there are no artworks", async () => {
    renderWithRelay({
      Artwork: () => ({
        seriesForCounts: { edges: [{ node: { artworksCount: 0 } }] },
      }),
    })

    expect(screen.getByText("ArtistSeriesRail")).toBeInTheDocument()
    expect(
      screen.queryByText("ArtistSeriesArtworkRail")
    ).not.toBeInTheDocument()
  })

  it("includes just series if the artist has any", async () => {
    renderWithRelay({
      Artwork: () => ({
        artistSeriesConnection: null,
        seriesForCounts: null,
      }),
    })

    expect(screen.getByText("ArtistSeriesRail")).toBeInTheDocument()
    expect(
      screen.queryByText("ArtistSeriesArtworkRail")
    ).not.toBeInTheDocument()
  })

  it("is null if there is no series or artworks", async () => {
    renderWithRelay({
      Artwork: () => ({
        artistSeriesConnection: null,
        seriesForCounts: null,
        seriesArtist: {
          id: "series-artist-relay",
          artistSeriesConnection: {
            edges: [],
          },
        },
      }),
    })

    expect(screen.queryByText("ArtistSeriesRail")).not.toBeInTheDocument()
    expect(
      screen.queryByText("ArtistSeriesArtworkRail")
    ).not.toBeInTheDocument()
  })
})
