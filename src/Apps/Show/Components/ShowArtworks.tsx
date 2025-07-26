import type { BoxProps } from "@artsy/palette"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  type Counts,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ShowArtworksFilterQuery } from "__generated__/ShowArtworksFilterQuery.graphql"
import type { ShowArtworks_show$data } from "__generated__/ShowArtworks_show.graphql"
import { omit } from "lodash"
import type * as React from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"

interface ShowArtworksFilterProps extends BoxProps {
  show: ShowArtworks_show$data
  relay: RelayRefetchProp
  counts?: Counts
}

const ShowArtworksFilter: React.FC<
  React.PropsWithChildren<ShowArtworksFilterProps>
> = props => {
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()
  const { relay, show, counts, ...rest } = props
  const { filtered_artworks, sidebar } = show

  const hasFilter = filtered_artworks && filtered_artworks.id

  if (!hasFilter) return null

  // Inject custom default sort into artwork filter.
  const filters = omit(
    {
      sort: "partner_show_position",
      ...(match && match.location.query),
    },
    "from_show_guide", // TODO: Investigate if we need this param.
  )

  return (
    <ArtworkFilterContextProvider
      filters={filters}
      sortOptions={[
        { text: "Gallery Curated", value: "partner_show_position" },
        { text: "Price (High to Low)", value: "-has_price,-prices" },
        { text: "Price (Low to High)", value: "-has_price,prices" },
        { text: "Recently Updated", value: "-partner_updated_at" },
        { text: "Recently Added", value: "-published_at" },
        { text: "Artwork Year (Descending)", value: "-year" },
        { text: "Artwork Year (Ascending)", value: "year" },
      ]}
      onChange={updateUrl}
      aggregations={
        sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      counts={counts}
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter
        mt={0}
        relay={relay}
        viewer={show}
        relayVariables={{
          aggregations: ["TOTAL"],
        }}
        layout="GRID"
        {...rest}
      />
    </ArtworkFilterContextProvider>
  )
}

export const ShowArtworksRefetchContainer = createRefetchContainer(
  ShowArtworksFilter,
  {
    show: graphql`
      fragment ShowArtworks_show on Show
      @argumentDefinitions(
        input: { type: "FilterArtworksInput" }
        aggregations: { type: "[ArtworkAggregation]" }
        shouldFetchCounts: { type: "Boolean!", defaultValue: false }
      ) {
        sidebar: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
          counts @include(if: $shouldFetchCounts) {
            followedArtists
          }
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
          id
          counts {
            total(format: "0,0")
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
          ...ImmersiveView_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query ShowArtworksFilterRefetchQuery(
      $slug: String!
      $input: FilterArtworksInput
    ) {
      show(id: $slug) {
        ...ShowArtworks_show @arguments(input: $input)
      }
    }
  `,
)

type ShowArtworkFilterQueryRendererProps = {}

export const ShowArtworkFilterQueryRenderer: React.FC<
  React.PropsWithChildren<ShowArtworkFilterQueryRendererProps>
> = rest => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  return (
    <LazyArtworkGrid>
      <SystemQueryRenderer<ShowArtworksFilterQuery>
        environment={relayEnvironment}
        query={graphql`
          query ShowArtworksFilterQuery(
            $slug: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) {
            show(id: $slug) {
              ...ShowArtworks_show
                @arguments(input: $input, aggregations: $aggregations)
            }
          }
        `}
        variables={initializeVariablesWithFilterState(match.params, match)}
        fetchPolicy="store-and-network"
        placeholder={<ArtworkFilterPlaceholder layout="GRID" />}
        render={({ error, props }) => {
          if (error || !props?.show) {
            return <ArtworkFilterPlaceholder layout="GRID" />
          }

          return <ShowArtworksRefetchContainer show={props.show} {...rest} />
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
    "ARTIST_NATIONALITY",
    "MATERIALS_TERMS",
    "ARTIST",
  ]

  const input = {
    sort: "partner_show_position",
    ...initialFilterState,
  }

  return {
    slug: params.slug,
    input,
    aggregations,
    shouldFetchCounts: !!props.context.user,
  }
}
