import { screen } from "@testing-library/react"
import { ArtistRecentAuctionResultsProvider } from "Apps/Artist/Components/ArtistRecentAuctionResultsContext"
import { ArtistOverviewFragmentContainer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock(
  "Apps/Artist/Routes/Overview/Components/ArtistCareerHighlights",
  () => ({
    ArtistCareerHighlightsPlaceholder: () => null,
    ArtistCareerHighlightsQueryRenderer: () => {
      return <>Career highlights</>
    },
  }),
)

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    if (props.hasRecentAuctionResults === undefined) {
      return <ArtistOverviewFragmentContainer artist={props.artist} />
    }

    return (
      <ArtistRecentAuctionResultsProvider
        value={{ hasRecentAuctionResults: props.hasRecentAuctionResults }}
      >
        <ArtistOverviewFragmentContainer artist={props.artist} />
      </ArtistRecentAuctionResultsProvider>
    )
  },
  query: graphql`
    query ArtistOverview_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistOverview_artist
      }
    }
  `,
})

const artistWithTwoInsights = {
  insights: [{ __typename: "ArtistInsight" }, { __typename: "ArtistInsight" }],
  articlesConnection: { totalCount: 1 },
  artistSeriesConnection: { totalCount: 0 },
  showsConnection: { totalCount: 0 },
  counts: { relatedArtists: 0 },
  related: { genes: { edges: [] } },
}

describe("ArtistOverview", () => {
  it("shows career highlights the header left out for the auction results rail", () => {
    renderWithRelay(
      { Artist: () => artistWithTwoInsights },
      { hasRecentAuctionResults: true },
    )

    expect(screen.getByText("Career highlights")).toBeInTheDocument()
  })

  it("omits career highlights the header already shows", () => {
    renderWithRelay(
      { Artist: () => artistWithTwoInsights },
      { hasRecentAuctionResults: false },
    )

    expect(screen.queryByText(/Career highlights/)).not.toBeInTheDocument()
  })

  it("assumes the header shows career highlights when there is no provider", () => {
    renderWithRelay({ Artist: () => artistWithTwoInsights })

    expect(screen.queryByText(/Career highlights/)).not.toBeInTheDocument()
  })
})
