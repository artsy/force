import {
  Box,
  Flex,
  Image,
  Link,
  Sans,
  Serif,
  Spacer,
  color,
} from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import { DateTime } from "luxon"
import React, { useEffect } from "react"
import { RelayProp, createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { MessageFragmentContainer as Message } from "./Message"
import { Reply } from "./Reply"
import { TimeSince, fromToday } from "./TimeSince"
import { UpdateConversation } from "../Mutation/UpdateConversationMutation"

interface ItemProps {
  item: Conversation_conversation["items"][0]["item"]
}

const Item: React.FC<ItemProps> = props => {
  const { item } = props
  if (item.__typename === "Artwork") {
    return (
      <Link
        href={item.href}
        underlineBehavior="none"
        style={{ alignSelf: "flex-end" }}
        my={1}
      >
        <Flex flexDirection="column">
          <Image
            src={item.image.url}
            width="350px"
            borderRadius="15px 15px 0 0"
          />
          <Flex
            p={1}
            flexDirection="column"
            justifyContent="center"
            background={color("black100")}
            borderRadius="0 0 15px 15px"
          >
            <Sans size="4" weight="medium" color="white100">
              {item.artistNames}
            </Sans>
            <Sans size="2" color="white100">
              {item.title} / {item.date}
            </Sans>
          </Flex>
        </Flex>
      </Link>
    )
  } else if (item.__typename === "Show") {
    // it's a partnerShow
    return (
      <Flex width="350px">
        <Flex height="auto" alignItems="center" mr={2}>
          <Image src={item.coverImage.url} width="55px" />
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Serif size="2" weight="semibold">
            {item.fair.name}
          </Serif>
        </Flex>
      </Flex>
    )
  } else {
    return null
  }
}

type Message = Conversation_conversation["messages"]["edges"][number]["node"]
/**
 * Combines messages into groups of messages sent by the same party and
 * separated out into different groups if sent across multiple days
 * @param messages Messages in the conversation
 */
const groupMessages = (messages: Message[]): Message[][] => {
  if (messages.length === 0) {
    return []
  }
  // Make a copy of messages
  const remainingMessages = [...messages]
  const groups = [[remainingMessages.pop()]]
  while (remainingMessages.length > 0) {
    const lastGroup = groups[groups.length - 1]
    const lastMessage = lastGroup[lastGroup.length - 1]
    const currentMessage = remainingMessages.pop()

    const lastMessageCreatedAt = DateTime.fromISO(lastMessage.createdAt)
    const currentMessageCreatedAt = DateTime.fromISO(currentMessage.createdAt)
    const sameDay = lastMessageCreatedAt.hasSame(currentMessageCreatedAt, "day")
    const today = fromToday(currentMessageCreatedAt)

    if (sameDay && !today) {
      lastGroup.push(currentMessage)
    } else if (!today) {
      groups.push([currentMessage])
    } else if (lastMessage.isFromUser !== currentMessage.isFromUser) {
      groups.push([currentMessage])
    } else {
      lastGroup.push(currentMessage)
    }
  }
  return groups
}

export interface ConversationProps {
  conversation: Conversation_conversation
  relay: RelayProp
}

const Conversation: React.FC<ConversationProps> = props => {
  const { conversation, relay } = props

  useEffect(() => {
    UpdateConversation(relay.environment, conversation)
  }, [conversation, relay.environment, conversation.lastMessageID])

  return (
    <Flex flexDirection="column" width="100%">
      <Box>
        <Spacer mt="45px" />
        <Flex flexDirection="column" width="100%" px={1}>
          {conversation.items.map((i, idx) => (
            <Item
              item={i.item}
              key={
                i.item.__typename === "Artwork" || i.item.__typename === "Show"
                  ? i.item.id
                  : idx
              }
            />
          ))}
          {groupMessages(
            conversation.messages.edges.map(edge => edge.node)
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
                  mt={0.5}
                  mb={1}
                />
                {messageGroup.map((message, messageIndex) => {
                  const nextMessage = messageGroup[messageIndex + 1]
                  return (
                    <Message
                      message={message}
                      initialMessage={conversation.initialMessage}
                      key={message.internalID}
                      isFirst={groupIndex + messageIndex === 0}
                      showTimeSince={
                        message.createdAt &&
                        today &&
                        messageGroup.length - 1 === messageIndex
                      }
                      mb={
                        nextMessage &&
                          nextMessage.isFromUser !== message.isFromUser
                          ? 1
                          : undefined
                      }
                    />
                  )
                })}
              </React.Fragment>
            )
          })}
          <Spacer mb={9} />
        </Flex>
      </Box>
      <Reply conversation={conversation} environment={relay.environment} />
    </Flex>
  )
}

export const ConversationFragmentContainer = createFragmentContainer(
  Conversation,
  {
    conversation: graphql`
      fragment Conversation_conversation on Conversation
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 30 }
          after: { type: "String" }
        ) {
        id
        internalID
        from {
          name
          email
        }
        to {
          name
          initials
        }
        initialMessage
        lastMessageID
        unread
        messages(first: $count, after: $after, sort: DESC)
          @connection(key: "Messages_messages", filters: []) {
          pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
          }
          edges {
            node {
              id
              internalID
              createdAt
              isFromUser
              ...Message_message
            }
          }
        }
        items {
          item {
            __typename
            ... on Artwork {
              id
              date
              title
              artistNames
              href
              image {
                url(version: ["large"])
              }
            }
            ... on Show {
              id
              fair {
                name
              }
              name
              coverImage {
                url
              }
            }
          }
        }
      }
    `,
  }
)
