import { act, renderHook } from "@testing-library/react"
import {
  useArtAssistantConversation,
  ART_ASSISTANT_IDLE_TIMEOUT_MS,
} from "Apps/ArtAssistant/hooks/useArtAssistantConversation"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { requestSubscription } from "react-relay"
import type { useArtAssistantConversationSubscription$data } from "__generated__/useArtAssistantConversationSubscription.graphql"

jest.mock("System/Hooks/useSystemContext")
jest.mock("uuid", () => ({
  v4: (() => {
    let id = 0
    return () => `id-${id++}`
  })(),
}))
jest.mock("react-relay", () => ({ requestSubscription: jest.fn() }))
jest.mock("@artsy/palette", () => ({
  useToasts: () => ({ sendToast: jest.fn() }),
}))

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
    expect(result.current.messages[1]).toMatchObject({ phase: "error" })
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
