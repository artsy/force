import { graphql, useFragment } from "react-relay"
import {
  useConversationPurchaseButtonData_conversation$data,
  useConversationPurchaseButtonData_conversation$key,
} from "__generated__/useConversationPurchaseButtonData_conversation.graphql"
import { useConversationPurchaseButtonData_partnerOffer$key } from "__generated__/useConversationPurchaseButtonData_partnerOffer.graphql"

export const useConversationPurchaseButtonData = (
  conversation: useConversationPurchaseButtonData_conversation$key,
  partnerOffer: useConversationPurchaseButtonData_partnerOffer$key | null
) => {
  const conversationData = useFragment(
    graphql`
      fragment useConversationPurchaseButtonData_conversation on Conversation {
        internalID
        items {
          liveArtwork {
            ... on Artwork {
              __typename
              isAcquireable
              isEdition
              internalID
              slug
              editionSets {
                internalID
              }
              internalID
            }
          }
        }
      }
    `,
    conversation
  )

  const partnerOfferData =
    useFragment(
      graphql`
        fragment useConversationPurchaseButtonData_partnerOffer on PartnerOfferToCollector {
          internalID
          endAt
          priceWithDiscount {
            display
          }
        }
      `,
      partnerOffer
    ) ?? null

  if (!conversationData) {
    return null
  }
  if (conversationData.items?.[0]?.liveArtwork?.__typename !== "Artwork") {
    return null
  }

  const artwork = conversationData.items?.[0]?.liveArtwork as Extract<
    NonNullable<
      NonNullable<
        useConversationPurchaseButtonData_conversation$data["items"]
      >[0]
    >["liveArtwork"],
    { __typename: "Artwork" }
  >

  if (!artwork) {
    return null
  }

  const isUniqueArtwork =
    !artwork.isEdition || artwork.editionSets?.length === 1

  const isPurchaseButtonPresent = artwork.isAcquireable

  return {
    conversation: conversationData,
    partnerOffer: partnerOfferData,
    artwork,
    isUniqueArtwork,
    isPurchaseButtonPresent,
  }
}
