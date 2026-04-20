import {
  type CheckoutStep,
  CheckoutStepName,
  CheckoutStepState,
  type FulfillmentDetailsTab,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"

/**
 * Applies all delivery option step logic in one place:
 * 1. If `tab` is provided, hides DELIVERY_OPTION for pickup or restores it
 *    to UPCOMING when switching back to delivery.
 * 2. Enforces the dual-active invariant: when hasSavedAddresses is true and
 *    FULFILLMENT_DETAILS is ACTIVE, DELIVERY_OPTION must also be ACTIVE
 *    (unless HIDDEN).
 *
 * Call this at the end of any action that may affect step states.
 */
export const applyDeliveryOptionLogic = (
  steps: CheckoutStep[],
  tab?: FulfillmentDetailsTab | null,
): CheckoutStep[] => {
  let updated = steps
  if (tab !== undefined) {
    updated = steps.map(step => {
      if (step.name === CheckoutStepName.DELIVERY_OPTION) {
        const shouldHide = tab === "PICKUP"
        if (shouldHide) {
          return { ...step, state: CheckoutStepState.HIDDEN }
        } else if (step.state === CheckoutStepState.HIDDEN) {
          return { ...step, state: CheckoutStepState.UPCOMING }
        }
      }
      return step
    })
  }
  const fdIsActive =
    updated.find(s => s.name === CheckoutStepName.FULFILLMENT_DETAILS)
      ?.state === CheckoutStepState.ACTIVE
  if (!fdIsActive) return updated
  // TODO: Should we always activate DELIVERY_OPTION when FULFILLMENT_DETAILS is active?
  return updated.map(step =>
    step.name === CheckoutStepName.DELIVERY_OPTION &&
    step.state === CheckoutStepState.UPCOMING
      ? { ...step, state: CheckoutStepState.ACTIVE }
      : step,
  )
}
