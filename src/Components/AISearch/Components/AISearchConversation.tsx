import { Box, Stack } from "@artsy/palette"
import { AISearchEmptyState } from "Components/AISearch/Components/AISearchEmptyState"
import { AISearchMessage } from "Components/AISearch/Components/AISearchMessage"
import type { AISearchMessage as AISearchMessageType } from "Components/AISearch/Hooks/useAISearchConversation"
import { type FC, useEffect, useRef } from "react"

interface AISearchConversationProps {
  messages: AISearchMessageType[]
  onSuggestionClick: (suggestion: string) => void
}

export const AISearchConversation: FC<AISearchConversationProps> = ({
  messages,
  onSuggestionClick,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const messageCount = messages.length
  const lastMessage = messages[messageCount - 1]
  const lastPhase = lastMessage?.role === "ASSISTANT" ? lastMessage.phase : null
  const lastTextLength =
    lastMessage?.role === "ASSISTANT" ? lastMessage.text.length : 0

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to the bottom whenever a message is added, text streams in, or a response resolves
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      // Smooth scrolling on every streamed token reads as a stutter, so only
      // animate the jump for a new message or a settled response.
      behavior: lastPhase === "STREAMING" ? "auto" : "smooth",
      block: "end",
    })
  }, [messageCount, lastPhase, lastTextLength])

  if (messages.length === 0) {
    return <AISearchEmptyState onSuggestionClick={onSuggestionClick} />
  }

  return (
    <Stack gap={6}>
      {messages.map(message => {
        return <AISearchMessage key={message.id} message={message} />
      })}

      <Box ref={bottomRef} />
    </Stack>
  )
}
