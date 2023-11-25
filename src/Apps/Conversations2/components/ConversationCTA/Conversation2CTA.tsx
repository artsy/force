import { Box, Flex, FlexProps, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { ConversationMakeOfferButton } from "Apps/Conversations2/components/ConversationCTA/ConversationMakeOfferButton"
import { ConversationPurchaseButton } from "Apps/Conversations2/components/ConversationCTA/ConversationPurchaseButton"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { Conversation2CTA_conversation$key } from "__generated__/Conversation2CTA_conversation.graphql"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import { ConversationConfirmModal } from "Apps/Conversations2/components/ConversationCTA/ConversationConfirmModal"
import { ConversationReviewOfferCTA } from "Apps/Conversations2/components/ConversationCTA/ConversationReviewOfferCTA"
import { extractNodes } from "Utils/extractNodes"

interface Conversation2CTAProps extends FlexProps {
  conversation: Conversation2CTA_conversation$key
}

export const Conversation2CTA: React.FC<Conversation2CTAProps> = ({
  conversation,
  ...flexProps
}) => {
  const data = useFragment(FRAGMENT, conversation)

  const liveArtwork = data?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null

  const activeOrder = extractNodes(data.activeOrderCTA)[0]

  if (!artwork) {
    return null
  }

  // Active order. Shows status of the transaction, with various actions and modal triggers
  const showActiveOrderReviewOfferCTA = Boolean(
    activeOrder && activeOrder.buyerAction
  )

  // Inactive order waiting for commercial actions
  const showTransactionButtons =
    !activeOrder &&
    (artwork.isAcquireable ||
      artwork.isOfferable ||
      artwork.isOfferableFromInquiry)

  return (
    <>
      {showActiveOrderReviewOfferCTA && (
        <ConversationReviewOfferCTA conversation={data} />
      )}

      <Flex {...flexProps} flexDirection="column">
        <Flex flexDirection="row" alignItems="center" justifyContent={"center"}>
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
          <ConversationConfirmModal conversation={data} artwork={artwork} />
        </Box>

        {showTransactionButtons && (
          <Flex flexDirection="row" justifyContent="space-between">
            {artwork.isAcquireable && (
              <ConversationPurchaseButton
                conversation={data}
                mt={1}
                px={0.5}
                width="100%"
              />
            )}

            {(artwork.isOfferable || artwork.isOfferableFromInquiry) && (
              <ConversationMakeOfferButton
                conversation={data}
                mt={1}
                px={0.5}
              />
            )}
          </Flex>
        )}
      </Flex>
    </>
  )
}

const FRAGMENT = graphql`
  fragment Conversation2CTA_conversation on Conversation {
    ...useConversationPurchaseButtonData_conversation
    ...ConversationReviewOfferCTA_conversation

    internalID
    items {
      liveArtwork {
        ... on Artwork {
          ...ConversationConfirmModal_artwork
          __typename
          isOfferableFromInquiry
          isAcquireable
          isOfferable
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
