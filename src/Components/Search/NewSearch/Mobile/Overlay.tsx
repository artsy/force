import SearchIcon from "@artsy/icons/SearchIcon"
import { Box, LabeledInput, useUpdateEffect } from "@artsy/palette"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { OverlayBase } from "./OverlayBase"
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
import { useDebounce } from "Utils/Hooks/useDebounce"
import { useTracking } from "react-tracking"
import { MobileSearchBar_viewer$data } from "__generated__/MobileSearchBar_viewer.graphql"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"

const logger = createLogger("Components/Search/NewSearch/Mobile")

interface OverlayProps {
  viewer: MobileSearchBar_viewer$data
  relay: RelayRefetchProp
  onClose: () => void
}

export const Overlay: FC<OverlayProps> = ({ viewer, relay, onClose }) => {
  const { t } = useTranslation()
  const tracking = useTracking()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  const [fetchCounter, setFetchCounter] = useState(0)
  const [value, setValue] = useState("")
  const options = [] // temporary
  const disablePills = !shouldStartSearching(value)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useUpdateEffect(() => {
    tracking.trackEvent({
      action_type:
        options.length > 0
          ? DeprecatedSchema.ActionType.SearchedAutosuggestWithResults
          : DeprecatedSchema.ActionType.SearchedAutosuggestWithoutResults,
      context_module: selectedPill.analyticsContextModule,
      query: value,
    })
  }, [fetchCounter])

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

          // trigger useEffect to send tracking event
          setFetchCounter(prevCounter => prevCounter + 1)
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
    refetch(value, pill.searchEntityName)
  }

  const handleValueChange = event => {
    const inputValue = event.target.value
    setValue(inputValue)

    if (shouldStartSearching(inputValue))
      debouncedSearchRequest(inputValue, selectedPill.searchEntityName)
  }

  return (
    <OverlayBase onClose={onClose}>
      <Box mt={-15}>
        <LabeledInput
          ref={inputRef}
          value={value}
          placeholder={t`navbar.searchArtsy`}
          label={<SearchIcon fill="black60" aria-hidden mr={-10} size={18} />}
          onChange={handleValueChange}
          // px={2}
        />
      </Box>

      <NewSearchInputPillsFragmentContainer
        onPillClick={handlePillClick}
        viewer={viewer}
        selectedPill={selectedPill}
        enableChevronNavigation={false}
        forceDisabled={disablePills}
      />
    </OverlayBase>
  )
}
