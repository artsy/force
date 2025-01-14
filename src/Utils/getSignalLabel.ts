import type { ArtworkSidebarPartnerInfo_artwork$data } from "__generated__/ArtworkSidebarPartnerInfo_artwork.graphql"

export type CollectorSignals =
  ArtworkSidebarPartnerInfo_artwork$data["collectorSignals"]

interface SignalLabelProps {
  signals: string[]
  hideSignals?: boolean
}

export const getSignalLabel = ({ signals, hideSignals }: SignalLabelProps) => {
  if (!signals) {
    return ""
  }

  if (signals.includes("PARTNER_OFFER")) {
    return "Limited-Time Offer"
  }

  if (signals.includes("CURATORS_PICK") && !hideSignals) {
    return "Curators’ Pick"
  }

  if (signals.includes("INCREASED_INTEREST") && !hideSignals) {
    return "Increased Interest"
  }

  return ""
}

export const signalsToArray = (collectorSignals: CollectorSignals) => {
  const signals: string[] = []

  if (!collectorSignals) {
    return signals
  }

  if (collectorSignals.partnerOffer) {
    signals.push("PARTNER_OFFER")
  }

  if (collectorSignals.curatorsPick) {
    signals.push("CURATORS_PICK")
  }

  if (collectorSignals.increasedInterest) {
    signals.push("INCREASED_INTEREST")
  }

  return signals
}
