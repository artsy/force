import { Sans, Serif, Spacer } from "@artsy/palette"
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
  // @ts-expect-error STRICT_NULL_CHECK
  const offerNote = order.myLastOffer.note

  return (
    <StepSummaryItem title="Your offer" {...others}>
      <Serif size={["2", "3t"]} color="black100">
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {order.myLastOffer.amount}
      </Serif>
      {offerItem && (
        <Sans size="2" color="black60">
          List price: {offerItem.price}
        </Sans>
      )}
      {offerNote && (
        <>
          <Spacer mb={[2, 3]} />
          <Serif size={["2", "3t"]} weight="semibold" color="black100">
            Your note
          </Serif>
          <Serif size={["2", "3t"]} color="black60">
            {offerNote}
          </Serif>
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
