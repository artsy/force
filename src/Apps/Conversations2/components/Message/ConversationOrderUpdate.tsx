import * as React from "react"
import { graphql, useFragment } from "react-relay"
import { Clickable, Color, Flex, Spacer, Text, THEME } from "@artsy/palette"
import { ConversationTimeSince } from "./ConversationTimeSince"
import { ConversationOrderUpdate_event$key } from "__generated__/ConversationOrderUpdate_event.graphql"
import AlertFillIcon from "@artsy/icons/AlertFillIcon"
import MoneyFillIcon from "@artsy/icons/MoneyFillIcon"

export interface OrderUpdateProps {
  event: ConversationOrderUpdate_event$key
  setShowDetails: (showDetails: boolean) => void
}

export const ConversationOrderUpdate: React.FC<OrderUpdateProps> = ({
  event,
  setShowDetails,
}) => {
  const data = useFragment(
    graphql`
      fragment ConversationOrderUpdate_event on CommerceOrderEventUnion {
        __typename
        ... on CommerceOrderStateChangedEvent {
          createdAt
          orderUpdateState
          state
          stateReason
        }
        ... on CommerceOfferSubmittedEvent {
          createdAt
          offer {
            amount
            fromParticipant
            definesTotal
            offerAmountChanged
            respondsTo {
              fromParticipant
            }
          }
        }
      }
    `,
    event
  )

  let color: Color
  let textColor: Color | null = null
  let message: string
  let Icon: React.FC<any> = MoneyFillIcon

  if (data.__typename === "CommerceOfferSubmittedEvent") {
    const { offer } = data
    const isCounter = offer.respondsTo !== null

    if (offer.fromParticipant === "BUYER") {
      color = "black100"
      message = `You sent ${isCounter ? "a counteroffer" : "an offer"} for ${
        data.offer.amount
      }`
    } else if (offer.fromParticipant === "SELLER") {
      color = "orange150"
      Icon = AlertFillIcon

      if (offer.offerAmountChanged) {
        message = `You received ${
          isCounter ? "a counteroffer" : "an offer"
        } for ${data.offer.amount}`
      } else {
        message = "Offer Accepted - Pending Action"
      }
    } else {
      return null
    }
  } else if (data.__typename === "CommerceOrderStateChangedEvent") {
    const { orderUpdateState, state, stateReason } = data
    const reasonLapsed = stateReason?.includes("_lapsed")
    const reasonRejected = stateReason?.includes("_rejected")

    if (state === "PROCESSING_APPROVAL") {
      Icon = AlertFillIcon
      color = THEME.colors.yellow100 as Color
      textColor = "black100"
      message = "Offer accepted. Payment processing"
    } else if (state === "APPROVED") {
      color = "green100"
      message = `${
        orderUpdateState === "offer_approved" ? "Offer" : "Purchase"
      } Accepted`
    } else if (state === "CANCELED" && reasonRejected) {
      color = "red100"
      message = `Offer Declined`
    } else if (state === "CANCELED" && reasonLapsed) {
      color = "red100"
      message = `${
        orderUpdateState === "offer_lapsed" ? "Offer" : "Purchase"
      } Expired`
    } else if (orderUpdateState === "buy_submitted") {
      color = "black100"
      message = `You purchased this artwork`
    } else {
      return null
    }
  } else {
    return null
  }

  return (
    <Flex flexDirection="column" pt={2}>
      <ConversationTimeSince message={data} alignSelf="center" exact mb={1} />

      <Flex px={2} justifyContent="center" flexDirection="row">
        <Flex flexDirection="row">
          <Icon fill={color} />

          <Flex flexDirection="column" pl={1}>
            <Text color={textColor || color} variant="xs">
              {message}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Spacer y={5} />
    </Flex>
  )
}
