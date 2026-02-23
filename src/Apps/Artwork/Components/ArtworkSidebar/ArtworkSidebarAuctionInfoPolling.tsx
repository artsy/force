import { Spacer } from "@artsy/palette"
import { usePoll } from "Utils/Hooks/usePoll"
import type { ArtworkSidebarAuctionInfoPolling_artwork$data } from "__generated__/ArtworkSidebarAuctionInfoPolling_artwork.graphql"
import type { ArtworkSidebarAuctionInfoPolling_me$data } from "__generated__/ArtworkSidebarAuctionInfoPolling_me.graphql"
import type * as React from "react"
import { useEffect, useRef, useState } from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import { useTracking } from "react-tracking"
import { ArtworkSidebarBidActionFragmentContainer } from "./ArtworkSidebarBidAction"
import { ArtworkSidebarCurrentBidInfoFragmentContainer } from "./ArtworkSidebarCurrentBidInfo"

type Props = {
  artwork: ArtworkSidebarAuctionInfoPolling_artwork$data
  me: ArtworkSidebarAuctionInfoPolling_me$data
  relay: RelayRefetchProp
}

export const ArtworkSidebarAuctionPolling: React.FC<
  React.PropsWithChildren<Props>
> = ({ artwork, relay, me }) => {
  const { sale, saleArtwork } = artwork
  const isClosed = !!sale?.isClosed
  const currentBidDisplay = saleArtwork?.currentBid?.display

  const [currentBidChanged, setCurrentBidChanged] = useState(false)

  const isMounted = useRef(false)
  const tracking = useTracking()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
        { force: true },
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
      <Spacer y={2} />
      <ArtworkSidebarBidActionFragmentContainer
        artwork={artwork}
        me={me}
        tracking={tracking}
      />
    </>
  )
}

export const ArtworkSidebarAuctionPollingRefetchContainer =
  createRefetchContainer(
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
    `,
  )
