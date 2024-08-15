export interface PartnerOffer {
  isAvailable: boolean | null | undefined
}

export interface CollectorSignals {
  partnerOffer: PartnerOffer | null | undefined
}

export const findSignalLabel = (collectorSignals: CollectorSignals) => {
  const { partnerOffer } = collectorSignals

  return partnerOffer?.isAvailable ? "Limited-Time Offer" : ""
}
