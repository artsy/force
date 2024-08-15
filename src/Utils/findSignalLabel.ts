export interface PartnerOffer {
  isActive: boolean | null | undefined
}

export interface CollectorSignals {
  partnerOffer: PartnerOffer | null | undefined
}

export const findSignalLabel = (collectorSignals: CollectorSignals) => {
  const { partnerOffer } = collectorSignals

  return partnerOffer?.isActive ? "Limited-Time Offer" : ""
}
