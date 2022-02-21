import { Spacer, Text } from "@artsy/palette"
import { OfferSummaryItem_order$data } from "v2/__generated__/OfferSummaryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { createFragmentContainer, graphql } from "react-relay"
import { getOfferItemFromOrder } from "v2/Apps/Order/Utils/offerItemExtractor"
import { appendCurrencySymbol } from "v2/Apps/Order/Utils/currencyUtils"

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
      <Text variant={["xs", "md"]} color="black100">
        {appendCurrencySymbol(order.myLastOffer?.amount, order.currencyCode)}
      </Text>
      {offerItem && (
        <Text variant="xs" color="black60">
          List price:{" "}
          {appendCurrencySymbol(offerItem.price, order.currencyCode)}
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
  }
)
