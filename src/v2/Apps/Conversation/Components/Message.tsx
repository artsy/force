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

const AttachmentLink = styled.a`
  width: min-content;
  text-decoration: none;
  max-width: 66.67%;
`

const AttachmentContainer = styled(Flex)<
  FlexProps & AlignSelfProps & BackgroundProps
>`
  ${alignSelf};
  ${background};
  border-radius: 15px;
  white-space: no-wrap;
  width: min-content;
  justify-content: space-between;
`

interface AttachmentProps {
  attachment: Message_message["attachments"][0]
  alignSelf: string
  bgColor: Color
  textColor: Color
}

export const Attachment: React.FC<AttachmentProps> = props => {
  const { attachment, alignSelf, bgColor, textColor } = props

  return (
    <AttachmentLink href={attachment.downloadURL} target="_blank">
      <AttachmentContainer
        p={1}
        mt={0.5}
        alignSelf={alignSelf}
        background={color(bgColor)}
      >
        {attachment.contentType.startsWith("image") ? (
          <Image src={attachment.downloadURL} />
        ) : (
          <>
            <Sans color={textColor} weight="medium" size="4" mr={2}>
              {attachment.fileName}
            </Sans>
            <DownloadIcon width="24px" height="24px" />
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
const Message: React.FC<MessageProps> = props => {
  const { message, initialMessage, isFirst, showTimeSince, ...boxProps } = props
  const { isFromUser, body } = message
  const text = isFirst ? initialMessage : body
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
        maxWidth="66.67%"
      >
        <Sans size="4" color={textColor}>
          {text}
        </Sans>
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
