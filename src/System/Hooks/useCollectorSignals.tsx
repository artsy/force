// import { useCallback } from "react"
import { graphql, useFragment } from "react-relay"
import {
  useCollectorSignals_me$key,
  useCollectorSignals_me$data,
} from "__generated__/useCollectorSignals_me.graphql"
import { useCollectorSignals_artworksConnection$key } from "__generated__/useCollectorSignals_artworksConnection.graphql"
import { useCollectorSignals_artwork$key } from "__generated__/useCollectorSignals_artwork.graphql"
import { extractNodes } from "Utils/extractNodes"
import { useGlobalMe } from "System/Hooks/useGlobalMe"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

interface SignalResult {
  partnerOffer?: any // todo
}

type UseCollectorSignalsResult = Record<string, SignalResult>

export const useCollectorSignals = ({
  artworks,
}: {
  artworks?: useCollectorSignals_artworksConnection$key | null
}): UseCollectorSignalsResult => {
  const { me } = useGlobalMe()
  const meData = useFragment<useCollectorSignals_me$key>(ME_FRAGMENT, me)

  const artworksData = useFragment(ARTWORKS_CONNECTION_FRAGMENT, artworks)
  const partnerOffersEnabled = useFeatureFlag(
    "emerald_collector-signals-partner-offers"
  )

  const artworksDataNodes = extractNodes(artworksData)

  const result: {
    [artworkID: string]: SignalResult
  } = artworksDataNodes.reduce((acc, artworkData) => {
    acc[artworkData.internalID] = processCollectorSignalsOnArtwork({
      me: meData,
      artwork: artworkData,
      partnerOffersEnabled,
    })

    return acc
  }, {})

  console.log("Processed collector signals", result)
  return result
}

export const useCollectorSignalsOnArtwork = ({
  artwork,
}: {
  artwork: useCollectorSignals_artwork$key
}): SignalResult => {
  const { me } = useGlobalMe()
  const meData = useFragment<useCollectorSignals_me$key>(ME_FRAGMENT, me)
  const partnerOffersEnabled = useFeatureFlag(
    "emerald_collector-signals-partner-offers"
  )

  const artworkData = useFragment(ARTWORK_FRAGMENT, artwork)

  const result = processCollectorSignalsOnArtwork({
    me: meData,
    artwork: artworkData,
    partnerOffersEnabled,
  })

  return result
}

const processCollectorSignalsOnArtwork = ({
  me,
  artwork,
  partnerOffersEnabled,
}: {
  me?: useCollectorSignals_me$data | null
  artwork: { internalID: string; isAcquireable?: boolean | null }
  partnerOffersEnabled: boolean | null
}): SignalResult => {
  if (!artwork.isAcquireable) {
    return {}
  }

  if (!partnerOffersEnabled) {
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
  fragment useCollectorSignals_artworksConnection on ArtworkConnection {
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
