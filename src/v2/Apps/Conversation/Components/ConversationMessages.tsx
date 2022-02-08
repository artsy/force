import { Fragment, useEffect, useState } from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { Spacer } from "@artsy/palette"
import { DateTime } from "luxon"
import { sortBy } from "lodash"

import { groupMessages, Message as MessageType } from "../Utils/groupMessages"
import { TimeSince, fromToday } from "./TimeSince"
import { MessageFragmentContainer as Message } from "./Message"
import { NewMessageMarker } from "./NewMessageMarker"
import { OrderUpdateFragmentContainer } from "./OrderUpdate"
import { extractNodes } from "v2/Utils/extractNodes"

import { ConversationMessages_events } from "v2/__generated__/ConversationMessages_events.graphql"
import { Message_message } from "v2/__generated__/Message_message.graphql"
import { ConversationMessages_messages } from "v2/__generated__/ConversationMessages_messages.graphql"

interface ConversationMessageProps {
  messages: ConversationMessages_messages
  events: ConversationMessages_events | null
  lastViewedMessageID?: string | null
  setShowDetails: (showDetails: boolean) => void
}
type Order = NonNullable<
  NonNullable<
    NonNullable<NonNullable<ConversationMessages_events>["edges"]>[number]
  >["node"]
>
type OrderEvent = Order["orderHistory"][number]

export const ConversationMessages = ({
  messages,
  events,
  lastViewedMessageID,
  setShowDetails,
}: ConversationMessageProps) => {
  let [messagesAndEvents, setMessagesAndEvents] = useState<MessageType[][]>([])

  useEffect(() => {
    const allMessages = extractNodes(messages)
    const allOrderEvents = extractNodes(events).reduce<OrderEvent[]>(
      (prev, order) => prev.concat(order.orderHistory),
      []
    )
    const orderEventsWithoutFailedPayment = allOrderEvents.filter(
      (event, index) => {
        if (
          !!event &&
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
  }, [messages, events])

  const relevantEvents = [
    "CommerceOfferSubmittedEvent",
    "CommerceOrderStateChangedEvent",
  ]
  const isRelevantEvent = (item: Message_message): item is Message_message => {
    return (
      item?.__typename !== "Message" && relevantEvents.includes(item.__typename)
    )
  }
  return (
    <>
      {messagesAndEvents.map((messageGroup, groupIndex) => {
        let today: boolean
        let newFlagShown = false
        if (messageGroup[0].createdAt) {
          today = fromToday(messageGroup[0].createdAt)
        }

        return (
          <Fragment key={`group-${groupIndex}-${messageGroup[0]?.internalID}`}>
            {messageGroup[0].__typename === "Message" && (
              <TimeSince
                style={{ alignSelf: "center" }}
                time={
                  messageGroup[0].createdAt ? messageGroup[0].createdAt : ""
                }
                exact
                mb={1}
              />
            )}

            {[...messageGroup].reverse().map((message, messageIndex) => {
              if (isRelevantEvent(message)) {
                return (
                  <OrderUpdateFragmentContainer
                    key={`event-${messageIndex}`}
                    event={message as any}
                    setShowDetails={setShowDetails}
                  />
                )
              }
              if (message.__typename === "Message") {
                const nextMessage = messageGroup[messageIndex + 1]
                const senderChanges =
                  nextMessage && nextMessage.isFromUser !== message.isFromUser
                const lastMessageInGroup =
                  messageIndex === messageGroup.length - 1
                const spaceAfter = senderChanges || lastMessageInGroup ? 2 : 0.5

                let showNewFlag = false
                if (
                  !newFlagShown &&
                  !!lastViewedMessageID &&
                  message.internalID > +lastViewedMessageID &&
                  !message.isFromUser
                ) {
                  // This marks visibility
                  showNewFlag = true
                  // This makes sure that it appears only on the first new message
                  newFlagShown = true
                }

                return (
                  <Fragment key={`message-${message.internalID}`}>
                    {showNewFlag && <NewMessageMarker />}
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
                  </Fragment>
                )
              }
            })}
          </Fragment>
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
    events: graphql`
      fragment ConversationMessages_events on CommerceOrderConnectionWithTotalCount {
        edges {
          node {
            orderHistory {
              ...OrderUpdate_event
              __typename
              ... on CommerceOrderStateChangedEvent {
                state
                stateReason
                createdAt
              }
              ... on CommerceOfferSubmittedEvent {
                createdAt
              }
            }
          }
        }
      }
    `,
  }
)
