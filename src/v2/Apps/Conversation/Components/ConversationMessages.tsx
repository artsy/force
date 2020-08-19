import { groupMessages } from "../Utils/groupMessages"
import { TimeSince, fromToday } from "./TimeSince"
import { MessageFragmentContainer as Message } from "./Message"
import React from "react"
import { Spacer } from "@artsy/palette"
import { graphql } from "relay-runtime"
import { createFragmentContainer } from "react-relay"
import { ConversationMessages_messages } from "v2/__generated__/ConversationMessages_messages.graphql"

interface ConversationMessageProps {
  messages: ConversationMessages_messages
}

export const ConversationMessages = ({
  messages,
}: ConversationMessageProps) => {
  return (
    <>
      {groupMessages(
        messages.edges
          .map(edge => edge?.node)
          .filter(node => node?.body?.length > 0)
      ).map((messageGroup, groupIndex) => {
        const today = fromToday(messageGroup[0].createdAt)
        return (
          <React.Fragment
            key={`group-${groupIndex}-${messageGroup[0].internalID}`}
          >
            <TimeSince
              style={{ alignSelf: "center" }}
              time={messageGroup[0].createdAt}
              exact
              mb={1}
            />
            {messageGroup.map((message, messageIndex) => {
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
