import type { Order2OfferStep_order$data } from "__generated__/Order2OfferStep_order.graphql"

/**
 * Determines whether to show a simple price input or radio button options
 * based on the artwork pricing type.
 *
 * Returns simple input for:
 * - Hidden prices (price on request)
 * - Partial price ranges (e.g., "Under $5,000" or "Over $10,000")
 *
 * Returns radio options for:
 * - Full price ranges (e.g., "$1,000 - $5,000")
 * - Exact prices (e.g., "$2,500")
 */
export const useOfferInputType = (orderData: Order2OfferStep_order$data) => {
  const isPriceHidden = orderData.lineItems?.[0]?.artwork?.isPriceHidden
  const artworkOrEditionSet = orderData.lineItems?.[0]?.artworkOrEditionSet
  const pricingData = artworkOrEditionSet?.listPrice

  // Check for partial price range (missing either min or max bound)
  const isPartialPriceRange =
    pricingData?.__typename === "PriceRange" &&
    (!pricingData?.minPrice?.major || !pricingData?.maxPrice?.major)

  return {
    showPriceInputOnly: isPriceHidden || isPartialPriceRange,
    isPriceHidden,
    isPartialPriceRange,
  }
}
