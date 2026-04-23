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
  const isFlatRate = ["DOMESTIC_FLAT", "INTERNATIONAL_FLAT"].includes(
    fulfillmentType,
  )

  // We don't use the disambiguated currency symbol in this case because
  // the full pricing breakdown includes it - it is more like a label for the
  // delivery option, eg "Domestic Flat Rate $42".
  // TODO: Possible improvement: allow the Money.display graphQL field to
  // accept a formatting argument.
  const amount = orderData.selectedFulfillmentOption?.amount
  const simplePriceDisplay =
    isFlatRate && amount && amount.minor > 0
      ? `${amount.currencySymbol}${amount.major}`
      : null

  return {
    label: label || "",
    timeEstimatePrefix: timeEstimate?.[0] || null,
    timeEstimateRange: timeEstimate?.[1] || null,
    simplePriceDisplay,
  }
}

const FRAGMENT = graphql`
  fragment useCompleteDeliveryOptionData_order on Order {
    selectedFulfillmentOption {
      type
      amount {
        minor
        display
        major
        currencySymbol
      }
    }
  }
`
