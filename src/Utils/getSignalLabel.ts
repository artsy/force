export interface CollectorSignals {
  primaryLabel?: string | null | undefined
}

export const getSignalLabel = (collectorSignals: CollectorSignals) => {
  const { primaryLabel } = collectorSignals

  switch (primaryLabel) {
    case "PARTNER_OFFER":
      return "Limited-Time Offer"
    case "INCREASED_INTEREST":
      return "Increased Interest"
    case "CURATORS_PICK":
      return "Curators' Pick"
    default:
      return ""
  }
}
