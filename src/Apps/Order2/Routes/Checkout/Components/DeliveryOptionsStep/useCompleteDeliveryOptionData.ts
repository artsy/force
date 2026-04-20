import type { Order2DeliveryOptionsCompletedViewProps } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsCompletedView"
import {
  deliveryOptionLabel,
  deliveryOptionTimeEstimate,
} from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import type { useCompleteDeliveryOptionData_order$key } from "__generated__/useCompleteDeliveryOptionData_order.graphql"
import { graphql, useFragment } from "react-relay"

/**
 * Hook that returns props for the completed delivery option view if the step is complete.
 * Returns null if the delivery option is not complete.
 */
export const useCompleteDeliveryOptionData = (
  order: useCompleteDeliveryOptionData_order$key,
): Order2DeliveryOptionsCompletedViewProps | null => {
  const orderData = useFragment(FRAGMENT, order)

  const fulfillmentType = orderData.selectedFulfillmentOption?.type
  const cost = orderData.selectedFulfillmentOption?.amount?.minor

  if (!fulfillmentType) {
    return null
  }

  if (fulfillmentType === "PICKUP") {
    return null
  }

  if (fulfillmentType === "SHIPPING_TBD") {
    return {
      label:
        "Shipping details will be updated after checkout. You will be able to review and approve the final total before purchase",
      timeEstimatePrefix: null,
      timeEstimateRange: null,
    }
  }

  const isSpecificMethod = [
    "ARTSY_STANDARD",
    "ARTSY_EXPRESS",
    "ARTSY_WHITE_GLOVE",
    "DOMESTIC_FLAT",
    "INTERNATIONAL_FLAT",
  ].includes(fulfillmentType)

  if (!isSpecificMethod) {
    return null
  }

  const label = deliveryOptionLabel(fulfillmentType, cost)
  const timeEstimate = deliveryOptionTimeEstimate(fulfillmentType)

  return {
    label: label || "",
    timeEstimatePrefix: timeEstimate?.[0] || null,
    timeEstimateRange: timeEstimate?.[1] || null,
  }
}

const FRAGMENT = graphql`
  fragment useCompleteDeliveryOptionData_order on Order {
    selectedFulfillmentOption {
      type
      amount {
        minor
      }
    }
  }
`
