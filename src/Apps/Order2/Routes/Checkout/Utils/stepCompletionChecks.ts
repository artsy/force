/**
 * Utility functions to determine if checkout steps are complete based on order data.
 * These are used both when initializing step state on page load and within individual
 * step components to determine their completion status.
 */

import {
  type CheckoutStep,
  CheckoutStepName,
  CheckoutStepState,
} from "../CheckoutContext/types"

/**
 * Check if offer amount step is complete.
 * An offer is complete if there is already an offer with a positive amount.
 * We check the most recent offer (sorted by createdAt).
 */
export const isOfferComplete = (order: {
  mode?: string | null
  offers?: ReadonlyArray<{
    amount?: { minor?: number | null } | null
    createdAt?: string | null
  } | null> | null
}): boolean => {
  // Only applicable for OFFER mode orders
  if (order.mode !== "OFFER") {
    return true
  }

  // Get the most recent offer (sorted by createdAt, most recent first)
  const sortedOffers = [...(order.offers || [])]
    .filter((offer): offer is NonNullable<typeof offer> => offer !== null)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA // Most recent first
    })

  const mostRecentOffer = sortedOffers[0]
  return !!(mostRecentOffer?.amount?.minor && mostRecentOffer.amount.minor > 0)
}

/**
 * Check if fulfillment details step is complete.
 * Fulfillment details is complete if the backend has saved fulfillment details data.
 * We trust that if the backend saved it, the data is valid.
 */
export const isFulfillmentDetailsComplete = (order: {
  fulfillmentDetails?: {
    addressLine1?: string | null
    city?: string | null
    postalCode?: string | null
    country?: string | null
    name?: string | null
    phoneNumber?: {
      originalNumber?: string | null
    } | null
  } | null
}): boolean => {
  const details = order.fulfillmentDetails

  // If no fulfillment details exist, not complete
  if (!details) {
    return false
  }

  // If fulfillment details is an empty object, not complete
  if (typeof details === "object" && Object.keys(details).length === 0) {
    return false
  }

  // If backend has saved fulfillment details, it's complete
  return true
}

/**
 * Check if delivery option (shipping method) step is complete.
 *
 * Note: A fulfillment option cannot be complete if it includes multiple fulfillment
 * options - even if one is auto-selected, the user should have to proceed from there.
 *
 * This function checks if a specific shipping method is selected, not just auto-selected.
 * The actual completion logic for delivery option is handled separately when the user
 * explicitly selects and confirms their choice (via radio button click).
 *
 * This is primarily used for page load state initialization to determine if the step
 * was previously completed in a prior session.
 */
export const isDeliveryOptionComplete = (order: {
  selectedFulfillmentOption?: { type?: string | null } | null
}): boolean => {
  const fulfillmentType = order.selectedFulfillmentOption?.type

  // Not complete if no selection
  if (!fulfillmentType) {
    return false
  }

  // Pickup orders skip this step entirely (it's hidden)
  if (fulfillmentType === "PICKUP") {
    return false
  }

  // Check if a specific shipping method is selected
  // (not generic "SHIP" which might be a placeholder/auto-selected value)
  const isSpecificMethod = [
    "ARTSY_STANDARD",
    "ARTSY_EXPRESS",
    "ARTSY_WHITE_GLOVE",
    "DOMESTIC_FLAT",
    "INTERNATIONAL_FLAT",
  ].includes(fulfillmentType)

  return isSpecificMethod
}

/**
 * Check if payment step is complete.
 * Payment is complete if the order has a paymentMethod saved with details, OR
 * This works for all payment types including credit card, bank account, and wire transfer.
 */
export const isPaymentComplete = (order: {
  paymentMethod?: string | null
  paymentMethodDetails?: unknown
}): boolean => {
  // Check if payment method is saved
  if (!order.paymentMethod) {
    return false
  }

  // Ensure paymentMethodDetails is not just an empty object
  if (
    !order.paymentMethodDetails ||
    (typeof order.paymentMethodDetails === "object" &&
      Object.keys(order.paymentMethodDetails).length === 0)
  ) {
    return false
  }

  return true
}

/**
 * Build the initial steps array for an order based on completion checks.
 * This determines which steps are complete, active, upcoming, or hidden.
 */
export const buildInitialSteps = (order: {
  mode?: string | null
  selectedFulfillmentOption?: { type?: string | null } | null
  offers?: ReadonlyArray<{
    amount?: { minor?: number | null } | null
  } | null> | null
  fulfillmentDetails?: {
    addressLine1?: string | null
    city?: string | null
    postalCode?: string | null
    country?: string | null
    name?: string | null
    phoneNumber?: {
      originalNumber?: string | null
    } | null
  } | null
  paymentMethod?: string | null
  paymentMethodDetails?: unknown
}): CheckoutStep[] => {
  const stepNamesInOrder: CheckoutStepName[] = [
    CheckoutStepName.FULFILLMENT_DETAILS,
    CheckoutStepName.DELIVERY_OPTION,
    CheckoutStepName.PAYMENT,
    CheckoutStepName.CONFIRMATION,
  ]

  if (order.mode === "OFFER") {
    stepNamesInOrder.unshift(CheckoutStepName.OFFER_AMOUNT)
  }

  // Run completion checks
  const offerComplete = isOfferComplete(order)
  const fulfillmentComplete = isFulfillmentDetailsComplete(order)
  const deliveryComplete = isDeliveryOptionComplete(order)
  const paymentComplete = isPaymentComplete(order)
  const isPickup = order.selectedFulfillmentOption?.type === "PICKUP"

  // Build steps with states based on completion checks
  let hasSetActive = false
  const steps = stepNamesInOrder.map(stepName => {
    // Delivery option is hidden for pickup orders
    if (stepName === CheckoutStepName.DELIVERY_OPTION && isPickup) {
      return {
        name: stepName,
        state: CheckoutStepState.HIDDEN,
      }
    }

    // Determine if this step is complete
    let stepComplete = false
    if (stepName === CheckoutStepName.OFFER_AMOUNT) {
      stepComplete = offerComplete
    } else if (stepName === CheckoutStepName.FULFILLMENT_DETAILS) {
      stepComplete = fulfillmentComplete
    } else if (stepName === CheckoutStepName.DELIVERY_OPTION) {
      stepComplete = deliveryComplete
    } else if (stepName === CheckoutStepName.PAYMENT) {
      stepComplete = paymentComplete
    }

    // Set state based on completion and whether we've set an active step
    if (stepComplete) {
      return {
        name: stepName,
        state: CheckoutStepState.COMPLETED,
      }
    } else if (!hasSetActive) {
      hasSetActive = true
      return {
        name: stepName,
        state: CheckoutStepState.ACTIVE,
      }
    } else {
      return {
        name: stepName,
        state: CheckoutStepState.UPCOMING,
      }
    }
  })

  return steps
}
