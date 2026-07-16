import { Button, LabeledInput, Spacer, Text } from "@artsy/palette"
import {
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { fetchArtworkFilterSuggestions } from "Components/ArtworkFilter/Utils/fetchArtworkFilterSuggestions"
import { mapFilterSuggestion } from "Components/ArtworkFilter/Utils/mapFilterSuggestion"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type React from "react"
import { useState } from "react"
import { FilterExpandable } from "./FilterExpandable"

export const AskFilter: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { relayEnvironment } = useSystemContext()
  const { setFilter, setFilters } = useArtworkFilterContext()
  const currentFilters = useCurrentlySelectedFilters()

  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleAsk = async () => {
    const query = value.trim()
    if (!query || loading) return

    setLoading(true)
    setMessage(null)

    const suggestion = await fetchArtworkFilterSuggestions(
      relayEnvironment,
      query,
    )

    const mapped =
      suggestion && !suggestion.fellOpen
        ? mapFilterSuggestion(suggestion)
        : null

    if (mapped && setFilters) {
      setFilters({ ...currentFilters, ...mapped })
    } else {
      // Fail open: plain keyword search, no structured filters.
      setFilter("keyword", query)
      setMessage("Showing keyword results.")
    }

    setLoading(false)
  }

  return (
    <FilterExpandable label="Ask" expanded>
      <LabeledInput
        value={value}
        placeholder="Describe what you're looking for"
        onChange={event => setValue(event.currentTarget.value)}
        onKeyDown={event => {
          if (event.key === "Enter") handleAsk()
        }}
        type="text"
        label="Ask"
        data-testid="askInput"
      />

      <Spacer y={1} />

      <Button
        size="small"
        variant="secondaryBlack"
        loading={loading}
        onClick={handleAsk}
        data-testid="askButton"
      >
        Ask
      </Button>

      {message && (
        <>
          <Spacer y={1} />
          <Text variant="xs" color="black60">
            {message}
          </Text>
        </>
      )}
    </FilterExpandable>
  )
}
