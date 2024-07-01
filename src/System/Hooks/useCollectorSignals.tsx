import { useMemo } from "react"
import { graphql, useFragment } from "react-relay"
import {
  useCollectorSignals_me$key,
  useCollectorSignals_me$data,
} from "__generated__/useCollectorSignals_me.graphql"
import { useCollectorSignals_artworksConnection$key } from "__generated__/useCollectorSignals_artworksConnection.graphql"
import { useCollectorSignals_artwork$key } from "__generated__/useCollectorSignals_artwork.graphql"
import { extractNodes } from "Utils/extractNodes"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

interface SignalResult {
  partnerOffer?: { endAt?: string | null } | null
}

interface UseCollectorSignalsResult {
  [artworkID: string]: SignalResult | undefined
}

/**
 * Hook to load and process collector signals for a list of artworks
 */
export const useCollectorSignals = ({
  artworksConnection,
  me,
}: {
  artworksConnection?: useCollectorSignals_artworksConnection$key | null
  me?: useCollectorSignals_me$key | null
}): UseCollectorSignalsResult => {
  const meData = useFragment<useCollectorSignals_me$key>(ME_FRAGMENT, me)

  const artworksData = useFragment(
    ARTWORKS_CONNECTION_FRAGMENT,
    artworksConnection
  )
  const partnerOfferSignalsEnabled = useFeatureFlag(
    "emerald_signals-partner-offers"
  )

  const artworksDataNodes = extractNodes(artworksData)

  const artworkIDs = JSON.stringify(
    artworksDataNodes.map(artwork => artwork.internalID).sort()
  )

  const collectorSignals = useMemo(() => {
    const result = artworksDataNodes.reduce((acc, artworkData) => {
      acc[artworkData.internalID] = processCollectorSignalsOnArtwork({
        me: meData,
        artwork: artworkData,
        partnerOfferSignalsEnabled,
      })

      return acc
    }, {})
    return result

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artworkIDs, meData, partnerOfferSignalsEnabled])

  return collectorSignals
}

/**
 * Hook to load and process collector signals for a single artwork
 */
export const useCollectorSignalsOnArtwork = ({
  artwork,
  me,
}: {
  artwork: useCollectorSignals_artwork$key
  me?: useCollectorSignals_me$key | null
}): SignalResult => {
  const meData = useFragment<useCollectorSignals_me$key>(ME_FRAGMENT, me)
  const partnerOfferSignalsEnabled = useFeatureFlag(
    "emerald_signals-partner-offers"
  )

  const artworkData = useFragment(ARTWORK_FRAGMENT, artwork)

  const result = processCollectorSignalsOnArtwork({
    me: meData,
    artwork: artworkData,
    partnerOfferSignalsEnabled,
  })

  return result
}

const processCollectorSignalsOnArtwork = ({
  me,
  artwork,
  partnerOfferSignalsEnabled,
}: {
  me?: useCollectorSignals_me$data | null
  artwork: { internalID: string; isAcquireable?: boolean | null }
  partnerOfferSignalsEnabled: boolean | null
}): SignalResult => {
  if (!artwork.isAcquireable) {
    return {}
  }

  if (!partnerOfferSignalsEnabled) {
    console.log("*** Partner offers not enabled - skipping")
    return {}
  }

  const partnerOffers = extractNodes(me?.partnerOffersConnection)

  const offers = partnerOffers.filter(
    offer => offer.artworkId === artwork.internalID
  )

  return {
    partnerOffer: offers[0] ?? null,
  }
}

const ME_FRAGMENT = graphql`
  fragment useCollectorSignals_me on Me {
    partnerOffersConnection(first: 100) {
      edges {
        node {
          artworkId
          endAt
        }
      }
    }
  }
`

const ARTWORKS_CONNECTION_FRAGMENT = graphql`
  fragment useCollectorSignals_artworksConnection on ArtworkConnectionInterface {
    edges {
      node {
        internalID
        isAcquireable
      }
    }
  }
`

const ARTWORK_FRAGMENT = graphql`
  fragment useCollectorSignals_artwork on Artwork {
    internalID
    isAcquireable
  }
`
