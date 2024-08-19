export interface CollectorSignals {
  partnerOffer?: object | null | undefined
}

export const getSignalLabel = (collectorSignals: CollectorSignals) => {
  const { partnerOffer } = collectorSignals

  return partnerOffer ? "Limited-Time Offer" : ""
}
