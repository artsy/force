import { Serif } from "@artsy/palette"
import { ShippingSummaryItem_order } from "v2/__generated__/ShippingSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShippingAddressFragmentContainer as ShippingAddress } from "./ShippingAddress"

/**
 * When the order is completed or canceled state we _don't_ want to tell
 * the user that they'll be assigned an artsy specialist as it doesn't make
 * sense in that context
 */
const showPickupCopy = state => state !== "FULFILLED" && state !== "CANCELED"

const ShippingSummaryItem = ({
  order: { state, requestedFulfillment, lineItems },
  ...others
}: {
  order: ShippingSummaryItem_order
} & StepSummaryItemProps) => {
  return requestedFulfillment.__typename === "CommerceShip" ? (
    <StepSummaryItem title="Ship to" {...others}>
      <ShippingAddress ship={requestedFulfillment} />
    </StepSummaryItem>
  ) : (
      <StepSummaryItem
        title={<>Pick up ({lineItems.edges[0].node.artwork.shippingOrigin})</>}
        /* Fixes spacing issues with title when no pickup description copy is present */
        mb={showPickupCopy(state) ? undefined : -1}
        {...others}
      >
        {showPickupCopy(state) && (
          <Serif size="3t">
            After your order is confirmed, a specialist will contact you within 2
            business days to coordinate pickup.
          </Serif>
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
