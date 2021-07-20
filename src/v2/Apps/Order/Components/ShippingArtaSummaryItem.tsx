import { ShippingArtaSummaryItem_order } from "v2/__generated__/ShippingArtaSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { Serif } from "@artsy/palette"
import { startCase } from "lodash"

interface ShippingArtaSummaryItemProps {
  order: ShippingArtaSummaryItem_order
}

const ShippingArtaSummaryItem: React.FC<
  ShippingArtaSummaryItemProps & StepSummaryItemProps
> = ({ order: { requestedFulfillment, lineItems }, ...others }) => {
  const shippingQuote = extractNodes(
    lineItems?.edges?.[0]?.node?.shippingQuoteOptions
  ).find(shippingQuote => shippingQuote.isSelected)

  if (
    !shippingQuote ||
    requestedFulfillment?.__typename !== "CommerceShipArta"
  ) {
    return null
  }

  const shippingQuoteName = shippingQuote.name || shippingQuote.tier

  return requestedFulfillment?.__typename === "CommerceShipArta" ? (
    <StepSummaryItem {...others}>
      <Serif size={["3", "3t"]}>
        {startCase(shippingQuoteName)} delivery ({shippingQuote.price})
      </Serif>
    </StepSummaryItem>
  ) : null
}

export const ShippingArtaSummaryItemFragmentContainer = createFragmentContainer(
  ShippingArtaSummaryItem,
  {
    order: graphql`
      fragment ShippingArtaSummaryItem_order on CommerceOrder {
        requestedFulfillment {
          __typename
        }
        lineItems {
          edges {
            node {
              shippingQuoteOptions {
                edges {
                  node {
                    name
                    tier
                    isSelected
                    price(precision: 2)
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)
