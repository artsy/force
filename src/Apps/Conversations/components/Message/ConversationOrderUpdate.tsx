import type * as React from "react"
import { graphql, useFragment } from "react-relay"
import { type Color, Flex, type FlexProps, Text, THEME } from "@artsy/palette"
import { ConversationTimeSince } from "./ConversationTimeSince"
import type {
  ConversationOrderUpdate_event$data,
  ConversationOrderUpdate_event$key,
} from "__generated__/ConversationOrderUpdate_event.graphql"
import AlertFillIcon from "@artsy/icons/AlertFillIcon"
import MoneyFillIcon from "@artsy/icons/MoneyFillIcon"

export interface OrderUpdateProps extends FlexProps {
  event: ConversationOrderUpdate_event$key
}

export const ConversationOrderUpdate: React.FC<
  React.PropsWithChildren<OrderUpdateProps>
> = ({ event, ...flexProps }) => {
  const data = useFragment(FRAGMENT, event)

  const { color, textColor, message, Icon } = getIconProps(data)

  if (!message) {
    return <ConversationTimeSince message={data} alignSelf="center" exact />
  }

  return (
    <Flex flexDirection="column" {...flexProps}>
      <ConversationTimeSince message={data} alignSelf="center" exact mb={1} />

      <Flex px={2} justifyContent="center" flexDirection="row">
        <Icon fill={color} />

        <Flex flexDirection="column" pl={1}>
          <Text color={textColor || color} variant="xs">
            {message}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

const FRAGMENT = graphql`
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
`

const getIconProps = (
  data: ConversationOrderUpdate_event$data
): {
  color: string
  message: string
  textColor?: string
  Icon: React.FC<React.PropsWithChildren<any>>
} => {
  if (data.__typename === "CommerceOfferSubmittedEvent") {
    const isCounter = data.offer.respondsTo !== null

    if (data.offer.fromParticipant === "BUYER") {
      return {
        color: "black100",
        message: `You sent ${isCounter ? "a counteroffer" : "an offer"} for ${
          data.offer.amount
        }`,
        Icon: MoneyFillIcon,
      }
    }
    if (data.offer.fromParticipant === "SELLER") {
      let message: string

      if (data.offer.offerAmountChanged) {
        message = `You received ${
          isCounter ? "a counteroffer" : "an offer"
        } for ${data.offer.amount}`
      } else {
        message = "Offer Accepted - Pending Action"
      }

      return {
        color: "orange150",
        message,
        Icon: MoneyFillIcon,
      }
    }
  } else if (data.__typename === "CommerceOrderStateChangedEvent") {
    const { orderUpdateState, state, stateReason } = data
    const reasonLapsed = stateReason?.includes("_lapsed")
    const reasonRejected = stateReason?.includes("_rejected")

    if (state === "PROCESSING_APPROVAL") {
      return {
        Icon: AlertFillIcon,
        color: THEME.colors.yellow100 as Color,
        textColor: "black100",
        message: "Offer accepted. Payment processing",
      }
    }
    if (state === "APPROVED") {
      return {
        color: "green100",
        message: `${
          orderUpdateState === "offer_approved" ? "Offer" : "Purchase"
        } Accepted`,
        Icon: MoneyFillIcon,
      }
    }
    if (state === "CANCELED" && reasonRejected) {
      return {
        color: "red100",
        message: "Offer Declined",
        Icon: MoneyFillIcon,
      }
    }
    if (state === "CANCELED" && reasonLapsed) {
      return {
        color: "red100",
        message: `${
          orderUpdateState === "offer_lapsed" ? "Offer" : "Purchase"
        } Expired`,
        Icon: MoneyFillIcon,
      }
    }
    if (orderUpdateState === "buy_submitted") {
      return {
        color: "black100",
        message: "You purchased this artwork",
        Icon: MoneyFillIcon,
      }
    }
  }

  // Default case
  return {
    color: "black100",
    message: "",
    Icon: () => null,
  }
}
