import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  AlertCircleFillIcon,
  Color,
  Flex,
  IconProps,
  MoneyFillIcon,
  Spacer,
  Text,
} from "@artsy/palette"

import { TimeSince } from "./TimeSince"

import { OrderUpdate_event } from "../../../__generated__/OrderUpdate_event.graphql"
export interface OrderUpdateProps {
  event: OrderUpdate_event
}

export const OrderUpdate: React.FC<OrderUpdateProps> = ({ event }) => {
  let color: Color
  let message: string
  let Icon: React.FC<IconProps> = MoneyFillIcon

  if (event.__typename === "ConversationOfferSubmitted") {
    const isCounter = event.respondsTo !== null
    if (event.fromParticipant === "BUYER") {
      color = "black100"
      message = `You sent ${isCounter ? "a counteroffer" : "an offer"} for ${
        event.amount
      }`
    } else if (event.fromParticipant === "SELLER") {
      color = "copper100"
      Icon = AlertCircleFillIcon
      if (event.offerAmountChanged) {
        message = `You received ${
          isCounter ? "a counteroffer" : "an offer"
        } for ${event.amount}`
      } else {
        message = "Offer Accepted - Pending Action"
      }
    } else {
      // ignore future added value
      return null
    }
  } else if (event.__typename === "ConversationOrderStateChanged") {
    const { state, stateReason } = event
    if (state === "APPROVED") {
      color = "green100"
      message = `Offer Accepted`
    } else if (state === "CANCELED" && stateReason?.includes("_rejected")) {
      color = "red100"
      message = `Offer Declined`
    } else if (state === "CANCELED" && stateReason?.includes("_lapsed")) {
      color = "black60"
      message = `Offer Expired`
    } else {
      return null
    }
  } else {
    return null
  }
  return (
    <Flex flexDirection="column">
      <TimeSince
        style={{ alignSelf: "center" }}
        time={event.createdAt}
        exact
        mb={1}
      />
      <Flex px={2} justifyContent="center" flexDirection="row">
        <Flex flexDirection="row">
          <Icon fill={color} />
          <Flex flexDirection="column" pl={1}>
            <Text color={color} variant="xs">
              {message}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Spacer mb={5} />
    </Flex>
  )
}

export const OrderUpdateFragmentContainer = createFragmentContainer(
  OrderUpdate,
  {
    event: graphql`
      fragment OrderUpdate_event on ConversationEvent {
        ... on ConversationOrderStateChanged {
          __typename
          createdAt
          stateReason
          state
        }
        ... on ConversationOfferSubmitted {
          __typename
          createdAt
          amount
          fromParticipant
          offerAmountChanged
          respondsTo {
            fromParticipant
          }
        }
      }
    `,
  }
)
