import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  AlertCircleFillIcon,
  Clickable,
  Color,
  Flex,
  IconProps,
  MoneyFillIcon,
  Spacer,
  Text,
  THEME_V3,
} from "@artsy/palette"

import { TimeSince } from "./TimeSince"

import { OrderUpdate_event$data } from "../../../__generated__/OrderUpdate_event.graphql"
export interface OrderUpdateProps {
  event: OrderUpdate_event$data
  setShowDetails: (showDetails: boolean) => void
}

export const OrderUpdate: React.FC<OrderUpdateProps> = ({
  event,
  setShowDetails,
}) => {
  let color: Color
  let textColor: Color | null = null
  let message: string
  let Icon: React.FC<IconProps> = MoneyFillIcon
  let action: { label?: string; onClick?: () => void } = {}

  if (event.__typename === "CommerceOfferSubmittedEvent") {
    const { offer } = event
    const isCounter = offer.respondsTo !== null
    if (offer.fromParticipant === "BUYER") {
      color = "black100"
      message = `You sent ${isCounter ? "a counteroffer" : "an offer"} for ${
        event.offer.amount
      }`
      if (!isCounter) {
        action = { label: "See details", onClick: () => setShowDetails(true) }
      }
    } else if (offer.fromParticipant === "SELLER") {
      // @ts-ignore
      color = "orange150" // FIXME: Needs v3 typing
      Icon = AlertCircleFillIcon
      if (offer.offerAmountChanged) {
        message = `You received ${
          isCounter ? "a counteroffer" : "an offer"
        } for ${event.offer.amount}`
      } else {
        message = "Offer Accepted - Pending Action"
      }
    } else {
      // ignore future added value
      return null
    }
  } else if (event.__typename === "CommerceOrderStateChangedEvent") {
    const { orderUpdateState, state, stateReason } = event
    const reasonLapsed = stateReason?.includes("_lapsed")
    const reasonRejected = stateReason?.includes("_rejected")
    if (state === "PROCESSING_APPROVAL") {
      Icon = AlertCircleFillIcon
      color = THEME_V3.colors.yellow100 as Color
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
      action = { label: "See details", onClick: () => setShowDetails(true) }
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
            <Text color={textColor || color} variant="xs">
              {message}
              {action.label && action.onClick && (
                <>
                  {". "}
                  <Clickable
                    onClick={action.onClick}
                    textDecoration="underline"
                  >
                    {action.label}.
                  </Clickable>
                </>
              )}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Spacer y={5} />
    </Flex>
  )
}

export const OrderUpdateFragmentContainer = createFragmentContainer(
  OrderUpdate,
  {
    event: graphql`
      fragment OrderUpdate_event on CommerceOrderEventUnion {
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
  }
)
