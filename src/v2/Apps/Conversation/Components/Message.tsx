import {
  Box,
  BoxProps,
  Color,
  DownloadIcon,
  Flex,
  FlexProps,
  Image,
  Sans,
  color,
} from "@artsy/palette"
import { Message_message } from "v2/__generated__/Message_message.graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { TimeSince } from "./TimeSince"
import styled from "styled-components"
import {
  AlignSelfProps,
  BackgroundProps,
  alignSelf,
  background,
} from "styled-system"
import Linkify from "react-linkify"

const AttachmentLink = styled.a<{ isImage: boolean }>`
  text-decoration: none;
  max-width: 66.67%;
  width: ${({ isImage }) => (isImage ? "100%" : "min-content")};
`

const AttachmentContainer = styled(Flex)<
  FlexProps & AlignSelfProps & BackgroundProps
>`
  ${alignSelf};
  ${background};
  border-radius: 15px;
  white-space: no-wrap;
  justify-content: space-between;
`

const MessageText = styled(Sans)`
  word-break: break-word;
  white-space: pre-line;
  && {
    a:hover {
      color: currentcolor;
    }
  }
`

interface AttachmentProps {
  attachment: Message_message["attachments"][0]
  alignSelf: string
  bgColor: Color
  textColor: Color
}

export const Attachment: React.FC<AttachmentProps> = props => {
  const { attachment, alignSelf, bgColor, textColor } = props
  const isImage = attachment.contentType.startsWith("image")

  return (
    <AttachmentLink
      href={attachment.downloadURL}
      target="_blank"
      isImage={isImage}
    >
      <AttachmentContainer
        p={1}
        mt={0.5}
        alignSelf={alignSelf}
        background={color(bgColor)}
        width={isImage ? "100%" : "min-content"}
      >
        {isImage ? (
          <Image
            src={attachment.downloadURL}
            alt={attachment.fileName}
            width="100%"
            height="100%"
          />
        ) : (
          <>
            <Sans color={textColor} weight="medium" size="4" mr={2}>
              {attachment.fileName}
            </Sans>
            <Box flexShrink={0}>
              <DownloadIcon width="24px" height="24px" viewBox="0 0 24 24" />
            </Box>
          </>
        )}
      </AttachmentContainer>
    </AttachmentLink>
  )
}
interface MessageProps extends Omit<BoxProps, "color"> {
  message: Message_message
  initialMessage?: string
  isFirst: boolean
  showTimeSince?: boolean
}
export const Message: React.FC<MessageProps> = props => {
  const { message, initialMessage, isFirst, showTimeSince, ...boxProps } = props
  const { isFromUser, body } = message
  const text = isFirst ? initialMessage : body
  const bgColor = isFromUser ? "black100" : "black10"
  const textColor = isFromUser ? "white100" : "black100"
  const alignSelf = isFromUser ? "flex-end" : undefined

  // react-linkify v1.0.0-alpha has a bug that `properties` doesn't work.
  // This is a workaround to specify target for now.
  // https://github.com/tasti/react-linkify/issues/78#issuecomment-514754050
  const linkTargetDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank">
      {text}
    </a>
  )

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
        maxWidth="66.67%"
        width="fit-content"
      >
        <MessageText size="4" color={textColor}>
          <Linkify componentDecorator={linkTargetDecorator}>{text}</Linkify>
        </MessageText>
      </Box>
      {message.attachments.length > 0 &&
        message.attachments.map(attachment => {
          return (
            <Attachment
              key={attachment.id}
              attachment={attachment}
              alignSelf={alignSelf}
              textColor={textColor}
              bgColor={bgColor}
            />
          )
        })}
      {showTimeSince && (
        <TimeSince time={message.createdAt} style={{ alignSelf }} mt={0.5} />
      )}
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
        contentType
        fileName
        downloadURL
      }
    }
  `,
})
