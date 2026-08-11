import ArrowUpIcon from "@artsy/icons/ArrowUpIcon"
import { Box, Clickable, Flex } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { type FC, type KeyboardEvent, useState } from "react"
import styled from "styled-components"

interface AISearchComposerProps {
  value: string
  isDisabled: boolean
  onChange: (value: string) => void
  onSubmit: (value: string) => void
}

export const AISearchComposer: FC<AISearchComposerProps> = ({
  value,
  isDisabled,
  onChange,
  onSubmit,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const canSubmit = !isDisabled && value.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) {
      return
    }

    onSubmit(value)
    onChange("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter submits, Shift+Enter inserts a newline
    if (event.key !== "Enter" || event.shiftKey) {
      return
    }

    event.preventDefault()
    handleSubmit()
  }

  return (
    <Container $isFocused={isFocused}>
      <Flex alignItems="flex-end">
        <Box flex={1} minWidth={0}>
          <Composer
            rows={1}
            aria-label="Ask AI search"
            placeholder="Ask for anything — “a moody seascape under $5,000”"
            value={value}
            disabled={isDisabled}
            onChange={event => {
              onChange(event.currentTarget.value)
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true)
            }}
            onBlur={() => {
              setIsFocused(false)
            }}
          />
        </Box>

        <SubmitButton
          aria-label="Send message"
          disabled={!canSubmit}
          onClick={handleSubmit}
          ml={1}
        >
          <ArrowUpIcon fill="mono0" />
        </SubmitButton>
      </Flex>
    </Container>
  )
}

const Container = styled(Box)<{ $isFocused: boolean }>`
  border: 1px solid
    ${props => {
      return props.$isFocused
        ? themeGet("colors.mono100")(props)
        : themeGet("colors.mono10")(props)
    }};
  border-radius: 24px;
  padding: 8px 8px 8px 20px;
  transition: border-color 150ms;
`

const Composer = styled.textarea`
  display: block;
  width: 100%;
  max-height: 160px;
  padding: 6px 0;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-family: ${themeGet("fonts.sans")};
  font-size: 16px;
  line-height: 20px;
  color: ${themeGet("colors.mono100")};

  &::placeholder {
    color: ${themeGet("colors.mono60")};
  }

  &:disabled {
    cursor: default;
  }
`

const SubmitButton = styled(Clickable)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${themeGet("colors.mono100")};
  transition: opacity 150ms;

  &:disabled {
    opacity: 0.3;
  }
`
