import { FairArtworks_fair$data } from "__generated__/FairArtworks_fair.graphql"
import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import * as React from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { MediumFilter } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { WaysToBuyFilter } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { TimePeriodFilter } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { ColorFilter } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { useRouter } from "System/Hooks/useRouter"
import { AttributionClassFilter } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { PartnersFilter } from "Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { ArtistNationalityFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { ArtworkLocationFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { SizeFilter } from "Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { KeywordFilter } from "Components/ArtworkFilter/ArtworkFilters/KeywordFilter"
import { Join, Spacer } from "@artsy/palette"
import { AvailabilityFilter } from "Components/ArtworkFilter/ArtworkFilters/AvailabilityFilter"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { FairArtworksFilterQuery } from "__generated__/FairArtworksFilterQuery.graphql"

interface FairArtworksFilterProps {
  fair: FairArtworks_fair$data
  relay: RelayRefetchProp
}

const FairArtworksFilter: React.FC<React.PropsWithChildren<FairArtworksFilterProps>> = props => {
  const { relay, fair } = props
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()
  const { filtered_artworks, sidebarAggregations } = fair

  const hasFilter = filtered_artworks && filtered_artworks.id

  // If there was an error fetching the filter,
  // we still want to render the rest of the page.
  if (!hasFilter) return null

  // @ts-ignore
  const { counts } = filtered_artworks

  // TODO: You shouldn't have to pass `relayEnvironment` and `user` through below.
  // For some reason, they are undefined when `useSystemContext()` is referenced
  // in <ArtistsFilter />. So, pass as props for now.
  const Filters = (
    <Join separator={<Spacer y={4} />}>
      <KeywordFilter />
      <PartnersFilter label="Exhibitors" expanded />
      <ArtistsFilter fairID={fair.internalID} expanded />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <AvailabilityFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter expanded />
      <ArtistNationalityFilter expanded />
      <ArtworkLocationFilter expanded />
      <TimePeriodFilter expanded />
      <ColorFilter expanded />
    </Join>
  )

  return (
    <ArtworkFilterContextProvider
      filters={match && match.location.query}
      counts={counts as Counts}
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
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        sidebarAggregations.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      userPreferredMetric={userPreferences?.metric}
    >
      <BaseArtworkFilter
        mt={[0, 6]}
        relay={relay}
        viewer={fair}
        featuredKeywords={fair.featuredKeywords}
        Filters={Filters}
      />
    </ArtworkFilterContextProvider>
  )
}

export const FairArtworksRefetchContainer = createRefetchContainer(
  FairArtworksFilter,
  {
    fair: graphql`
      fragment FairArtworks_fair on Fair
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          aggregations: { type: "[ArtworkAggregation]" }
        ) {
        slug
        internalID
        featuredKeywords
        sidebarAggregations: filterArtworksConnection(
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
        filtered_artworks: filterArtworksConnection(first: 30, input: $input) {
          id
          counts {
            followedArtists
            total(format: "0,0")
          }
          ...ArtworkFilterArtworkGrid_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query FairArtworksFilterRefetchQuery(
      $slug: String!
      $input: FilterArtworksInput
    ) {
      fair(id: $slug) {
        ...FairArtworks_fair @arguments(input: $input)
      }
    }
  `
)

interface FairArtworkFilterQueryRendererProps {}

export const FairArtworksQueryRenderer: React.FC<React.PropsWithChildren<FairArtworkFilterQueryRendererProps>> = rest => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  return (
    <LazyArtworkGrid>
      <SystemQueryRenderer<FairArtworksFilterQuery>
        environment={relayEnvironment}
        query={graphql`
          query FairArtworksFilterQuery(
            $slug: String!
            $input: FilterArtworksInput
            $aggregations: [ArtworkAggregation]
          ) {
            fair(id: $slug) {
              ...FairArtworks_fair
                @arguments(input: $input, aggregations: $aggregations)
            }
          }
        `}
        variables={initializeVariablesWithFilterState(match.params, match)}
        fetchPolicy="store-and-network"
        placeholder={<ArtworkFilterPlaceholder />}
        render={({ error, props }) => {
          if (error || !props?.fair) {
            return <ArtworkFilterPlaceholder />
          }

          return <FairArtworksRefetchContainer fair={props.fair} {...rest} />
        }}
      />
    </LazyArtworkGrid>
  )
}

const initializeVariablesWithFilterState = (params, props) => {
  const initialFilterState = getInitialFilterState(props.location?.query ?? {})

  let aggregations: string[] = [
    "TOTAL",
    "MAJOR_PERIOD",
    "ARTIST",
    "LOCATION_CITY",
    "ARTIST_NATIONALITY",
    "MATERIALS_TERMS",
    "PARTNER",
  ]

  const input = {
    sort: "-decayed_merch",
    ...initialFilterState,
    includeArtworksByFollowedArtists:
      !!props.context.user &&
      initialFilterState["includeArtworksByFollowedArtists"],
  }

  return {
    slug: params.slug,
    input,
    aggregations,
  }
}
