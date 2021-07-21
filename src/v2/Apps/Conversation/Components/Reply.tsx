import {
  Button,
  Dialog,
  Flex,
  FlexProps,
  color,
  media,
  space,
  themeProps,
  Separator,
} from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import React, { useRef, useState } from "react"
import { Environment, RelayRefetchProp } from "react-relay"
import styled from "styled-components"
import { SendConversationMessage } from "../Mutation/SendConversationMessage"
import { useTracking } from "v2/System/Analytics"
import {
  focusedOnConversationMessageInput,
  sentConversationMessage,
} from "@artsy/cohesion"
import { RightProps } from "styled-system"
import { ConversationCTAFragmentContainer } from "./ConversationCTA"

export const ShadowSeparator = styled(Separator)`
  box-shadow: 0 -1px 1px rgba(50, 50, 50, 0.1);
  width: 100%;
  height: 0;
`

const StyledFlex = styled(Flex)<FlexProps & RightProps>`
  border-top: 1px solid ${color("black10")};
  background: white;
`

const FullWidthFlex = styled(Flex)<{ height?: string }>`
  div {
    width: 100%;
    height: ${({ height }) => height};
    min-height: 40px;
  }
`

const StyledTextArea = styled.textarea<{ height?: string }>`
  border: none;
  width: 100%;
  height: ${({ height }) => height};
  max-height: calc(60vh - 145px);
  resize: none;
  min-height: 40px;
  font-size: 16px;
  font-family: ${themeProps.fontFamily.sans.regular as string};
  padding-top: ${space(0.5)}px;
  padding-left: ${space(1)}px;
  padding-right: ${space(1)}px;
  ${media.xs`
    max-height: calc(60vh - 115px);
  `};
`

interface ReplyProps {
  conversation: Conversation_conversation
  environment: Environment
  onScroll: () => void
  onMount: () => void
  refetch: RelayRefetchProp["refetch"]
  openInquiryModal: () => void
  openOrderModal: () => void
}

export const Reply: React.FC<ReplyProps> = props => {
  const {
    environment,
    conversation,
    onScroll,
    onMount,
    openInquiryModal,
    openOrderModal,
  } = props
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const textArea = useRef()
  const { trackEvent } = useTracking()

  const setupAndSendMessage = (onScroll = null) => {
    {
      setLoading(true)
      return SendConversationMessage(
        environment,
        conversation,
        // @ts-ignore
        textArea?.current?.value,
        response => {
          // @ts-ignore
          textArea.current.value = ""
          // @ts-ignore
          textArea.current.style.height = "inherit"
          setLoading(false)
          setButtonDisabled(true)
          if (onScroll) {
            // @ts-expect-error STRICT_NULL_CHECK
            onScroll()
          }
          const {
            internalID,
          } = response?.sendConversationMessage?.messageEdge?.node

          trackEvent(
            sentConversationMessage({
              // @ts-expect-error STRICT_NULL_CHECK
              impulseConversationId: conversation.internalID,
              impulseMessageId: internalID,
            })
          )
          props.refetch({ conversationID: conversation.internalID }, {})
        },
        _error => {
          setLoading(false)
          setShowModal(true)
        }
      )
    }
  }

  return (
    <>
      <Dialog
        show={showModal}
        title="We couldn’t deliver your message."
        detail="Sorry, something went wrong while sending your message. Try and resend the message or discard it."
        primaryCta={{
          action: () => {
            setShowModal(false)
            setupAndSendMessage()
          },
          text: "Retry",
        }}
        secondaryCta={{
          action: () => setShowModal(false),
          text: "Discard message",
        }}
      />
      <Flex zIndex={[null, 2]} flexDirection="column" background="white">
        <ShadowSeparator />
        <ConversationCTAFragmentContainer
          conversation={conversation}
          openInquiryModal={() => openInquiryModal()}
          openOrderModal={() => openOrderModal()}
          onMount={onMount}
        />
        <StyledFlex p={1}>
          <FullWidthFlex width="100%">
            <StyledTextArea
              onInput={event => {
                const field = event.target as HTMLTextAreaElement
                field.style.height = "inherit"
                if (buttonDisabled && field.value.length > 2) {
                  setButtonDisabled(false)
                }
                if (!buttonDisabled && field.value.length <= 2) {
                  setButtonDisabled(true)
                }
                const height = field.scrollHeight
                field.style.height = height + "px"
              }}
              onFocus={() => {
                trackEvent(
                  focusedOnConversationMessageInput({
                    // @ts-expect-error STRICT_NULL_CHECK
                    impulseConversationId: conversation.internalID,
                  })
                )
              }}
              placeholder="Type your message"
              // @ts-expect-error STRICT_NULL_CHECK
              ref={textArea}
            />
          </FullWidthFlex>
          <Flex alignItems="flex-end" height="100%">
            <Button
              ml={1}
              disabled={buttonDisabled}
              loading={loading}
              onClick={_event => {
                // @ts-expect-error STRICT_NULL_CHECK
                setupAndSendMessage(onScroll)
              }}
            >
              Send
            </Button>
          </Flex>
        </StyledFlex>
      </Flex>
    </>
  )
}
