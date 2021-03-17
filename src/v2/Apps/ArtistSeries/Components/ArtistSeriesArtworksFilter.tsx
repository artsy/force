import { ArtistSeriesArtworksFilter_artistSeries } from "v2/__generated__/ArtistSeriesArtworksFilter_artistSeries.graphql"
import { BaseArtworkFilter } from "v2/Components/v2/ArtworkFilter"
import { ArtworkFilterContextProvider } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"
import { Match, RouterState, withRouter } from "found"
import React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"

interface ArtistSeriesArtworksFilterProps {
  artistSeries: ArtistSeriesArtworksFilter_artistSeries
  relay: RelayRefetchProp
  match?: Match
}

const ArtistSeriesArtworksFilter: React.FC<ArtistSeriesArtworksFilterProps> = props => {
  const { match, relay, artistSeries } = props
  const { filtered_artworks } = artistSeries

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      sortOptions={[
        { value: "-decayed_merch", text: "Default" },
        { value: "-has_price,-prices", text: "Price (desc.)" },
        { value: "-has_price,prices", text: "Price (asc.)" },
        { value: "-partner_updated_at", text: "Recently updated" },
        { value: "-published_at", text: "Recently added" },
        { value: "-year", text: "Artwork year (desc.)" },
        { value: "year", text: "Artwork year (asc.)" },
      ]}
      onChange={updateUrl}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={artistSeries}
        relayVariables={{
          aggregations: ["TOTAL"],
          first: 20,
        }}
      ></BaseArtworkFilter>
    </ArtworkFilterContextProvider>
  )
}

export const ArtistSeriesArtworksFilterRefetchContainer = createRefetchContainer(
  withRouter<ArtistSeriesArtworksFilterProps & RouterState>(
    ArtistSeriesArtworksFilter
  ),
  {
    artistSeries: graphql`
      fragment ArtistSeriesArtworksFilter_artistSeries on ArtistSeries
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        filtered_artworks: filterArtworksConnection(input: $input) {
          id
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ArtistSeriesArtworksFilterQuery(
      $input: FilterArtworksInput
      $slug: ID!
    ) {
      artistSeries(id: $slug) {
        ...ArtistSeriesArtworksFilter_artistSeries @arguments(input: $input)
      }
    }
  `
)
