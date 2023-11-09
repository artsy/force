import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, LabeledInput } from "@artsy/palette"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  PillType,
  TOP_PILL,
  SEARCH_DEBOUNCE_DELAY,
} from "Components/Search/constants"
import { createRefetchContainer, RelayRefetchProp, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { SearchInputPillsFragmentContainer } from "Components/Search/SearchInputPills"
import { reportPerformanceMeasurement } from "Components/Search/utils/reportPerformanceMeasurement"
import { shouldStartSearching } from "Components/Search/utils/shouldStartSearching"
import { useDebounce } from "Utils/Hooks/useDebounce"
import { Overlay_viewer$data } from "__generated__/Overlay_viewer.graphql"
import {
  OVERLAY_CONTENT_ID,
  OverlayBase,
} from "Components/Search/Mobile/OverlayBase"
import { SearchResultsListPaginationContainer } from "./SearchResultsList"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"

const logger = createLogger("Components/Search/Mobile")

const scrollToTop = () => {
  document.querySelector(`#${OVERLAY_CONTENT_ID}`)?.scrollTo(0, 0)
}

interface OverlayProps {
  viewer: Overlay_viewer$data
  relay: RelayRefetchProp
  onClose: () => void
}

export const Overlay: FC<OverlayProps> = ({ viewer, relay, onClose }) => {
  const { t } = useTranslation()
  const tracking = useTracking()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  // TODO: Parse value from url
  const [inputValue, setInputValue] = useState("")
  const disablePills = !shouldStartSearching(inputValue)

  useEffect(() => {
    inputRef.current?.focus()

    tracking.trackEvent({
      action_type: ActionType.focusedOnSearchInput,
      context_module: selectedPill.analyticsContextModule,
    })
    // When selecting another pill - this effect shouldn't be executed again, so we disable the linting rule
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        }
      )
    },
    [relay]
  )

  const debouncedSearchRequest = useDebounce({
    callback: refetch,
    delay: SEARCH_DEBOUNCE_DELAY,
  })

  const handlePillClick = (pill: PillType) => {
    setSelectedPill(pill)
    refetch(inputValue, pill.searchEntityName)
  }

  const handleValueChange = event => {
    const value = event.target.value
    setInputValue(value)

    if (shouldStartSearching(value)) {
      debouncedSearchRequest(value, selectedPill.searchEntityName)
    }
  }

  return (
    <OverlayBase
      onClose={onClose}
      header={
        <>
          <Box mt={-15}>
            <LabeledInput
              mx={2}
              ref={inputRef}
              value={inputValue}
              placeholder={t`navbar.searchArtsy`}
              label={<SearchIcon fill="black60" aria-hidden size={18} />}
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
      {shouldStartSearching(inputValue) && (
        <SearchResultsListPaginationContainer
          viewer={viewer}
          query={inputValue}
          selectedPill={selectedPill}
          onClose={onClose}
        />
      )}
    </OverlayBase>
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
        ) {
        ...SearchInputPills_viewer @arguments(term: $term)
        ...SearchResultsList_viewer
          @arguments(term: $term, entities: $entities)
          @include(if: $hasTerm)
      }
    `,
  },
  graphql`
    query OverlayRefetchQuery(
      $term: String!
      $hasTerm: Boolean!
      $entities: [SearchEntity]
    ) {
      viewer {
        ...Overlay_viewer
          @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
      }
    }
  `
)
