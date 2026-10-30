import { act, renderHook } from "@testing-library/react"
import {
  useArtAssistantConversation,
  ART_ASSISTANT_IDLE_TIMEOUT_MS,
} from "Apps/ArtAssistant/hooks/useArtAssistantConversation"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { requestSubscription } from "react-relay"
import type { useArtAssistantConversationSubscription$data } from "__generated__/useArtAssistantConversationSubscription.graphql"
import { ART_ASSISTANT_ERRORS } from "Apps/ArtAssistant/utils/artAssistantErrors"
import { MetaphysicsSubscriptionError } from "System/Relay/metaphysicsSubscriptionError"
import { captureException, captureMessage } from "@sentry/browser"

jest.mock("System/Hooks/useSystemContext")
jest.mock("@sentry/browser", () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
}))
jest.mock("uuid", () => ({
  v4: (() => {
    let id = 0
    return () => `id-${id++}`
  })(),
}))
jest.mock("react-relay", () => ({ requestSubscription: jest.fn() }))

describe("Art Assistant conversation", () => {
  const dispose = jest.fn()
  let callbacks: Parameters<typeof requestSubscription>[1]
  const complete: useArtAssistantConversationSubscription$data = {
    aiAgentTurn: {
      __typename: "AIAgentTurnComplete",
      message: "Try these artists",
      stopReason: "end_turn",
      toolCallCount: 1,
      artworks: [],
      sections: [
        {
          __typename: "AIAgentArtistsSection",
          artists: [{ internalID: "artist-2" }],
        },
      ],
      suggestedReplies: [{ text: "Show me more" }],
    },
  }

  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
    jest.spyOn(console, "error").mockImplementation(() => {})
    ;(useSystemContext as jest.Mock).mockReturnValue({
      user: { id: "user", accessToken: "token" },
      relayEnvironment: {},
    })
    ;(requestSubscription as jest.Mock).mockImplementation((_env, config) => {
      callbacks = config
      return { dispose }
    })
  })
  afterEach(() => jest.useRealTimers())

  it.each([
    ["rate_limited", "rate_limited"],
    ["max_iterations", "timeout"],
    ["aborted", "timeout"],
    ["error", "generic"],
    ["stop", "unclear"],
  ] as const)("shows the appropriate error for %s", (stopReason, kind) => {
    const { result } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    act(() =>
      callbacks.onNext?.({
        aiAgentTurn: {
          __typename: "AIAgentTurnComplete",
          message: null,
          sections: [],
          artworks: [],
          suggestedReplies: [],
          toolCallCount: 0,
          stopReason,
        },
      }),
    )
    expect(result.current.messages[1]).toMatchObject({
      phase: "error",
      error: kind,
      text: ART_ASSISTANT_ERRORS[kind].message,
    })
    expect(result.current.isResponding).toBe(false)
  })

  it("reports a turn without an answer as a warning, not an exception", () => {
    const { result } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    act(() =>
      callbacks.onNext?.({
        aiAgentTurn: {
          __typename: "AIAgentTurnComplete",
          message: null,
          sections: [],
          artworks: [],
          suggestedReplies: [],
          toolCallCount: 0,
          stopReason: "rate_limited",
        },
      }),
    )
    expect(captureException).not.toHaveBeenCalled()
    expect(captureMessage).toHaveBeenCalledWith(
      "Art Assistant turn: stopped_without_answer",
      expect.objectContaining({
        level: "warning",
        tags: {
          artAssistantOutcome: "stopped_without_answer",
          artAssistantStopReason: "rate_limited",
        },
      }),
    )
  })

  it("falls back to artworks when no section is usable", () => {
    const { result } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    act(() =>
      callbacks.onNext?.({
        aiAgentTurn: {
          __typename: "AIAgentTurnComplete",
          message: "Here you go",
          stopReason: "end_turn",
          toolCallCount: 1,
          suggestedReplies: [],
          sections: [{ __typename: "AIAgentArtistsSection", artists: [] }],
          artworks: [{ internalID: "artwork-1" }],
        },
      }),
    )
    expect(result.current.messages[1]).toMatchObject({
      phase: "complete",
      sections: [{ type: "artworks", ids: ["artwork-1"] }],
    })
  })

  it("retries a failed prompt in place without replaying the failed exchange", () => {
    const { result } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    act(() => callbacks.onError?.(new Error("Failed")))
    act(() => result.current.retry())
    expect(result.current.messages).toHaveLength(2)
    expect(result.current.messages[0].text).toBe("Find art")
    expect(result.current.messages[1]).toMatchObject({ phase: "responding" })
    expect(
      (requestSubscription as jest.Mock).mock.calls[1][1].variables.input
        .history,
    ).toEqual([])
  })

  it("never sends private error text to console breadcrumbs or Sentry", () => {
    const { result } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    act(() =>
      callbacks.onError?.(
        new MetaphysicsSubscriptionError({
          status: 403,
          graphQLErrors: ["PRIVATE_CANARY"],
        }),
      ),
    )
    expect(console.error).toHaveBeenCalledWith("Art Assistant turn failed", {
      outcome: "stream_error",
      status: 403,
    })
    expect(
      JSON.stringify((console.error as jest.Mock).mock.calls),
    ).not.toContain("PRIVATE_CANARY")
    const [error, context] = (captureException as jest.Mock).mock.calls[0]
    expect(error.message).toBe("Art Assistant turn: stream_error")
    expect(context.level).toBe("error")
    expect(JSON.stringify(context)).not.toContain("PRIVATE_CANARY")
  })

  it("handles backend and local conversation limits", () => {
    const { result } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    act(() =>
      callbacks.onError?.(
        new MetaphysicsSubscriptionError({
          graphQLErrors: ["Conversation history is too long"],
        }),
      ),
    )
    expect(result.current.messages[1]).toMatchObject({
      error: "conversation_limit",
    })
    act(() =>
      result.current.loadConversation({
        id: "full",
        messages: Array.from({ length: 21 }, (_, i) => [
          { id: `u${i}`, role: "user" as const, text: "Question" },
          {
            id: `a${i}`,
            role: "assistant" as const,
            text: "Answer",
            phase: "complete" as const,
          },
        ]).flat(),
      }),
    )
    ;(requestSubscription as jest.Mock).mockClear()
    act(() => result.current.submit({ text: "One more" }))
    expect(requestSubscription).not.toHaveBeenCalled()
    expect(
      result.current.messages[result.current.messages.length - 1],
    ).toMatchObject({ error: "conversation_limit" })
  })

  it("waits for a final answer and replays the displayed cards", () => {
    const { result } = renderHook(useArtAssistantConversation)
    act(() => {
      result.current.submit({ text: "Find artists" })
      result.current.submit({ text: "Duplicate" })
    })
    expect(requestSubscription).toHaveBeenCalledTimes(1)
    act(() =>
      callbacks.onNext?.({ aiAgentTurn: { __typename: "AIAgentTextDelta" } }),
    )
    expect(result.current.messages[1].text).toBe("")
    act(() => callbacks.onNext?.(complete))
    expect(result.current.isResponding).toBe(false)
    expect(dispose).toHaveBeenCalledTimes(1)
    expect(result.current.messages[1]).toMatchObject({
      text: "Try these artists",
      sections: [{ type: "artists", ids: ["artist-2"] }],
      suggestedReplies: ["Show me more"],
    })
    act(() => result.current.submit({ text: "The second artist" }))
    expect(
      (requestSubscription as jest.Mock).mock.calls[1][1].variables.input,
    ).toMatchObject({
      supportedSections: ["ARTWORKS", "ARTISTS"],
      history: [
        { role: "USER", content: "Find artists" },
        {
          role: "ASSISTANT",
          content: "Try these artists",
          displayedSections: [
            { entityType: "ARTIST", internalIDs: ["artist-2"] },
          ],
        },
      ],
    })
  })

  it("resets the idle deadline on events and settles a silent stream", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {})
    const { result } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    act(() => jest.advanceTimersByTime(ART_ASSISTANT_IDLE_TIMEOUT_MS - 1))
    act(() =>
      callbacks.onNext?.({
        aiAgentTurn: {
          __typename: "AIAgentToolCall",
          activity: "SEARCHING_ARTWORKS",
        },
      }),
    )
    act(() => jest.advanceTimersByTime(ART_ASSISTANT_IDLE_TIMEOUT_MS - 1))
    expect(result.current.isResponding).toBe(true)
    act(() => jest.advanceTimersByTime(1))
    expect(result.current.isResponding).toBe(false)
    expect(result.current.messages[1]).toMatchObject({
      phase: "error",
      error: "timeout",
    })
    error.mockRestore()
  })

  it("ignores callbacks from a cancelled chat", () => {
    const { result, unmount } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    const oldCallbacks = callbacks
    act(() => result.current.startNewConversation())
    act(() => oldCallbacks.onNext?.(complete))
    expect(result.current.messages).toEqual([])
    act(() => result.current.submit({ text: "New prompt" }))
    unmount()
    expect(dispose).toHaveBeenCalledTimes(2)
  })

  it("treats a stream without a final answer as an error", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {})
    const { result } = renderHook(useArtAssistantConversation)
    act(() => result.current.submit({ text: "Find art" }))
    act(() => callbacks.onCompleted?.())
    expect(result.current.messages[1]).toMatchObject({ phase: "error" })
    expect(result.current.isResponding).toBe(false)
    error.mockRestore()
  })
  it.each(["User", "Admin"])(
    "requests debug only for an opted-in admin (%s)",
    type => {
      ;(useSystemContext as jest.Mock).mockReturnValue({
        user: { id: "user", accessToken: "token", type },
        relayEnvironment: {},
      })
      const { result } = renderHook(() =>
        useArtAssistantConversation({ isDebugEnabled: true }),
      )
      act(() => result.current.submit({ text: "Find art" }))
      const variables = (requestSubscription as jest.Mock).mock.calls[0][1]
        .variables
      expect(variables.includeDebug).toBe(type === "Admin")
      expect(variables.includeToolMetadata).toBe(type === "Admin")
      expect(variables.input.includeDebugToolCalls).toBe(
        type === "Admin" ? true : undefined,
      )
      act(() =>
        callbacks.onNext?.({
          aiAgentTurn: {
            __typename: "AIAgentToolCall",
            activity: "SEARCHING_ARTWORKS",
            toolName: "search",
            summary: "Searching",
            debugSummary: "arguments",
          },
        }),
      )
      if (type === "Admin")
        expect(result.current.messages[1]).toMatchObject({
          debug: { events: [{ detail: "arguments" }] },
        })
      else expect(result.current.messages[1]).not.toHaveProperty("debug")
    },
  )
  it("keeps terminal debug diagnostics when the agent cannot produce an answer", () => {
    ;(useSystemContext as jest.Mock).mockReturnValue({
      user: { id: "admin", accessToken: "token", type: "Admin" },
      relayEnvironment: {},
    })
    const { result } = renderHook(() =>
      useArtAssistantConversation({ isDebugEnabled: true }),
    )
    act(() => result.current.submit({ text: "Find art" }))
    act(() =>
      callbacks.onNext?.({
        aiAgentTurn: {
          __typename: "AIAgentTurnComplete",
          message: null,
          sections: [],
          artworks: [],
          suggestedReplies: [],
          stopReason: "max_iterations",
          toolCallCount: 5,
        },
      }),
    )
    expect(result.current.messages[1]).toMatchObject({
      phase: "error",
      debug: { stopReason: "max_iterations", toolCallCount: 5 },
    })
  })
})
