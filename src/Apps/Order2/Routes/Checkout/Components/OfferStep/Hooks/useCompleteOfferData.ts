import type { Order2OfferCompletedViewProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Order2OfferCompletedView"
import type { useCompleteOfferData_order$key } from "__generated__/useCompleteOfferData_order.graphql"
import { graphql, useFragment } from "react-relay"

/**
 * Hook that returns props for the completed offer view if the offer step is complete.
 * Returns null if the offer is not complete.
 * An offer is complete if there is already an offer with a positive amount.
 */
export const useCompleteOfferData = (
  order: useCompleteOfferData_order$key,
): Order2OfferCompletedViewProps | null => {
  const orderData = useFragment(FRAGMENT, order)

  if (orderData.mode !== "OFFER") {
    return null
  }

  const mostRecentOffer = orderData.pendingOffer
  if (!mostRecentOffer?.amount?.minor || mostRecentOffer.amount.minor <= 0) {
    return null
  }

  return {
    lastOfferAmount: mostRecentOffer.amount?.display || "",
    lastOfferNote: mostRecentOffer.note ?? null,
  }
}

const FRAGMENT = graphql`
  fragment useCompleteOfferData_order on Order {
    mode
    pendingOffer {
      note
      amount {
        minor
        display
      }
    }
  }
`
