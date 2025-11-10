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

  const fulfillmentDetails = orderData.fulfillmentDetails
  if (!fulfillmentDetails) {
    return null
  }
  switch (orderData.selectedFulfillmentOption?.type) {
    case "PICKUP":
      return {
        isPickup: true,
        fulfillmentDetails: {
          name: fulfillmentDetails?.name,
          phoneNumber: orderData.fulfillmentDetails?.phoneNumber?.display,
        },
      }
    default:
      const isComplete = ["addressLine1", "country", "name"].every(field => {
        return (
          fulfillmentDetails[field as keyof typeof fulfillmentDetails] != null
        )
      })

      if (!isComplete) {
        return null
      }

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
          phoneNumber:
            orderData.fulfillmentDetails?.phoneNumber?.display || null,
        },
      }
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
