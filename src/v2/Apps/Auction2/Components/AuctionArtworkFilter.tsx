import { useRouter } from "found"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  Aggregations,
  Counts,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { MediumFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { ArtworkGridContextProvider } from "v2/Components/ArtworkGrid/ArtworkGridContext"
import { useSystemContext } from "v2/System"
import { AuctionArtworkFilter_viewer } from "v2/__generated__/AuctionArtworkFilter_viewer.graphql"

interface AuctionArtworkFilterProps {
  relay: RelayRefetchProp
  viewer: AuctionArtworkFilter_viewer
}

const AuctionArtworkFilter: React.FC<AuctionArtworkFilterProps> = ({
  viewer,
}) => {
  const { user } = useSystemContext()
  const { match } = useRouter()

  const { aggregations, counts } = viewer.sidebarAggregations!

  return (
    <ArtworkGridContextProvider isAuctionArtwork hideAuctionBadge>
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
          { text: "Price (asc.)", value: "prices" },
          { text: "Price (desc.)", value: "-prices" },
        ]}
        viewer={viewer}
        Filters={
          <>
            <ArtistsFilter expanded />
            <PriceRangeFilter expanded />
            <MediumFilter expanded />
          </>
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
    atAuction: true,
    first: 10,
    sort: "sale_position",
  }
}
