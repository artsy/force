import { Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkAuctionCreateAlert_artist$data } from "__generated__/ArtworkAuctionCreateAlert_artist.graphql"
import { ArtworkAuctionCreateAlert_artwork$data } from "__generated__/ArtworkAuctionCreateAlert_artwork.graphql"

interface ArtworkAuctionCreateAlertProps {
  artist: ArtworkAuctionCreateAlert_artist$data
  artwork: ArtworkAuctionCreateAlert_artwork$data
}

const ArtworkAuctionCreateAlert: React.FC<ArtworkAuctionCreateAlertProps> = ({
  artist,
  artwork,
}) => {
  return (
    <Text variant="lg" textAlign={"center"}>
      Bidding for <i>{artwork.title?.trim()}</i>, {artist.name} has ended.
    </Text>
  )
}

export const ArtworkAuctionCreateAlertFragmentContainer = createFragmentContainer(
  ArtworkAuctionCreateAlert,
  {
    artist: graphql`
      fragment ArtworkAuctionCreateAlert_artist on Artist {
        name
      }
    `,
    artwork: graphql`
      fragment ArtworkAuctionCreateAlert_artwork on Artwork {
        title
      }
    `,
  }
)
