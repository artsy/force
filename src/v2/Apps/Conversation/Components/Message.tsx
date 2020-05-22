import {
  Box,
  BoxProps,
  Flex,
  Image,
  Link,
  Sans,
  Serif,
  Spacer,
} from "@artsy/palette"
import { Message_message } from "v2/__generated__/Message_message.graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { TimeSince } from "./TimeSince"

interface AttachmentProps {
  item: Message_message["attachments"][0]
}

export const Attachment: React.FC<AttachmentProps> = props => {
  const { item } = props
  if (item.contentType.startsWith("image")) {
    return (
      <Flex flexDirection="column" m={2}>
        <Image src={item.downloadURL} width="75px" title={item.fileName} />
        <Link href={item.downloadURL}>
          <Serif size="2">{item.fileName}</Serif>
        </Link>
      </Flex>
    )
  } else if (item.contentType === "application/pdf") {
    return (
      <Box>
        <Link href={item.downloadURL}>{item.fileName}</Link>
      </Box>
    )
  } else {
    return null
  }
}
interface MessageProps extends Omit<BoxProps, "color"> {
  message: Message_message
  initialMessage?: string
  isFirst: boolean
  showTimeSince?: boolean
}
const Message: React.FC<MessageProps> = props => {
  const { message, initialMessage, isFirst, showTimeSince, ...boxProps } = props
  const { isFromUser, body } = message
  const text = isFirst ? initialMessage : body
  // const createdAt = DateTime.fromISO(message.createdAt).toRelative()
  // <Sans size="2">
  //   From: {message.from.name} - {createdAt}
  // </Sans>
  // <Sans size="2">{isFirst ? initialMessage : message.body}</Sans>
  // {message.attachments && message.attachments.length > 0 && (
  //   <Serif size="3" mt={3}>
  //     Attachments
  //   </Serif>
  // )}
  // {message.attachments.map(a => (
  //   <Attachment item={a} key={a.id} />
  // ))}

  const bgColor = isFromUser ? "black100" : "black10"
  const textColor = isFromUser ? "white100" : "black100"
  const alignSelf = isFromUser ? "flex-end" : undefined
  return (
    <>
      <Box
        {...boxProps}
        bg={bgColor}
        p={1}
        style={{
          borderRadius: "15px",
          alignSelf,
        }}
        width="66.67%"
      >
        <Sans size="4" color={textColor}>
          {text}
        </Sans>
      </Box>
      {showTimeSince && (
        <TimeSince time={message.createdAt} style={{ alignSelf }} mt={0.5} />
      )}
      <Spacer mb={showTimeSince ? 1 : 0.5} />
    </>
  )
}

export const MessageFragmentContainer = createFragmentContainer(Message, {
  message: graphql`
    fragment Message_message on Message {
      internalID
      body
      createdAt
      isFromUser
      from {
        name
        email
      }
      attachments {
        id
        internalID
        contentType
        fileName
        downloadURL
      }
    }
  `,
})
