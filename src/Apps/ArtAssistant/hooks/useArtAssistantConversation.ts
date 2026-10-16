import { useToasts } from "@artsy/palette"
import {
  ART_ASSISTANT_ERROR,
  ART_ASSISTANT_SUPPORTED_SECTIONS,
  type ArtAssistantMessage,
  type ArtAssistantSection,
} from "Apps/ArtAssistant/types"
import { toArtAssistantHistory } from "Apps/ArtAssistant/utils/artAssistantHistory"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type {
  useArtAssistantConversationSubscription,
  useArtAssistantConversationSubscription$data,
} from "__generated__/useArtAssistantConversationSubscription.graphql"
import { useCallback, useEffect, useRef, useState } from "react"
import { graphql, requestSubscription } from "react-relay"
import { v4 as uuid } from "uuid"

type AgentEvent = NonNullable<
  useArtAssistantConversationSubscription$data["aiAgentTurn"]
>
type AssistantMessage = Extract<ArtAssistantMessage, { role: "assistant" }>

export const ART_ASSISTANT_IDLE_TIMEOUT_MS = 120_000
const ACTIVITY_COPY: Record<string, string> = {
  THINKING: "Thinking…",
  SEARCHING_ARTWORKS: "Searching artworks…",
  SEARCHING_ARTISTS: "Searching artists…",
  SEARCHING_SHOWS: "Searching shows…",
  SEARCHING_FAIRS: "Searching fairs…",
  FINDING_RECOMMENDATIONS: "Finding recommendations…",
  LOADING_ARTWORK_DETAILS: "Loading artwork details…",
  SEARCHING_ARTSY: "Searching Artsy…",
}

export const reduceArtAssistantEvent = ({
  message,
  event,
}: {
  message: AssistantMessage
  event: AgentEvent
}): AssistantMessage => {
  if (event.__typename === "AIAgentToolCall") {
    return {
      ...message,
      activity: ACTIVITY_COPY[event.activity] ?? ACTIVITY_COPY.THINKING,
    }
  }
  if (event.__typename !== "AIAgentTurnComplete") return message
  if (!event.message?.trim())
    return {
      ...message,
      phase: "error",
      text: ART_ASSISTANT_ERROR,
      activity: undefined,
    }

  const sections = (event.sections ?? [])
    .flatMap<ArtAssistantSection>(section => {
      if (section.__typename === "AIAgentArtworksSection")
        return [
          {
            type: "artworks",
            ids: section.artworks.map(artwork => artwork.internalID),
          },
        ]
      if (section.__typename === "AIAgentArtistsSection")
        return [
          {
            type: "artists",
            ids: section.artists.map(artist => artist.internalID),
          },
        ]
      return []
    })
    .filter(section => section.ids.length > 0)
  if (!event.sections?.length && event.artworks?.length) {
    sections.push({
      type: "artworks",
      ids: event.artworks.map(artwork => artwork.internalID),
    })
  }
  return {
    ...message,
    phase: "complete",
    text: event.message,
    activity: undefined,
    sections,
    suggestedReplies: (event.suggestedReplies ?? []).map(reply => reply.text),
  }
}

export const useArtAssistantConversation = () => {
  const { user, relayEnvironment } = useSystemContext()
  const { sendToast } = useToasts()
  const [messages, setMessages] = useState<ArtAssistantMessage[]>([])
  const [isResponding, setIsResponding] = useState(false)
  const [conversationID, setConversationID] = useState<string>(() => uuid())
  const messagesRef = useRef(messages)
  const conversationIDRef = useRef(conversationID)
  const activeTurn = useRef<{ cancel: () => void } | null>(null)

  const replaceMessages = useCallback((next: ArtAssistantMessage[]) => {
    messagesRef.current = next
    setMessages(next)
  }, [])

  const abort = useCallback(() => {
    activeTurn.current?.cancel()
    activeTurn.current = null
  }, [])

  const loadConversation = useCallback(
    ({
      id,
      messages: nextMessages,
    }: {
      id: string
      messages: ArtAssistantMessage[]
    }) => {
      abort()
      conversationIDRef.current = id
      setConversationID(id)
      replaceMessages(nextMessages)
      setIsResponding(false)
    },
    [abort, replaceMessages],
  )

  const startNewConversation = useCallback(() => {
    loadConversation({ id: uuid(), messages: [] })
  }, [loadConversation])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset and dispose when the authenticated identity changes.
  useEffect(() => {
    startNewConversation()
    return abort
  }, [user?.id, user?.accessToken, abort, startNewConversation])

  const submit = useCallback(
    (prompt: string): boolean => {
      const text = prompt.trim()
      if (!text || activeTurn.current || !user?.id || !user?.accessToken)
        return false

      let history: ReturnType<typeof toArtAssistantHistory>
      try {
        history = toArtAssistantHistory({
          messages: messagesRef.current,
          prompt: text,
        })
      } catch (error) {
        sendToast({
          variant: "error",
          message: error instanceof Error ? error.message : ART_ASSISTANT_ERROR,
        })
        return false
      }

      let message: AssistantMessage = {
        id: uuid(),
        role: "assistant",
        text: "",
        phase: "responding",
        activity: ACTIVITY_COPY.THINKING,
      }
      const userMessage: ArtAssistantMessage = {
        id: uuid(),
        role: "user",
        text,
      }
      replaceMessages([...messagesRef.current, userMessage, message])
      setIsResponding(true)

      let isFinished = false
      let subscription: ReturnType<typeof requestSubscription> | undefined
      let timer: ReturnType<typeof setTimeout> | undefined
      const turn = {
        cancel: () => {
          isFinished = true
          if (timer) clearTimeout(timer)
          subscription?.dispose()
        },
      }
      activeTurn.current = turn

      const update = (next: AssistantMessage) => {
        if (isFinished || next === message) return
        message = next
        replaceMessages(
          messagesRef.current.map(candidate =>
            candidate.id === message.id ? message : candidate,
          ),
        )
      }
      const finish = () => {
        if (isFinished) return
        turn.cancel()
        if (activeTurn.current === turn) activeTurn.current = null
        setIsResponding(false)
      }
      const fail = (error: unknown) => {
        if (isFinished) return
        console.error("Art Assistant turn failed", error)
        update({
          ...message,
          phase: "error",
          text: ART_ASSISTANT_ERROR,
          activity: undefined,
        })
        sendToast({ variant: "error", message: ART_ASSISTANT_ERROR })
        finish()
      }
      const restartTimeout = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(
          () => fail(new Error("Agent stream idle timeout")),
          ART_ASSISTANT_IDLE_TIMEOUT_MS,
        )
      }

      try {
        subscription =
          requestSubscription<useArtAssistantConversationSubscription>(
            relayEnvironment,
            {
              subscription: graphql`
                subscription useArtAssistantConversationSubscription(
                  $input: AIAgentTurnInput!
                ) {
                  aiAgentTurn(input: $input) {
                    __typename
                    ... on AIAgentToolCall {
                      activity
                    }
                    ... on AIAgentTurnComplete {
                      message
                      stopReason
                      toolCallCount
                      sections {
                        __typename
                        ... on AIAgentArtworksSection {
                          artworks {
                            internalID
                          }
                        }
                        ... on AIAgentArtistsSection {
                          artists {
                            internalID
                          }
                        }
                      }
                      artworks {
                        internalID
                      }
                      suggestedReplies {
                        text
                      }
                    }
                  }
                }
              `,
              variables: {
                input: {
                  conversationID: conversationIDRef.current,
                  message: text,
                  history,
                  supportedSections: [...ART_ASSISTANT_SUPPORTED_SECTIONS],
                },
              },
              onNext: data => {
                if (isFinished) return
                restartTimeout()
                const event = data?.aiAgentTurn
                if (!event) return
                update(reduceArtAssistantEvent({ message, event }))
                if (event.__typename === "AIAgentTurnComplete") {
                  if (message.phase === "error") {
                    fail(new Error("Agent stopped without an answer"))
                    return
                  }
                  finish()
                }
              },
              onError: fail,
              onCompleted: () => {
                if (!isFinished)
                  fail(new Error("Agent stream ended without an answer"))
              },
            },
          )
        if (isFinished) subscription.dispose()
        else restartTimeout()
      } catch (error) {
        fail(error)
      }
      return true
    },
    [relayEnvironment, replaceMessages, sendToast, user?.id, user?.accessToken],
  )

  return {
    messages,
    isResponding,
    conversationID,
    submit,
    startNewConversation,
    loadConversation,
  }
}
