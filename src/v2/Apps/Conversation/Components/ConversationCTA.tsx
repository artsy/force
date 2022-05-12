import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  FLAT_SHADOW,
  Flex,
  GuaranteeIcon,
  Separator,
  Text,
} from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { ReviewOfferCTA } from "./ReviewOfferCTA"
import { PurchaseOnInquiryButtonFragmentContainer } from "./PurchaseOnInquiryButton"
import { MakeOfferOnInquiryButtonFragmentContainer } from "./MakeOfferOnInquiryButton"
import { ConversationCTA_conversation } from "v2/__generated__/ConversationCTA_conversation.graphql"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { themeGet } from "@styled-system/theme-get"

interface ConversationCTAProps {
  conversation: ConversationCTA_conversation
  openInquiryModal: () => void
  openOrderModal: () => void
}

const ShadowSeparator = styled(Separator)`
  box-shadow: ${FLAT_SHADOW};
  width: 100%;
  height: 0;
`

const GuaranteeIconBlue = styled(GuaranteeIcon)`
  .guarantee-checkmark {
    fill: ${themeGet("colors.brand")};
  }
`

export const ConversationCTA: React.FC<ConversationCTAProps> = ({
  conversation,
  openInquiryModal,
  openOrderModal,
}) => {
  const isCBNEnabled = useFeatureFlag("conversational-buy-now")
  // Determine whether we have a conversation about an artwork
  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null

  if (!artwork) {
    return null
  }

  const conversationID = conversation.internalID!
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
            <GuaranteeIconBlue mr={1} />
            <Flex flexShrink={1}>
              <Text color="black60" variant="xs" mb={1}>
                Always complete purchases with our secure checkout in order to
                be covered by{" "}
                <RouterLink to="/buyer-guarantee" target="_blank">
                  The Artsy Guarantee
                </RouterLink>
                .
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection="row">
            {isCBNEnabled && isAcquireable && (
              <PurchaseOnInquiryButtonFragmentContainer
                conversation={conversation}
              />
            )}
            {(isOfferableFromInquiry || (isCBNEnabled && isOfferable)) && (
              <MakeOfferOnInquiryButtonFragmentContainer
                openInquiryModal={() => openInquiryModal()}
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
        ...PurchaseOnInquiryButton_conversation
        ...MakeOfferOnInquiryButton_conversation
      }
    `,
  }
)
