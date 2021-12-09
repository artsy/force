import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import linkifyHtml from "linkify-html"
import {
  Box,
  BoxProps,
  Color,
  DownloadIcon,
  Flex,
  FlexProps,
  Image,
  Text,
} from "@artsy/palette"
import styled from "styled-components"
import {
  AlignSelfProps,
  BackgroundProps,
  alignSelf,
  background,
  color,
} from "styled-system"

import { TimeSince } from "./TimeSince"

import { Message_message } from "v2/__generated__/Message_message.graphql"

const AttachmentLink = styled.a<{ isImage: boolean } & AlignSelfProps>`
  ${alignSelf};
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

const MessageText = styled(Text)`
  word-break: break-word;
  white-space: pre-line;
  && {
    a:hover {
      color: currentcolor;
    }
  }
`

interface AttachmentProps {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
      alignSelf={alignSelf}
    >
      <AttachmentContainer
        p={1}
        mt={0.5}
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
            <Text color={textColor} variant="md" mr={2}>
              {attachment.fileName}
            </Text>
            <Box flexShrink={0}>
              <DownloadIcon
                fill={textColor}
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              />
            </Box>
          </>
        )}
      </AttachmentContainer>
    </AttachmentLink>
  )
}
interface MessageProps extends Omit<BoxProps, "color"> {
  message: Message_message
  showTimeSince?: boolean
}
export const Message: React.FC<MessageProps> = props => {
  const { message, showTimeSince, ...boxProps } = props
  const { isFromUser, body } = message
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
        width="fit-content"
      >
        <MessageText
          variant="md"
          color={textColor}
          dangerouslySetInnerHTML={{
            __html: linkifyHtml(body!, { target: "_blank" }),
          }}
        />
      </Box>
      {!!message?.attachments?.length &&
        message?.attachments?.map(attachment => {
          return (
            <Attachment
              key={attachment?.id}
              attachment={attachment}
              alignSelf={alignSelf ?? ""}
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
      __typename
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
