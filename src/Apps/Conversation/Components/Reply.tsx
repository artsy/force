import { RelayRefetchProp } from "react-relay"
import { useRef, useState } from "react"
import * as React from "react"
import {
  Button,
  Flex,
  FlexProps,
  media,
  ModalDialog,
  Text,
  THEME,
} from "@artsy/palette"
import {
  focusedOnConversationMessageInput,
  sentConversationMessage,
} from "@artsy/cohesion"
import styled from "styled-components"
import { RightProps } from "styled-system"
import { themeGet } from "@styled-system/theme-get"
import { useTracking } from "react-tracking"
import { ConversationCTAFragmentContainer } from "./ConversationCTA"
import { SendConversationMessage } from "Apps/Conversation/Mutation/SendConversationMessage"
import { Conversation_conversation$data } from "__generated__/Conversation_conversation.graphql"
import { Environment } from "react-relay"

const StyledFlex = styled(Flex)<FlexProps & RightProps>`
  border-top: 1px solid ${themeGet("colors.black10")};
  background: ${themeGet("colors.white100")};
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
  font-family: ${THEME.fonts.sans};
  padding-top: ${themeGet("space.0.5")}px;
  padding-left: ${themeGet("space.1")}px;
  padding-right: ${themeGet("space.1")}px;
  ${media.xs`
    max-height: calc(60vh - 115px);
  `};
`

interface ReplyProps {
  conversation: Conversation_conversation$data
  environment: Environment
  onScroll: () => void
  refetch: RelayRefetchProp["refetch"]

  openInquiryModal: ({ createsOfferOrder }) => void
  openOrderModal: () => void
}

export const Reply: React.FC<ReplyProps> = props => {
  const {
    environment,
    conversation,
    onScroll,
    openInquiryModal,
    openOrderModal,
  } = props
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const textArea = useRef()
  const { trackEvent } = useTracking()

  const setupAndSendMessage = (onScroll: Function | null = null) => {
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

          if (onScroll instanceof Function) {
            onScroll()
          }

          const {
            internalID,
          } = response?.sendConversationMessage?.messageEdge?.node

          trackEvent(
            sentConversationMessage({
              impulseConversationId: conversation?.internalID ?? "",
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
      {showModal && (
        <ModalDialog
          title="We couldn’t deliver your message."
          onClose={() => setShowModal(false)}
          footer={
            <Flex gap={1}>
              <Button
                flex={1}
                variant="secondaryBlack"
                onClick={() => {
                  setShowModal(false)
                }}
              >
                Discard message
              </Button>

              <Button
                flex={1}
                variant="primaryBlack"
                onClick={() => {
                  setShowModal(false)
                  setupAndSendMessage()
                }}
              >
                Retry
              </Button>
            </Flex>
          }
        >
          <Text variant="sm" color="black60">
            Sorry, something went wrong while sending your message. Try and
            resend the message or discard it.
          </Text>
        </ModalDialog>
      )}

      <Flex zIndex={[null, 2]} flexDirection="column" background="white">
        <ConversationCTAFragmentContainer
          conversation={conversation}
          openInquiryModal={({ createsOfferOrder }) =>
            openInquiryModal({ createsOfferOrder })
          }
          openOrderModal={() => openOrderModal()}
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
                    impulseConversationId: conversation?.internalID ?? "",
                  })
                )
              }}
              placeholder="Type your message"
              ref={textArea as any}
            />
          </FullWidthFlex>
          <Flex alignItems="flex-end" height="100%">
            <Button
              ml={1}
              disabled={buttonDisabled}
              loading={loading}
              onClick={_event => {
                // @ts-ignore
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
