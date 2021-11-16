import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { extractNodes } from "v2/Utils/extractNodes"
import { ReviewOfferCTA } from "./ReviewOfferCTA"
import { OpenInquiryModalCTAFragmentContainer } from "./OpenInquiryModalCTA"

import { ConversationCTA_conversation } from "v2/__generated__/ConversationCTA_conversation.graphql"

interface ConversationCTAProps {
  conversation: ConversationCTA_conversation
  openInquiryModal: () => void
  openOrderModal: () => void
}

export const ConversationCTA: React.FC<ConversationCTAProps> = ({
  conversation,
  openInquiryModal,
  openOrderModal,
}) => {
  // Determine whether we have a conversation about an artwork
  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null

  if (!artwork) {
    return null
  }

  const conversationID = conversation.internalID!
  const activeOrder = extractNodes(conversation.activeOrders)[0]

  if (!activeOrder) {
    if (artwork.isOfferableFromInquiry) {
      return (
        <OpenInquiryModalCTAFragmentContainer
          openInquiryModal={() => openInquiryModal()}
          conversation={conversation}
        />
      )
    }
  } else {
    const { buyerAction } = activeOrder
    const kind = buyerAction || null

    if (kind) {
      return (
        <ReviewOfferCTA
          kind={kind}
          activeOrder={activeOrder}
          conversationID={conversationID}
          openOrderModal={() => openOrderModal()}
        />
      )
    }
  }

  return null
}

export const ConversationCTAFragmentContainer = createFragmentContainer(
  ConversationCTA,
  {
    conversation: graphql`
      fragment ConversationCTA_conversation on Conversation {
        internalID
        items {
          liveArtwork {
            ... on Artwork {
              __typename
              isOfferableFromInquiry
            }
          }
          item {
            __typename
            ... on Artwork {
              internalID
            }
          }
        }
        activeOrders: orderConnection(
          first: 10
          states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED]
        ) {
          edges {
            node {
              internalID
              state
              stateReason
              stateExpiresAt
              ... on CommerceOfferOrder {
                buyerAction
                offers(first: 5) {
                  edges {
                    node {
                      internalID
                    }
                  }
                }
              }
            }
          }
        }
        ...OpenInquiryModalCTA_conversation
      }
    `,
  }
)
