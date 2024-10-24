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
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useRouter } from "System/Hooks/useRouter"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { ArtistSeriesArtworksFilterQuery } from "__generated__/ArtistSeriesArtworksFilterQuery.graphql"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"

interface ArtistSeriesArtworksFilterProps {
  artistSeries: ArtistSeriesArtworksFilter_artistSeries$data
  relay: RelayRefetchProp
  match?: Match
}

const ArtistSeriesArtworksFilter: React.FC<
  ArtistSeriesArtworksFilterProps & RouterState
> = props => {
  const { userPreferences } = useSystemContext()
  const { match, relay, artistSeries } = props
  const { filtered_artworks, sidebar } = artistSeries

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      aggregations={
        sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
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
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          aggregations: { type: "[ArtworkAggregation]" }
        ) {
        sidebar: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
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
    query ArtistSeriesArtworksFilterRefetchQuery(
      $input: FilterArtworksInput
      $slug: ID!
    ) {
      artistSeries(id: $slug) {
        ...ArtistSeriesArtworksFilter_artistSeries @arguments(input: $input)
      }
    }
  `
)

interface ArtistSeriesArtworkFilterQueryRendererProps {}

export const ArtistSeriesArtworkFilterQueryRenderer: React.FC<ArtistSeriesArtworkFilterQueryRendererProps> = rest => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  return (
    <LazyArtworkGrid>
      <SystemQueryRenderer<ArtistSeriesArtworksFilterQuery>
        environment={relayEnvironment}
        query={graphql`
          query ArtistSeriesArtworksFilterQuery(
            $slug: ID!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) {
            artistSeries(id: $slug) {
              ...ArtistSeriesArtworksFilter_artistSeries
                @arguments(input: $input, aggregations: $aggregations)
            }
          }
        `}
        variables={initializeVariablesWithFilterState(match.params, match)}
        fetchPolicy="store-and-network"
        placeholder={<ArtworkFilterPlaceholder />}
        render={({ error, props }) => {
          if (error || !props?.artistSeries) {
            return <ArtworkFilterPlaceholder />
          }

          return (
            <ArtistSeriesArtworksFilterRefetchContainer
              artistSeries={props.artistSeries}
              {...rest}
            />
          )
        }}
      />
    </LazyArtworkGrid>
  )
}

const initializeVariablesWithFilterState = (params, props) => {
  const initialFilterState = getInitialFilterState(props.location?.query ?? {})

  const aggregations = [
    "MEDIUM",
    "TOTAL",
    "MAJOR_PERIOD",
    "PARTNER",
    "LOCATION_CITY",
    "MATERIALS_TERMS",
    "SIMPLE_PRICE_HISTOGRAM",
  ]

  const input = {
    sort: "-decayed_merch",
    ...initialFilterState,
    first: 30,
  }

  return {
    slug: params.slug,
    input,
    aggregations,
  }
}
