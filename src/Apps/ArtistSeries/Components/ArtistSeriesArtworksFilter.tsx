import { BaseArtworkFilter } from "Components/ArtworkFilter"
import { ArtworkFilterAlertContextProvider } from "Components/ArtworkFilter/ArtworkFilterAlertContextProvider"
import {
  ArtworkFilterContextProvider,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { ArtworkFilterSavedSearchAlertContextProvider } from "Components/ArtworkFilter/ArtworkFilterSavedSearchAlertContextProvider"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"
import type { SavedSearchEntity } from "Components/SavedSearchAlert/types"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { OwnerType } from "@artsy/cohesion"
import type { ArtistSeriesArtworksFilter_artistSeries$data } from "__generated__/ArtistSeriesArtworksFilter_artistSeries.graphql"
import type { ArtistSeriesArtworksFilterQuery } from "__generated__/ArtistSeriesArtworksFilterQuery.graphql"
import { type Match, type RouterState, withRouter } from "found"
import type * as React from "react"
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
} from "react-relay"

interface ArtistSeriesArtworksFilterProps {
  artistSeries: ArtistSeriesArtworksFilter_artistSeries$data
  relay: RelayRefetchProp
  match?: Match
}

const ArtistSeriesArtworksFilter: React.FC<
  React.PropsWithChildren<ArtistSeriesArtworksFilterProps & RouterState>
> = props => {
  const { userPreferences } = useSystemContext()
  const { match, relay, artistSeries } = props
  const { filtered_artworks, sidebar } = artistSeries

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  const artist = artistSeries.artists[0]
  const savedSearchEntity: SavedSearchEntity = {
    owner: {
      type: OwnerType.artist,
      id: artist.internalID,
      name: artist.name ?? "Unknown",
      slug: artist.slug,
    },
    defaultCriteria: {
      artistIDs: artistSeries.artists.map(artist => ({
        displayValue: artist.name ?? "Unknown",
        value: artist.internalID,
      })),
      artistSeriesIDs: [
        { displayValue: artistSeries.title, value: artistSeries.internalID },
      ],
    },
  }

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
      <ArtworkFilterAlertContextProvider
        initialCriteria={{
          artistIDs: artistSeries.artists.map(artist => artist.internalID),
          artistSeriesIDs: [artistSeries.internalID],
        }}
      >
        <ArtworkFilterSavedSearchAlertContextProvider
          entity={savedSearchEntity}
        >
          <BaseArtworkFilter
            relay={relay}
            viewer={artistSeries}
            relayVariables={{
              aggregations: ["TOTAL"],
              first: 20,
            }}
          />
        </ArtworkFilterSavedSearchAlertContextProvider>
      </ArtworkFilterAlertContextProvider>
    </ArtworkFilterContextProvider>
  )
}

export const ArtistSeriesArtworksFilterRefetchContainer =
  createRefetchContainer(
    withRouter<ArtistSeriesArtworksFilterProps & RouterState>(
      ArtistSeriesArtworksFilter,
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
          artists {
            internalID
            name
            slug
          }
          internalID

          filtered_artworks: filterArtworksConnection(input: $input) {
            id
            counts {
              total(format: "0,0")
            }
            ...ArtworkFilterArtworkGrid_filtered_artworks
            ...ImmersiveView_filtered_artworks
          }
          title
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
    `,
  )

type ArtistSeriesArtworkFilterQueryRendererProps = {}

export const ArtistSeriesArtworkFilterQueryRenderer: React.FC<
  React.PropsWithChildren<ArtistSeriesArtworkFilterQueryRendererProps>
> = rest => {
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
        placeholder={<ArtworkFilterPlaceholder showCreateAlert />}
        render={({ error, props }) => {
          if (error || !props?.artistSeries) {
            return <ArtworkFilterPlaceholder showCreateAlert />
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
