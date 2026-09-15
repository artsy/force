import { Box, Stack, Text } from "@artsy/palette"
import type { AISearchDebugEntry } from "Components/AISearch/Utils/aiSearchTypes"
import type { FC } from "react"

const STATUS_LABELS: Record<AISearchDebugEntry["status"], string> = {
  PENDING: "running…",
  OK: "ok",
  FAILED: "failed",
}

interface AISearchDebugEntryListProps {
  entries: AISearchDebugEntry[]
}

/** The queries behind one turn, one row per call the agent made. */
export const AISearchDebugEntryList: FC<AISearchDebugEntryListProps> = ({
  entries,
}) => {
  return (
    <Stack gap={2}>
      {entries.map(entry => {
        return (
          <Box key={entry.id}>
            <Text variant="xs" color="mono60">
              {entry.toolName} — {STATUS_LABELS[entry.status]}
            </Text>

            <DebugCode>{entry.query}</DebugCode>

            {!!entry.resultSummary && (
              <DebugCode>{entry.resultSummary}</DebugCode>
            )}
          </Box>
        )
      })}
    </Stack>
  )
}

const DebugCode: FC<{ children: string }> = ({ children }) => {
  return (
    <Box
      as="pre"
      m={0}
      mt="2px"
      pl={1}
      borderLeft="2px solid"
      borderColor="mono30"
      style={{
        fontFamily: "monospace",
        fontSize: "11px",
        lineHeight: 1.4,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowX: "auto",
      }}
    >
      {children}
    </Box>
  )
}
