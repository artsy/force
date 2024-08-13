export const findSignalLabels = artwork => {
  const { partnerOffer } = artwork.collectorSignals

  return partnerOffer ? ["Limited-Time Offer"] : []
}
