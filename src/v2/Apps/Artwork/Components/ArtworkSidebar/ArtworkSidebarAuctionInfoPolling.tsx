import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtworkSidebarBidActionFragmentContainer } from "./ArtworkSidebarBidAction"
import { ArtworkSidebarCurrentBidInfoFragmentContainer } from "./ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarAuctionInfoPolling_artwork } from "v2/__generated__/ArtworkSidebarAuctionInfoPolling_artwork.graphql"
import { ArtworkSidebarAuctionInfoPolling_me } from "v2/__generated__/ArtworkSidebarAuctionInfoPolling_me.graphql"
import { usePoll } from "v2/Apps/Conversation/Utils/usePoll"

type Props = {
  artwork: ArtworkSidebarAuctionInfoPolling_artwork
  me: ArtworkSidebarAuctionInfoPolling_me
  relay: RelayRefetchProp
}

export const ArtworkSidebarAuctionPolling: React.FC<Props> = ({
  artwork,
  relay,
  me,
}) => {
  usePoll({
    callback: () => {
      relay.refetch(
        { artworkID: artwork.internalID },
        null,
        {},
        { force: true }
      )
    },
    intervalTime: 10000,
    key: artwork.internalID,
  })

  return (
    <>
      <ArtworkSidebarCurrentBidInfoFragmentContainer artwork={artwork} />
      <ArtworkSidebarBidActionFragmentContainer artwork={artwork} me={me} />
    </>
  )
}

export const ArtworkSidebarAuctionPollingRefetchContainer = createRefetchContainer(
  ArtworkSidebarAuctionPolling,
  {
    artwork: graphql`
      fragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {
        internalID
        ...ArtworkSidebarCurrentBidInfo_artwork
        ...ArtworkSidebarBidAction_artwork
      }
    `,
    me: graphql`
      fragment ArtworkSidebarAuctionInfoPolling_me on Me {
        ...ArtworkSidebarBidAction_me
      }
    `,
  },
  graphql`
    query ArtworkSidebarAuctionInfoPollingQuery($artworkID: String!) {
      artwork(id: $artworkID) {
        internalID
        ...ArtworkSidebarCurrentBidInfo_artwork
        ...ArtworkSidebarBidAction_artwork
      }

      me {
        ...ArtworkSidebarAuctionInfoPolling_me
      }
    }
  `
)
