import { getMerchandisingPartnerSlugs } from "Apps/Partner/Utils/getMerchandisingPartnerSlugs"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  type Counts,
  initialArtworkFilterState,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { Works_partner$data } from "__generated__/Works_partner.graphql"
import type { WorksFilterQuery } from "__generated__/WorksFilterQuery.graphql"
import type * as React from "react"
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
} from "react-relay"

interface PartnerArtworkFilterProps {
  partner: Works_partner$data
  relay: RelayRefetchProp
}

export const Artworks: React.FC<
  React.PropsWithChildren<PartnerArtworkFilterProps>
> = ({ partner, relay }) => {
  const { sidebar } = partner
  const { match } = useRouter()
  const filters = match?.location?.query ?? {}
  const partnerSlugs = getMerchandisingPartnerSlugs()
  const partnerId = match?.params?.partnerId

  // Preselects "Recently Added" sort option for some partners by default
  if (filters.sort === undefined && partnerSlugs.includes(partnerId)) {
    filters.sort = "-published_at"
  }

  return (
    <ArtworkFilterContextProvider
      filters={filters}
      sortOptions={[
        { text: "Recommended", value: "-decayed_merch" },
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
      counts={sidebar?.counts as Counts}
    >
      <BaseArtworkFilter
        relay={relay}
        offset={200}
        viewer={partner}
        featuredKeywords={partner.featuredKeywords}
      />
    </ArtworkFilterContextProvider>
  )
}

export const ArtworksRefetchContainer = createRefetchContainer(
  Artworks,
  {
    partner: graphql`
      fragment Works_partner on Partner
      @argumentDefinitions(
        input: { type: "FilterArtworksInput" }
        aggregations: { type: "[ArtworkAggregation]" }
        shouldFetchCounts: { type: "Boolean!", defaultValue: false }
      ) {
        slug
        internalID
        featuredKeywords
        sidebar: filterArtworksConnection(
          first: 1
          aggregations: $aggregations
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
    query WorksFilterRefetchQuery(
      $partnerId: String!
      $input: FilterArtworksInput
    ) {
      partner(id: $partnerId) {
        ...Works_partner @arguments(input: $input)
      }
    }
  `,
)

type PartnerArtworkFilterQueryRendererProps = {}

export const PartnerArtworksQueryRenderer: React.FC<
  React.PropsWithChildren<PartnerArtworkFilterQueryRendererProps>
> = rest => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  return (
    <LazyArtworkGrid>
      <SystemQueryRenderer<WorksFilterQuery>
        environment={relayEnvironment}
        query={graphql`
          query WorksFilterQuery(
            $partnerId: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
            $shouldFetchCounts: Boolean!
          ) {
            partner(id: $partnerId) {
              ...Works_partner
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
          if (error || !props?.partner) {
            return <ArtworkFilterPlaceholder />
          }

          return <ArtworksRefetchContainer partner={props.partner} {...rest} />
        }}
      />
    </LazyArtworkGrid>
  )
}

const initializeVariablesWithFilterState = (params, props) => {
  const filterStateFromUrl = props.location ? props.location.query : {}
  const partnerId = props?.params?.partnerId
  const partnerSlugs = getMerchandisingPartnerSlugs()
  const aggregations = [
    "TOTAL",
    "MEDIUM",
    "MATERIALS_TERMS",
    "ARTIST_NATIONALITY",
    "ARTIST",
  ]

  const filterParams = {
    ...initialArtworkFilterState,
    ...paramsToCamelCase(filterStateFromUrl),
  }

  // Preselects "Recently Added" sort option for artsy-2 partner by default
  if (
    filterParams.sort === initialArtworkFilterState.sort &&
    partnerSlugs.includes(partnerId)
  ) {
    filterParams.sort = "-published_at"
  }

  return {
    aggregations,
    input: allowedFilters(filterParams),
    partnerId: params.partnerId,
    shouldFetchCounts: !!props.context.user,
  }
}
