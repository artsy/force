import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, LabeledInput } from "@artsy/palette"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  PillType,
  TOP_PILL,
  SEARCH_DEBOUNCE_DELAY,
} from "Components/Search/NewSearch/constants"
import { RelayRefetchProp } from "react-relay"
import createLogger from "Utils/logger"
import { NewSearchInputPillsFragmentContainer } from "Components/Search/NewSearch/NewSearchInputPills"
import { reportPerformanceMeasurement } from "Components/Search/NewSearch/utils/reportPerformanceMeasurement"
import { shouldStartSearching } from "Components/Search/NewSearch/utils/shouldStartSearching"
import { useDebounce, useDebouncedValue } from "Utils/Hooks/useDebounce"
import { MobileSearchBar_viewer$data } from "__generated__/MobileSearchBar_viewer.graphql"
import {
  OVERLAY_CONTENT_ID,
  OverlayBase,
} from "Components/Search/NewSearch/Mobile/OverlayBase"
import { SearchResultsListQueryRenderer } from "Components/Search/NewSearch/Mobile/SearchResultsList"

const logger = createLogger("Components/Search/NewSearch/Mobile")

const scrollToTop = () => {
  document.querySelector(OVERLAY_CONTENT_ID)?.scrollTo(0, 0)
}

interface OverlayProps {
  viewer: MobileSearchBar_viewer$data
  relay: RelayRefetchProp
  onClose: () => void
}

export const Overlay: FC<OverlayProps> = ({ viewer, relay, onClose }) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  const [inputValue, setInputValue] = useState("")
  const disablePills = !shouldStartSearching(inputValue)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const { debouncedValue } = useDebouncedValue({
    value: inputValue,
    delay: SEARCH_DEBOUNCE_DELAY,
  })

  useEffect(() => {
    scrollToTop()
  }, [debouncedValue])

  const refetch = useCallback(
    (value: string, entity?: string) => {
      const entities = entity ? [entity] : []
      const performanceStart = performance && performance.now()

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

    scrollToTop()
  }

  const handleValueChange = event => {
    const value = event.target.value
    setInputValue(value)

    if (shouldStartSearching(value))
      debouncedSearchRequest(value, selectedPill.searchEntityName)
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
              label={
                <SearchIcon fill="black60" aria-hidden mr={-10} size={18} />
              }
              onChange={handleValueChange}
            />
          </Box>

          <NewSearchInputPillsFragmentContainer
            onPillClick={handlePillClick}
            viewer={viewer}
            selectedPill={selectedPill}
            enableChevronNavigation={false}
            forceDisabled={disablePills}
          />
        </>
      }
    >
      {shouldStartSearching(inputValue) && (
        <SearchResultsListQueryRenderer
          term={debouncedValue}
          hasTerm={!!debouncedValue}
          entities={
            selectedPill.searchEntityName ? [selectedPill.searchEntityName] : []
          }
          onClose={onClose}
        />
      )}
    </OverlayBase>
  )
}
