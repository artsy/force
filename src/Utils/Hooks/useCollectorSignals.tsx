import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

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
  artwork: ArtworkData
  artworks?: null
  partnerOffers: Array<PartnerOffer>
}

interface UseCollectorSignalsMultipleArtworks {
  artworks: Array<ArtworkData>
  artwork?: null
  partnerOffers: Array<PartnerOffer>
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
  artworks,
  partnerOffers,
}: UseCollectorSignalsSingleArtwork | UseCollectorSignalsMultipleArtworks):
  | SignalResultForArtworks
  | SignalResult {
  const signalsPartnerOffersEnabled = useFeatureFlag(
    "emerald_signals-partner-offers"
  )

  const isSingleArtwork = !!artwork
  const normalizedArtworks: ArtworkData[] = isSingleArtwork
    ? [artwork]
    : (artworks as ArtworkData[])

  const collectorSignals = normalizedArtworks.reduce<
    UseCollectorSignalsMultipleArtworks
  >((acc, artwork) => {
    const signals: SignalResult = (acc[artwork.internalID] = {
      partnerOffer: null,
    })

    if (!artwork.isAcquireable) {
      return acc
    }

    if (!signalsPartnerOffersEnabled) {
      signals.partnerOffer = null
      return acc
    }

    const offers = partnerOffers.filter(
      offer => offer.artworkId === artwork.internalID
    )

    signals.partnerOffer = offers[0] ?? null

    return acc
  }, {} as UseCollectorSignalsMultipleArtworks)

  return isSingleArtwork ? Object.values(collectorSignals)[0] : collectorSignals
}
