export interface OfferItem {
  price: string
  displayPriceRange?: boolean
}

export const getOfferItemFromOrder = (orderLineItemsNode): OfferItem | null => {
  const offerItem = orderLineItemsNode.edges[0].node.artworkOrEditionSet

  if (
    offerItem.__typename == "Artwork" ||
    offerItem.__typename == "EditionSet"
  ) {
    return offerItem
  }
  return null
}
