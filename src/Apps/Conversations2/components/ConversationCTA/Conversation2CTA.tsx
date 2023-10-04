import { Flex, FlexProps, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { ConversationMakeOfferButton } from "Apps/Conversations2/components/ConversationCTA/ConversationMakeOfferButton"
import { ConversationPurchaseButton } from "Apps/Conversations2/components/ConversationCTA/ConversationPurchaseButton"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { Conversation2CTA_conversation$key } from "__generated__/Conversation2CTA_conversation.graphql"
import { extractNodes } from "Utils/extractNodes"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"

interface Conversation2CTAProps extends FlexProps {
  conversation: Conversation2CTA_conversation$key
}

export const Conversation2CTA: React.FC<Conversation2CTAProps> = ({
  conversation,
  ...flexProps
}) => {
  const data = useFragment(
    graphql`
      fragment Conversation2CTA_conversation on Conversation {
        ...ConversationPurchaseButton_conversation
        ...ConversationMakeOfferButton_conversation

        internalID
        items {
          liveArtwork {
            ... on Artwork {
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
      }
    `,
    conversation
  )

  const order = extractNodes(data.activeOrders)[0]

  // If we've already made offer or put in order, no need to show cta button
  if (order) {
    return null
  }

  const liveArtwork = data?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null

  if (!artwork) {
    return null
  }

  return (
    <Flex {...flexProps} flexDirection="column">
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent={"center"}
        mb={1}
      >
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

      {/* TODO:
      {isActionable && (
        <ConfirmArtworkModalQueryRenderer
          artworkID={artwork?.internalID!}
          conversationID={conversation.internalID!}
          show={showConfirmArtworkModal}
          closeModal={() => setShowConfirmArtworkModal(false)}
          createsOfferOrder={createsOfferOrder}
        />
      )}
      */}

      <Flex flexDirection="row">
        {artwork.isAcquireable && (
          <ConversationPurchaseButton
            // TODO
            // openInquiryModal={() =>
            //   openInquiryModal({ createsOfferOrder: false })
            // }
            conversation={data}
          />
        )}
        {(artwork.isOfferable || artwork.isOfferableFromInquiry) && (
          <ConversationMakeOfferButton
            // TODO
            // openInquiryModal={() => openInquiryModal({ createsOfferOrder: true })}
            conversation={data}
          />
        )}
      </Flex>
    </Flex>
  )
}

const GuaranteeIconBlue = styled(VerifiedIcon)`
  .verified-checkmark {
    fill: ${themeGet("colors.brand")};
  }
`
