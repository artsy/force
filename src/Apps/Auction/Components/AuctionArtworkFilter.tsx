import { useRouter } from "System/Hooks/useRouter"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtworkFilter } from "Components/ArtworkFilter"
import {
  Aggregations,
  Counts,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { MediumFilter } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { ArtworkGridContextProvider } from "Components/ArtworkGrid/ArtworkGridContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { AuctionArtworkFilter_viewer$data } from "__generated__/AuctionArtworkFilter_viewer.graphql"
import { KeywordFilter } from "Components/ArtworkFilter/ArtworkFilters/KeywordFilter"
import { Join, Spacer } from "@artsy/palette"
import { ColorFilter } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { SizeFilter } from "Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { TimePeriodFilter } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { getArtworkFilterInputArgs } from "Apps/Auction/Components/getArtworkFilterInputArgs"
import { getInitialFilterState } from "Components/ArtworkFilter/Utils/getInitialFilterState"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtworkFilterPlaceholder } from "Components/ArtworkFilter/ArtworkFilterPlaceholder"
import { AuctionArtworkFilterQuery } from "__generated__/AuctionArtworkFilterQuery.graphql"
import { LazyArtworkGrid } from "Components/ArtworkGrid/LazyArtworkGrid"

interface AuctionArtworkFilterProps {
  relay: RelayRefetchProp
  viewer: AuctionArtworkFilter_viewer$data
}

const AuctionArtworkFilter: React.FC<React.PropsWithChildren<AuctionArtworkFilterProps>> = ({
  viewer,
}) => {
  const { user } = useSystemContext()
  const { match } = useRouter()

  if (!viewer.sidebarAggregations) return null

  const { aggregations, counts } = viewer.sidebarAggregations

  return (
    <ArtworkGridContextProvider isAuctionArtwork>
      <ArtworkFilter
        aggregations={aggregations as Aggregations}
        filters={match && match.location.query}
        counts={counts as Counts}
        relayRefetchInputVariables={{
          ...getArtworkFilterInputArgs(user),
          saleID: match.params.slug,
        }}
        sortOptions={[
          { text: "Lot Number (asc.)", value: "sale_position" },
          { text: "Lot Number (desc.)", value: "-sale_position" },
          { text: "Most Bids", value: "-bidder_positions_count" },
          { text: "Least Bids", value: "bidder_positions_count" },
          { text: "Price (Low to High)", value: "prices" },
          { text: "Price (High to Low)", value: "-prices" },
        ]}
        viewer={viewer}
        featuredKeywords={viewer.sale?.featuredKeywords}
        Filters={
          <Join separator={<Spacer y={4} />}>
            <KeywordFilter />
            <ArtistsFilter expanded />
            <PriceRangeFilter expanded />
            <MediumFilter expanded />
            <SizeFilter expanded />
            <MaterialsFilter expanded />
            <TimePeriodFilter expanded />
            <ColorFilter expanded />
          </Join>
        }
      />
    </ArtworkGridContextProvider>
  )
}

export const AuctionArtworkFilterRefetchContainer = createRefetchContainer(
  AuctionArtworkFilter,
  {
    viewer: graphql`
      fragment AuctionArtworkFilter_viewer on Viewer
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          saleID: { type: "String!" }
          isLoggedIn: { type: "Boolean!" }
        ) {
        ...ArtworkFilter_viewer @arguments(input: $input)
        sale(id: $saleID) {
          featuredKeywords
        }
        sidebarAggregations: artworksConnection(input: $input, first: 1) {
          counts @include(if: $isLoggedIn) {
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
      }
    `,
  },
  graphql`
    query AuctionArtworkFilterRefetchQuery(
      $input: FilterArtworksInput
      $saleID: String!
      $isLoggedIn: Boolean!
    ) {
      viewer {
        ...AuctionArtworkFilter_viewer
          @arguments(input: $input, saleID: $saleID, isLoggedIn: $isLoggedIn)
      }
    }
  `
)

interface AuctionArtworkFilterQueryRendererProps {}

export const AuctionArtworkFilterQueryRenderer: React.FC<React.PropsWithChildren<AuctionArtworkFilterQueryRendererProps>> = rest => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()

  return (
    <LazyArtworkGrid>
      <SystemQueryRenderer<AuctionArtworkFilterQuery>
        environment={relayEnvironment}
        query={graphql`
          query AuctionArtworkFilterQuery(
            $saleID: String!
            $input: FilterArtworksInput
            $isLoggedIn: Boolean!
          ) {
            viewer {
              ...AuctionArtworkFilter_viewer
                @arguments(
                  input: $input
                  saleID: $saleID
                  isLoggedIn: $isLoggedIn
                )
            }
          }
        `}
        variables={initializeVariablesWithFilterState(match.params, match)}
        fetchPolicy="network-only"
        placeholder={<ArtworkFilterPlaceholder />}
        render={({ error, props }) => {
          if (error || !props?.viewer) {
            return <ArtworkFilterPlaceholder />
          }

          return (
            <AuctionArtworkFilterRefetchContainer
              viewer={props.viewer}
              {...rest}
            />
          )
        }}
      />
    </LazyArtworkGrid>
  )
}

const initializeVariablesWithFilterState = (params, props) => {
  const auctionFilterDefaults = {
    sort: "sale_position",
  }

  const initialFilterStateFromUrl = getInitialFilterState(
    props.location?.query ?? {}
  )

  const userSpecificFilterState = getArtworkFilterInputArgs(props.context.user)

  const variables = {
    saleID: params.slug,
    isLoggedIn: !!props.context.user,
    input: {
      ...auctionFilterDefaults,
      ...initialFilterStateFromUrl,
      ...userSpecificFilterState,
      saleID: params.slug,
      // FIXME: Understand why this is needed to view lots in `the-artist-is-present-a-benefit-auction-for-ukraine` while logged out
      priceRange: "*-*",
    },
  }

  return variables
}
