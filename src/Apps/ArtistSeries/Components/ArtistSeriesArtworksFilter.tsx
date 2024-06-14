import { ArtistSeriesArtworksFilter_artistSeries$data } from "__generated__/ArtistSeriesArtworksFilter_artistSeries.graphql"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { Match, RouterState, withRouter } from "found"
import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"

interface ArtistSeriesArtworksFilterProps {
  artistSeries: ArtistSeriesArtworksFilter_artistSeries$data
  relay: RelayRefetchProp
  match?: Match
  aggregations: SharedArtworkFilterContextProps["aggregations"]
}

const ArtistSeriesArtworksFilter: React.FC<
  ArtistSeriesArtworksFilterProps & RouterState
> = props => {
  const { userPreferences } = useSystemContext()
  const { match, relay, artistSeries, aggregations } = props
  const { filtered_artworks } = artistSeries

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      aggregations={aggregations}
      sortOptions={[
        { value: "-decayed_merch", text: "Recommended" },
        { value: "-has_price,-prices", text: "Price (High to Low)" },
        { value: "-has_price,prices", text: "Price (Low to High)" },
        { value: "-partner_updated_at", text: "Recently Updated" },
        { value: "-published_at", text: "Recently Added" },
        { value: "-year", text: "Artwork Year (Descending)" },
        { value: "year", text: "Artwork Year (Ascending)" },
      ]}
      onChange={updateUrl}
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={artistSeries}
        relayVariables={{
          aggregations: ["TOTAL"],
          first: 20,
        }}
      />
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
          counts {
            total(format: "0,0")
          }
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
