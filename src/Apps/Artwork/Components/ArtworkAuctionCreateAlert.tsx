import { Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkAuctionCreateAlert_artwork$data } from "__generated__/ArtworkAuctionCreateAlert_artwork.graphql"

interface ArtworkAuctionCreateAlertProps {
  artwork: ArtworkAuctionCreateAlert_artwork$data
}

const ArtworkAuctionCreateAlert: React.FC<ArtworkAuctionCreateAlertProps> = ({
  artwork,
}) => {
  const getArtistNames = () => {
    if (!artwork.artistNames) {
      return "Artist Unavailable"
    }

    return artwork.artistNames
  }

  return (
    <Text variant="lg" textAlign={"center"}>
      Bidding for <i>{artwork.title?.trim()}</i>, {getArtistNames()} has ended.
    </Text>
  )
}

export const ArtworkAuctionCreateAlertFragmentContainer = createFragmentContainer(
  ArtworkAuctionCreateAlert,
  {
    artwork: graphql`
      fragment ArtworkAuctionCreateAlert_artwork on Artwork {
        title
        artistNames
      }
    `,
  }
)
