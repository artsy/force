import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { tappedMakeOffer } from "@artsy/cohesion"
import styled from "styled-components"
import { MakeOfferOnInquiryButton_conversation } from "v2/__generated__/MakeOfferOnInquiryButton_conversation.graphql"
import {
  GuaranteeIcon,
  FLAT_SHADOW,
  Flex,
  Separator,
  Text,
  Button,
} from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ConfirmArtworkButtonFragmentContainer } from "./ConfirmArtworkButton"
import { themeGet } from "@styled-system/theme-get"

const ShadowSeparator = styled(Separator)`
  box-shadow: ${FLAT_SHADOW};
  width: 100%;
  height: 0;
`

export interface MakeOfferOnInquiryButtonProps {
  openInquiryModal: () => void
  conversation: MakeOfferOnInquiryButton_conversation
}

export const MakeOfferOnInquiryButton: React.FC<MakeOfferOnInquiryButtonProps> = ({
  openInquiryModal,
  conversation,
}) => {
  const tracking = useTracking()

  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null
  if (!artwork) return null

  const { isEdition, editionSets } = artwork
  const conversationID = conversation.internalID!
  const handleOpenModal = () => {
    tracking.trackEvent(tappedMakeOffer(conversationID ?? ""))
    openInquiryModal()
  }

  return (
    <>
      <ShadowSeparator />
      <Flex flexDirection="column" p={1}>
        <Flex flexDirection="row">
          <GuaranteeIconBlue mr={1} />
          <Flex flexShrink={1}>
            <Text color="black60" variant="xs" mb={1}>
              Always complete purchases with our secure checkout in order to be
              covered by{" "}
              <RouterLink to="/buyer-guarantee" target="_blank">
                The Artsy Guarantee
              </RouterLink>
              .
            </Text>
          </Flex>
        </Flex>
        {!!isEdition && editionSets?.length! > 1 ? (
          // Opens a modal window to select an edition set on non-unique artworks
          <Button
            size="medium"
            variant="primaryBlack"
            onClick={() => handleOpenModal()}
          >
            Make an Offer
          </Button>
        ) : (
          // Creates an offer and redirects to the checkout flow
          <ConfirmArtworkButtonFragmentContainer
            artwork={artwork}
            conversationID={conversationID}
            editionSetID={editionSets?.[0]?.internalID || null}
          >
            Make an Offer
          </ConfirmArtworkButtonFragmentContainer>
        )}
      </Flex>
    </>
  )
}

const GuaranteeIconBlue = styled(GuaranteeIcon)`
  .guarantee-checkmark {
    fill: ${themeGet("colors.brand")};
  }
`

export const MakeOfferOnInquiryButtonFragmentContainer = createFragmentContainer(
  MakeOfferOnInquiryButton,
  {
    conversation: graphql`
      fragment MakeOfferOnInquiryButton_conversation on Conversation {
        internalID
        items {
          liveArtwork {
            ... on Artwork {
              __typename
              isEdition
              editionSets {
                internalID
              }
              ...ConfirmArtworkButton_artwork
            }
          }
        }
      }
    `,
  }
)
