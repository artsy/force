import { Flex, FlexProps, Spacer, Text } from "@artsy/palette"
import { OfferHistoryItem_order$data } from "__generated__/OfferHistoryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "Components/StepSummaryItem"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RevealButton } from "./RevealButton"
import { getOfferItemFromOrder } from "Apps/Order/Utils/offerUtils"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"

const OfferHistoryItem: React.FC<
  {
    order: OfferHistoryItem_order$data
  } & StepSummaryItemProps
> = ({ order: { currencyCode, lastOffer, lineItems, offers }, ...others }) => {
  const offerItem = getOfferItemFromOrder(lineItems)
  const previousOffers = offers?.edges?.filter(
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    ({ node: { internalID } }) => internalID !== lastOffer.internalID
  )
  const currency = currencyCode!

  return (
    <StepSummaryItem {...others}>
      <Row>
        <Text variant={["xs", "sm"]} color="black100" fontWeight="semibold">
          {lastOffer?.fromParticipant === "SELLER"
            ? "Seller's offer"
            : "Your offer"}
        </Text>
        <Text variant={["xs", "sm"]} color="black100">
          {appendCurrencySymbol(lastOffer?.amount, currency)}
        </Text>
      </Row>
      {offerItem && (
        <Row>
          <div />
          <Text variant={"xs"} color="black60">
            List price: {appendCurrencySymbol(offerItem.price, currency)}
          </Text>
        </Row>
      )}
      {lastOffer?.note && (
        <>
          <Spacer y={2} />
          <Text variant={["xs", "sm"]} color="black100" fontWeight="semibold">
            {lastOffer.fromParticipant === "SELLER"
              ? "Seller's note"
              : "Your note"}
          </Text>
          <Text variant="xs" color="black60">
            {lastOffer.note}
          </Text>
          <Spacer y={1} />
        </>
      )}
      {previousOffers && previousOffers.length > 0 && (
        <>
          <Spacer y={2} />
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
                    {appendCurrencySymbol(offer.amount, currency)}
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
          currencyCode
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
