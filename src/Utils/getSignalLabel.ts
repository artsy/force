export interface CollectorSignals {
  primaryLabel?: string | null | undefined
}

interface SignalLabelProps {
  collectorSignals: CollectorSignals
  hideSignals?: string[]
}

export const getSignalLabel = ({
  collectorSignals,
  hideSignals,
}: SignalLabelProps) => {
  const { primaryLabel } = collectorSignals

  if (primaryLabel && hideSignals?.includes(primaryLabel)) {
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
