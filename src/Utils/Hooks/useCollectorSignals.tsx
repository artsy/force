import { graphql, useFragment } from "react-relay"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useCollectorSignals_artwork$key } from "__generated__/useCollectorSignals_artwork.graphql"
import { useCollectorSignals_artworksConnection$key } from "__generated__/useCollectorSignals_artworksConnection.graphql"
import { useCollectorSignals_me$key } from "__generated__/useCollectorSignals_me.graphql"
import { extractNodes } from "Utils/extractNodes"

interface ArtworkData {
  internalID: string
  isAcquireable?: boolean | null
}

interface PartnerOffer {
  artworkId?: string | null
  endAt?: string | null
}

interface SignalResult {
  partnerOffer: { endAt?: string | null } | null
}

interface SignalResultForArtworks {
  [artworkID: string]: SignalResult | undefined
}

// Define interfaces for clearer type distinction
interface UseCollectorSignalsSingleArtwork {
  artwork: useCollectorSignals_artwork$key
  artworksConnection?: null
  me?: useCollectorSignals_me$key | null
}

interface UseCollectorSignalsMultipleArtworks {
  artworksConnection?: useCollectorSignals_artworksConnection$key | null
  artwork?: null
  me?: useCollectorSignals_me$key | null
}

export function useCollectorSignals(
  props: UseCollectorSignalsSingleArtwork
): SignalResult
// eslint-disable-next-line no-redeclare
export function useCollectorSignals(
  props: UseCollectorSignalsMultipleArtworks
): SignalResultForArtworks

// eslint-disable-next-line no-redeclare
export function useCollectorSignals({
  artwork,
  artworksConnection,
  me,
}: UseCollectorSignalsSingleArtwork | UseCollectorSignalsMultipleArtworks):
  | SignalResultForArtworks
  | SignalResult {
  const signalsPartnerOffersEnabled = useFeatureFlag(
    "emerald_signals-partner-offers"
  )
  const meData = useFragment(ME_FRAGMENT, me)
  const artworkData = useFragment(ARTWORK_FRAGMENT, artwork)
  const artworksConnectionData = useFragment(
    ARTWORKS_CONNECTION_FRAGMENT,
    artworksConnection
  )

  const partnerOffers: PartnerOffer[] = extractNodes(
    meData?.partnerOffersConnection
  )
  const artworks: ArtworkData[] = extractNodes(artworksConnectionData)

  const isSingleArtwork = !!artworkData
  const normalizedArtworks: ArtworkData[] = isSingleArtwork
    ? [artworkData]
    : artworks

  const collectorSignals = normalizedArtworks.reduce<
    UseCollectorSignalsMultipleArtworks
  >((acc, artwork) => {
    const signals = {} as SignalResult

    if (!artwork.isAcquireable) {
      return acc
    }

    if (signalsPartnerOffersEnabled) {
      const offer = partnerOffers.find(
        offer => offer.artworkId === artwork.internalID
      )
      if (offer) {
        signals.partnerOffer = offer
      }
    }

    if (Object.keys(signals).length > 0) {
      acc[artwork.internalID] = signals
    }
    return acc
  }, {} as UseCollectorSignalsMultipleArtworks)

  const result = isSingleArtwork
    ? Object.values(collectorSignals)[0]
    : collectorSignals
  return result
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

const ARTWORK_FRAGMENT = graphql`
  fragment useCollectorSignals_artwork on Artwork {
    internalID
    isAcquireable
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
