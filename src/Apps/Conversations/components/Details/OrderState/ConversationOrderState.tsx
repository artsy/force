import { Flex, Text } from "@artsy/palette"
import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import { graphql, useFragment } from "react-relay"
import {
  ConversationOrderState_state$key,
  CommerceOrderStateEnum,
  CommerceOrderModeEnum,
} from "__generated__/ConversationOrderState_state.graphql"
import { ConversationStatusWithCounter } from "Apps/Conversations/components/Details/OrderState/ConversationStatusWithCounter"

type ModeState = `${CommerceOrderModeEnum}_${CommerceOrderStateEnum}`

export type CounterOfferState = `${"COUNTER_OFFER" | "OFFER"}_${
  | "SELLER"
  | "BUYER"}`

interface OrderStateProps {
  order: ConversationOrderState_state$key
}

export const ConversationOrderState: React.FC<OrderStateProps> = ({ order }) => {
  const data = useFragment(
    graphql`
      fragment ConversationOrderState_state on CommerceOrder {
        state @required(action: NONE)
        mode @required(action: NONE)
        stateReason
        ... on CommerceOfferOrder {
          lastOffer {
            from @required(action: NONE) {
              __typename
            }
            offerAmountChanged
          }
        }
        ...ConversationStatusWithCounter_order
      }
    `,
    order
  )

  if (!data) {
    return null
  }

  const { state, mode, lastOffer, stateReason } = data

  const modeState: ModeState = `${mode}_${state}`

  // Covering normal order/offer states, not covering offer submitted and counter offers cases
  switch (modeState) {
    // ORDER STATES
    case "BUY_SUBMITTED":
      return <ConversationStatusWithCounter order={data} status="buy" />
    case "BUY_FULFILLED":
    case "BUY_APPROVED":
      return <Status text="Order accepted" fill="green100" />
    case "BUY_CANCELED":
      if (stateReason?.includes("lapsed")) {
        return <Status text="Order expired" fill="red100" />
      }
      return <Status text="Order canceled" fill="red100" />

    // OFFER STATES
    case "OFFER_CANCELED":
    case "OFFER_ABANDONED":
      if (stateReason?.includes("lapsed")) {
        return <Status text="Offer expired" fill="red100" />
      }
      if (stateReason?.includes("rejected")) {
        return <Status text="Offer declined" fill="red100" />
      }
      return <Status text="Offer canceled" fill="red100" />
    case "OFFER_APPROVED":
    case "OFFER_FULFILLED":
      return <Status text="Offer accepted" fill="green100" />
  }

  if (!lastOffer || modeState !== "OFFER_SUBMITTED") {
    return null
  }

  const {
    offerAmountChanged,
    from: { __typename },
  } = lastOffer

  const counterOfferState: CounterOfferState = `${
    offerAmountChanged ? "COUNTER_OFFER" : "OFFER"
  }_${__typename === "CommercePartner" ? "SELLER" : "BUYER"}`

  // Covering offer submitted and counter offers cases
  switch (counterOfferState) {
    // offer submitted by the buyer
    case "OFFER_BUYER":
      return <ConversationStatusWithCounter order={data} status="offer" />
    // counter offers
    case "COUNTER_OFFER_SELLER":
      return <ConversationStatusWithCounter order={data} status="sellerCounteroffer" />
    case "COUNTER_OFFER_BUYER":
      return <ConversationStatusWithCounter order={data} status="buyerCounteroffer" />
  }

  return null
}

const Status: React.FC<{
  text: string
  fill: "green100" | "red100"
}> = ({ text, fill }) => {
  return (
    <Flex alignItems="center">
      {fill === "green100" ? (
        <CheckmarkFillIcon fill={fill} />
      ) : (
        <CloseFillIcon fill={fill} />
      )}
      <Text variant="sm" ml={0.5}>
        {text}
      </Text>
    </Flex>
  )
}
