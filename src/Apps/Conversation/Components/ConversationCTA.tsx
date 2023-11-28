import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FLAT_SHADOW, Flex, Separator, Text } from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { ReviewOfferCTA } from "./ReviewOfferCTA"
import { PurchaseOnInquiryButtonFragmentContainer } from "./PurchaseOnInquiryButton"
import { MakeOfferOnInquiryButtonFragmentContainer } from "./MakeOfferOnInquiryButton"
import { ConversationCTA_conversation$data } from "__generated__/ConversationCTA_conversation.graphql"

interface ConversationCTAProps {
  conversation: ConversationCTA_conversation$data
  openInquiryModal: (obj: { createsOfferOrder: boolean }) => void
  openOrderModal: () => void
}

const ShadowSeparator = styled(Separator)`
  box-shadow: ${FLAT_SHADOW};
  width: 100%;
  height: 0;
`

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

  const conversationID = conversation.internalID
  const activeOrder = extractNodes(conversation.activeOrders)[0]
  const {
    isOfferableFromInquiry,
    is_offerable: isOfferable,
    is_acquireable: isAcquireable,
  } = artwork

  if (!activeOrder) {
    return (
      <>
        <ShadowSeparator />

        <Flex flexDirection="column" p={1}>
          <Flex flexDirection="row">
            <Text color="black60" variant="xs" mb={1}>
              Always complete purchases with our secure checkout in order to be
              covered by{" "}
              <RouterLink inline to="/buyer-guarantee" target="_blank">
                The Artsy Guarantee
              </RouterLink>
              .
            </Text>
          </Flex>

          <Flex flexDirection="row">
            {isAcquireable && (
              <PurchaseOnInquiryButtonFragmentContainer
                openInquiryModal={() =>
                  openInquiryModal({ createsOfferOrder: false })
                }
                conversation={conversation}
              />
            )}
            {(isOfferableFromInquiry || isOfferable) && (
              <MakeOfferOnInquiryButtonFragmentContainer
                openInquiryModal={() =>
                  openInquiryModal({ createsOfferOrder: true })
                }
                conversation={conversation}
              />
            )}
          </Flex>
        </Flex>
      </>
    )
  } else {
    const { buyerAction } = activeOrder
    const kind = buyerAction || null

    if (kind) {
      return (
        <ReviewOfferCTA
          kind={kind}
          activeOrder={activeOrder as any}
          conversationID={conversationID as string}
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
              is_acquireable: isAcquireable
              is_offerable: isOfferable
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
          states: [
            APPROVED
            PROCESSING_APPROVAL
            FULFILLED
            SUBMITTED
            REFUNDED
          ]
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
        ...PurchaseOnInquiryButton_conversation
        ...MakeOfferOnInquiryButton_conversation
      }
    `,
  }
)
