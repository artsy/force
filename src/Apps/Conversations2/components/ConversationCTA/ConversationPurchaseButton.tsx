import { Button } from "@artsy/palette"
import { useMakeInquiryOrder } from "Apps/Conversations2/mutations/useMakeInquiryOrderMutation"
import { useState } from "react"
import { useRouter } from "System/Router/useRouter"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType, TappedBuyNow } from "@artsy/cohesion"
import { useConversationsContext } from "Apps/Conversations2/ConversationsContext"
import { useConversationPurchaseButtonData } from "Apps/Conversations2/components/ConversationCTA/useConversationPurchaseButtonData"
import { useConversationPurchaseButtonData_conversation$key } from "__generated__/useConversationPurchaseButtonData_conversation.graphql"

interface ConversationPurchaseButtonProps {
  conversation: useConversationPurchaseButtonData_conversation$key
}

export const ConversationPurchaseButton: React.FC<ConversationPurchaseButtonProps> = ({
  conversation,
}) => {
  const tracking = useTracking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { router } = useRouter()
  const { submitMutation } = useMakeInquiryOrder()
  const { showSelectEditionSetModal } = useConversationsContext()
  const data = useConversationPurchaseButtonData(conversation)

  if (!data) {
    return null
  }

  const trackPurchaseEvent = () => {
    const tappedPurchaseEvent: TappedBuyNow = {
      action: ActionType.tappedBuyNow,
      context_owner_type: OwnerType.conversation,
      context_owner_id: data.artwork.internalID,
      context_owner_slug: data.artwork.slug,
      impulse_conversation_id: data.conversation.internalID as string,
    }

    tracking.trackEvent(tappedPurchaseEvent)
  }

  // Opens a modal window to select an edition set on non-unique artworks
  if (!data.isUniqueArtwork) {
    return (
      <Button
        size="large"
        flexGrow={1}
        onClick={() => {
          trackPurchaseEvent()

          showSelectEditionSetModal({
            isCreatingOfferOrder: false,
          })
        }}
      >
        Purchase
      </Button>
    )
  }

  const handleClick = async () => {
    setIsSubmitting(true)

    try {
      const response = await submitMutation({
        variables: {
          input: {
            artworkId: data.artwork.internalID,
            editionSetId: data.artwork.editionSets?.[0]?.internalID,
            impulseConversationId: data.conversation.internalID as string,
          },
        },
        rejectIf: res => {
          return (
            res.createInquiryOrder?.orderOrError.__typename ===
            "CommerceOrderWithMutationFailure"
          )
        },
      })

      trackPurchaseEvent()

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
