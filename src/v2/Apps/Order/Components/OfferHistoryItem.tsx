import { Flex, FlexProps, Sans, Serif, Spacer } from "@artsy/palette"
import { OfferHistoryItem_order } from "v2/__generated__/OfferHistoryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RevealButton } from "./RevealButton"
import { getOfferItemFromOrder } from "v2/Apps/Order/Utils/offerItemExtractor"

const OfferHistoryItem: React.SFC<
  {
    order: OfferHistoryItem_order
  } & StepSummaryItemProps
> = ({ order: { lastOffer, lineItems, offers }, ...others }) => {
  const offerItem = getOfferItemFromOrder(lineItems)
  // @ts-expect-error STRICT_NULL_CHECK
  const previousOffers = offers.edges.filter(
    // @ts-expect-error STRICT_NULL_CHECK
    ({ node: { internalID } }) => internalID !== lastOffer.internalID
  )

  return (
    <StepSummaryItem {...others}>
      <Row>
        <Serif size={["2", "3"]} color="black100" weight="semibold">
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          {lastOffer.fromParticipant === "SELLER"
            ? "Seller's offer"
            : "Your offer"}
        </Serif>
        <Serif size={["2", "3"]} color="black100">
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          {lastOffer.amount}
        </Serif>
      </Row>
      {offerItem && (
        <Row>
          <div />
          <Sans size="2" color="black60">
            List price: {offerItem.price}
          </Sans>
        </Row>
      )}
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      {lastOffer.note && (
        <>
          <Spacer mb={2} />
          <Serif size={["2", "3"]} color="black100" weight="semibold">
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            {lastOffer.fromParticipant === "SELLER"
              ? "Seller's note"
              : "Your note"}
          </Serif>
          <Serif size="2" color="black60">
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            {lastOffer.note}
          </Serif>
          <Spacer mb={1} />
        </>
      )}
      {previousOffers.length > 0 && (
        <>
          <Spacer mb={2} />
          <RevealButton buttonLabel="Show offer history">
            <Flex m={0} flexDirection="column">
              <Serif size={["2", "3"]} color="black100" weight="semibold">
                Offer history
              </Serif>
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              {previousOffers.map(({ node: offer }) => (
                <Row key={offer.internalID}>
                  <Serif size={["2", "3"]} color="black60">
                    {offer.fromParticipant === "BUYER" ? "You" : "Seller"}
                    {` (${offer.createdAt})`}
                  </Serif>
                  <Serif size={["2", "3"]} color="black60">
                    {offer.amount}
                  </Serif>
                </Row>
              ))}
            </Flex>
          </RevealButton>
        </>
      )}
    </StepSummaryItem>
  )
}
// TODO: look into why a separate style prop is necessary here
const Row: React.SFC<
  FlexProps & {
    style?: any // FIXME: HTMLProps<HTMLDivElement>["style"]
  }
> = ({ children, ...others }) => (
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
