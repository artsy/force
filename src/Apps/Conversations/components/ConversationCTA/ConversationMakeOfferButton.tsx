import { Box, BoxProps, Button, useToasts } from "@artsy/palette"
import { useMakeInquiryOffer } from "Apps/Conversations/mutations/useMakeInquiryOfferMutation"
import { useState } from "react"
import { useRouter } from "System/Hooks/useRouter"
import { ActionType, OwnerType, TappedMakeOffer } from "@artsy/cohesion"
import { useConversationPurchaseButtonData_conversation$key } from "__generated__/useConversationPurchaseButtonData_conversation.graphql"
import { useConversationPurchaseButtonData } from "Apps/Conversations/components/ConversationCTA/useConversationPurchaseButtonData"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { useTracking } from "react-tracking"

interface ConversationMakeOfferButtonProps extends BoxProps {
  conversation: useConversationPurchaseButtonData_conversation$key
}

export const ConversationMakeOfferButton: React.FC<ConversationMakeOfferButtonProps> = ({
  conversation,
  ...boxProps
}) => {
  const tracking = useTracking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { router } = useRouter()
  const { submitMutation } = useMakeInquiryOffer()
  const { sendToast } = useToasts()

  const {
    showSelectEditionSetModal,
    isConfirmModalVisible,
  } = useConversationsContext()

  const data = useConversationPurchaseButtonData(conversation)

  if (!data) {
    return null
  }

  const trackMakeOfferEvent = () => {
    const tappedMakeOfferEvent: TappedMakeOffer = {
      action: ActionType.tappedMakeOffer,
      context_owner_type: OwnerType.conversation,
      impulse_conversation_id: data.conversation.internalID as string,
    }

    tracking.trackEvent(tappedMakeOfferEvent)
  }

  const variant = data.isPurchaseButtonPresent
    ? "secondaryBlack"
    : "primaryBlack"

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
            res.createInquiryOfferOrder?.orderOrError.__typename ===
            "CommerceOrderWithMutationFailure"
          )
        },
      })

      trackMakeOfferEvent()

      if (
        response?.createInquiryOfferOrder?.orderOrError.__typename ===
        "CommerceOrderWithMutationSuccess"
      ) {
        router.push(
          `/orders/${response.createInquiryOfferOrder.orderOrError.order.internalID}/offer?backToConversationId=${data.conversation.internalID}`
        )
      }
    } catch (error) {
      sendToast({ message: "Error. Please try again.", variant: "error" })
      console.error("Error creating inquiry order", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Opens a modal window to select an edition set on non-unique artworks
  if (!isConfirmModalVisible && !data.isUniqueArtwork) {
    return (
      <Box width="100%" {...boxProps} display="inline">
        <Button
          size={["small", "large"]}
          variant={variant}
          width="100%"
          onClick={() => {
            trackMakeOfferEvent()

            showSelectEditionSetModal({
              isCreatingOfferOrder: true,
            })
          }}
        >
          Make an Offer
        </Button>
      </Box>
    )
  }

  return (
    <Box width="100%" {...boxProps}>
      <Button
        size={["small", "large"]}
        width="100%"
        onClick={handleClick}
        loading={isSubmitting}
        variant={variant}
      >
        Make an Offer
      </Button>
    </Box>
  )
}
