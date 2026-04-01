import type { Order2OfferStep_order$data } from "__generated__/Order2OfferStep_order.graphql"

/**
 * Determines whether to show a simple price input or radio button options
 * based on the artwork pricing type.
 */
export const useOfferPriceInputType = (
  orderData: Order2OfferStep_order$data,
) => {
  const isPriceHidden = orderData.lineItems?.[0]?.artwork?.isPriceHidden
  const artworkOrEditionSet = orderData.lineItems?.[0]?.artworkOrEditionSet
  const pricingData = artworkOrEditionSet?.listPrice

  // Check for partial price range ("under XXX or over XXX")
  const isPartialPriceRange =
    pricingData?.__typename === "PriceRange" &&
    (!pricingData?.minPrice?.major || !pricingData?.maxPrice?.major)

  return {
    showPriceInputOnly: isPriceHidden || isPartialPriceRange,
  }
}
