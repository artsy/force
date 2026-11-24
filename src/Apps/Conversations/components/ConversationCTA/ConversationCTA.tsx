import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import { Box, Flex, type FlexProps, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { ConversationConfirmModal } from "Apps/Conversations/components/ConversationCTA/ConversationConfirmModal"
import { ConversationMakeOfferButton } from "Apps/Conversations/components/ConversationCTA/ConversationMakeOfferButton"
import { ConversationPurchaseButton } from "Apps/Conversations/components/ConversationCTA/ConversationPurchaseButton"
import { ConversationReviewOfferCTA } from "Apps/Conversations/components/ConversationCTA/ConversationReviewOfferCTA"
import { isPartnerOfferActive } from "Apps/Conversations/utils/isPartnerOfferActive"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import type { ConversationCTA_conversation$key } from "__generated__/ConversationCTA_conversation.graphql"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"

interface ConversationCTAProps extends FlexProps {
  conversation: ConversationCTA_conversation$key
}

export const ConversationCTA: React.FC<
  React.PropsWithChildren<ConversationCTAProps>
> = ({ conversation, ...flexProps }) => {
  const data = useFragment(FRAGMENT, conversation)
  const { findPartnerOffer } = useConversationsContext()

  const liveArtwork = data?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null

  const partnerOffer = artwork ? findPartnerOffer(artwork.internalID) : null
  const hasOpenPartnerOffer = isPartnerOfferActive(partnerOffer)

  // The native orders connection can return null nodes (e.g. an order whose
  // artwork no longer exists), so drop them before picking the active order.
  const activeOrder = extractNodes(data.activeCollectorOrders).filter(
    Boolean,
  )[0]
  const activePartnerOffer =
    !activeOrder && hasOpenPartnerOffer ? partnerOffer : null

  if (!artwork) {
    return null
  }

  // Active order. Hidden when a partner offer is open — the partner offer CTA takes precedence.
  const showActiveOrderReviewOfferCTA = Boolean(
    activeOrder && activeOrder.buyerAction && !hasOpenPartnerOffer,
  )

  // Inactive order waiting for commercial actions. Also hidden when a partner offer
  // is open — the CTA bar shows the offer instead.
  const canPurchase = artwork.isAcquireable || !!activePartnerOffer
  const canMakeOffer = artwork.isOfferable || artwork.isOfferableFromInquiry
  const showTransactionButtons =
    !activeOrder &&
    !hasOpenPartnerOffer &&
    artwork.published &&
    (canPurchase || canMakeOffer)

  return (
    <>
      {showActiveOrderReviewOfferCTA && (
        <ConversationReviewOfferCTA conversation={data} />
      )}

      <Flex {...flexProps} flexDirection="column">
        <Flex flexDirection="row" alignItems="center" justifyContent="center">
          <GuaranteeIconBlue mr={1} />

          <Flex>
            <Text color="mono60" variant="xs">
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

    # Buyer states equivalent to the legacy Exchange order states
    # [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]
    # (IN_REVIEW orders are also included, shown to the buyer as submitted).
    # Keep alias and arguments identical across the inbox CTA fragments so the
    # selections merge into a single Exchange request.
    activeCollectorOrders: collectorOrdersConnection(
      first: 10
      buyerState: [
        SUBMITTED
        OFFER_RECEIVED
        COUNTEROFFER_SENT
        PAYMENT_FAILED
        PROCESSING_PAYMENT
        PROCESSING_OFFLINE_PAYMENT
        APPROVED
        SHIPPED
        COMPLETED
        REFUNDED
      ]
    ) {
      edges {
        node {
          internalID
          buyerAction
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
