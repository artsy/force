import { Box, Expandable } from "@artsy/palette"
import { AISearchDebugEntryList } from "Components/AISearch/Components/AISearchDebugEntryList"
import type { AISearchDebugEntry } from "Components/AISearch/Utils/aiSearchTypes"
import type { FC } from "react"

interface AISearchDebugPanelProps {
  entries: AISearchDebugEntry[]
}

/**
 * Developer-only view of the queries the agent ran, for a turn with no artwork
 * rail to hang them off — a text-only answer, an error, or a turn still
 * streaming. Where there is a rail, the toggle lives in its header instead; see
 * `AISearchArtworksRailWithDebug`.
 */
export const AISearchDebugPanel: FC<AISearchDebugPanelProps> = ({
  entries,
}) => {
  if (entries.length === 0) {
    return null
  }

  return (
    <Box mt={2} bg="mono5" px={2} py={1} borderRadius={4}>
      <Expandable label={debugLabel(entries.length)}>
        <Box pb={1}>
          <AISearchDebugEntryList entries={entries} />
        </Box>
      </Expandable>
    </Box>
  )
}

export const debugLabel = (count: number): string => {
  return `Debug: ${count} ${count === 1 ? "query" : "queries"}`
}
