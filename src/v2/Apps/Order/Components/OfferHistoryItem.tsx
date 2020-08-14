import { Flex, FlexProps, Sans, Serif, Spacer } from "@artsy/palette"
import { OfferHistoryItem_order } from "v2/__generated__/OfferHistoryItem_order.graphql"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RevealButton } from "./RevealButton"

const OfferHistoryItem: React.SFC<
  {
    order: OfferHistoryItem_order
  } & StepSummaryItemProps
> = ({ order: { totalListPrice, lastOffer, offers }, ...others }) => {
  const previousOffers = offers.edges.filter(
    ({ node: { internalID } }) => internalID !== lastOffer.internalID
  )

  return (
    <StepSummaryItem {...others}>
      <Row>
        <Serif size={["2", "3"]} color="black100" weight="semibold">
          {lastOffer.fromParticipant === "SELLER"
            ? "Seller's offer"
            : "Your offer"}
        </Serif>
        <Serif size={["2", "3"]} color="black100">
          {lastOffer.amount}
        </Serif>
      </Row>
      <Row>
        <div />
        <Sans size="2" color="black60">
          List price: {totalListPrice}
        </Sans>
      </Row>
      {lastOffer.note && (
        <>
          <Spacer mb={2} />
          <Serif size={["2", "3"]} color="black100" weight="semibold">
            {lastOffer.fromParticipant === "SELLER"
              ? "Seller's note"
              : "Your note"}
          </Serif>
          <Serif size="2" color="black60">
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
        totalListPrice(precision: 2)
      }
    `,
  }
)
