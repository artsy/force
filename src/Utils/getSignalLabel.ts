export const getSignalLabel = (signals: string[]) => {
  if (!signals) {
    return ""
  }

  if (signals.includes("PARTNER_OFFER")) {
    return "Limited-Time Offer"
  }

  if (signals.includes("INCREASED_INTEREST")) {
    return "Increased Interest"
  }

  if (signals.includes("CURATORS_PICK")) {
    return "Curators’ Pick"
  }

  return ""
}
