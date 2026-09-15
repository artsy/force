import type {
  AIAgentEvent,
  AISearchHistoryEntry,
} from "Components/AISearch/Utils/aiSearchTypes"
import {
  MAX_HISTORY_BYTES,
  MAX_HISTORY_MESSAGES,
  streamAIAgentTurn,
  trimHistory,
} from "Components/AISearch/Utils/streamAIAgentTurn"

jest.mock("System/Relay/getMetaphysicsEndpoint", () => {
  return { getMetaphysicsEndpoint: () => "https://metaphysics.test/v2" }
})

jest.mock("Utils/getENV", () => {
  return { getENV: () => "xapp-token" }
})

jest.mock("Components/AISearch/Utils/isAIAgentDebugEnabled", () => {
  return { isAIAgentDebugEnabled: () => mockIsDebugEnabled }
})

let mockIsDebugEnabled = false

beforeEach(() => {
  mockIsDebugEnabled = false
})

const ARTWORK_ID = "5f5a5b5c5d5e5f6061626364"

const userEntry = (content: string): AISearchHistoryEntry => {
  return { role: "USER", content }
}

const assistantEntry = (
  content: string,
  artworkIDs?: string[],
): AISearchHistoryEntry => {
  return { role: "ASSISTANT", content, artworkIDs }
}

describe("trimHistory", () => {
  it("leaves a history that fits within the limits alone", () => {
    const history = [userEntry("Show me Warhol"), assistantEntry("Here you go")]

    expect(trimHistory(history, "And cheaper?")).toEqual(history)
  })

  it("keeps only the newest messages once past the message cap", () => {
    const history = Array.from({ length: MAX_HISTORY_MESSAGES + 4 }, (_, i) => {
      return userEntry(`message ${i}`)
    })

    const trimmed = trimHistory(history, "hi")

    expect(trimmed).toHaveLength(MAX_HISTORY_MESSAGES)
    expect(trimmed[0].content).toBe("message 4")
  })

  it("counts replayed artwork ids toward the byte budget", () => {
    // Prose alone fits; the ids are what push it over.
    const artworkIDs = Array.from({ length: 100 }, () => {
      return "5f5a5b5c5d5e5f6061626364"
    })
    const prose = [
      userEntry("x".repeat(MAX_HISTORY_BYTES / 2)),
      assistantEntry("y".repeat(MAX_HISTORY_BYTES / 2 - 1000)),
    ]

    expect(trimHistory(prose, "and cheaper?")).toHaveLength(2)

    const withIDs = [prose[0], assistantEntry(prose[1].content, artworkIDs)]

    expect(trimHistory(withIDs, "and cheaper?")).toHaveLength(0)
  })
})

// Yoga's stream shape: `data:` lines delimited by a blank line.
const eventStreamResponse = (events: AIAgentEvent[]): Response => {
  const encoder = new TextEncoder()
  const frames = events.map(event => {
    return `data: ${JSON.stringify({ data: { aiAgentTurn: event } })}\n\n`
  })

  let index = 0

  return {
    headers: { get: () => "text/event-stream" },
    body: {
      getReader: () => {
        return {
          read: async () => {
            if (index >= frames.length) {
              return { done: true, value: undefined }
            }

            return { done: false, value: encoder.encode(frames[index++]) }
          },
          cancel: async () => {},
        }
      },
    },
  } as unknown as Response
}

describe("streamAIAgentTurn", () => {
  const turnComplete: AIAgentEvent = {
    __typename: "AIAgentTurnComplete",
    message: "Here are a few more.",
    stopReason: "stop",
    toolCallCount: 1,
    artworks: [],
    artists: null,
    artworkFilters: null,
  }

  const run = async (history: AISearchHistoryEntry[]) => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(eventStreamResponse([turnComplete]))
    global.fetch = fetchMock

    await streamAIAgentTurn({
      conversationID: "conversation-1",
      message: "Show me cheaper ones",
      history,
      userID: "user-1",
      accessToken: "access-token",
      signal: new AbortController().signal,
      onEvent: () => {},
    })

    return JSON.parse(fetchMock.mock.calls[0][1].body)
  }

  const runForInput = async (history: AISearchHistoryEntry[]) => {
    return (await run(history)).variables.input
  }

  it("replays the cards an assistant turn showed, so a follow-up can resolve against them", async () => {
    const input = await runForInput([
      { role: "USER", content: "Show me Warhol" },
      {
        role: "ASSISTANT",
        content: "Here you go.",
        artworkIDs: [ARTWORK_ID],
      },
    ])

    expect(input.history).toEqual([
      { role: "USER", content: "Show me Warhol" },
      {
        role: "ASSISTANT",
        content: "Here you go.",
        artworkIDs: [ARTWORK_ID],
      },
    ])
  })

  it("omits the field entirely when a turn showed no cards", async () => {
    const input = await runForInput([
      { role: "USER", content: "Who is Banksy?" },
      { role: "ASSISTANT", content: "A street artist.", artworkIDs: [] },
    ])

    expect(input.history).toEqual([
      { role: "USER", content: "Who is Banksy?" },
      { role: "ASSISTANT", content: "A street artist." },
    ])
  })

  it("never sends ids on a user turn, which rendered no cards", async () => {
    const input = await runForInput([
      { role: "USER", content: "Show me Warhol", artworkIDs: [ARTWORK_ID] },
    ])

    expect(input.history).toEqual([{ role: "USER", content: "Show me Warhol" }])
  })

  describe("debug mode", () => {
    it("asks for the agent's queries and opts into them once debug is on", async () => {
      mockIsDebugEnabled = true

      const body = await run([])

      expect(body.variables.input.includeDebugToolCalls).toBe(true)
      expect(body.query).toContain("debugSummary")
      expect(body.query).toContain("... on AIAgentToolResult")
    })

    // Asking a metaphysics that predates the debug fields for them is a
    // validation error that kills the turn, so normal traffic must not.
    it("leaves the document and input alone when debug is off", async () => {
      const body = await run([])

      expect(body.variables.input.includeDebugToolCalls).toBeUndefined()
      expect(body.query).not.toContain("debugSummary")
      expect(body.query).not.toContain("... on AIAgentToolResult")
    })
  })
})
