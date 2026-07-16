import { Box, Button, Flex, Input, Spacer, Text } from "@artsy/palette"
import {
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { buildUnderstoodAs } from "Components/ArtworkFilter/Utils/buildUnderstoodAs"
import type { ArtworkFilterSuggestion } from "Components/ArtworkFilter/Utils/fetchArtworkFilterSuggestions"
import { fetchArtworkFilterSuggestions } from "Components/ArtworkFilter/Utils/fetchArtworkFilterSuggestions"
import { mapFilterSuggestion } from "Components/ArtworkFilter/Utils/mapFilterSuggestion"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type React from "react"
import { useEffect, useRef, useState } from "react"

// Below this many results we relax one hard filter and say so, mirroring the
// "only N results matched" behavior in the design.
const LOOSEN_BELOW = 15

// We have no per-filter confidence from the parser, so we relax the field the
// design relaxes first — size — then price. Everything else stays strict.
const LOOSEN_ORDER = ["sizes", "priceRange"] as const

interface AskBarProps {
  // Live result count from the surrounding grid; drives the loosening copy.
  total?: number
}

export const AskBar: React.FC<AskBarProps> = ({ total }) => {
  const { relayEnvironment } = useSystemContext()
  const { setFilter, setFilters } = useArtworkFilterContext()
  const currentFilters = useCurrentlySelectedFilters()

  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState<ArtworkFilterSuggestion | null>(
    null,
  )
  const [loosenedFields, setLoosenedFields] = useState<string[]>([])
  const [message, setMessage] = useState<string | null>(null)

  // One loosening pass per Ask. Keyed by the query we last acted on.
  const loosenedForQuery = useRef<string | null>(null)

  const applyStrict = (parsed: ArtworkFilterSuggestion) => {
    const mapped = mapFilterSuggestion(parsed)
    if (setFilters) setFilters({ ...currentFilters, ...mapped })
  }

  const handleAsk = async () => {
    const query = value.trim()
    if (!query || loading) return

    setLoading(true)
    setMessage(null)
    setLoosenedFields([])
    loosenedForQuery.current = null

    const parsed = await fetchArtworkFilterSuggestions(relayEnvironment, query)

    if (!parsed || parsed.fellOpen) {
      // Fail open: plain keyword search, no structured filters, no panel.
      setSuggestion(null)
      setFilter("keyword", query)
      setMessage("Showing keyword results.")
    } else {
      setSuggestion(parsed)
      applyStrict(parsed)
    }

    setLoading(false)
  }

  // Relax one hard filter when the strict set came back too small.
  useEffect(() => {
    if (!suggestion || total == null || setFilters == null) return
    if (loosenedForQuery.current === suggestion.keyword) return
    if (total >= LOOSEN_BELOW) return

    const field = LOOSEN_ORDER.find(f => suggestion.filters?.[f] != null)
    if (!field) return

    loosenedForQuery.current = suggestion.keyword ?? ""

    const relaxed = mapFilterSuggestion(suggestion)
    delete (relaxed as Record<string, unknown>)[
      field === "sizes" ? "sizes" : "priceRange"
    ]
    setFilters({ ...currentFilters, ...relaxed })
    setLoosenedFields([field])
    setMessage(
      `Only ${total} result${total === 1 ? "" : "s"} matched every hard filter, so we loosened ${
        field === "sizes" ? "size" : "price"
      } — the one we're least sure you meant literally.`,
    )
    // currentFilters is intentionally excluded: we only want this to run in
    // response to a fresh result count, not on every filter mutation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestion, total])

  const understood = suggestion
    ? buildUnderstoodAs(suggestion, { loosenedFields })
    : null
  const hasPanel = !!understood && (understood.chips.length > 0 || understood.vibe)

  return (
    <Box>
      <Flex alignItems="center" gap={1}>
        <Input
          flex={1}
          value={value}
          placeholder="Describe what you're looking for"
          onChange={event => setValue(event.currentTarget.value)}
          onKeyDown={event => {
            if (event.key === "Enter") handleAsk()
          }}
          data-testid="askInput"
        />

        <Button
          variant="primaryBlack"
          loading={loading}
          onClick={handleAsk}
          data-testid="askButton"
        >
          ✦ Ask
        </Button>
      </Flex>

      {(hasPanel || message) && (
        <>
          <Spacer y={2} />

          <Box p={2} borderRadius={5} bg="mono100">
            <Text variant="xs" color="mono0" mb={1}>
              + UNDERSTOOD AS
            </Text>

            {hasPanel && (
              <Flex flexWrap="wrap" gap={1}>
                {understood?.chips.map((chip, index) => (
                  <Chip
                    key={`${chip.label}-${index}`}
                    loosened={chip.loosened}
                    data-testid="understoodChip"
                  >
                    {chip.label}
                  </Chip>
                ))}

                {understood?.vibe && (
                  <VibeChip data-testid="vibeChip">
                    ✦ vibe: {understood.vibe}
                  </VibeChip>
                )}
              </Flex>
            )}

            {message && (
              <>
                <Spacer y={1} />
                <Text variant="xs" color="mono30">
                  {message}
                </Text>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

const Chip: React.FC<
  React.PropsWithChildren<{ loosened?: boolean; "data-testid"?: string }>
> = ({ children, loosened, ...rest }) => (
  <Box
    px={1}
    py={0.5}
    borderRadius={15}
    border="1px solid"
    borderColor="mono60"
    {...rest}
  >
    <Text
      variant="xs"
      color="mono0"
      style={loosened ? { textDecoration: "line-through", opacity: 0.5 } : undefined}
    >
      {children}
    </Text>
  </Box>
)

const VibeChip: React.FC<
  React.PropsWithChildren<{ "data-testid"?: string }>
> = ({ children, ...rest }) => (
  <Box
    px={1}
    py={0.5}
    borderRadius={15}
    style={{ background: "linear-gradient(90deg, #6E1FFF 0%, #1FCFFF 100%)" }}
    {...rest}
  >
    <Text variant="xs" color="mono0">
      {children}
    </Text>
  </Box>
)
