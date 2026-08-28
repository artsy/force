import { Box, Separator, Spinner, Text } from "@artsy/palette"
import { buildUrlForCollectApp } from "Apps/Collect/Utils/urlBuilder"
import { SendFeedback } from "Apps/Search/Components/SendFeedback"
import {
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { fetchArtworkFilterSuggestions } from "Components/ArtworkFilter/Utils/fetchArtworkFilterSuggestions"
import { isDefaultFilter } from "Components/ArtworkFilter/Utils/isDefaultFilter"
import { mapFilterSuggestion } from "Components/ArtworkFilter/Utils/mapFilterSuggestion"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useFlag } from "@unleash/proxy-client-react"
import type { FC } from "react"
import { useEffect, useRef, useState } from "react"

interface ZeroStateProps {
  term: string
}

/**
 * Not filters the user chose: `term` is the search itself, and page/sort come
 * with the route. The context's own `hasFilters` counts all three, so it is
 * always true on a search page.
 */
const IGNORED_FILTERS = ["term", "page", "sort"]

const hasUserAppliedFilters = (filters: ArtworkFilters): boolean => {
  return Object.entries(filters).some(([key, value]) => {
    if (IGNORED_FILTERS.includes(key)) return false

    return !isDefaultFilter(key as keyof ArtworkFilters, value)
  })
}

export const ZeroState: FC<React.PropsWithChildren<ZeroStateProps>> = ({
  term,
}) => {
  const { hasFilters, filters, setFilters } = useArtworkFilterContext()
  const currentFilters = useCurrentlySelectedFilters()
  const { relayEnvironment } = useSystemContext()
  const { router } = useRouter()

  const isNLSearchEnabled = useFlag("onyx_nl-search")

  const searchTerm = filters?.term ?? term

  // We won't override filters the user chose themselves
  const shouldInterpret =
    isNLSearchEnabled && !!searchTerm && !hasUserAppliedFilters(currentFilters)

  // Seeded so the first render is already blank — announcing "no results" and
  // then replacing it reads worse than showing nothing
  const [isInterpreting, setIsInterpreting] = useState(shouldInterpret)

  // One attempt per term, so applied filters that also return nothing don't
  // start the request over
  const attemptedTermRef = useRef<string | null>(null)

  // Read at apply time rather than effect-setup time, so the merge uses the
  // filters as they are when the suggestion lands
  const currentFiltersRef = useRef(currentFilters)
  currentFiltersRef.current = currentFilters

  // SystemContext rebuilds the environment on render unless one is passed in,
  // so depending on its identity would restart the effect and cancel the
  // in-flight request. It's a service, not data — read it when firing.
  const relayEnvironmentRef = useRef(relayEnvironment)
  relayEnvironmentRef.current = relayEnvironment

  useEffect(() => {
    if (!shouldInterpret) return
    if (attemptedTermRef.current === searchTerm) return

    attemptedTermRef.current = searchTerm

    let isStale = false

    const interpret = async () => {
      const suggestion = await fetchArtworkFilterSuggestions({
        relayEnvironment: relayEnvironmentRef.current,
        query: searchTerm,
      })

      if (isStale) return

      // Nothing usable — fall back to the ordinary zero state
      if (!suggestion || suggestion.fellOpen) {
        setIsInterpreting(false)
        return
      }

      const mapped = mapFilterSuggestion(suggestion)

      if (Object.keys(mapped).length === 0) {
        setIsInterpreting(false)
        return
      }

      // Inside the artworks route the grid re-queries itself. When the whole
      // search came back empty there is no grid, so send them to the filtered
      // collect page rather than leaving a dead end.
      if (setFilters) {
        setFilters({ ...currentFiltersRef.current, ...mapped })
        return
      }

      router.push(buildUrlForCollectApp(mapped as ArtworkFilters))
    }

    interpret()

    return () => {
      isStale = true
    }
  }, [shouldInterpret, setFilters, searchTerm, router])

  // Interpreting either fills the grid below or redirects to /collect. A
  // spinner makes the wait — and the redirect that may follow it — read as
  // deliberate rather than as a page glitching.
  if (isInterpreting) {
    return (
      <Box
        height={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
        data-testid="zeroStateInterpreting"
      >
        <Spinner />
      </Box>
    )
  }

  return (
    <>
      <Text variant={["lg-display", "xl"]}>
        {hasFilters ? (
          "No results found."
        ) : (
          <>
            No results found for
            <Box as="span" color="blue100">
              {" "}
              “{searchTerm}”
            </Box>
          </>
        )}
      </Text>

      <Text variant={["lg-display", "xl"]} color="mono60">
        {hasFilters
          ? "Try removing some filters or try another search term."
          : "Try checking for spelling errors or try another search term."}
      </Text>

      <Separator my={4} />

      <SendFeedback />
    </>
  )
}
