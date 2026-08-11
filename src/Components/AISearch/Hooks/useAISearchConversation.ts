import {
  type StoredAISearchConversation,
  type StoredAISearchMessage,
  buildConversationTitle,
  deleteAISearchConversation,
  readAISearchConversations,
  writeAISearchConversation,
} from "Components/AISearch/Utils/aiSearchStorage"
import type {
  AIAgentEvent,
  AISearchArtworkFilters,
  AISearchHistoryEntry,
} from "Components/AISearch/Utils/aiSearchTypes"
import { streamAIAgentTurn } from "Components/AISearch/Utils/streamAIAgentTurn"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useCallback, useEffect, useRef, useState } from "react"

const DEFAULT_STATUS = "Querying Artsy…"

const STOP_REASON_MESSAGES: Record<string, string> = {
  aborted: "That took too long, so I stopped. Try narrowing the request.",
  error: "Something went wrong on my end. Try again?",
  max_iterations:
    "I ran out of steps before I could answer. Try a narrower request.",
}

export interface AISearchUserMessage {
  id: string
  role: "USER"
  text: string
}

export interface AISearchAssistantMessage {
  id: string
  role: "ASSISTANT"
  /** The agent's prose, accumulated from text deltas */
  text: string
  /** One row per tool call, rendered as the "thinking" checklist */
  statuses: string[]
  phase: "THINKING" | "STREAMING" | "RESULT" | "ERROR"
  artworkIDs: string[]
  artistIDs: string[]
  artworkFilters: AISearchArtworkFilters | null
  errorMessage?: string
}

export type AISearchMessage = AISearchUserMessage | AISearchAssistantMessage

const toStoredMessage = (message: AISearchMessage): StoredAISearchMessage => {
  if (message.role === "USER") {
    return { id: message.id, role: "USER", text: message.text }
  }

  return {
    id: message.id,
    role: "ASSISTANT",
    text: message.text,
    statuses: message.statuses,
    artworkIDs: message.artworkIDs,
    artistIDs: message.artistIDs,
    artworkFilters: message.artworkFilters,
  }
}

const fromStoredMessage = (message: StoredAISearchMessage): AISearchMessage => {
  if (message.role === "USER") {
    return { id: message.id, role: "USER", text: message.text }
  }

  return {
    id: message.id,
    role: "ASSISTANT",
    text: message.text,
    statuses: message.statuses ?? [],
    phase: "RESULT",
    artworkIDs: message.artworkIDs ?? [],
    artistIDs: message.artistIDs ?? [],
    artworkFilters: message.artworkFilters ?? null,
  }
}

/** Errored turns are omitted: replaying them would just confuse the agent. */
const toHistory = (messages: AISearchMessage[]): AISearchHistoryEntry[] => {
  return messages.reduce<AISearchHistoryEntry[]>((acc, message) => {
    if (message.role === "USER") {
      return [...acc, { role: "USER", content: message.text }]
    }

    if (message.phase !== "RESULT" || !message.text) {
      return acc
    }

    return [...acc, { role: "ASSISTANT", content: message.text }]
  }, [])
}

export const useAISearchConversation = () => {
  const { user } = useSystemContext()

  const [messages, setMessages] = useState<AISearchMessage[]>([])
  const [isResponding, setIsResponding] = useState(false)
  const [conversations, setConversations] = useState<
    StoredAISearchConversation[]
  >([])
  const [conversationID, setConversationID] = useState<string | null>(null)

  const abortRef = useRef<AbortController | null>(null)

  // localStorage is unavailable during SSR, so hydrate after mount.
  useEffect(() => {
    setConversations(readAISearchConversations())
  }, [])

  const abort = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
  }, [])

  useEffect(() => {
    return () => {
      abort()
    }
  }, [abort])

  const persist = useCallback((id: string, nextMessages: AISearchMessage[]) => {
    const firstUserMessage = nextMessages.find(message => {
      return message.role === "USER"
    })

    if (!firstUserMessage) {
      return
    }

    setConversations(
      writeAISearchConversation({
        id,
        title: buildConversationTitle(firstUserMessage.text),
        updatedAt: new Date().toISOString(),
        messages: nextMessages.map(toStoredMessage),
      }),
    )
  }, [])

  const submit = useCallback(
    async (text: string) => {
      const trimmed = text.trim()

      if (!trimmed || isResponding) {
        return
      }

      if (!user?.id || !user?.accessToken) {
        return
      }

      const turnConversationID = conversationID ?? crypto.randomUUID()
      setConversationID(turnConversationID)

      const history = toHistory(messages)
      const assistantId = crypto.randomUUID()

      // Tracked outside of state as well: the stream reducer needs the latest
      // value synchronously, and the `finally` block needs it to persist.
      let assistant: AISearchAssistantMessage = {
        id: assistantId,
        role: "ASSISTANT",
        text: "",
        statuses: [],
        phase: "THINKING",
        artworkIDs: [],
        artistIDs: [],
        artworkFilters: null,
      }

      const priorMessages = messages
      const userMessage: AISearchUserMessage = {
        id: crypto.randomUUID(),
        role: "USER",
        text: trimmed,
      }

      setIsResponding(true)
      setMessages([...priorMessages, userMessage, assistant])

      const update = (patch: Partial<AISearchAssistantMessage>) => {
        assistant = { ...assistant, ...patch }

        setMessages(prevMessages => {
          return prevMessages.map(message => {
            return message.id === assistantId ? assistant : message
          })
        })
      }

      const handleEvent = (event: AIAgentEvent) => {
        switch (event.__typename) {
          case "AIAgentToolCall": {
            const status = event.summary ?? DEFAULT_STATUS
            const lastStatus = assistant.statuses[assistant.statuses.length - 1]

            // The agent calls `query_artsy` repeatedly, often with an
            // identical summary — don't stutter the checklist.
            if (status === lastStatus) {
              return
            }

            update({ statuses: [...assistant.statuses, status] })
            return
          }

          case "AIAgentToolResult": {
            // `summary` on a failed result is the raw GraphQL error text the
            // agent's own query produced ("Field \"priceMin\" of type
            // \"Money\" must have a selection of subfields…"). That's for us,
            // not the user: the retry surfaces as the next tool call anyway.
            if (!event.ok) {
              console.log(`[Debug] ${event.toolName} failed: ${event.summary}`)
            }

            return
          }

          case "AIAgentTextDelta": {
            update({
              text: assistant.text + event.text,
              phase: "STREAMING",
            })
            return
          }

          case "AIAgentTurnComplete": {
            const artworkIDs = (event.artworks ?? []).map(artwork => {
              return artwork.internalID
            })
            const artistIDs = (event.artists ?? []).map(artist => {
              return artist.internalID
            })

            console.log("[Debug] turn complete", {
              stopReason: event.stopReason,
              toolCallCount: event.toolCallCount,
              artworkCount: artworkIDs.length,
              artworkIDs,
              artistCount: artistIDs.length,
              artistIDs,
              artworkFilters: event.artworkFilters,
            })

            const message = event.message ?? assistant.text

            if (!message) {
              update({
                phase: "ERROR",
                errorMessage:
                  STOP_REASON_MESSAGES[event.stopReason] ??
                  STOP_REASON_MESSAGES.error,
              })
              return
            }

            update({
              text: message,
              phase: "RESULT",
              artworkIDs,
              artistIDs,
              artworkFilters: event.artworkFilters ?? null,
            })
            return
          }
        }
      }

      abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        await streamAIAgentTurn({
          conversationID: turnConversationID,
          message: trimmed,
          history,
          userID: user.id,
          accessToken: user.accessToken,
          signal: controller.signal,
          onEvent: handleEvent,
        })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        console.error("[AISearch] turn failed", error)

        update({
          phase: "ERROR",
          errorMessage:
            error instanceof Error && error.message
              ? error.message
              : STOP_REASON_MESSAGES.error,
        })
      } finally {
        if (!controller.signal.aborted) {
          // The stream ended without a terminal AIAgentTurnComplete (dropped
          // connection, server restart). Settle the turn so the shimmer stops.
          if (
            assistant.phase === "THINKING" ||
            assistant.phase === "STREAMING"
          ) {
            update(
              assistant.text
                ? { phase: "RESULT" }
                : {
                    phase: "ERROR",
                    errorMessage: STOP_REASON_MESSAGES.error,
                  },
            )
          }

          setIsResponding(false)
          persist(turnConversationID, [
            ...priorMessages,
            userMessage,
            assistant,
          ])
        }

        if (abortRef.current === controller) {
          abortRef.current = null
        }
      }
    },
    [abort, conversationID, isResponding, messages, persist, user],
  )

  const reset = useCallback(() => {
    abort()
    setIsResponding(false)
    setMessages([])
    setConversationID(null)
  }, [abort])

  const loadConversation = useCallback(
    (id: string) => {
      abort()
      setIsResponding(false)

      const conversation = readAISearchConversations().find(candidate => {
        return candidate.id === id
      })

      if (!conversation) {
        return
      }

      setConversationID(conversation.id)
      setMessages(conversation.messages.map(fromStoredMessage))
    },
    [abort],
  )

  const removeConversation = useCallback(
    (id: string) => {
      setConversations(deleteAISearchConversation(id))

      if (id === conversationID) {
        reset()
      }
    },
    [conversationID, reset],
  )

  return {
    conversationID,
    conversations,
    isResponding,
    loadConversation,
    messages,
    removeConversation,
    reset,
    submit,
  }
}
