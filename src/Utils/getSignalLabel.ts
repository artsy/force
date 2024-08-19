export interface PartnerOffer {
  isAvailable?: boolean | null | undefined
  endAt?: string | null | undefined
  priceWithDiscount?:
    | {
        display: string | null | undefined
      }
    | null
    | undefined
}

export interface CollectorSignals {
  partnerOffer?: PartnerOffer | null | undefined
  bidCount?: number | null | undefined
  lotWatcherCount?: number | null | undefined
}

export const getSignalLabel = (collectorSignals: CollectorSignals) => {
  const { partnerOffer } = collectorSignals

  return partnerOffer ? "Limited-Time Offer" : ""
}
