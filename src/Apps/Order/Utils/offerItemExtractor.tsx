export interface OfferItem {
  price: string
  displayPriceRange?: boolean
}

export const getOfferItemFromOrder = (orderLineItemsNode): OfferItem | null => {
  const offerItem = orderLineItemsNode.edges[0].node.artworkOrEditionSet

  if (["Artwork", "EditionSet"].includes(offerItem?.__typename)) {
    return offerItem
  }
  return null
}
