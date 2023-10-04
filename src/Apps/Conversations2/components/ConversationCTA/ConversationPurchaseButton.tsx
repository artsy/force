import { Button } from "@artsy/palette"
import { useMakeInquiryOrder } from "Apps/Conversations2/mutations/useMakeInquiryOrderMutation"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { ConversationPurchaseButton_conversation$key } from "__generated__/ConversationPurchaseButton_conversation.graphql"

interface ConversationPurchaseButtonProps {
  conversation: ConversationPurchaseButton_conversation$key
}

export const ConversationPurchaseButton: React.FC<ConversationPurchaseButtonProps> = ({
  conversation,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { router } = useRouter()
  const { submitMutation } = useMakeInquiryOrder()

  const data = useFragment(
    graphql`
      fragment ConversationPurchaseButton_conversation on Conversation {
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
    conversation
  )

  if (!data) {
    return null
  }

  const artwork = data?.items?.[0]?.liveArtwork as any

  const handleClick = async () => {
    setIsSubmitting(true)

    try {
      const response = await submitMutation({
        variables: {
          input: {
            artworkId: artwork.internalID,
            editionSetId: artwork.editionSets?.[0]?.internalID,
            impulseConversationId: data.internalID as string,
          },
        },
        rejectIf: res => {
          return (
            res.createInquiryOrder?.orderOrError.__typename ===
            "CommerceOrderWithMutationFailure"
          )
        },
      })

      if (
        response.createInquiryOrder?.orderOrError.__typename ===
        "CommerceOrderWithMutationSuccess"
      ) {
        router.push(
          `/orders/${response.createInquiryOrder.orderOrError.order.internalID}/offer`
        )
      }
    } catch (error) {
      console.error("Error creating inquiry order", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button width="100%" onClick={handleClick} loading={isSubmitting}>
      Purchase
    </Button>
  )
}
