import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { TappedMakeOffer, ActionType, OwnerType } from "@artsy/cohesion"
import { MakeOfferOnInquiryButton_conversation } from "v2/__generated__/MakeOfferOnInquiryButton_conversation.graphql"
import { Button, Spacer } from "@artsy/palette"
import { ConfirmArtworkButtonFragmentContainer } from "./ConfirmArtworkButton"
import { useFeatureFlag } from "v2/System/useFeatureFlag"

export interface MakeOfferOnInquiryButtonProps {
  openInquiryModal: () => void
  conversation: MakeOfferOnInquiryButton_conversation
}

const trackTappedMakeOffer = (id: string): TappedMakeOffer => ({
  action: ActionType.tappedMakeOffer,
  context_owner_type: OwnerType.conversation,
  impulse_conversation_id: id,
})

export const MakeOfferOnInquiryButton: React.FC<MakeOfferOnInquiryButtonProps> = ({
  openInquiryModal,
  conversation,
}) => {
  const tracking = useTracking()
  const isCBNEnabled = useFeatureFlag("conversational-buy-now")

  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null
  if (!artwork) return null

  const { isEdition, editionSets, is_acquireable: isAcquireable } = artwork
  const isUniqueArtwork = !isEdition || editionSets?.length! === 1
  const isPurchaseButtonPresent = isCBNEnabled && isAcquireable
  const variant = isPurchaseButtonPresent ? "secondaryOutline" : "primaryBlack"
  const conversationID = conversation.internalID!

  return (
    <>
      <Spacer ml={isPurchaseButtonPresent ? 1 : 0} />
      {!isUniqueArtwork ? (
        // Opens a modal window to select an edition set on non-unique artworks
        <Button
          size="medium"
          variant={variant}
          onClick={() => {
            tracking.trackEvent(trackTappedMakeOffer(conversationID))
            openInquiryModal()
          }}
        >
          Make an Offer
        </Button>
      ) : (
        // Creates an offer and redirects to the checkout flow
        <ConfirmArtworkButtonFragmentContainer
          artwork={artwork}
          conversationID={conversationID}
          editionSetID={editionSets?.[0]?.internalID || null}
          createsOfferOrder={true}
          variant={variant}
          onClick={() =>
            tracking.trackEvent(trackTappedMakeOffer(conversationID))
          }
        >
          Make an Offer
        </ConfirmArtworkButtonFragmentContainer>
      )}
    </>
  )
}

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
              is_acquireable: isAcquireable
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
