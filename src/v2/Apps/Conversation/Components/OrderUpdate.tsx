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
} from "@artsy/palette"

import { TimeSince } from "./TimeSince"

import { OrderUpdate_event } from "../../../__generated__/OrderUpdate_event.graphql"
export interface OrderUpdateProps {
  event: OrderUpdate_event
  setShowDetails: (showDetails: boolean) => void
}

export const OrderUpdate: React.FC<OrderUpdateProps> = ({
  event,
  setShowDetails,
}) => {
  let color: Color
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
      <Spacer mb={5} />
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
          stateReason
          state
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
