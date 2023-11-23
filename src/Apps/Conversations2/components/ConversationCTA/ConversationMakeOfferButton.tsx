import { Box, BoxProps, Button } from "@artsy/palette"
import { useMakeInquiryOffer } from "Apps/Conversations2/mutations/useMakeInquiryOfferMutation"
import { useState } from "react"
import { useRouter } from "System/Router/useRouter"
import { ActionType, OwnerType, TappedMakeOffer } from "@artsy/cohesion"
import { useConversationPurchaseButtonData_conversation$key } from "__generated__/useConversationPurchaseButtonData_conversation.graphql"
import { useConversationPurchaseButtonData } from "Apps/Conversations2/components/ConversationCTA/useConversationPurchaseButtonData"
import { useConversationsContext } from "Apps/Conversations2/ConversationsContext"
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
  const { showSelectEditionSetModal } = useConversationsContext()

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

  // Opens a modal window to select an edition set on non-unique artworks
  if (!data.isUniqueArtwork) {
    return (
      <Button
        size="large"
        variant={variant}
        flexGrow={1}
        onClick={() => {
          trackMakeOfferEvent()

          showSelectEditionSetModal({
            isCreatingOfferOrder: true,
          })
        }}
      >
        Make an Offer
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
            res.createInquiryOfferOrder?.orderOrError.__typename ===
            "CommerceOrderWithMutationFailure"
          )
        },
      })

      trackMakeOfferEvent()

      if (
        response.createInquiryOfferOrder?.orderOrError.__typename ===
        "CommerceOrderWithMutationSuccess"
      ) {
        router.push(
          `/orders/${response.createInquiryOfferOrder.orderOrError.order.internalID}/offer?backToConversationId=${data.conversation.internalID}`
        )
      }
    } catch (error) {
      console.error("Error creating inquiry order", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box width="100%" {...boxProps}>
      <Button
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
