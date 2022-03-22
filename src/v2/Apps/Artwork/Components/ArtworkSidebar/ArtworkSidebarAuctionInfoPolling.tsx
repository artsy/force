import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtworkSidebarBidActionFragmentContainer } from "./ArtworkSidebarBidAction"
import {
  ArtworkSidebarCurrentBidInfoFragmentContainer,
  BiddingClosedMessage,
} from "./ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarAuctionInfoPolling_artwork } from "v2/__generated__/ArtworkSidebarAuctionInfoPolling_artwork.graphql"
import { ArtworkSidebarAuctionInfoPolling_me } from "v2/__generated__/ArtworkSidebarAuctionInfoPolling_me.graphql"
import { usePoll } from "v2/Utils/Hooks/usePoll"
import { useEffect, useRef, useState } from "react"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import { ArtworkSidebarAuctionTimerFragmentContainer } from "./ArtworkSidebarAuctionTimer"

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

  // If we have info about the lot end time, use that to render
  // closed state immediately, vs. relying on polling.
  const endAt = saleArtwork?.endAt
  const startAt = sale?.startAt

  const { hasEnded } = useTimer(endAt!, startAt!)

  if (hasEnded) {
    return <BiddingClosedMessage />
  }

  return (
    <>
      <ArtworkSidebarCurrentBidInfoFragmentContainer
        currentBidChanged={currentBidChanged}
        artwork={artwork}
      />
      <ArtworkSidebarBidActionFragmentContainer artwork={artwork} me={me} />

      <ArtworkSidebarAuctionTimerFragmentContainer artwork={artwork} />
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
          cascadingEndTimeInterval
          isClosed
          ...AuctionTimer_sale
          startAt
        }
        saleArtwork {
          ...LotTimer_saleArtwork
          endAt
          currentBid {
            display
          }
        }
        ...ArtworkSidebarCurrentBidInfo_artwork
        ...ArtworkSidebarBidAction_artwork
        ...ArtworkSidebarAuctionTimer_artwork
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
