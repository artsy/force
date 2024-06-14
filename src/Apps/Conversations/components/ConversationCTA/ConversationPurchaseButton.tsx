import { Box, BoxProps, Button, useToasts } from "@artsy/palette"
import { useMakeInquiryOrder } from "Apps/Conversations/mutations/useMakeInquiryOrderMutation"
import { useState } from "react"
import { useRouter } from "System/Hooks/useRouter"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType, ClickedBuyNow } from "@artsy/cohesion"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { useConversationPurchaseButtonData } from "Apps/Conversations/components/ConversationCTA/useConversationPurchaseButtonData"
import { useConversationPurchaseButtonData_conversation$key } from "__generated__/useConversationPurchaseButtonData_conversation.graphql"
import { usePartnerOfferCheckoutMutation } from "Apps/PartnerOffer/Routes/Mutations/UsePartnerOfferCheckoutMutation"
import { ErrorWithMetadata } from "Utils/errors"

interface ConversationPurchaseButtonProps extends BoxProps {
  conversation: useConversationPurchaseButtonData_conversation$key
  partnerOffer: { internalID: string } | null
}

export const ConversationPurchaseButton: React.FC<ConversationPurchaseButtonProps> = ({
  conversation,
  partnerOffer,
  ...boxProps
}) => {
  const tracking = useTracking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { router } = useRouter()
  const makeInquiryOrder = useMakeInquiryOrder()
  const partnerOfferCheckout = usePartnerOfferCheckoutMutation()
  const { sendToast } = useToasts()

  const {
    showSelectEditionSetModal,
    isConfirmModalVisible,
  } = useConversationsContext()

  const data = useConversationPurchaseButtonData(conversation)

  if (!data) {
    return null
  }

  const trackPurchaseEvent = (flow: "Partner offer" | "Buy now") => {
    const event: ClickedBuyNow = {
      action: ActionType.clickedBuyNow,
      context_owner_type: OwnerType.conversation,
      context_owner_id: data.artwork.internalID,
      context_owner_slug: data.artwork.slug,
      impulse_conversation_id: data.conversation.internalID as string,
      flow,
    }

    tracking.trackEvent(event)
  }

  const handleCreatePartnerOfferOrder = async () => {
    if (!partnerOffer?.internalID) {
      throw new ErrorWithMetadata(
        "handleCreatePartnerOfferOrder (conversations): no active partner offer"
      )
    }

    const response = await partnerOfferCheckout.submitMutation({
      variables: {
        input: {
          partnerOfferId: partnerOffer?.internalID,
          editionSetId: data.artwork.editionSets?.[0]?.internalID,
          impulseConversationId: data.conversation.internalID, // # Requires schema update
        },
      },
      rejectIf: res => {
        return (
          res.commerceCreatePartnerOfferOrder?.orderOrError.__typename !==
          "CommerceOrderWithMutationSuccess"
        )
      },
    })

    if (
      response.commerceCreatePartnerOfferOrder?.orderOrError.__typename ===
      "CommerceOrderWithMutationSuccess"
    ) {
      trackPurchaseEvent("Partner offer")

      router.push(
        `/orders/${response.commerceCreatePartnerOfferOrder.orderOrError.order?.internalID}/shipping?backToConversationId=${data.conversation.internalID}`
      )
    }
  }

  const handleCreateInquiryOrder = async () => {
    const response = await makeInquiryOrder.submitMutation({
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

    trackPurchaseEvent("Buy now")

    if (
      response.createInquiryOrder?.orderOrError.__typename ===
      "CommerceOrderWithMutationSuccess"
    ) {
      router.push(
        `/orders/${response.createInquiryOrder.orderOrError.order.internalID}/shipping?backToConversationId=${data.conversation.internalID}`
      )
    }
  }

  const handleClick = async () => {
    setIsSubmitting(true)

    const orderMutation = partnerOffer
      ? handleCreatePartnerOfferOrder
      : handleCreateInquiryOrder

    try {
      await orderMutation()
    } catch (error) {
      sendToast({ message: "Error. Please try again.", variant: "error" })
      console.error("Error creating inquiry order", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Opens a modal window to select an edition set on non-unique artworks, and
  // if the modal is already open, use the standard purchase button below.
  if (!isConfirmModalVisible && !data.isUniqueArtwork) {
    return (
      <Box width="100%" {...boxProps} display="inline">
        <Button
          {...boxProps}
          size={["small", "large"]}
          width="100%"
          onClick={() => {
            trackPurchaseEvent("Buy now")

            showSelectEditionSetModal({
              isCreatingOfferOrder: false,
            })
          }}
        >
          Purchase
        </Button>
      </Box>
    )
  }

  return (
    <Box width="100%" {...boxProps} display="inline">
      <Button
        size={["small", "large"]}
        width="100%"
        onClick={handleClick}
        loading={isSubmitting}
      >
        Purchase
      </Button>
    </Box>
  )
}
