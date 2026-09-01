import type {
  AIAgentEvent,
  AISearchHistoryEntry,
} from "Components/AISearch/Utils/aiSearchTypes"
import { getMetaphysicsEndpoint } from "System/Relay/getMetaphysicsEndpoint"
import { getENV } from "Utils/getENV"

/**
 * Server-side guardrails from metaphysics' `assertInputWithinLimits`. Enforced
 * here too so an over-long conversation gets trimmed rather than rejected.
 */
export const MAX_HISTORY_MESSAGES = 40
export const MAX_HISTORY_BYTES = 100_000

const TURN_COMPLETE = "AIAgentTurnComplete"

const TURN_COMPLETE_BASE_FIELDS = `
  message
  stopReason
  toolCallCount
`

const ARTWORKS_FIELDS = `
  artworks {
    internalID
  }
`

/**
 * Pending on the metaphysics side — see `AIAgentTurnComplete` in
 * `src/schema/v2/ai/agent/types.ts`. Asking for a field the server doesn't have
 * is a hard validation error that kills the whole turn, and Yoga reports it
 * inside the SSE stream rather than as a plain JSON response, so it can't be
 * recovered from mid-flight. Flip this to `true` (and uncomment the fields
 * below) once both land; the rest of the client already handles them.
 */
const HAS_ARTISTS_AND_FILTERS = false

const ARTISTS_AND_FILTERS_FIELDS = `
  artists {
    internalID
  }
  artworkFilters {
    keyword
    artistIDs
    additionalGeneIDs
    attributionClass
    priceRange
    sizes
    colors
    majorPeriods
    sort
  }
`

const TURN_COMPLETE_FIELDS = [
  TURN_COMPLETE_BASE_FIELDS,
  ARTWORKS_FIELDS,
  HAS_ARTISTS_AND_FILTERS ? ARTISTS_AND_FILTERS_FIELDS : "",
].join("")

const DOCUMENT = `
  subscription AISearchAgentTurn($input: AIAgentTurnInput!) {
    aiAgentTurn(input: $input) {
      __typename
      ... on AIAgentTextDelta {
        text
      }
      ... on AIAgentToolCall {
        toolName
        summary
      }
      ... on AIAgentToolResult {
        toolName
        ok
        summary
      }
      ... on ${TURN_COMPLETE} {
        ${TURN_COMPLETE_FIELDS}
      }
    }
  }
`

export interface StreamAIAgentTurnParams {
  conversationID: string
  message: string
  history: AISearchHistoryEntry[]
  userID: string
  accessToken: string
  signal: AbortSignal
  onEvent: (event: AIAgentEvent) => void
}

/**
 * Trims from the oldest end until the payload fits the server's limits. History
 * is dropped in whole pairs so a lone assistant reply never leads the list.
 */
export const trimHistory = (
  history: AISearchHistoryEntry[],
  message: string,
): AISearchHistoryEntry[] => {
  const byteLength = (text: string) => {
    return new TextEncoder().encode(text).length
  }

  // The server weighs a replayed entry by its prose and its ids.
  const entryBytes = (entry: AISearchHistoryEntry) => {
    return (entry.artworkIDs ?? []).reduce((sum, id) => {
      return sum + byteLength(id)
    }, byteLength(entry.content))
  }

  let trimmed =
    history.length > MAX_HISTORY_MESSAGES
      ? history.slice(history.length - MAX_HISTORY_MESSAGES)
      : [...history]

  let totalBytes =
    byteLength(message) +
    trimmed.reduce((sum, entry) => {
      return sum + entryBytes(entry)
    }, 0)

  while (totalBytes > MAX_HISTORY_BYTES && trimmed.length > 0) {
    const dropCount = trimmed.length > 1 ? 2 : 1
    const dropped = trimmed.slice(0, dropCount)

    totalBytes -= dropped.reduce((sum, entry) => {
      return sum + entryBytes(entry)
    }, 0)
    trimmed = trimmed.slice(dropCount)
  }

  return trimmed
}

/**
 * Opens one `aiAgentTurn` subscription over SSE and invokes `onEvent` for each
 * frame, resolving once the terminal `AIAgentTurnComplete` arrives (or the
 * stream ends). Throws on a pre-turn rejection — not signed in, feature flag
 * off, oversized input — which metaphysics returns as an ordinary JSON error
 * response rather than a stream.
 */
export const streamAIAgentTurn = async ({
  conversationID,
  message,
  history,
  userID,
  accessToken,
  signal,
  onEvent,
}: StreamAIAgentTurnParams): Promise<void> => {
  const variables = {
    input: {
      conversationID,
      message,
      history: trimHistory(history, message).map(entry => {
        const shouldSendArtworkIDs =
          entry.role === "ASSISTANT" && !!entry.artworkIDs?.length

        return {
          role: entry.role,
          content: entry.content,
          ...(shouldSendArtworkIDs ? { artworkIDs: entry.artworkIDs } : {}),
        }
      }),
    },
  }

  const response = await fetch(getMetaphysicsEndpoint(), {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "X-XAPP-TOKEN": getENV("ARTSY_XAPP_TOKEN"),
      "X-USER-ID": userID,
      "X-ACCESS-TOKEN": accessToken,
    },
    body: JSON.stringify({ query: DOCUMENT, variables }),
  })

  if (!isEventStream(response)) {
    throw new Error(await readErrorMessage(response))
  }

  if (!response.body) {
    throw new Error("The response had no body to stream.")
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })

      let boundary = buffer.indexOf("\n\n")

      while (boundary !== -1) {
        const frame = buffer.slice(0, boundary)
        buffer = buffer.slice(boundary + 2)
        boundary = buffer.indexOf("\n\n")

        const event = parseFrame(frame)

        if (!event) {
          continue
        }

        // Text deltas arrive token-by-token and would drown the console.
        if (event.__typename !== "AIAgentTextDelta") {
          console.log("[Debug] SSE event", event)
        }

        onEvent(event)

        if (event.__typename === TURN_COMPLETE) {
          return
        }
      }
    }
  } finally {
    reader.cancel().catch(() => {
      // The stream is already gone; nothing to recover from.
    })
  }
}

const isEventStream = (response: Response) => {
  return (response.headers.get("content-type") ?? "").includes(
    "text/event-stream",
  )
}

const readErrorMessage = async (response: Response) => {
  const body = await response.json().catch(() => {
    return null
  })

  const errors = body?.errors as Array<{ message: string }> | undefined

  if (errors?.length) {
    return errors
      .map(error => {
        return error.message
      })
      .join("; ")
  }

  return `AI search request failed (${response.status})`
}

/** Turns one `\n\n`-delimited SSE frame into an event, or null if it carries none */
const parseFrame = (frame: string): AIAgentEvent | null => {
  const data = frame
    .split("\n")
    .filter(line => {
      return line.startsWith("data:")
    })
    .map(line => {
      return line.slice("data:".length).trim()
    })
    .join("\n")

  if (!data) {
    return null
  }

  const payload = JSON.parse(data)
  const errors = payload.errors as Array<{ message: string }> | undefined

  if (errors?.length) {
    throw new Error(
      errors
        .map(error => {
          return error.message
        })
        .join("; "),
    )
  }

  return (payload.data?.aiAgentTurn as AIAgentEvent | undefined) ?? null
}
