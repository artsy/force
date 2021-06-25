import { ConversationCTA_conversation } from "v2/__generated__/ConversationCTA_conversation.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ReviewOfferCTA } from "./ReviewOfferCTA"
import { OpenInquiryModalButtonQueryRenderer } from "./OpenInquiryModalButton"
// import { userHasLabFeature } from "v2/Utils/user"
// import { useSystemContext } from "v2/System/useSystemContext"

interface ConversationCTAProps {
  conversation: ConversationCTA_conversation
  openInquiryModal: () => void
}

export const ConversationCTA: React.FC<ConversationCTAProps> = ({
  conversation,
  openInquiryModal,
}) => {
  // Determine whether we have a conversation about an artwork

  const firstItem = conversation?.items?.[0]?.item
  const artwork = firstItem?.__typename === "Artwork" ? firstItem : null
  const artworkID = artwork?.internalID

  let CTA: JSX.Element | null = null

  // const { user } = useSystemContext()
  // const inquiryCheckoutEnabled = userHasLabFeature(
  //   user!,
  //   "Web Inquiry Checkout"
  // )

  if (true && artwork) {
    // artworkID is guaranteed to be present if `isOfferableFromInquiry` was present.
    const conversationID = conversation.internalID!
    const activeOrder = extractNodes(conversation.activeOrders)[0]

    if (!activeOrder) {
      CTA = (
        <OpenInquiryModalButtonQueryRenderer
          artworkID={artworkID!}
          openInquiryModal={() => openInquiryModal()}
        />
      )
    } else {
      const { buyerAction } = activeOrder
      const kind = buyerAction || null

      CTA = kind && (
        <ReviewOfferCTA
          kind={kind}
          activeOrder={activeOrder}
          conversationID={conversationID}
        />
      )
    }
  }
  if (!CTA) {
    return null
  } else {
    return <>{CTA}</>
  }
}

export const ConversationCTAFragmentContainer = createFragmentContainer(
  ConversationCTA,
  {
    conversation: graphql`
      fragment ConversationCTA_conversation on Conversation {
        internalID
        items {
          item {
            __typename
            ... on Artwork {
              internalID
              isOfferableFromInquiry
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
      }
    `,
  }
)
