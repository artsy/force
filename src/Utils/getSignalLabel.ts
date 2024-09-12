export interface CollectorSignals {
  primaryLabel?: string | null | undefined
}

export const getSignalLabel = (collectorSignals: CollectorSignals) => {
  const { primaryLabel } = collectorSignals

  if (primaryLabel === "PARTNER_OFFER") {
    return "Limited-time Offer"
  } else if (primaryLabel === "INCREASED_INTEREST") {
    return "Increased Interest"
  } else if (primaryLabel === "CURATORS_PICK") {
    return "Curators' Pick"
  } else {
    return ""
  }
}
