import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtworkSidebarBidActionFragmentContainer } from "./ArtworkSidebarBidAction"
import { ArtworkSidebarCurrentBidInfoFragmentContainer } from "./ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarAuctionInfoPolling_artwork } from "v2/__generated__/ArtworkSidebarAuctionInfoPolling_artwork.graphql"
import { ArtworkSidebarAuctionInfoPolling_me } from "v2/__generated__/ArtworkSidebarAuctionInfoPolling_me.graphql"
import { usePoll } from "v2/Utils/Hooks/usePoll"
import { useEffect, useRef, useState } from "react"
import { Spacer } from "@artsy/palette"

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
  const { sale, saleArtwork } = artwork
  const isClosed = !!sale?.isClosed
  const currentBidDisplay = saleArtwork?.currentBid?.display

  const [currentBidChanged, setCurrentBidChanged] = useState(false)

  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      setCurrentBidChanged(true)
    } else {
      isMounted.current = true
    }
  }, [currentBidDisplay])

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
    clearWhen: isClosed,
  })

  return (
    <>
      <ArtworkSidebarCurrentBidInfoFragmentContainer
        currentBidChanged={currentBidChanged}
        artwork={artwork}
      />
      <Spacer my={2} />
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
        sale {
          isClosed
        }
        saleArtwork {
          currentBid {
            display
          }
        }
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
