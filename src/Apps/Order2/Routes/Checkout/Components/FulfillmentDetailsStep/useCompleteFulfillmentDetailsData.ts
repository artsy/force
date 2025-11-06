import type { Order2FulfillmentDetailsCompletedViewProps } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsCompletedView"
import type { useCompleteFulfillmentDetailsData_order$key } from "__generated__/useCompleteFulfillmentDetailsData_order.graphql"
import { graphql, useFragment } from "react-relay"

/**
 * Hook that returns props for the completed fulfillment details view if the step is complete.
 * Returns null if fulfillment details are not complete.
 * Fulfillment details is complete if the backend has saved minimal address data.
 */
export const useCompleteFulfillmentDetailsData = (
  order: useCompleteFulfillmentDetailsData_order$key,
): Order2FulfillmentDetailsCompletedViewProps | null => {
  const orderData = useFragment(FRAGMENT, order)

  const details = orderData.fulfillmentDetails ?? {}
  const isComplete = ["addressLine1", "country"].every(field => {
    return details[field as keyof typeof details] != null
  })

  if (!isComplete) {
    return null
  }

  const isPickup = orderData.selectedFulfillmentOption?.type === "PICKUP"

  return {
    isPickup,
    fulfillmentDetails: {
      name: orderData.fulfillmentDetails?.name || null,
      addressLine1: orderData.fulfillmentDetails?.addressLine1 || null,
      addressLine2: orderData.fulfillmentDetails?.addressLine2 || null,
      city: orderData.fulfillmentDetails?.city || null,
      region: orderData.fulfillmentDetails?.region || null,
      postalCode: orderData.fulfillmentDetails?.postalCode || null,
      country: orderData.fulfillmentDetails?.country || null,
      phoneNumber: orderData.fulfillmentDetails?.phoneNumber?.display || null,
    },
  }
}

const FRAGMENT = graphql`
  fragment useCompleteFulfillmentDetailsData_order on Order {
    fulfillmentDetails {
      addressLine1
      addressLine2
      city
      country
      name
      postalCode
      region
      phoneNumber {
        display
      }
    }
    selectedFulfillmentOption {
      type
    }
  }
`
