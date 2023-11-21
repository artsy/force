import { graphql, useFragment } from "react-relay"
import {
  useConversationPurchaseButtonData_conversation$data,
  useConversationPurchaseButtonData_conversation$key,
} from "__generated__/useConversationPurchaseButtonData_conversation.graphql"

export const useConversationPurchaseButtonData = (
  conversation: useConversationPurchaseButtonData_conversation$key
) => {
  const data = useFragment(
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
              ...ConfirmArtworkButton_artwork
            }
          }
        }
      }
    `,
    conversation
  )

  if (!data) {
    return null
  }
  if (data.items?.[0]?.liveArtwork?.__typename !== "Artwork") {
    return null
  }

  const artwork = data.items?.[0]?.liveArtwork as Extract<
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
    conversation: data,
    artwork,
    isUniqueArtwork,
    isPurchaseButtonPresent,
  }
}
