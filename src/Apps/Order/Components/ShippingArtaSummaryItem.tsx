import { ShippingArtaSummaryItem_order$data } from "__generated__/ShippingArtaSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Components/StepSummaryItem"
import { shippingQuoteDisplayNames } from "Apps/Order/Components/ShippingQuotes"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { startCase } from "lodash"

interface ShippingArtaSummaryItemProps {
  order: ShippingArtaSummaryItem_order$data
}

const ShippingArtaSummaryItem: React.FC<
  ShippingArtaSummaryItemProps & StepSummaryItemProps
> = ({ order: { requestedFulfillment, lineItems }, ...others }) => {
  const shippingQuote = lineItems?.edges?.[0]?.node?.selectedShippingQuote

  if (
    !shippingQuote ||
    requestedFulfillment?.__typename !== "CommerceShipArta"
  ) {
    return null
  }

  return requestedFulfillment?.__typename === "CommerceShipArta" ? (
    <StepSummaryItem {...others}>
      <Text variant="sm-display">
        {startCase(shippingQuoteDisplayNames[shippingQuote.typeName])} delivery
        ({shippingQuote.price})
      </Text>
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
              selectedShippingQuote {
                typeName
                price(precision: 2)
              }
            }
          }
        }
      }
    `,
  }
)
