import { Spacer, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { getOfferItemFromOrder } from "Apps/Order/Utils/offerUtils"
import {
  StepSummaryItem,
  type StepSummaryItemProps,
} from "Components/StepSummaryItem"
import type { OfferSummaryItem_order$data } from "__generated__/OfferSummaryItem_order.graphql"
import { createFragmentContainer, graphql } from "react-relay"

const OfferSummaryItem = ({
  order,
  ...others
}: {
  order: OfferSummaryItem_order$data
} & StepSummaryItemProps) => {
  const offerItem = getOfferItemFromOrder(order.lineItems)
  const offerNote = order.myLastOffer?.note

  return (
    <StepSummaryItem title="Your offer" {...others}>
      <Text variant={["xs", "sm-display"]} color="mono100">
        {appendCurrencySymbol(order.myLastOffer?.amount, order.currencyCode)}
      </Text>
      {offerItem && (
        <Text variant="xs" color="mono60">
          List price:{" "}
          {appendCurrencySymbol(offerItem.price, order.currencyCode)}
        </Text>
      )}
      {offerNote && (
        <>
          <Spacer y={[2, 4]} />
          <Text variant={["xs", "sm-display"]} color="mono100">
            Your note
          </Text>
          <Text variant={["xs", "sm-display"]} color="mono60">
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
        currencyCode
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
  },
)
