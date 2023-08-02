import { Box, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkAuctionCreateAlertHeader_artwork$data } from "__generated__/ArtworkAuctionCreateAlertHeader_artwork.graphql"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCreateAlertButton"
import { useFeatureFlag } from "System/useFeatureFlag"

interface ArtworkAuctionCreateAlertHeaderProps {
  artwork: ArtworkAuctionCreateAlertHeader_artwork$data
}

const ArtworkAuctionCreateAlertHeader: React.FC<ArtworkAuctionCreateAlertHeaderProps> = ({
  artwork,
}) => {
  const isArtworkAuctionCreateAlertHeaderEnabled = useFeatureFlag(
    "onyx_auction-header-alert-cta"
  )

  if (!isArtworkAuctionCreateAlertHeaderEnabled) {
    return null
  }

  const artistName = artwork.artistNames ? ", " + artwork.artistNames : ""

  return (
    <Box py={6}>
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
        artistNames
        ...ArtworkSidebarCreateAlertButton_artwork
      }
    `,
  }
)
