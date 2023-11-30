import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { extractNodes } from "Utils/extractNodes"
import { sortBy } from "lodash"
import { fromToday } from "Apps/Conversations/components/Message/Utils/dateFormatters"
import { ConversationMessages_conversation$data } from "__generated__/ConversationMessages_conversation.graphql"

interface UseGroupedMessagesProps {
  messagesConnection: NonNullable<
    NonNullable<
      NonNullable<ConversationMessages_conversation$data>["messagesConnection"]
    >
  >
  orderEvents: NonNullable<
    NonNullable<
      NonNullable<ConversationMessages_conversation$data>["orderEvents"]
    >
  >
}

export const useGroupedMessages = ({
  messagesConnection,
  orderEvents,
}: UseGroupedMessagesProps) => {
  const [messagesAndEvents, setMessagesAndEvents] = useState<
    MessageAndOrderEvent[][]
  >([])

  useEffect(() => {
    const allMessages = extractNodes(messagesConnection)
    const orders = extractNodes(orderEvents)

    const allOrderEvents = orders.reduce((prev, order) => {
      return [...prev, ...order.orderHistory]
    }, [])

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
      message => DateTime.fromISO(message.createdAt as string)
    )

    const groupAllMessages = groupMessages(
      sortedMessages as MessageAndOrderEvent[]
    )

    setMessagesAndEvents(groupAllMessages.reverse())
  }, [messagesConnection, orderEvents])

  if (!messagesAndEvents || !orderEvents) {
    return []
  }

  return messagesAndEvents
}

export const isRelevantEvent = item => {
  const relevantEvents = [
    "CommerceOfferSubmittedEvent",
    "CommerceOrderStateChangedEvent",
  ]

  return (
    item?.__typename !== "Message" && relevantEvents.includes(item.__typename)
  )
}

/**
 * Combines messages into groups of messages sent by the same party and
 * separated out into different groups if sent across multiple days
 * @param messages Messages in the conversation
 */
const groupMessages = (
  messages: MessageAndOrderEvent[]
): MessageAndOrderEvent[][] => {
  if (messages.length === 0) {
    return []
  }

  // Make a copy of messages
  const remainingMessages = [...messages]
  const groups = [[remainingMessages.pop()]] as Message[][]

  while (remainingMessages.length > 0) {
    const lastGroup = groups[groups.length - 1]
    const lastMessage = lastGroup[lastGroup.length - 1]
    const currentMessage = remainingMessages.pop() as Message

    const lastMessageCreatedAt = DateTime.fromISO(
      lastMessage?.createdAt as string
    )

    const currentMessageCreatedAt = DateTime.fromISO(
      currentMessage?.createdAt as string
    )

    const sameDay = lastMessageCreatedAt.hasSame(currentMessageCreatedAt, "day")
    const today = fromToday(currentMessageCreatedAt)

    if (sameDay && !today) {
      lastGroup.push(currentMessage)
    } else if (!today) {
      groups.push([currentMessage])
    } else if (lastMessage?.isFromUser !== currentMessage?.isFromUser) {
      groups.push([currentMessage])
    } else if (!sameDay && today) {
      groups.push([currentMessage])
    } else {
      lastGroup.push(currentMessage)
    }
  }

  return groups as MessageAndOrderEvent[][]
}

// Misc types

export type Message = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<UseGroupedMessagesProps>["messagesConnection"]
      >["edges"]
    >[number]
  >["node"]
>

type OrderEvent = NonNullable<
  NonNullable<
    NonNullable<NonNullable<UseGroupedMessagesProps>["orderEvents"]>["edges"]
  >[number]
>["node"]

type MessageAndOrderEvent = Message & OrderEvent
