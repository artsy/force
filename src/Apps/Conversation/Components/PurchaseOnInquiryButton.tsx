import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PurchaseOnInquiryButton_conversation$data } from "__generated__/PurchaseOnInquiryButton_conversation.graphql"
import { ConfirmArtworkButtonFragmentContainer } from "./ConfirmArtworkButton"
import { useTracking } from "react-tracking"
import { TappedBuyNow, ActionType, OwnerType } from "@artsy/cohesion"
import { Button } from "@artsy/palette"

export interface PurchaseOnInquiryButtonProps {
  openInquiryModal: () => void
  conversation: PurchaseOnInquiryButton_conversation$data
}
export const PurchaseOnInquiryButton: React.FC<PurchaseOnInquiryButtonProps> = ({
  openInquiryModal,
  conversation,
}) => {
  const tracking = useTracking()

  const liveArtwork = conversation?.items?.[0]?.liveArtwork
  const artwork = liveArtwork?.__typename === "Artwork" ? liveArtwork : null
  if (!artwork) return null

  const { isEdition, editionSets, internalID, slug } = artwork
  const isUniqueArtwork = !isEdition || editionSets?.length! === 1
  const conversationID = conversation.internalID!

  const tappedPurchaseEvent: TappedBuyNow = {
    action: ActionType.tappedBuyNow,
    context_owner_type: OwnerType.conversation,
    context_owner_id: internalID,
    context_owner_slug: slug,
    impulse_conversation_id: conversationID,
  }

  return !isUniqueArtwork ? (
    // Opens a modal window to select an edition set on non-unique artworks
    <Button
      size="large"
      flexGrow={1}
      onClick={() => {
        tracking.trackEvent(tappedPurchaseEvent)
        openInquiryModal()
      }}
    >
      Purchase
    </Button>
  ) : (
    // Creates an order and redirects to the checkout flow
    <ConfirmArtworkButtonFragmentContainer
      artwork={artwork}
      conversationID={conversationID}
      editionSetID={editionSets?.[0]?.internalID || null}
      createsOfferOrder={false}
      onClick={() => tracking.trackEvent(tappedPurchaseEvent)}
    >
      Purchase
    </ConfirmArtworkButtonFragmentContainer>
  )
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
              internalID
              slug
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
