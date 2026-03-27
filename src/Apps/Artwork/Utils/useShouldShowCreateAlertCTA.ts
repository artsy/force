import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { useTimer } from "Utils/Hooks/useTimer"
import type { useShouldShowCreateAlertCTA_artwork$key } from "__generated__/useShouldShowCreateAlertCTA_artwork.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

export const useShouldShowCreateAlertCTA = (
  artworkRef: useShouldShowCreateAlertCTA_artwork$key,
): boolean => {
  const artwork = useFragment(FRAGMENT, artworkRef)

  const { sale, saleArtwork, isInAuction } = artwork
  const endAt = saleArtwork?.endAt
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = useState(biddingEndAt)

  useAuctionWebsocket({
    lotID: saleArtwork?.lotID as string,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
    },
  })

  const timerEndAt = sale?.isAuction ? updatedBiddingEndAt : sale?.endAt
  const { hasEnded } = useTimer(timerEndAt as string, sale?.startAt as string)

  if (
    artwork.saleMessage === "On loan" ||
    artwork.saleMessage === "Permanent collection"
  ) {
    return true
  }

  if (
    artwork.isUnlisted ||
    !artwork.isEligibleToCreateAlert ||
    artwork.isSold
  ) {
    return false
  }

  if (isInAuction && (hasEnded || lotIsClosed(sale, saleArtwork))) {
    return false
  }

  return true
}

const FRAGMENT = graphql`
  fragment useShouldShowCreateAlertCTA_artwork on Artwork {
    isUnlisted
    isEligibleToCreateAlert
    isInAuction
    isSold
    saleMessage
    sale {
      startAt
      endAt
      isClosed
      isAuction
    }
    saleArtwork {
      lotID
      endAt
      extendedBiddingEndAt
      endedAt
    }
  }
`
