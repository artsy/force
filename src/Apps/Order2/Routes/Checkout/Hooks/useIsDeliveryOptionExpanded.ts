import { useCompleteFulfillmentDetailsData } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/useCompleteFulfillmentDetailsData"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import type { useIsDeliveryOptionExpanded_order$key } from "__generated__/useIsDeliveryOptionExpanded_order.graphql"
import { graphql, useFragment } from "react-relay"

/**
 * Returns true when the DELIVERY_OPTION section is actually visible to the
 * collector — i.e. it would render the real shipping-options form rather
 * than the collapsed placeholder.
 *
 * Used as a render gate by Order2DeliveryOptionsStep and as the matching
 * tracking gate in Order2CheckoutApp, so the two stay in sync.
 *
 * TODO: Long-term, step state should be the single source of truth — ACTIVE
 * should mean "expanded and interactive." That requires making the dual-
 * active promotion in applyDeliveryOptionLogic reactive to fresh order data
 * (hasFulfillmentDetails, isFulfillmentDetailsSaving), which conflicts with
 * easy-peasy's mount-frozen runtimeModel. Once that's resolved, this hook
 * can be deleted and both consumers can just check stepState === ACTIVE.
 */
export const useIsDeliveryOptionExpanded = (
  order: useIsDeliveryOptionExpanded_order$key,
): boolean => {
  const orderData = useFragment(FRAGMENT, order)
  const { isFulfillmentDetailsSaving } = useCheckoutContext()
  const hasFulfillmentDetails =
    useCompleteFulfillmentDetailsData(orderData) !== null
  const isPickup = orderData.selectedFulfillmentOption?.type === "PICKUP"
  return (hasFulfillmentDetails && !isPickup) || isFulfillmentDetailsSaving
}

const FRAGMENT = graphql`
  fragment useIsDeliveryOptionExpanded_order on Order {
    ...useCompleteFulfillmentDetailsData_order
    selectedFulfillmentOption {
      type
    }
  }
`
