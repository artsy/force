import {
  ART_ASSISTANT_SUPPORTED_SECTIONS,
  type ArtAssistantMessage,
} from "Apps/ArtAssistant/types"
import type { AIAgentMessageInput } from "__generated__/useArtAssistantConversationSubscription.graphql"

export const MAX_HISTORY_MESSAGES = 40
export const MAX_INPUT_BYTES = 100_000

const bytes = (text: string): number => new TextEncoder().encode(text).length

const entryBytes = (entry: AIAgentMessageInput): number => {
  return (
    bytes(entry.content) +
    (entry.displayedSections ?? []).reduce((total, section) => {
      return (
        total +
        bytes(section.entityType) +
        section.internalIDs.reduce((sum, id) => sum + bytes(id), 0)
      )
    }, 0)
  )
}

export const toArtAssistantHistory = ({
  messages,
  prompt,
}: {
  messages: ArtAssistantMessage[]
  prompt: string
}): AIAgentMessageInput[] => {
  // Drop failed exchanges together, so a failed prompt cannot become an unanswered turn.
  const history = messages.flatMap<AIAgentMessageInput>((message, index) => {
    const answer = messages[index + 1]
    if (
      message.role !== "user" ||
      answer?.role !== "assistant" ||
      answer.phase !== "complete"
    )
      return []
    return [
      { role: "USER", content: message.text },
      {
        role: "ASSISTANT",
        content: answer.text,
        displayedSections: answer.sections?.map(section => ({
          entityType: section.type === "artworks" ? "ARTWORK" : "ARTIST",
          internalIDs: section.ids,
        })),
      },
    ]
  })

  if (history.length > MAX_HISTORY_MESSAGES)
    throw new Error("Conversation history is too long")

  const fixedBytes =
    bytes(prompt) +
    ART_ASSISTANT_SUPPORTED_SECTIONS.reduce((sum, type) => sum + bytes(type), 0)
  if (
    fixedBytes + history.reduce((sum, entry) => sum + entryBytes(entry), 0) >
    MAX_INPUT_BYTES
  )
    throw new Error("Conversation input is too large")
  return history
}
