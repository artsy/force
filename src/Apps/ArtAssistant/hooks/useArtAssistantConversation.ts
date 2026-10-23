import { captureException } from "@sentry/browser"
import {
  ART_ASSISTANT_SUPPORTED_SECTIONS,
  type ArtAssistantMessage,
  type ArtAssistantSection,
} from "Apps/ArtAssistant/types"
import { toArtAssistantHistory } from "Apps/ArtAssistant/utils/artAssistantHistory"
import {
  ART_ASSISTANT_ERRORS,
  artAssistantErrorKindForStopReason,
  artAssistantErrorKindForStreamError,
  type ArtAssistantErrorKind,
} from "Apps/ArtAssistant/utils/artAssistantErrors"
import { MetaphysicsSubscriptionError } from "System/Relay/metaphysicsSubscriptionError"
import { userIsAdmin } from "Utils/user"
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
  elapsedMs = 0,
}: {
  message: AssistantMessage
  event: AgentEvent
  elapsedMs?: number
}): AssistantMessage => {
  if (
    message.debug &&
    (event.__typename === "AIAgentToolCall" ||
      event.__typename === "AIAgentToolResult")
  ) {
    message = {
      ...message,
      debug: {
        ...message.debug,
        events: [
          ...message.debug.events,
          {
            type:
              event.__typename === "AIAgentToolCall"
                ? ("call" as const)
                : ("result" as const),
            toolName: event.toolName ?? "Unknown tool",
            summary: event.summary,
            detail: event.debugSummary,
            ok: event.__typename === "AIAgentToolResult" ? event.ok : undefined,
            elapsedMs,
          },
        ].slice(-100),
      },
    }
  }
  if (event.__typename === "AIAgentToolCall") {
    return {
      ...message,
      activity: ACTIVITY_COPY[event.activity] ?? ACTIVITY_COPY.THINKING,
    }
  }
  if (event.__typename !== "AIAgentTurnComplete") return message
  const debug = message.debug
    ? {
        ...message.debug,
        durationMs: elapsedMs,
        stopReason: event.stopReason,
        toolCallCount: event.toolCallCount,
      }
    : undefined
  if (!event.message?.trim()) {
    const error = artAssistantErrorKindForStopReason(event.stopReason)
    return {
      ...message,
      phase: "error",
      text: ART_ASSISTANT_ERRORS[error].message,
      error,
      activity: undefined,
      ...(debug ? { debug } : {}),
    }
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
    ...(debug ? { debug } : {}),
    suggestedReplies: (event.suggestedReplies ?? []).map(reply => reply.text),
  }
}

export const useArtAssistantConversation = ({
  isDebugEnabled = false,
}: { isDebugEnabled?: boolean } = {}) => {
  const { user, relayEnvironment } = useSystemContext()
  const shouldCaptureToolEvents = userIsAdmin(user)
  const shouldIncludeDebug = isDebugEnabled && shouldCaptureToolEvents
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
    ({ text: prompt }: { text: string }): boolean => {
      const text = prompt.trim()
      if (!text || activeTurn.current || !user?.id || !user?.accessToken)
        return false

      const startedAt = Date.now()
      const turnConversationID = conversationIDRef.current
      let message: AssistantMessage = {
        id: uuid(),
        role: "assistant",
        text: "",
        phase: "responding",
        activity: ACTIVITY_COPY.THINKING,
        ...(shouldCaptureToolEvents
          ? { debug: { events: [], hasRequestedDetails: shouldIncludeDebug } }
          : {}),
      }
      const userMessage: ArtAssistantMessage = {
        id: uuid(),
        role: "user",
        text,
      }
      let history: ReturnType<typeof toArtAssistantHistory>
      try {
        history = toArtAssistantHistory({
          messages: messagesRef.current,
          prompt: text,
        })
      } catch {
        replaceMessages([
          ...messagesRef.current,
          userMessage,
          {
            ...message,
            phase: "error",
            error: "conversation_limit",
            text: ART_ASSISTANT_ERRORS.conversation_limit.message,
            activity: undefined,
          },
        ])
        return true
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
      const fail = ({
        error,
        outcome = "stream_error",
        kind = artAssistantErrorKindForStreamError(error),
      }: {
        error?: unknown
        kind?: ArtAssistantErrorKind
        outcome?:
          | "stream_error"
          | "idle_timeout"
          | "stopped_without_answer"
          | "ended_without_answer"
      }) => {
        if (isFinished) return
        const errorStatus =
          error instanceof MetaphysicsSubscriptionError
            ? error.status
            : undefined
        console.error("Art Assistant turn failed", {
          outcome,
          status: errorStatus,
        })
        captureException(new Error(`Art Assistant turn: ${outcome}`), {
          tags: {
            artAssistantOutcome: outcome,
            ...(errorStatus ? { artAssistantStatus: String(errorStatus) } : {}),
          },
          extra: { conversationID: turnConversationID },
        })
        update({
          ...message,
          phase: "error",
          text: ART_ASSISTANT_ERRORS[kind].message,
          error: kind,
          activity: undefined,
          sections: undefined,
          suggestedReplies: undefined,
        })
        finish()
      }
      const restartTimeout = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(
          () =>
            fail({
              outcome: "idle_timeout",
              kind: "timeout",
            }),
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
                  $includeDebug: Boolean!
                  $includeToolMetadata: Boolean!
                ) {
                  aiAgentTurn(input: $input) {
                    __typename
                    ... on AIAgentToolCall {
                      activity
                      toolName @include(if: $includeToolMetadata)
                      summary @include(if: $includeToolMetadata)
                      debugSummary @include(if: $includeDebug)
                    }
                    ... on AIAgentToolResult {
                      ok
                      toolName @include(if: $includeToolMetadata)
                      summary @include(if: $includeToolMetadata)
                      debugSummary @include(if: $includeDebug)
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
                includeDebug: shouldIncludeDebug,
                includeToolMetadata: shouldCaptureToolEvents,
                input: {
                  conversationID: turnConversationID,
                  message: text,
                  history,
                  supportedSections: [...ART_ASSISTANT_SUPPORTED_SECTIONS],
                  ...(shouldIncludeDebug
                    ? { includeDebugToolCalls: true }
                    : {}),
                },
              },
              onNext: data => {
                if (isFinished) return
                restartTimeout()
                const event = data?.aiAgentTurn
                if (!event) return
                update(
                  reduceArtAssistantEvent({
                    message,
                    event,
                    elapsedMs: Date.now() - startedAt,
                  }),
                )
                if (event.__typename === "AIAgentTurnComplete") {
                  if (message.phase === "error") {
                    fail({
                      outcome: "stopped_without_answer",
                      kind: message.error,
                    })
                    return
                  }
                  finish()
                }
              },
              onError: error => fail({ error }),
              onCompleted: () => {
                if (!isFinished)
                  fail({
                    outcome: "ended_without_answer",
                    kind: "generic",
                  })
              },
            },
          )
        if (isFinished) subscription.dispose()
        else restartTimeout()
      } catch (error) {
        fail({ error })
      }
      return true
    },
    [
      relayEnvironment,
      replaceMessages,
      user?.id,
      user?.accessToken,
      shouldIncludeDebug,
      shouldCaptureToolEvents,
    ],
  )

  const retry = useCallback((): boolean => {
    if (activeTurn.current || !user?.id || !user.accessToken) return false
    const current = messagesRef.current
    const failed = current[current.length - 1]
    const prompt = current[current.length - 2]
    if (
      failed?.role !== "assistant" ||
      failed.phase !== "error" ||
      prompt?.role !== "user"
    )
      return false
    messagesRef.current = current.slice(0, -2)
    return submit({ text: prompt.text })
  }, [submit, user?.id, user?.accessToken])

  return {
    messages,
    isResponding,
    conversationID,
    submit,
    retry,
    startNewConversation,
    loadConversation,
  }
}
