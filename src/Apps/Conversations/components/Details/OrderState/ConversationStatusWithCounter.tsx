import { graphql, useFragment } from "react-relay"
import { ConversationStatusWithCounter_order$key } from "__generated__/ConversationStatusWithCounter_order.graphql"
import { Flex, Text } from "@artsy/palette"
import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import AlertFillIcon from "@artsy/icons/AlertFillIcon"
import { CountdownTimer } from "Apps/Conversations/components/Details/OrderInformation/CountdownTimer"

interface ConversationStatusWithCounterProps {
  order: ConversationStatusWithCounter_order$key
  status: "offer" | "buy" | "buyerCounteroffer" | "sellerCounteroffer"
}

export const ConversationStatusWithCounter: React.FC<ConversationStatusWithCounterProps> = ({
  order,
  status,
}) => {
  const data = useFragment(
    graphql`
      fragment ConversationStatusWithCounter_order on CommerceOrder {
        stateExpiresAt @required(action: NONE)
        stateUpdatedAt @required(action: NONE)
        formattedStateExpiresAt: stateExpiresAt(format: "MMM D, h:mm A zz")
      }
    `,
    order
  )

  if (!data) {
    return null
  }

  const { formattedStateExpiresAt, stateExpiresAt, stateUpdatedAt } = data

  let text = "Review offer"
  let expiryText = "until offer expires"
  let respondByText = `Seller will respond by ${formattedStateExpiresAt}`

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
      text = "Received counteroffer"
      expiryText = "until counteroffer expires"
      respondByText = `Awaiting response by ${formattedStateExpiresAt}`
      break
    case "offer":
      text = "Seller reviewing offer"
      expiryText = "until offer expires"
      respondByText = ""
      break
  }

  return (
    <>
      <Flex alignItems="center">
        {status === "sellerCounteroffer" || status === "offer" ? (
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
