import type { Order2FulfillmentDetailsCompletedViewProps } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsCompletedView"
import type { useCompleteFulfillmentDetailsData_order$key } from "__generated__/useCompleteFulfillmentDetailsData_order.graphql"
import { graphql, useFragment } from "react-relay"

/**
 * Hook that returns props for the completed fulfillment details view if the step is complete.
 * Returns null if fulfillment details are not complete.
 */
export const useCompleteFulfillmentDetailsData = (
  order: useCompleteFulfillmentDetailsData_order$key,
): Order2FulfillmentDetailsCompletedViewProps | null => {
  const orderData = useFragment(FRAGMENT, order)

  const fulfillmentDetails = orderData.fulfillmentDetails
  const isOffer = orderData.mode === "OFFER"
  if (!fulfillmentDetails) {
    return null
  }

  const selectedType = orderData.selectedFulfillmentOption?.type

  // For pickup: step is complete if name and phone number exist and PICKUP is selected.
  if (selectedType === "PICKUP") {
    return {
      isPickup: true,
      fulfillmentDetails: {
        name: fulfillmentDetails?.name,
        phoneNumber: orderData.fulfillmentDetails?.phoneNumber?.display,
      },
      isOffer,
    }
  }

  /**
   * For delivery addresses:
   * - In BUY mode: requires both address data AND a valid fulfillment option to be selected.
   *   If address exists but no fulfillment option is set, this indicates an error state
   *   (e.g., missing postal code, unsupported region) and the step should remain active.
   * - In OFFER mode: address data alone is sufficient since shipping is determined later (TBD).
   *   However, we still validate that basic required fields are present.
   *
   * For pickup: step is complete if name and phone number exist and PICKUP is selected.
   */
  const isComplete = ["addressLine1", "country", "name"].every(field => {
    return fulfillmentDetails[field as keyof typeof fulfillmentDetails] != null
  })

  if (!isComplete) {
    return null
  }

  // In BUY mode fulfillment option has to be selected.
  // If address exists but no option is selected, step is incomplete.
  if (!isOffer && !selectedType) {
    return null
  }

  // Step is complete - return the view props
  return {
    isPickup: false,
    fulfillmentDetails: {
      name: fulfillmentDetails?.name || null,
      addressLine1: fulfillmentDetails?.addressLine1 || null,
      addressLine2: fulfillmentDetails?.addressLine2 || null,
      city: fulfillmentDetails?.city || null,
      region: fulfillmentDetails?.region || null,
      postalCode: fulfillmentDetails?.postalCode || null,
      country: orderData.fulfillmentDetails?.country || null,
      phoneNumber: orderData.fulfillmentDetails?.phoneNumber?.display || null,
    },
  }
}

const FRAGMENT = graphql`
  fragment useCompleteFulfillmentDetailsData_order on Order {
    mode
    fulfillmentDetails {
      addressLine1
      addressLine2
      city
      country
      name
      postalCode
      region
      phoneNumber {
        display(format: INTERNATIONAL)
      }
    }
    selectedFulfillmentOption {
      type
    }
  }
`
