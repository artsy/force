import * as React from "react"
import { useTracking } from "react-tracking"
import { TappedViewOffer, ActionType, OwnerType } from "@artsy/cohesion"
import { DateTime } from "luxon"
import { Color, Flex, ModalDialog, Text } from "@artsy/palette"
import styled from "styled-components"
import { useEventTiming } from "Utils/Hooks/useEventTiming"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import AlertFillIcon from "@artsy/icons/AlertFillIcon"
import MoneyFillIcon from "@artsy/icons/MoneyFillIcon"
import { graphql, useFragment } from "react-relay"
import { ConversationReviewOfferCTA_conversation$key } from "__generated__/ConversationReviewOfferCTA_conversation.graphql"
import { extractNodes } from "Utils/extractNodes"
import { useState } from "react"

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

  const { hoursTillEnd, minutes } = useEventTiming({
    currentTime: DateTime.local().toString(),
    startAt: activeOrder?.lastOffer?.createdAt!,
    endAt: activeOrder?.stateExpiresAt!,
  })

  if (!activeOrder) {
    return null
  }
  if (!activeOrder.buyerAction) {
    return null
  }

  const props = getProps({
    activeOrder,
    hoursTillEnd,
    minutes,
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
        >
          <IFrame src={`${props.modalUrl}?isModal=true`}></IFrame>
        </ModalDialog>
      )}

      <Flex
        px={2}
        py={1}
        justifyContent="space-between"
        alignItems="center"
        bg={props.backgroundColor}
        flexDirection="row"
        minHeight={60}
        style={{ cursor: "pointer" }}
        onClick={handleCTAClick}
      >
        <Flex flexDirection="row">
          {/* <props.Icon mt={0.5} fill="white100" /> */}

          <Flex flexDirection="column" pl={1}>
            <Text color="white100" variant="sm">
              {props.message}
            </Text>

            <Text color="white100" variant="xs">
              {props.subMessage}
            </Text>
          </Flex>
        </Flex>

        <ChevronRightIcon fill="white100" />
      </Flex>
    </>
  )
}

interface GetCTAAttributesProps {
  activeOrder: any
  hoursTillEnd: number
  minutes: string
}

const getProps = ({
  activeOrder,
  hoursTillEnd,
  minutes,
}: GetCTAAttributesProps): {
  backgroundColor: Color
  message: string
  subMessage: string
  modalUrl: string
  modalTitle: string
  Icon: React.FC<any>
} => {
  const expiresIn =
    Number(hoursTillEnd) < 1 ? `${minutes}m` : `${Math.round(hoursTillEnd)}hr`

  const offerType =
    (activeOrder.offers?.edges?.length ?? 0) > 1 ? "Counteroffer" : "Offer"

  switch (activeOrder.buyerAction) {
    case "PAYMENT_FAILED": {
      return {
        backgroundColor: "red100",
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
        backgroundColor: "orange150" as Color, // FIXME: Needs v3 typing
        message: `${offerType} Received`,
        subMessage: `The offer expires in ${expiresIn}`,
        modalUrl: `/orders/${activeOrder.internalID}/respond`,
        modalTitle: "Review Offer",
        Icon: AlertFillIcon,
      }
    }
    case "OFFER_ACCEPTED": {
      return {
        backgroundColor: "green100",
        message: `Congratulations! ${offerType} Accepted`,
        subMessage: "Tap to view",
        modalUrl: `/orders/${activeOrder.internalID}/status`,
        modalTitle: "Offer Accepted",
        Icon: MoneyFillIcon,
      }
    }
    case "OFFER_ACCEPTED_CONFIRM_NEEDED": {
      return {
        backgroundColor: "orange150" as Color, // FIXME: Needs v3 typing
        message: `Offer Accepted - Confirm total`,
        subMessage: `The offer expires in ${expiresIn}`,
        modalUrl: `/orders/${activeOrder.internalID}/respond`,
        modalTitle: "Review Offer",
        Icon: AlertFillIcon,
      }
    }
    case "OFFER_RECEIVED_CONFIRM_NEEDED": {
      return {
        backgroundColor: "orange150" as Color, // FIXME: Needs v3 typing
        message: `Counteroffer Received - Confirm Total`,
        subMessage: `The offer expires in ${expiresIn}`,
        modalUrl: `/orders/${activeOrder.internalID}/respond`,
        modalTitle: "Review Offer",
        Icon: AlertFillIcon,
      }
    }
    case "PROVISIONAL_OFFER_ACCEPTED": {
      return {
        backgroundColor: "green100",
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
