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

interface AuctionArtworkFilterProps {
  relay: RelayRefetchProp
  viewer: AuctionArtworkFilter_viewer$data
}

const AuctionArtworkFilter: React.FC<AuctionArtworkFilterProps> = ({
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
        Filters={
          <Join separator={<Spacer y={4} />}>
            <KeywordFilter />
            <ArtistsFilter expanded />
            <PriceRangeFilter expanded />
            <MediumFilter expanded />
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
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        ...ArtworkFilter_viewer @arguments(input: $input)

        sidebarAggregations: artworksConnection(input: $input, first: 1) {
          counts {
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
    query AuctionArtworkFilterQuery($input: FilterArtworksInput) {
      viewer {
        ...AuctionArtworkFilter_viewer @arguments(input: $input)
      }
    }
  `
)

export const getArtworkFilterInputArgs = (user?: User) => {
  const aggregations = ["ARTIST", "MEDIUM", "TOTAL"]

  if (user) {
    aggregations.push("FOLLOWED_ARTISTS")
  }

  // Shared with auctionRoutes
  return {
    aggregations,
    first: 39,
  }
}
