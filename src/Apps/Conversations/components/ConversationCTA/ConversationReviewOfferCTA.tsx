import * as React from "react"
import { useTracking } from "react-tracking"
import { TappedViewOffer, ActionType, OwnerType } from "@artsy/cohesion"
import {
  Clickable,
  Flex,
  Message,
  MessageProps,
  ModalDialog,
  Text,
} from "@artsy/palette"
import styled from "styled-components"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import AlertFillIcon from "@artsy/icons/AlertFillIcon"
import MoneyFillIcon from "@artsy/icons/MoneyFillIcon"
import { graphql, useFragment } from "react-relay"
import { ConversationReviewOfferCTA_conversation$key } from "__generated__/ConversationReviewOfferCTA_conversation.graphql"
import { extractNodes } from "Utils/extractNodes"
import { useState } from "react"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"

export interface ConversationReviewOfferCTAProps {
  conversation: ConversationReviewOfferCTA_conversation$key
}

export const ConversationReviewOfferCTA: React.FC<ConversationReviewOfferCTAProps> = ({
  conversation,
}) => {
  const data = useFragment(FRAGMENT, conversation)
  const activeOrder = extractNodes(data.activeOrders)[0]
  const [showOrderModal, setShowOrderModal] = useState(false)
  const { trackEvent } = useTracking()

  const { remainingTime } = useCountdownTimer({
    startTime: activeOrder?.stateUpdatedAt as string,
    endTime: activeOrder?.stateExpiresAt as string,
  })

  if (!activeOrder) {
    return null
  }
  if (!activeOrder.buyerAction) {
    return null
  }

  const props = getProps({
    activeOrder,
    remainingTime: remainingTime as string,
  })

  const handleCTAClick = () => {
    const trackingProps: TappedViewOffer = {
      action: ActionType.tappedViewOffer,
      context_owner_type: OwnerType.conversation,
      impulse_conversation_id: data.internalID as string,
      subject: props.message,
    }

    trackEvent(trackingProps)

    setShowOrderModal(true)
  }

  return (
    <>
      {showOrderModal && (
        <ModalDialog
          width={900}
          onClose={() => setShowOrderModal(false)}
          title={props.modalTitle}
          data-testid="orderModal"
        >
          <IFrame
            src={`${props.modalUrl}?isModal=true`}
            data-testid="orderModalIframe"
          ></IFrame>
        </ModalDialog>
      )}

      <AlertMessage {...props} onClick={handleCTAClick} />
    </>
  )
}

const AlertMessage = (props: GetCTAReturnProps & { onClick: () => void }) => {
  return (
    <Clickable onClick={props.onClick}>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignContent="center"
        alignItems="center"
      >
        <Message variant={props.variant} title={props.message} width="100%">
          <Text variant="sm">{props.subMessage}</Text>
        </Message>
        <ChevronRightIcon
          fill="black100"
          position="absolute"
          right={0}
          pr={4}
        />
      </Flex>
    </Clickable>
  )
}

interface GetCTAAttributesProps {
  activeOrder: any
  remainingTime: string
}

interface GetCTAReturnProps {
  message: string
  subMessage: string
  modalUrl: string
  modalTitle: string
  variant: MessageProps["variant"]
  Icon: React.FC<any>
}

const getProps = ({
  activeOrder,
  remainingTime,
}: GetCTAAttributesProps): GetCTAReturnProps => {
  const offerType =
    (activeOrder.offers?.edges?.length ?? 0) > 1 ? "Counteroffer" : "Offer"

  switch (activeOrder.buyerAction) {
    case "PAYMENT_FAILED": {
      return {
        variant: "alert",
        message: "Payment Failed",
        subMessage:
          "Unable to process payment for accepted offer. Update payment method.",
        modalUrl: `/orders/${activeOrder.internalID}/payment/new`,
        modalTitle: "Update Payment Details",
        Icon: AlertFillIcon,
      }
    }
    case "OFFER_RECEIVED": {
      return {
        variant: "info",
        message: `${offerType} Received`,
        subMessage: `The offer expires in ${remainingTime}`,
        modalUrl: `/orders/${activeOrder.internalID}/respond`,
        modalTitle: "Review Offer",
        Icon: AlertFillIcon,
      }
    }
    case "OFFER_ACCEPTED": {
      return {
        variant: "info",
        message: `Congratulations! ${offerType} Accepted`,
        subMessage: "Tap to view",
        modalUrl: `/orders/${activeOrder.internalID}/status`,
        modalTitle: "Offer Accepted",
        Icon: MoneyFillIcon,
      }
    }
    case "OFFER_ACCEPTED_CONFIRM_NEEDED": {
      return {
        variant: "warning",
        message: `Offer Accepted - Confirm total`,
        subMessage: `The offer expires in ${remainingTime}`,
        modalUrl: `/orders/${activeOrder.internalID}/respond`,
        modalTitle: "Review Offer",
        Icon: AlertFillIcon,
      }
    }
    case "OFFER_RECEIVED_CONFIRM_NEEDED": {
      return {
        variant: "warning",
        message: `Counteroffer Received - Confirm Total`,
        subMessage: `The offer expires in ${remainingTime}`,
        modalUrl: `/orders/${activeOrder.internalID}/respond`,
        modalTitle: "Review Offer",
        Icon: AlertFillIcon,
      }
    }
    case "PROVISIONAL_OFFER_ACCEPTED": {
      return {
        variant: "info",
        message: `Offer Accepted`,
        subMessage: "Tap to view",
        modalUrl: `/orders/${activeOrder.internalID}/status`,
        modalTitle: "Offer Accepted",
        Icon: MoneyFillIcon,
      }
    }
    default: {
      console.error("Error: Unknown buyerAction: ", activeOrder.buyerAction)
      return {} as any
    }
  }
}

const FRAGMENT = graphql`
  fragment ConversationReviewOfferCTA_conversation on Conversation {
    internalID

    activeOrders: orderConnection(
      first: 1
      states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]
    ) {
      edges {
        node {
          internalID
          state
          stateReason
          stateExpiresAt
          stateUpdatedAt

          ... on CommerceOfferOrder {
            buyerAction
            lastOffer {
              createdAt
            }
            offers(first: 5) {
              edges {
                node {
                  internalID
                }
              }
            }
          }
        }
      }
    }
  }
`

export const IFrame = styled("iframe")`
  height: 60vh;
  width: 100%;
  border: none;
`
