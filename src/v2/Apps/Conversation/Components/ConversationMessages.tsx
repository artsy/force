import { Fragment } from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { Spacer } from "@artsy/palette"
import { groupMessages } from "../Utils/groupMessages"
import { TimeSince, fromToday } from "./TimeSince"
import { MessageFragmentContainer } from "./Message"
import { NewMessageMarker } from "./NewMessageMarker"
import { OrderUpdateFragmentContainer } from "./OrderUpdate"
import { extractNodes } from "v2/Utils/extractNodes"
import { ConversationMessages_messagesAndEvents } from "v2/__generated__/ConversationMessages_messagesAndEvents.graphql"
import { Message_message } from "v2/__generated__/Message_message.graphql"

interface ConversationMessageProps {
  messagesAndEvents: ConversationMessages_messagesAndEvents
  lastViewedMessageID?: string | null
}

export const ConversationMessages = ({
  messagesAndEvents,
  lastViewedMessageID,
}: ConversationMessageProps) => {
  const allOrderEventsAndMessages = extractNodes(messagesAndEvents)

  const groupedMessages = groupMessages(allOrderEventsAndMessages)

  const relevantEvents = [
    "ConversationOfferSubmitted",
    "ConversationOrderStateChanged",
  ]
  const isRelevantEvent = (item: Message_message): item is Message_message => {
    return (
      item?.__typename !== "Message" && relevantEvents.includes(item.__typename)
    )
  }
  return (
    <>
      {groupedMessages.map((messageGroup, groupIndex) => {
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

            {messageGroup.map((message, messageIndex) => {
              if (isRelevantEvent(message)) {
                return (
                  <OrderUpdateFragmentContainer
                    key={`event-${messageIndex}`}
                    event={message as any}
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
                    <MessageFragmentContainer
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
    messagesAndEvents: graphql`
      fragment ConversationMessages_messagesAndEvents on ConversationEventConnection {
        edges {
          node {
            __typename
            ... on Message {
              internalID
              createdAt
              isFromUser
              body
              ...Message_message
            }
            ...OrderUpdate_event
            ... on ConversationOrderStateChanged {
              state
              stateReason
              createdAt
            }
            ... on ConversationOfferSubmitted {
              createdAt
            }
          }
        }
      }
    `,
  }
)
