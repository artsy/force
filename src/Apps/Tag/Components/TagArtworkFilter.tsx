import type * as React from "react"
import {
  createRefetchContainer,
  type RelayRefetchProp,
  graphql,
} from "react-relay"
import { useRouter } from "System/Hooks/useRouter"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  type Counts,
  initialArtworkFilterState,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import type { TagArtworkFilter_tag$data } from "__generated__/TagArtworkFilter_tag.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import type { TagArtworkFilterQuery } from "__generated__/TagArtworkFilterQuery.graphql"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"

interface TagArtworkFilterProps {
  tag: TagArtworkFilter_tag$data
  relay: RelayRefetchProp
}

const TagArtworkFilter: React.FC<
  React.PropsWithChildren<TagArtworkFilterProps>
> = ({ tag, relay }) => {
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()
  const { sidebar } = tag

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      onChange={updateUrl}
      sortOptions={[
        { text: "Recommended", value: "-decayed_merch" },
        { text: "Price (High to Low)", value: "-has_price,-prices" },
        { text: "Price (Low to High)", value: "-has_price,prices" },
        { text: "Recently Updated", value: "-partner_updated_at" },
        { text: "Recently Added", value: "-published_at" },
        { text: "Artwork Year (Descending)", value: "-year" },
        { text: "Artwork Year (Ascending)", value: "year" },
      ]}
      counts={sidebar?.counts as Counts}
      aggregations={
        sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter relay={relay} viewer={tag} />
    </ArtworkFilterContextProvider>
  )
}

export const TagArtworkFilterRefetchContainer = createRefetchContainer(
  TagArtworkFilter,
  {
    tag: graphql`
      fragment TagArtworkFilter_tag on Tag
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          aggregations: { type: "[ArtworkAggregation]" }
          shouldFetchCounts: { type: "Boolean!", defaultValue: false }
        ) {
        slug
        internalID
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
        }
      }
    `,
  },
  graphql`
    query TagArtworkFilterRefetchQuery(
      $slug: String!
      $input: FilterArtworksInput
    ) {
      tag(id: $slug) {
        ...TagArtworkFilter_tag @arguments(input: $input)
      }
    }
  `
)

type TagArtworkFilterQueryRendererProps = {}

export const TagArtworkFilterQueryRenderer: React.FC<
  React.PropsWithChildren<TagArtworkFilterQueryRendererProps>
> = rest => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  return (
    <LazyArtworkGrid>
      <SystemQueryRenderer<TagArtworkFilterQuery>
        environment={relayEnvironment}
        query={graphql`
          query TagArtworkFilterQuery(
            $slug: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
            $shouldFetchCounts: Boolean!
          ) {
            tag(id: $slug) {
              ...TagArtworkFilter_tag
                @arguments(
                  input: $input
                  aggregations: $aggregations
                  shouldFetchCounts: $shouldFetchCounts
                )
            }
          }
        `}
        variables={initializeVariablesWithFilterState(match.params, match)}
        fetchPolicy="store-and-network"
        placeholder={<ArtworkFilterPlaceholder />}
        render={({ error, props }) => {
          if (error || !props?.tag) {
            return <ArtworkFilterPlaceholder />
          }

          return <TagArtworkFilterRefetchContainer tag={props.tag} {...rest} />
        }}
      />
    </LazyArtworkGrid>
  )
}

const initializeVariablesWithFilterState = (params, props) => {
  const aggregations = [
    "TOTAL",
    "ARTIST",
    "MEDIUM",
    "LOCATION_CITY",
    "MATERIALS_TERMS",
    "PARTNER",
    "ARTIST_NATIONALITY",
    "MAJOR_PERIOD",
  ]

  const urlFilterState = props.location ? props.location.query : {}

  const filters = {
    ...initialArtworkFilterState,
    ...paramsToCamelCase(urlFilterState),
  }

  const tagSlug = params.slug

  return {
    aggregations,
    input: allowedFilters(filters),
    shouldFetchCounts: !!props.context.user,
    slug: tagSlug,
  }
}
