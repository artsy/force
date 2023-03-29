import { Flex, Text } from "@artsy/palette"
import AlertFillIcon from "@artsy/icons/AlertFillIcon"
import CloseFillIcon from "@artsy/icons/CloseFillIcon"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { graphql, useFragment } from "react-relay"
import {
  OrderState_state$key,
  CommerceOrderStateEnum,
  CommerceOrderModeEnum,
} from "__generated__/OrderState_state.graphql"
import { CountdownTimer } from "pages/conversations/components/Details/OrderInformation/CountdownTimer"
import { OrderStateStatusWithCounter_order$key } from "__generated__/OrderStateStatusWithCounter_order.graphql"

type ModeState = `${CommerceOrderModeEnum}_${CommerceOrderStateEnum}`
export type CounterOfferState = `${"COUNTER_OFFER" | "OFFER"}_${
  | "SELLER"
  | "BUYER"}`

interface OrderStateProps {
  order: OrderState_state$key
}

export const OrderState: React.FC<OrderStateProps> = ({ order }) => {
  const data = useFragment(
    graphql`
      fragment OrderState_state on CommerceOrder {
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
        ...OrderStateStatusWithCounter_order
      }
    `,
    order
  )

  if (!data) return null

  const { state, mode, lastOffer, stateReason } = data

  const modeState: ModeState = `${mode}_${state}`

  // Covering normal order/offer states, not covering offer submitted and counter offers cases
  switch (modeState) {
    // ORDER STATES
    case "BUY_SUBMITTED":
      return <StatusWithCounter order={data} status="buy" />
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
      return <StatusWithCounter order={data} status="offer" />
    //counter offers
    case "COUNTER_OFFER_SELLER":
      return <StatusWithCounter order={data} status="sellerCounteroffer" />
    case "COUNTER_OFFER_BUYER":
      return <StatusWithCounter order={data} status="buyerCounteroffer" />
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

interface StatusWithCounterProps {
  order: OrderStateStatusWithCounter_order$key
  status: "offer" | "buy" | "buyerCounteroffer" | "sellerCounteroffer"
}

const StatusWithCounter: React.FC<StatusWithCounterProps> = ({
  order,
  status,
}) => {
  const data = useFragment(
    graphql`
      fragment OrderStateStatusWithCounter_order on CommerceOrder {
        stateExpiresAt @required(action: NONE)
        stateUpdatedAt @required(action: NONE)
        formattedStateExpiresAt: stateExpiresAt(format: "MMM D, h:mm A zz")
      }
    `,
    order
  )
  if (!data) return null

  const { formattedStateExpiresAt, stateExpiresAt, stateUpdatedAt } = data

  let text = "Review offer"
  let expiryText = "until offer expires"
  let respondByText = `Respond by ${formattedStateExpiresAt}`
  switch (status) {
    case "buy":
      text = "Confirm order"
      expiryText = "until order expires"
      break
    case "buyerCounteroffer":
      text = "Review counteroffer"
      expiryText = "until counteroffer expires"
      break
    case "sellerCounteroffer":
      text = "Sent counteroffer"
      expiryText = "until counteroffer expires"
      respondByText = `Awaiting response by ${formattedStateExpiresAt}`
      break
  }

  return (
    <>
      <Flex alignItems="center">
        {status === "sellerCounteroffer" ? (
          <StopwatchIcon />
        ) : (
          <AlertFillIcon fill="orange100" />
        )}

        <Text variant="sm" ml={0.5}>
          {text}
        </Text>
      </Flex>
      <CountdownTimer
        stateExpiresAt={stateExpiresAt}
        stateUpdatedAt={stateUpdatedAt}
        expiryText={expiryText}
        respondByText={respondByText}
      />
    </>
  )
}
