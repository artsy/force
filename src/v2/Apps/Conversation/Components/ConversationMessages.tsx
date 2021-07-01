import { groupMessages, Message as MessageType } from "../Utils/groupMessages"
import { TimeSince, fromToday } from "./TimeSince"
import { MessageFragmentContainer as Message } from "./Message"
import React, { useEffect, useState } from "react"
import { Spacer } from "@artsy/palette"
import { graphql } from "relay-runtime"
import { createFragmentContainer } from "react-relay"
import { ConversationMessages_messages } from "v2/__generated__/ConversationMessages_messages.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { DateTime } from "luxon"
import { sortBy } from "lodash"
import { ConversationProps } from "./Conversation"
import { OrderUpdateFragmentContainer } from "./OrderUpdate"
import { OrderUpdate_event } from "v2/__generated__/OrderUpdate_event.graphql"
import { Message_message } from "v2/__generated__/Message_message.graphql"

interface ConversationMessageProps {
  messages: ConversationMessages_messages
  ordersEvents: ConversationProps["conversation"]["orderConnection"]
}
type Order = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<ConversationProps["conversation"]["orderConnection"]>["edges"]
    >[number]
  >["node"]
>
type OrderEvent = Order["orderHistory"][number]
// type OrderEventWithKey = OrderEvent & { key: string }

export const ConversationMessages = ({
  messages,
  ordersEvents,
}: ConversationMessageProps) => {
  let [messagesAndEvents, setMessagesAndEvents] = useState<MessageType[][]>([])
  console.log(messagesAndEvents, "point messagesAndEvents")

  useEffect(() => {
    const allMessages = extractNodes(messages)
    const allOrderEvents = extractNodes(ordersEvents).reduce<OrderEvent[]>(
      (prev, order) => prev.concat(order.orderHistory),
      []
    )
    const orderEventsWithoutFailedPayment = allOrderEvents.filter(
      (event, index) => {
        if (
          !(
            event.state === "APPROVED" &&
            allOrderEvents[index + 1] &&
            allOrderEvents[index + 1].state === "SUBMITTED"
          )
        ) {
          return event
        }
      }
    )
    const sortedMessages = sortBy(
      [...orderEventsWithoutFailedPayment, ...allMessages],
      message => DateTime.fromISO(message.createdAt!)
    )
    const groupAllMessages = groupMessages(sortedMessages)
    setMessagesAndEvents(groupAllMessages.reverse())
  }, [])

  const relevantEvents = [
    "CommerceOfferSubmittedEvent",
    "CommerceOrderStateChangedEvent",
  ]
  type DisplayableMessage = OrderUpdate_event | Message_message
  const isRelevantEvent = (
    item: DisplayableMessage
  ): item is OrderUpdate_event => {
    return (
      item?.__typename !== "Message" && relevantEvents.includes(item.__typename)
    )
  }
  return (
    <>
      {messagesAndEvents.map((messageGroup, groupIndex) => {
        let today
        if (messageGroup[0].createdAt) {
          today = fromToday(messageGroup[0].createdAt)
        }
        return (
          <React.Fragment
            key={`group-${groupIndex}-${messageGroup[0]?.internalID}`}
          >
            <TimeSince
              style={{ alignSelf: "center" }}
              time={messageGroup[0].createdAt ? messageGroup[0].createdAt : ""}
              exact
              mb={1}
            />
            {messageGroup.map((message, messageIndex) => {
              if (isRelevantEvent(message)) {
                return <OrderUpdateFragmentContainer event={message as any} />
              }
              if (message.__typename === "Message") {
                const nextMessage = messageGroup[messageIndex + 1]
                const senderChanges =
                  nextMessage && nextMessage.isFromUser !== message.isFromUser
                const lastMessageInGroup =
                  messageIndex === messageGroup.length - 1
                const spaceAfter = senderChanges || lastMessageInGroup ? 2 : 0.5

                return (
                  <React.Fragment key={`message-${message.internalID}`}>
                    <Message
                      message={message}
                      key={message.internalID}
                      showTimeSince={
                        message.createdAt &&
                        today &&
                        messageGroup.length - 1 === messageIndex
                      }
                    />
                    <Spacer mb={spaceAfter} />
                  </React.Fragment>
                )
              }
            })}
          </React.Fragment>
        )
      })}
    </>
  )
}

export const ConversationMessagesFragmentContainer = createFragmentContainer(
  ConversationMessages,
  {
    messages: graphql`
      fragment ConversationMessages_messages on MessageConnection {
        edges {
          node {
            __typename
            id
            internalID
            createdAt
            isFromUser
            body
            ...Message_message
          }
        }
      }
    `,
  }
)
