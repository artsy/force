import { graphql, useFragment } from "react-relay"
import { Box, Spacer, Text } from "@artsy/palette"
import { isSameMinute } from "date-fns"
import React from "react"
import {
  ConversationMessage_message$data,
  ConversationMessage_message$key,
} from "__generated__/ConversationMessage_message.graphql"
import { ConversationMessages_conversation$data } from "__generated__/ConversationMessages_conversation.graphql"
import { useScrollPagination } from "Apps/Conversations/hooks/useScrollPagination"
import Linkify from "react-linkify"
import { ConversationMessageBubble } from "Apps/Conversations/components/Message/ConversationMessageBubble"
import { ConversationMessageImage } from "Apps/Conversations/components/Message/ConversationMessageImage"
import { ConversationMessageFile } from "Apps/Conversations/components/Message/ConversationMessageFile"

export type Messages = Pick<
  NonNullable<ConversationMessage_message$data>,
  "isFromUser" | "internalID" | "createdAt"
>[]

interface ConversationMessageProps {
  messageIndex: number
  message: ConversationMessage_message$key
  messages: Messages
  simplified?: boolean
  isLastGroupedPartnerMessage?: boolean
  formattedFirstMessage?: NonNullable<
    NonNullable<ConversationMessages_conversation$data>["inquiryRequest"]
  >["formattedFirstMessage"]
}

export const ConversationMessage: React.FC<ConversationMessageProps> = ({
  messageIndex,
  message,
  messages,
  formattedFirstMessage,
}) => {
  const { appendElementRef } = useScrollPagination()

  const data = useFragment(FRAGMENT, message)

  if (!data || data.__typename !== "Message") {
    return null
  }

  const prevMessage = messages[messageIndex - 1]
  const nextMessage = messages[messageIndex + 1]

  const messageDate = new Date(data.createdAt as string)
  const prevMessageDate = new Date(prevMessage?.createdAt as string)
  const nextMessageDate = new Date(nextMessage?.createdAt as string)

  const simplified =
    data.isFromUser === prevMessage?.isFromUser
      ? isSameMinute(messageDate, prevMessageDate)
      : false

  const isLastGroupedPartnerMessage =
    !data.isFromUser &&
    (nextMessage?.isFromUser || !isSameMinute(messageDate, nextMessageDate))

  const seenBy =
    !!data.deliveries.length && isLastGroupedPartnerMessage
      ? defineSeenBy(data)
      : undefined

  return (
    <>
      <Box
        ref={(ref: any) => {
          if (messageIndex === 0) {
            appendElementRef(ref, data.internalID)
          }
        }}
      />

      <Spacer y={simplified ? 0.5 : 2} />

      {/* Add an extra spacer when quick responses come back from the other
          party */}
      {!data.isFromUser && simplified && <Spacer y={0.5} />}

      <ConversationMessageBubble
        fromViewer={data.isFromUser}
        simplified={simplified}
        name={data.isFromUser && data.from.name ? data.from.name : undefined}
        time={!simplified ? data.createdAtTime : undefined}
        seenBy={data.attachments?.length === 0 ? seenBy : undefined}
        isMessageSentOnPlatform={!!data.isMessageSentOnPlatform}
      >
        <Message data={data} formattedFirstMessage={formattedFirstMessage} />
      </ConversationMessageBubble>

      {data.attachments?.map((attachment, index) => {
        if (!attachment) {
          return null
        }

        const attachmentLength = data.attachments?.length as number

        return (
          <React.Fragment key={attachment.internalID}>
            <Spacer y={2} />

            <ConversationMessageBubble
              fromViewer={!data.isFromUser}
              simplified
              seenBy={index === attachmentLength - 1 ? seenBy : undefined}
            >
              {attachment.contentType.startsWith("image") ? (
                <ConversationMessageImage
                  src={attachment.downloadURL}
                  alt="Attached image"
                />
              ) : (
                <ConversationMessageFile
                  src={attachment.downloadURL}
                  name={attachment.fileName}
                  size={attachment.contentType}
                />
              )}
            </ConversationMessageBubble>
          </React.Fragment>
        )
      })}
    </>
  )
}

const FRAGMENT = graphql`
  fragment ConversationMessage_message on Message {
    __typename
    id
    internalID
    attachments {
      internalID
      contentType
      downloadURL
      fileName
    }
    body
    createdAt
    isMessageSentOnPlatform
    createdAtTime: createdAt(format: "h:mmA") @required(action: NONE)
    deliveries @required(action: NONE) {
      openedAt
      fullTransformedEmail
    }
    isFromUser @required(action: NONE)
    isFirstMessage
    from @required(action: NONE) {
      name
    }
    to @required(action: NONE)
    cc @required(action: NONE)
  }
`

const Message: React.FC<{
  data: NonNullable<ConversationMessage_message$data>
  formattedFirstMessage: string | null | undefined
}> = ({ data, formattedFirstMessage }) => {
  // react-linkify v1.0.0-alpha with @types v1.0.1 - adding `properties` still doesn't work.
  // This is a workaround to specify target for now.(same as in Force v1.0.0-alpha, in Message.tsx)
  // https://github.com/tasti/react-linkify/issues/78#issuecomment-514754050
  const linkTargetDecorator = (href: string, text: string, key: number) => (
    <a href={href} key={key} target="_blank" rel="noreferrer">
      {text}
    </a>
  )

  if (data.isFirstMessage && formattedFirstMessage) {
    return (
      <Text>
        <Linkify componentDecorator={linkTargetDecorator}>
          {formattedFirstMessage}
        </Linkify>
      </Text>
    )
  }

  if (data.body) {
    return (
      <Text>
        <Linkify componentDecorator={linkTargetDecorator}>{data.body}</Linkify>
      </Text>
    )
  }

  return (
    <Text fontStyle="italic">
      <Linkify componentDecorator={linkTargetDecorator}>
        This message is no longer available.
      </Linkify>
    </Text>
  )
}

export const defineSeenBy = (
  message: Pick<
    NonNullable<ConversationMessage_message$data>,
    "deliveries" | "to" | "cc"
  >
): string | undefined => {
  // FIXME: Disabling this feature for now. NX will redefine how it should work.
  return undefined

  const opens = message.deliveries
    .filter(delivery => !!delivery?.openedAt)
    .map(delivery => delivery?.fullTransformedEmail)

  if (!opens.length) return
  // "Seen by all"
  if (opens.length === message.to.concat(message.cc).length) return "all"
  // "Seen by [n]"
  return opens.length.toString()
}
