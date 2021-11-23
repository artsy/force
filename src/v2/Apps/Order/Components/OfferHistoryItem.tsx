import { Flex, FlexProps, Spacer, Text } from "@artsy/palette"
import { OfferHistoryItem_order } from "v2/__generated__/OfferHistoryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RevealButton } from "./RevealButton"
import { getOfferItemFromOrder } from "v2/Apps/Order/Utils/offerItemExtractor"

const OfferHistoryItem: React.FC<
  {
    order: OfferHistoryItem_order
  } & StepSummaryItemProps
> = ({ order: { lastOffer, lineItems, offers }, ...others }) => {
  const offerItem = getOfferItemFromOrder(lineItems)
  const previousOffers = offers?.edges?.filter(
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    ({ node: { internalID } }) => internalID !== lastOffer.internalID
  )

  return (
    <StepSummaryItem {...others}>
      <Row>
        <Text variant={["xs", "sm"]} color="black100" fontWeight="semibold">
          {lastOffer?.fromParticipant === "SELLER"
            ? "Seller's offer"
            : "Your offer"}
        </Text>
        <Text variant={["xs", "sm"]} color="black100">
          {lastOffer?.amount}
        </Text>
      </Row>
      {offerItem && (
        <Row>
          <div />
          <Text variant={"xs"} color="black60">
            List price: {offerItem.price}
          </Text>
        </Row>
      )}
      {lastOffer?.note && (
        <>
          <Spacer mb={2} />
          <Text variant={["xs", "sm"]} color="black100" fontWeight="semibold">
            {lastOffer.fromParticipant === "SELLER"
              ? "Seller's note"
              : "Your note"}
          </Text>
          <Text variant="xs" color="black60">
            {lastOffer.note}
          </Text>
          <Spacer mb={1} />
        </>
      )}
      {previousOffers && previousOffers.length > 0 && (
        <>
          <Spacer mb={2} />
          <RevealButton buttonLabel="Show offer history">
            <Flex m={0} flexDirection="column">
              <Text
                variant={["xs", "sm"]}
                color="black100"
                fontWeight="semibold"
              >
                Offer history
              </Text>
              {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
              {previousOffers.map(({ node: offer }) => (
                <Row key={offer.internalID}>
                  <Text variant={["xs", "sm"]} color="black60">
                    {offer.fromParticipant === "BUYER" ? "You" : "Seller"}
                    {` (${offer.createdAt})`}
                  </Text>
                  <Text variant={["xs", "sm"]} color="black60">
                    {offer.amount}
                  </Text>
                </Row>
              ))}
            </Flex>
          </RevealButton>
        </>
      )}
    </StepSummaryItem>
  )
}

const Row: React.FC<FlexProps> = ({ children, ...others }) => (
  <Flex justifyContent="space-between" alignItems="baseline" {...others}>
    {children}
  </Flex>
)

export const OfferHistoryItemFragmentContainer = createFragmentContainer(
  OfferHistoryItem,
  {
    order: graphql`
      fragment OfferHistoryItem_order on CommerceOrder {
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
          offers {
            edges {
              node {
                internalID
                amount(precision: 2)
                createdAt(format: "MMM D")
                fromParticipant
              }
            }
          }
          lastOffer {
            internalID
            fromParticipant
            amount(precision: 2)
            shippingTotal(precision: 2)
            taxTotal(precision: 2)
            note
          }
        }
      }
    `,
  }
)
