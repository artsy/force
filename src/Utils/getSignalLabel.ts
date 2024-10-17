export interface CollectorSignals {
  primaryLabel?: string | null | undefined
}

export const getSignalLabel = (
  collectorSignals: CollectorSignals,
  hideSignals?: boolean
) => {
  const { primaryLabel } = collectorSignals

  if (
    hideSignals &&
    (primaryLabel === "PARTNER_OFFER" || primaryLabel === "INCREASED_INTEREST")
  ) {
    return ""
  }

  switch (primaryLabel) {
    case "PARTNER_OFFER":
      return "Limited-Time Offer"
    case "INCREASED_INTEREST":
      return "Increased Interest"
    case "CURATORS_PICK":
      return "Curators’ Pick"
    default:
      return ""
  }
}
