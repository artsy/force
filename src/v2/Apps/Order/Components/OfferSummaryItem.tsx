import { Spacer, Text } from "@artsy/palette"
import { OfferSummaryItem_order } from "v2/__generated__/OfferSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { getOfferItemFromOrder } from "v2/Apps/Order/Utils/offerItemExtractor"

const OfferSummaryItem = ({
  order,
  ...others
}: {
  order: OfferSummaryItem_order
} & StepSummaryItemProps) => {
  const offerItem = getOfferItemFromOrder(order.lineItems)
  const offerNote = order.myLastOffer?.note

  return (
    <StepSummaryItem title="Your offer" {...others}>
      <Text variant={["xs", "md"]} color="black100">
        {order.myLastOffer?.amount}
      </Text>
      {offerItem && (
        <Text variant="xs" color="black60">
          List price: {offerItem.price}
        </Text>
      )}
      {offerNote && (
        <>
          <Spacer mb={[2, 4]} />
          <Text variant={["xs", "md"]} color="black100">
            Your note
          </Text>
          <Text variant={["xs", "md"]} color="black60">
            {offerNote}
          </Text>
        </>
      )}
    </StepSummaryItem>
  )
}

export const OfferSummaryItemFragmentContainer = createFragmentContainer(
  OfferSummaryItem,
  {
    order: graphql`
      fragment OfferSummaryItem_order on CommerceOrder {
        lineItems {
          edges {
            node {
              artworkOrEditionSet {
                __typename
                ... on Artwork {
                  price
                }
                ... on EditionSet {
                  price
                }
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          myLastOffer {
            amount(precision: 2)
            note
          }
        }
      }
    `,
  }
)
