import { Text } from "@artsy/palette"
import { ShippingSummaryItem_order$data } from "__generated__/ShippingSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Components/StepSummaryItem"
import { createFragmentContainer, graphql } from "react-relay"
import { ShippingAddressFragmentContainer as ShippingAddress } from "./ShippingAddress"

/**
 * When the order is completed or canceled state we _don't_ want to tell
 * the user that they'll be assigned an artsy specialist as it doesn't make
 * sense in that context
 */
const showPickupCopy = state => state !== "FULFILLED" && state !== "CANCELED"

const ShippingSummaryItem = ({
  order: { state, requestedFulfillment, lineItems, paymentMethod },
  textColor = "black100",
  ...others
}: {
  order: ShippingSummaryItem_order$data
  textColor?: string
} & StepSummaryItemProps) => {
  if (!requestedFulfillment) return null

  return requestedFulfillment.__typename === "CommerceShip" ||
    requestedFulfillment.__typename === "CommerceShipArta" ? (
    <StepSummaryItem title="Ship to" {...others}>
      <ShippingAddress ship={requestedFulfillment} textColor={textColor} />
    </StepSummaryItem>
  ) : (
    <StepSummaryItem
      title={
        <>Pick up ({lineItems?.edges?.[0]?.node?.artwork?.shippingOrigin})</>
      }
      /* Fixes spacing issues with title when no pickup description copy is present */
      mb={showPickupCopy(state) ? undefined : -1}
      {...others}
    >
      {showPickupCopy(state) && (
        <Text variant="xs" color={textColor}>
          {paymentMethod === "WIRE_TRANSFER"
            ? "After your order is confirmed, a specialist will contact you to coordinate pickup."
            : "After your order is confirmed, a specialist will contact you within 2 business days to coordinate pickup."}
        </Text>
      )}
    </StepSummaryItem>
  )
}

export const ShippingSummaryItemFragmentContainer = createFragmentContainer(
  ShippingSummaryItem,
  {
    order: graphql`
      fragment ShippingSummaryItem_order on CommerceOrder {
        state
        paymentMethod
        requestedFulfillment {
          __typename
          ...ShippingAddress_ship
        }
        lineItems {
          edges {
            node {
              artwork {
                shippingOrigin
              }
            }
          }
        }
      }
    `,
  }
)
