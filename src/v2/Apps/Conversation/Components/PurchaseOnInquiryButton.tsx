import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PurchaseOnInquiryButton_conversation } from "v2/__generated__/PurchaseOnInquiryButton_conversation.graphql"
import { ConfirmArtworkButtonFragmentContainer } from "./ConfirmArtworkButton"

export interface PurchaseOnInquiryButtonProps {
  conversation: PurchaseOnInquiryButton_conversation
}

export const PurchaseOnInquiryButton: React.FC<PurchaseOnInquiryButtonProps> = ({
  conversation,
}) => {
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
