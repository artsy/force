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
import { ConversationConfirmModal } from "Apps/Conversations2/components/ConversationCTA/ConversationConfirmModal"
import { ConversationReviewOfferCTA } from "Apps/Conversations2/components/ConversationCTA/ConversationReviewOfferCTA"

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

  if (!artwork) {
    return null
  }

  return (
    <>
      <ConversationReviewOfferCTA conversation={data} />

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

        <ConversationConfirmModal conversation={data} artwork={artwork} />

        <Flex flexDirection="row">
          {artwork.isAcquireable && (
            <ConversationPurchaseButton conversation={data} />
          )}
          {(artwork.isOfferable || artwork.isOfferableFromInquiry) && (
            <ConversationMakeOfferButton conversation={data} />
          )}
        </Flex>
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
  }
`

const GuaranteeIconBlue = styled(VerifiedIcon)`
  .verified-checkmark {
    fill: ${themeGet("colors.brand")};
  }
`
