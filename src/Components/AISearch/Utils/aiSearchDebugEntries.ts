import type {
  AIAgentToolCall,
  AIAgentToolResult,
  AISearchDebugEntry,
} from "Components/AISearch/Utils/aiSearchTypes"

/**
 * Assembles the developer-facing list of queries the agent ran from the
 * `AIAgentToolCall` / `AIAgentToolResult` frames metaphysics only fills in when
 * debug mode is on. Without those fields there is nothing to show, so both
 * helpers return the list untouched — which is also what makes Force's own flag
 * safe to leave on: a metaphysics that isn't disclosing nulls `debugSummary`,
 * and no debug UI appears at all.
 */

export const appendDebugCall = ({
  entries,
  event,
}: {
  entries: AISearchDebugEntry[]
  event: AIAgentToolCall
}): AISearchDebugEntry[] => {
  // `debugSummary` is the query itself, and the server nulls it whenever debug
  // is off. Without it there is nothing worth a row, tool name alone included.
  if (!event.toolName || !event.debugSummary) {
    return entries
  }

  return [
    ...entries,
    {
      id: `${event.toolName}-${entries.length}`,
      toolName: event.toolName,
      activity: event.activity,
      query: event.debugSummary,
      resultSummary: null,
      status: "PENDING",
    },
  ]
}

/**
 * The schema carries no call id, so a result settles the most recent pending
 * entry for the same tool — the agent's calls resolve in the order it made them.
 */
export const settleDebugResult = ({
  entries,
  event,
}: {
  entries: AISearchDebugEntry[]
  event: AIAgentToolResult
}): AISearchDebugEntry[] => {
  if (!event.toolName) {
    return entries
  }

  const pendingIndex = entries.reduce((last, entry, index) => {
    const isMatch =
      entry.status === "PENDING" && entry.toolName === event.toolName

    return isMatch ? index : last
  }, -1)

  if (pendingIndex === -1) {
    return entries
  }

  return entries.map((entry, index) => {
    if (index !== pendingIndex) {
      return entry
    }

    return {
      ...entry,
      resultSummary: event.debugSummary ?? null,
      status: event.ok === false ? "FAILED" : "OK",
    }
  })
}
