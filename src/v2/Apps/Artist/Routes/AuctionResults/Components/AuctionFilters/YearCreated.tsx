import { useMemo } from "react"
import * as React from "react"
import { Box, Checkbox, Flex, Select, Spacer } from "@artsy/palette"
import { FilterResetLink } from "v2/Components/FilterResetLink"
import createLogger from "v2/Utils/logger"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "../../AuctionResultsFilterContext"
import { FilterExpandable } from "v2/Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "v2/Components/ArtworkFilter/ArtworkFilters/ShowMore"

const log = createLogger(
  "Artist/Routes/AuctionResults/Components/AuctionFilters/YearCreated.tsx"
)

const buildDateRange = (startYear: number, endYear: number) =>
  [...Array(1 + endYear - startYear).keys()].map(yearNum => {
    const year = `${yearNum + startYear}`
    return {
      text: year,
      value: year,
    }
  })

export const YearCreated: React.FC = () => {
  const {
    setFilter,
    earliestCreatedYear,
    latestCreatedYear,
  } = useAuctionResultsFilterContext()
  const {
    createdAfterYear,
    createdBeforeYear,
    allowEmptyCreatedDates,
  } = useCurrentlySelectedFiltersForAuctionResults()

  const hasChanges =
    earliestCreatedYear !== createdAfterYear ||
    latestCreatedYear !== createdBeforeYear

  const fullDateRange = useMemo(() => {
    if (earliestCreatedYear && latestCreatedYear) {
      return buildDateRange(earliestCreatedYear, latestCreatedYear)
    } else {
      return []
    }
  }, [earliestCreatedYear, latestCreatedYear])

  const resetFilter = useMemo(
    () => () => {
      setFilter?.("createdAfterYear", earliestCreatedYear)
      setFilter?.("createdBeforeYear", latestCreatedYear)
    },
    [earliestCreatedYear, latestCreatedYear, setFilter]
  )

  if (
    typeof earliestCreatedYear !== "number" ||
    typeof latestCreatedYear !== "number"
  ) {
    log.error("Couldn't display year created filter due to missing data")
    return null
  }

  return (
    <FilterExpandable label="Year Created" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          <Flex>
            <Select
              title="Earliest"
              options={fullDateRange}
              onSelect={(year: string) => {
                setFilter?.("createdAfterYear", parseInt(year))
              }}
              selected={`${createdAfterYear}`}
            />
            <Spacer mr={1} />
            <Select
              title="Latest"
              options={fullDateRange}
              onSelect={(year: string) => {
                setFilter?.("createdBeforeYear", parseInt(year))
              }}
              selected={`${createdBeforeYear}`}
            />
          </Flex>
          {hasChanges && (
            <Box my={0.5}>
              <FilterResetLink onReset={resetFilter} hasChanges={hasChanges} />
            </Box>
          )}
          <Spacer mt={1} />
          <Checkbox
            selected={allowEmptyCreatedDates}
            onSelect={(allowEmpty: boolean) => {
              setFilter?.("allowEmptyCreatedDates", allowEmpty)
            }}
          >
            Include unspecified dates
          </Checkbox>
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
