import { Box, Flex, FlexProps, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { ConversationMakeOfferButton } from "Apps/Conversations/components/ConversationCTA/ConversationMakeOfferButton"
import { ConversationPurchaseButton } from "Apps/Conversations/components/ConversationCTA/ConversationPurchaseButton"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { ConversationCTA_conversation$key } from "__generated__/ConversationCTA_conversation.graphql"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import { ConversationConfirmModal } from "Apps/Conversations/components/ConversationCTA/ConversationConfirmModal"
import { ConversationReviewOfferCTA } from "Apps/Conversations/components/ConversationCTA/ConversationReviewOfferCTA"
import { extractNodes } from "Utils/extractNodes"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { useTimer } from "Utils/Hooks/useTimer"

interface ConversationCTAProps extends FlexProps {
  conversation: ConversationCTA_conversation$key
}

export const ConversationCTA: React.FC<ConversationCTAProps> = ({
  conversation,
  ...flexProps
}) => {
  const data = useFragment(FRAGMENT, conversation)
  const { findPartnerOffer } = useConversationsContext()

  const liveArtwork = data?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null

  const partnerOffer = artwork && findPartnerOffer(artwork.internalID)
  const partnerOfferTimer = useTimer(
    partnerOffer?.endAt ?? new Date(0).toISOString()
  )

  const activeOrder = extractNodes(data.activeOrderCTA)[0]
  const activePartnerOffer =
    !activeOrder && partnerOffer && !partnerOfferTimer.hasEnded
      ? partnerOffer
      : null

  if (!artwork) {
    return null
  }

  // Active order. Shows status of the transaction, with various actions and modal triggers
  const showActiveOrderReviewOfferCTA = Boolean(
    activeOrder && activeOrder.buyerAction
  )

  // Inactive order waiting for commercial actions
  const canPurchase = artwork.isAcquireable || !!activePartnerOffer
  const canMakeOffer = artwork.isOfferable || artwork.isOfferableFromInquiry
  const showTransactionButtons =
    !activeOrder && artwork.published && (canPurchase || canMakeOffer)

  return (
    <>
      {showActiveOrderReviewOfferCTA && (
        <ConversationReviewOfferCTA conversation={data} />
      )}

      <Flex {...flexProps} flexDirection="column">
        <Flex flexDirection="row" alignItems="center" justifyContent="center">
          <GuaranteeIconBlue mr={1} />

          <Flex>
            <Text color="black60" variant="xs">
              Always complete purchases with our secure checkout in order to be
              covered by{" "}
              <RouterLink to="/buyer-guarantee" target="_blank">
                The Artsy Guarantee
              </RouterLink>
              .
            </Text>
          </Flex>
        </Flex>

        <Box position="absolute">
          <ConversationConfirmModal
            conversation={data}
            artwork={artwork}
            partnerOffer={activePartnerOffer}
          />
        </Box>

        {showTransactionButtons && (
          <>
            <Spacer y={1} />

            <Flex flexDirection="row" justifyContent="space-between">
              {canPurchase && (
                <ConversationPurchaseButton
                  partnerOffer={activePartnerOffer}
                  conversation={data}
                  px={0.5}
                  width="100%"
                />
              )}

              {canMakeOffer && (
                <ConversationMakeOfferButton
                  conversation={data}
                  px={0.5}
                  width="100%"
                />
              )}
            </Flex>
          </>
        )}
      </Flex>
    </>
  )
}

const FRAGMENT = graphql`
  fragment ConversationCTA_conversation on Conversation {
    ...useConversationPurchaseButtonData_conversation
    ...ConversationReviewOfferCTA_conversation

    internalID
    items {
      liveArtwork {
        ... on Artwork {
          ...ConversationConfirmModal_artwork
          __typename
          internalID
          isOfferableFromInquiry
          isAcquireable
          isOfferable
          published
        }
      }
      item {
        __typename
        ... on Artwork {
          internalID
        }
      }
    }

    activeOrderCTA: orderConnection(
      first: 10
      states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]
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
`

const GuaranteeIconBlue = styled(VerifiedIcon)`
  .verified-checkmark {
    fill: ${themeGet("colors.brand")};
  }
`
