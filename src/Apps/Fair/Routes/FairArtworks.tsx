import { BaseArtworkFilter } from "Components/ArtworkFilter"
import {
  ArtworkFilterContextProvider,
  type Counts,
  type SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { ArtistNationalityFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { ArtworkLocationFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { AttributionClassFilter } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { AvailabilityFilter } from "Components/ArtworkFilter/ArtworkFilters/AvailabilityFilter"
import { ColorFilter } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { FramedFilter } from "Components/ArtworkFilter/ArtworkFilters/FramedFilter"
import { KeywordFilter } from "Components/ArtworkFilter/ArtworkFilters/KeywordFilter"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { MediumFilter } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PartnersFilter } from "Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { PriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { SignedFilter } from "Components/ArtworkFilter/ArtworkFilters/SignedFilter"
import { SizeFilter } from "Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WaysToBuyFilter } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Join, Spacer } from "@artsy/palette"
import type { FairArtworks_fair$data } from "__generated__/FairArtworks_fair.graphql"
import type { FairArtworksFilterQuery } from "__generated__/FairArtworksFilterQuery.graphql"
import type * as React from "react"
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
} from "react-relay"

interface FairArtworksFilterProps {
  fair: FairArtworks_fair$data
  relay: RelayRefetchProp
}

const FairArtworksFilter: React.FC<
  React.PropsWithChildren<FairArtworksFilterProps>
> = props => {
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()

  const { relay, fair } = props
  const { filtered_artworks, sidebarAggregations } = fair

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
      <FramedFilter expanded />
      <SignedFilter expanded />
    </Join>
  )

  return (
    <ArtworkGridContextProvider>
      <ArtworkFilterContextProvider
        filters={match && match.location.query}
        counts={filtered_artworks?.counts as Counts}
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
    </ArtworkGridContextProvider>
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
          ...ImmersiveView_filtered_artworks
        }
      }
    `,
  },
  graphql`
    query FairArtworksFilterRefetchQuery(
      $slug: String!
      $input: FilterArtworksInput
    ) @cacheable {
      fair(id: $slug) {
        ...FairArtworks_fair @arguments(input: $input)
      }
    }
  `
)

type FairArtworkFilterQueryRendererProps = {}

export const FairArtworksQueryRenderer: React.FC<
  React.PropsWithChildren<FairArtworkFilterQueryRendererProps>
> = rest => {
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
          ) @cacheable {
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

  const aggregations: string[] = [
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
