import { ConversationMessageBubble } from "./Message/ConversationMessageBubble"
import { ConversationMessageImage } from "./Message/ConversationMessageImage"
import { ConversationMessageFile } from "./Message/ConversationMessageFile"
import { graphql, useFragment } from "react-relay"
import { Spacer, Text } from "@artsy/palette"
import React from "react"
import {
  ConversationMessage_message$data,
  ConversationMessage_message$key,
} from "__generated__/ConversationMessage_message.graphql"
import { ConversationMessages_conversation$data } from "__generated__/ConversationMessages_conversation.graphql"

interface ConversationMessageProps {
  message: ConversationMessage_message$key
  simplified?: boolean
  isLastGroupedPartnerMessage?: boolean
  formattedFirstMessage?: NonNullable<
    NonNullable<ConversationMessages_conversation$data>["inquiryRequest"]
  >["formattedFirstMessage"]
}

export const ConversationMessage: React.FC<ConversationMessageProps> = ({
  message,
  simplified,
  isLastGroupedPartnerMessage,
  formattedFirstMessage,
}) => {
  const data = useFragment(
    graphql`
      fragment ConversationMessage_message on Message {
        attachments {
          internalID
          contentType
          downloadURL
          fileName
        }
        body
        createdAtTime: createdAt(format: "h:mmA") @required(action: NONE)
        deliveries @required(action: NONE) {
          openedAt
          fullTransformedEmail
        }
        isFromUser
        isFirstMessage
        from @required(action: NONE) {
          name
        }
        to @required(action: NONE)
        cc @required(action: NONE)
      }
    `,
    message
  )

  if (!data) {
    return null
  }

  const seenBy =
    !!data.deliveries.length && isLastGroupedPartnerMessage
      ? defineSeenBy(data)
      : undefined

  return (
    <>
      <ConversationMessageBubble
        fromViewer={!data.isFromUser}
        simplified={simplified}
        name={data.isFromUser && data.from.name ? data.from.name : undefined}
        time={!simplified ? data.createdAtTime : undefined}
        seenBy={data.attachments?.length === 0 ? seenBy : undefined}
      >
        <Message data={data} formattedFirstMessage={formattedFirstMessage} />
      </ConversationMessageBubble>

      {data.attachments?.map((attachment, index) => {
        if (!attachment) return null
        return (
          <React.Fragment key={attachment.internalID}>
            <Spacer y={0.5} />
            <ConversationMessageBubble
              fromViewer={!data.isFromUser}
              simplified
              seenBy={
                index === data.attachments?.length! - 1 ? seenBy : undefined
              }
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

const Message: React.FC<{
  data: NonNullable<ConversationMessage_message$data>
  formattedFirstMessage: string | null | undefined
}> = ({ data, formattedFirstMessage }) => {
  if (data.isFirstMessage && formattedFirstMessage) {
    return <Text>{formattedFirstMessage}</Text>
  }

  if (data.body) {
    return <Text>{data.body}</Text>
  }

  return <Text fontStyle="italic">This message is no longer available.</Text>
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
