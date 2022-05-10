import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PurchaseOnInquiryButton_conversation } from "v2/__generated__/PurchaseOnInquiryButton_conversation.graphql"
import { ConfirmArtworkButtonFragmentContainer } from "./ConfirmArtworkButton"
import { useTracking } from "react-tracking"
import { TappedBuyNow, ActionType, OwnerType } from "@artsy/cohesion"

export interface PurchaseOnInquiryButtonProps {
  conversation: PurchaseOnInquiryButton_conversation
}

const trackTappedPurchase = (id: string): TappedBuyNow => ({
  action: ActionType.tappedBuyNow,
  context_owner_type: OwnerType.conversation,
  // @ts-ignore
  impulse_conversation_id: id,
})

export const PurchaseOnInquiryButton: React.FC<PurchaseOnInquiryButtonProps> = ({
  conversation,
}) => {
  const tracking = useTracking()

  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null
  if (!artwork) return null

  const { isEdition, editionSets } = artwork
  const isUniqueArtwork = !isEdition || editionSets?.length! === 1
  const conversationID = conversation.internalID!

  return isUniqueArtwork ? (
    <ConfirmArtworkButtonFragmentContainer
      artwork={artwork}
      conversationID={conversationID}
      editionSetID={editionSets?.[0]?.internalID || null}
      createsOfferOrder={false}
      onClick={() => tracking.trackEvent(trackTappedPurchase(conversationID))}
    >
      Purchase
    </ConfirmArtworkButtonFragmentContainer>
  ) : null
}

export const PurchaseOnInquiryButtonFragmentContainer = createFragmentContainer(
  PurchaseOnInquiryButton,
  {
    conversation: graphql`
      fragment PurchaseOnInquiryButton_conversation on Conversation {
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
