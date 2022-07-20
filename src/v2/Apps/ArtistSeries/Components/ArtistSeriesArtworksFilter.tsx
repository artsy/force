import { ArtistSeriesArtworksFilter_artistSeries } from "v2/__generated__/ArtistSeriesArtworksFilter_artistSeries.graphql"
import { ArtistSeriesArtworksFilter_me } from "v2/__generated__/ArtistSeriesArtworksFilter_me.graphql"
import { BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { Match, RouterState, withRouter } from "found"
import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { ActiveFilterPills } from "v2/Components/SavedSearchAlert/Components/ActiveFilterPills"
import { getSupportedMetric } from "v2/Components/ArtworkFilter/Utils/metrics"

interface ArtistSeriesArtworksFilterProps {
  artistSeries: ArtistSeriesArtworksFilter_artistSeries
  me: ArtistSeriesArtworksFilter_me | null
  relay: RelayRefetchProp
  match?: Match
  aggregations: SharedArtworkFilterContextProps["aggregations"]
}

const ArtistSeriesArtworksFilter: React.FC<
  ArtistSeriesArtworksFilterProps & RouterState
> = props => {
  const { match, relay, artistSeries, aggregations, me } = props
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
        { value: "-decayed_merch", text: "Default" },
        { value: "-has_price,-prices", text: "Price (desc.)" },
        { value: "-has_price,prices", text: "Price (asc.)" },
        { value: "-partner_updated_at", text: "Recently updated" },
        { value: "-published_at", text: "Recently added" },
        { value: "-year", text: "Artwork year (desc.)" },
        { value: "year", text: "Artwork year (asc.)" },
      ]}
      onChange={updateUrl}
      userPreferedMetric={getSupportedMetric(me?.lengthUnitPreference)}
    >
      <BaseArtworkFilter
        relay={relay}
        viewer={artistSeries}
        relayVariables={{
          aggregations: ["TOTAL"],
          first: 20,
        }}
        FilterPillsSection={<ActiveFilterPills />}
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
    me: graphql`
      fragment ArtistSeriesArtworksFilter_me on Me {
        lengthUnitPreference
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
