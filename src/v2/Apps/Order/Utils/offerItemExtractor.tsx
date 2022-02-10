export type Price = {
  major: number
}

export type PriceRange = {
  maxPrice: Price
  minPrice: Price
}

export interface OfferItem {
  price: string
  displayPriceRange?: boolean
  listPrice: PriceRange | Price
}

export const getOfferItemFromOrder = (orderLineItemsNode): OfferItem | null => {
  const offerItem = orderLineItemsNode.edges[0].node.artworkOrEditionSet

  if (["Artwork", "EditionSet"].includes(offerItem?.__typename)) {
    return offerItem
  }
  return null
}
