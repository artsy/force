import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, LabeledInput } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { type FC, useCallback, useEffect, useRef, useState } from "react"

import { ActionType } from "@artsy/cohesion"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import {
  OVERLAY_CONTENT_ID,
  OverlayBase,
} from "Components/Search/Mobile/OverlayBase"
import { SearchInputPillsFragmentContainer } from "Components/Search/SearchInputPills"
import { TrendingSearches } from "Components/Search/TrendingSearches/TrendingSearches"
import {
  type PillType,
  SEARCH_DEBOUNCE_DELAY,
  TOP_PILL,
} from "Components/Search/constants"
import { useTrendingImpressionSession } from "Components/Search/hooks/useTrendingImpressionSession"
import { reportPerformanceMeasurement } from "Components/Search/utils/reportPerformanceMeasurement"
import { shouldStartSearching } from "Components/Search/utils/shouldStartSearching"
import createLogger from "Utils/logger"
import type { Overlay_viewer$data } from "__generated__/Overlay_viewer.graphql"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import { useTracking } from "react-tracking"
import { useDebounce } from "use-debounce"
import { SearchResultsListPaginationContainer } from "./SearchResultsList"

const logger = createLogger("Components/Search/Mobile")

const scrollToTop = () => {
  document.querySelector(`#${OVERLAY_CONTENT_ID}`)?.scrollTo(0, 0)
}

interface OverlayProps {
  viewer: Overlay_viewer$data
  relay: RelayRefetchProp
  onClose: () => void
  variant?: string
}

export const Overlay: FC<React.PropsWithChildren<OverlayProps>> = ({
  viewer,
  relay,
  onClose,
  variant,
}) => {
  const tracking = useTracking()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  // TODO: Parse value from url
  const [inputValue, setInputValue] = useState("")
  const [debouncedValue] = useDebounce(inputValue, SEARCH_DEBOUNCE_DELAY)
  const disablePills = !shouldStartSearching(inputValue)

  // biome-ignore lint/correctness/useExhaustiveDependencies: Should only focus and track once on mount, not re-run when pill changes
  const inputCallbackRef = useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node
    if (node) {
      node.focus()
      tracking.trackEvent({
        action_type: ActionType.focusedOnSearchInput,
        context_module: selectedPill.analyticsContextModule,
      })
    }
  }, [])

  useEffect(() => {
    if (shouldStartSearching(debouncedValue)) {
      refetch(debouncedValue, selectedPill.searchEntityName)
    }
  }, [debouncedValue, selectedPill.searchEntityName])

  // Dismiss the keyboard as soon as the user drags the overlay content
  // (Eigen's keyboardDismissMode="on-drag"). On iOS the keyboard overlays
  // the fixed-position overlay without resizing it, leaving the bottom half
  // of the content unreachable while the keyboard is up. Listens on document
  // because ModalBase portals its content in after mount; the content element
  // is resolved at event time.
  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      const input = inputRef.current

      if (!input || document.activeElement !== input) return

      const content = document.getElementById(OVERLAY_CONTENT_ID)

      if (content?.contains(event.target as Node)) {
        input.blur()
      }
    }

    document.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const refetch = useCallback(
    (value: string, entity?: string) => {
      const entities = entity ? [entity] : []
      const performanceStart = performance?.now()

      relay.refetch(
        {
          hasTerm: true,
          term: value,
          entities: entities,
          variant,
        },
        null,
        error => {
          if (error) {
            logger.error(error)
            return
          }

          if (performance) {
            reportPerformanceMeasurement(performanceStart)
          }

          scrollToTop()
        },
      )
    },
    [relay, variant],
  )

  const handlePillClick = (pill: PillType) => {
    setSelectedPill(pill)
  }

  const handleValueChange = event => {
    const value = event.target.value
    setInputValue(value)
  }

  // Kill switch: with the flag off, the search overlay behaves as it did
  // before the trending panel existed.
  const isTrendingEnabled = useFlag("onyx_trending-searches")

  const shouldTrackTrendingImpressions = useTrendingImpressionSession({
    isPanelVisible: isTrendingEnabled && !shouldStartSearching(inputValue),
    // The overlay unmounts on close, so the session spans its whole lifetime
    isSessionActive: true,
  })

  // Hosts the save-to-lists state, modal, and toast action used by the
  // trending panel's artwork save buttons (kept above the trending panel so
  // the modal survives the panel swapping out when the user starts typing).
  return (
    <ManageArtworkForSavesProvider>
      <OverlayBase
        onClose={onClose}
        header={
          <>
            <Box mt={-15}>
              <LabeledInput
                mx={2}
                ref={inputCallbackRef}
                value={inputValue}
                placeholder="Search Artsy"
                label={<SearchIcon fill="mono60" aria-hidden size={18} />}
                onChange={handleValueChange}
              />
            </Box>

            {shouldStartSearching(inputValue) && (
              <SearchInputPillsFragmentContainer
                onPillClick={handlePillClick}
                viewer={viewer}
                selectedPill={selectedPill}
                enableChevronNavigation={false}
                forceDisabled={disablePills}
              />
            )}
          </>
        }
      >
        {shouldStartSearching(inputValue) ? (
          <SearchResultsListPaginationContainer
            viewer={viewer}
            query={inputValue}
            selectedPill={selectedPill}
            onClose={onClose}
          />
        ) : (
          isTrendingEnabled && (
            <TrendingSearches
              onNavigate={onClose}
              shouldTrackImpressions={shouldTrackTrendingImpressions}
            />
          )
        )}
      </OverlayBase>
    </ManageArtworkForSavesProvider>
  )
}

export const OverlayRefetchContainer = createRefetchContainer(
  Overlay,
  {
    viewer: graphql`
      fragment Overlay_viewer on Viewer
      @argumentDefinitions(
        term: { type: "String!", defaultValue: "" }
        hasTerm: { type: "Boolean!", defaultValue: false }
        entities: { type: "[SearchEntity]" }
        variant: { type: "String" }
      ) {
        ...SearchInputPills_viewer @arguments(term: $term)
        ...SearchResultsList_viewer
          @arguments(term: $term, entities: $entities, variant: $variant)
          @include(if: $hasTerm)
      }
    `,
  },
  graphql`
    query OverlayRefetchQuery(
      $term: String!
      $hasTerm: Boolean!
      $entities: [SearchEntity]
      $variant: String
    ) {
      viewer {
        ...Overlay_viewer
          @arguments(
            term: $term
            hasTerm: $hasTerm
            entities: $entities
            variant: $variant
          )
      }
    }
  `,
)
