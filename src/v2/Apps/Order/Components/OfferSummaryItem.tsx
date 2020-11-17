import { Sans, Serif, Spacer } from "@artsy/palette"
import { OfferSummaryItem_order } from "v2/__generated__/OfferSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"

const OfferSummaryItem = ({
  order,
  ...others
}: {
  order: OfferSummaryItem_order
} & StepSummaryItemProps) => {
  const offerNote = order.myLastOffer.note
  const artwork = get({}, props => order.lineItems.edges[0].node.artwork)

  return (
    <StepSummaryItem title="Your offer" {...others}>
      <Serif size={["2", "3t"]} color="black100">
        {order.myLastOffer.amount}
      </Serif>
      <Sans size="2" color="black60">
        List price: {artwork.saleMessage}
      </Sans>
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
        ... on CommerceOfferOrder {
          myLastOffer {
            amount(precision: 2)
            note
          }
        }
        lineItems {
          edges {
            node {
              artwork {
                saleMessage
              }
            }
          }
        }
      }
    `,
  }
)
