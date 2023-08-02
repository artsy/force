import { Box, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkAuctionCreateAlertHeader_artwork$data } from "__generated__/ArtworkAuctionCreateAlertHeader_artwork.graphql"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCreateAlertButton"
import { useTimer } from "Utils/Hooks/useTimer"
import { useFeatureFlag } from "System/useFeatureFlag"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"

interface ArtworkAuctionCreateAlertHeaderProps {
  artwork: ArtworkAuctionCreateAlertHeader_artwork$data
}

const ArtworkAuctionCreateAlertHeader: React.FC<ArtworkAuctionCreateAlertHeaderProps> = ({
  artwork,
}) => {
  const hasArtists = (artwork.artists?.length ?? 0) > 0
  const biddingEndAt =
    artwork?.saleArtwork?.extendedBiddingEndAt ?? artwork?.saleArtwork?.endAt
  const { hasEnded } = useTimer(biddingEndAt!, artwork?.sale?.startAt!)

  const auctionHeaderAlertCTAEnabled = useFeatureFlag(
    "onyx_auction-header-alert-cta"
  )

  const isLotClosed = hasEnded || lotIsClosed(artwork.sale, artwork.saleArtwork)
  const displayAuctionCreateAlertHeader =
    hasArtists &&
    artwork.isInAuction &&
    isLotClosed &&
    auctionHeaderAlertCTAEnabled

  if (!displayAuctionCreateAlertHeader) return null

  const artistName = artwork.artistNames ? ", " + artwork.artistNames : ""

  return (
    <Box py={12}>
      <Text variant="lg" textAlign="center">
        Bidding for <i>{artwork.title?.trim()}</i>
        {artistName} has ended.
      </Text>
      <Box mt={2} mx="auto" width={["100%", 209]}>
        <ArtworkSidebarCreateAlertButtonFragmentContainer artwork={artwork} />
      </Box>
    </Box>
  )
}

export const ArtworkAuctionCreateAlertHeaderFragmentContainer = createFragmentContainer(
  ArtworkAuctionCreateAlertHeader,
  {
    artwork: graphql`
      fragment ArtworkAuctionCreateAlertHeader_artwork on Artwork {
        title
        isInAuction
        artistNames
        artists {
          id
        }
        sale {
          startAt
          isClosed
        }
        saleArtwork {
          extendedBiddingEndAt
          endAt
          endedAt
        }
        ...ArtworkSidebarCreateAlertButton_artwork
      }
    `,
  }
)
