import * as React from "react"
import { useTracking } from "react-tracking"
import { TappedViewOffer, ActionType, OwnerType } from "@artsy/cohesion"
import { DateTime } from "luxon"
import {
  AlertCircleFillIcon,
  ArrowRightIcon,
  Color,
  Flex,
  IconProps,
  MoneyFillIcon,
  Text,
} from "@artsy/palette"
import styled from "styled-components"

import { useEventTiming } from "v2/Utils/Hooks/useEventTiming"

import { CommerceBuyerOfferActionEnum } from "v2/__generated__/ConversationCTA_conversation.graphql"

export const ClickableFlex = styled(Flex)`
  cursor: pointer;
`

export interface ReviewOfferCTAProps {
  conversationID: string
  kind: CommerceBuyerOfferActionEnum
  activeOrder: {
    stateExpiresAt: string | null
    lastOffer?: { createdAt: string } | null
    offers?: { edges: { length: number } | null } | null
  }
  openOrderModal: () => void
}

export const ReviewOfferCTA: React.FC<ReviewOfferCTAProps> = ({
  conversationID,
  activeOrder,
  kind,
  openOrderModal,
}) => {
  const { offers } = activeOrder
  const { trackEvent } = useTracking()

  const { hoursTillEnd, minutes } = useEventTiming({
    currentTime: DateTime.local().toString(),
    startAt: activeOrder.lastOffer?.createdAt!,
    endAt: activeOrder.stateExpiresAt!,
  })

  const expiresIn =
    Number(hoursTillEnd) < 1 ? `${minutes}m` : `${Math.round(hoursTillEnd)}hr`
  const offerType = (offers?.edges?.length || []) > 1 ? "Counteroffer" : "Offer"

  let ctaAttributes: {
    backgroundColor: Color
    message: string
    subMessage: string
    Icon: React.FC<IconProps>
  }

  switch (kind) {
    case "PAYMENT_FAILED": {
      ctaAttributes = {
        backgroundColor: "red100",
        message: "Payment Failed",
        subMessage:
          "Unable to process payment for accepted offer. Update payment method.",
        Icon: AlertCircleFillIcon,
      }
      break
    }
    case "OFFER_RECEIVED": {
      ctaAttributes = {
        backgroundColor: "copper100",
        message: `${offerType} Received`,
        subMessage: `The offer expires in ${expiresIn}`,
        Icon: AlertCircleFillIcon,
      }
      break
    }
    case "OFFER_ACCEPTED": {
      ctaAttributes = {
        backgroundColor: "green100",
        message: `Congratulations! ${offerType} Accepted`,
        subMessage: "Tap to view",
        Icon: MoneyFillIcon,
      }
      break
    }
    case "OFFER_ACCEPTED_CONFIRM_NEEDED": {
      ctaAttributes = {
        backgroundColor: "copper100",
        message: `Offer Accepted - Confirm total`,
        subMessage: `The offer expires in ${expiresIn}`,
        Icon: AlertCircleFillIcon,
      }
      break
    }
    case "OFFER_RECEIVED_CONFIRM_NEEDED": {
      ctaAttributes = {
        backgroundColor: "copper100",
        message: `Counteroffer Received - Confirm Total`,
        subMessage: `The offer expires in ${expiresIn}`,
        Icon: AlertCircleFillIcon,
      }
      break
    }
    case "PROVISIONAL_OFFER_ACCEPTED": {
      ctaAttributes = {
        backgroundColor: "green100",
        message: `Offer Accepted`,
        subMessage: "Tap to view",
        Icon: MoneyFillIcon,
      }
      break
    }
    default: {
      // this should never happen
      return null
    }
  }

  const { message, subMessage, backgroundColor, Icon } = ctaAttributes

  const openModal = () => {
    trackEvent(tracks.tappedViewOffer(conversationID, message))
    openOrderModal()
  }

  return (
    <>
      <ClickableFlex
        px={2}
        py={1}
        justifyContent="space-between"
        alignItems="center"
        bg={backgroundColor}
        flexDirection="row"
        minHeight={60}
        onClick={() => {
          openModal()
        }}
      >
        <Flex flexDirection="row">
          <Icon mt={0.5} fill="white100" />
          <Flex flexDirection="column" pl={1}>
            <Text color="white100" variant="sm">
              {message}
            </Text>
            <Text color="white100" variant="xs">
              {subMessage}
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <ArrowRightIcon fill="white100" />
        </Flex>
      </ClickableFlex>
    </>
  )
}

const tracks = {
  tappedViewOffer: (
    conversationID: string,
    message: string
  ): TappedViewOffer => ({
    action: ActionType.tappedViewOffer,
    context_owner_type: OwnerType.conversation,
    impulse_conversation_id: conversationID,
    subject: message,
  }),
}
