import { Button, color, Flex, media, FlexProps } from "@artsy/palette"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"
import React, { useRef, useState } from "react"
import { Environment } from "react-relay"
import styled from "styled-components"
import { SendConversationMessage } from "../Mutation/SendConversationMessage"
import { right, RightProps } from "styled-system"

const StyledFlex = styled(Flex) <FlexProps & RightProps>`
  ${right};
  border-top: 1px solid ${color("black10")};
  position: fixed;
  background: white;
  bottom: 0;
  left: 375px;
  ${media.xs`
    width: 100%;
    left: 0;
  `}
`

const FullWidthFlex = styled(Flex) <{ height?: string }>`
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

  ${media.xs`
    max-height: calc(60vh - 115px);
  `};
`
const StyledButton = styled(Button)``

interface ReplyProps {
  conversation: Conversation_conversation
  environment: Environment
}

export const Reply: React.FC<ReplyProps> = props => {
  const { environment, conversation } = props
  const [bodyText, setBodyText] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const textArea = useRef()

  return (
    <StyledFlex p={1} right={[0, null, null, null, "376px"]}>
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
          placeholder="Type your message"
          ref={textArea}
          onChange={event => {
            setBodyText(event.target.value)
          }}
        />
      </FullWidthFlex>
      <Flex alignItems="flex-end">
        <StyledButton
          disabled={buttonDisabled}
          onClick={_event =>
            SendConversationMessage(
              environment,
              conversation,
              bodyText,
              _response => {
                setBodyText(null)
              },
              _error => {
                setBodyText(null)
              }
            )
          }
        >
          Send
        </StyledButton>
      </Flex>
    </StyledFlex>
  )
}
