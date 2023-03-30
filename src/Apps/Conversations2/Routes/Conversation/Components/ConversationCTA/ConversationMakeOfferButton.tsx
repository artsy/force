import { Button } from "@artsy/palette"
import { useMakeInquiryOffer } from "Apps/Conversations2/mutations/useMakeInquiryOfferMutation"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { ConversationMakeOfferButton_conversation$key } from "__generated__/ConversationMakeOfferButton_conversation.graphql"

interface ConversationMakeOfferButtonProps {
  conversation: ConversationMakeOfferButton_conversation$key
}

export const ConversationMakeOfferButton: React.FC<ConversationMakeOfferButtonProps> = ({
  conversation,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { router } = useRouter()
  const { submitMutation } = useMakeInquiryOffer()

  const data = useFragment(
    graphql`
      fragment ConversationMakeOfferButton_conversation on Conversation {
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
            res.createInquiryOfferOrder?.orderOrError.__typename ===
            "CommerceOrderWithMutationFailure"
          )
        },
      })

      if (
        response.createInquiryOfferOrder?.orderOrError.__typename ===
        "CommerceOrderWithMutationSuccess"
      ) {
        router.push(
          `/orders/${response.createInquiryOfferOrder.orderOrError.order.internalID}/offer`
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
      Make an Offer
    </Button>
  )
}
