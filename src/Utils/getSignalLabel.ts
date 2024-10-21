export interface CollectorSignals {
  primaryLabel?: string | null | undefined
}

interface SignalLabelProps {
  collectorSignals: CollectorSignals
  hideSignals?: boolean
}

export const getSignalLabel = ({
  collectorSignals,
  hideSignals,
}: SignalLabelProps) => {
  const { primaryLabel } = collectorSignals

  if (
    hideSignals &&
    (primaryLabel === "CURATORS_PICK" || primaryLabel === "INCREASED_INTEREST")
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
