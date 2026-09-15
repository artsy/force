import {
  appendDebugCall,
  settleDebugResult,
} from "Components/AISearch/Utils/aiSearchDebugEntries"
import type {
  AIAgentToolCall,
  AIAgentToolResult,
  AISearchDebugEntry,
} from "Components/AISearch/Utils/aiSearchTypes"

const toolCall = (
  overrides: Partial<AIAgentToolCall> = {},
): AIAgentToolCall => {
  return {
    __typename: "AIAgentToolCall",
    activity: "SEARCHING_ARTWORKS",
    toolName: "artworksConnection",
    debugSummary: "artworksConnection(keyword: “Warhol”)",
    ...overrides,
  }
}

const toolResult = (
  overrides: Partial<AIAgentToolResult> = {},
): AIAgentToolResult => {
  return {
    __typename: "AIAgentToolResult",
    toolName: "artworksConnection",
    ok: true,
    ...overrides,
  }
}

describe("appendDebugCall", () => {
  it("records the query the agent ran", () => {
    const entries = appendDebugCall({ entries: [], event: toolCall() })

    expect(entries).toEqual([
      {
        id: "artworksConnection-0",
        toolName: "artworksConnection",
        activity: "SEARCHING_ARTWORKS",
        query: "artworksConnection(keyword: “Warhol”)",
        resultSummary: null,
        status: "PENDING",
      },
    ])
  })

  it("ignores a call with no debug detail, which is what a non-debug server sends", () => {
    const event: AIAgentToolCall = {
      __typename: "AIAgentToolCall",
      activity: "SEARCHING_ARTWORKS",
    }

    expect(appendDebugCall({ entries: [], event })).toEqual([])
  })

  // The server nulls `debugSummary` when its own debug flag is off, so Force
  // renders nothing even with debug enabled on its side.
  it("ignores a call whose query the server withheld", () => {
    const event = toolCall({ debugSummary: null })

    expect(appendDebugCall({ entries: [], event })).toEqual([])
  })

  it("keeps one entry per call, even for repeated calls to the same tool", () => {
    const first = appendDebugCall({ entries: [], event: toolCall() })
    const second = appendDebugCall({ entries: first, event: toolCall() })

    expect(second.map(entry => entry.id)).toEqual([
      "artworksConnection-0",
      "artworksConnection-1",
    ])
  })
})

describe("settleDebugResult", () => {
  const pending = (toolName: string): AISearchDebugEntry => {
    return {
      id: `${toolName}-0`,
      toolName,
      activity: "SEARCHING_ARTWORKS",
      query: "query",
      resultSummary: null,
      status: "PENDING",
    }
  }

  it("settles the matching call as succeeded", () => {
    const entries = settleDebugResult({
      entries: [pending("artworksConnection")],
      event: toolResult(),
    })

    expect(entries[0].status).toBe("OK")
  })

  it("records a failure along with its detail", () => {
    const entries = settleDebugResult({
      entries: [pending("artworksConnection")],
      event: toolResult({ ok: false, debugSummary: "Upstream timed out" }),
    })

    expect(entries[0].status).toBe("FAILED")
    expect(entries[0].resultSummary).toBe("Upstream timed out")
  })

  it("settles the most recent pending call for the tool, leaving earlier ones alone", () => {
    const entries = settleDebugResult({
      entries: [
        { ...pending("artworksConnection"), status: "OK" },
        { ...pending("artworksConnection"), id: "artworksConnection-1" },
      ],
      event: toolResult(),
    })

    expect(entries.map(entry => entry.status)).toEqual(["OK", "OK"])
    expect(entries[1].id).toBe("artworksConnection-1")
  })

  it("leaves the list alone when no pending call matches", () => {
    const entries = [pending("artistsConnection")]

    expect(settleDebugResult({ entries, event: toolResult() })).toBe(entries)
  })
})
