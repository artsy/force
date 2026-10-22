import { Box, Text } from "@artsy/palette"
import type { ArtAssistantDebug } from "Apps/ArtAssistant/types"
import type { FC } from "react"

export const ArtAssistantDebugPanel: FC<{ debug: ArtAssistantDebug }> = ({
  debug,
}) => {
  const hasToolCalls = debug.events.some(event => event.type === "call")
  const hasDetailedCalls = debug.events.some(
    event => event.type === "call" && !!event.detail?.trim(),
  )
  return (
    <Box
      as="details"
      open
      width="100%"
      border="1px solid"
      borderColor="mono15"
      p={1}
    >
      <Text as="summary" variant="xs" style={{ cursor: "pointer" }}>
        Agent debug
      </Text>
      {debug.events.map((event, index) => {
        return (
          <Box key={`${index}-${event.toolName}`} mt={1}>
            <Text variant="xxs">
              {event.elapsedMs} ms · {event.type} · {event.toolName}
              {event.ok === undefined ? "" : ` · ${event.ok ? "ok" : "failed"}`}
            </Text>
            <Text
              as="pre"
              variant="xxs"
              style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
            >
              {event.detail ??
                event.summary ??
                "No additional detail available."}
            </Text>
          </Box>
        )
      })}
      {!debug.events.length && (
        <Text variant="xxs" mt={1}>
          No tool events received.
        </Text>
      )}
      {debug.stopReason && (
        <Text variant="xxs" mt={1}>
          {debug.durationMs} ms · {debug.stopReason} · {debug.toolCallCount}{" "}
          tool calls
        </Text>
      )}
      {debug.hasRequestedDetails === false && (
        <Text variant="xxs" color="mono60" mt={1}>
          Detailed tool data is collected only for messages sent with Debug on.
        </Text>
      )}
      {debug.hasRequestedDetails && hasToolCalls && !hasDetailedCalls && (
        <Text variant="xxs" color="mono60" mt={1}>
          The server isn’t providing detailed tool data. Metaphysics must run in
          development or with ENABLE_AI_AGENT_DEBUG enabled.
        </Text>
      )}
    </Box>
  )
}
