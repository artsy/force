import { Checkbox, Flex, useThemeConfig } from "@artsy/palette"
import { FC } from "react"
import { intersection } from "lodash"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"
import { INITIAL_ITEMS_TO_SHOW, ShowMore } from "./ShowMore"
import { sortResults } from "./ResultsFilter"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"

export interface TimePeriodFilterProps {
  expanded?: boolean // set to true to force expansion
}

export const getTimePeriodToDisplay = period =>
  isNaN(period) ? period : `${period}s`

export const TimePeriodFilter: FC<TimePeriodFilterProps> = ({ expanded }) => {
  const {
    aggregations,
    selectedFiltersCounts,
    ...filterContext
  } = useArtworkFilterContext()
  const timePeriods = aggregations?.find(agg => agg.slice === "MAJOR_PERIOD")

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.timePeriod
  )
  const label = `Time Period${filtersCount}`

  let periods
  if (timePeriods && timePeriods.counts) {
    periods = timePeriods.counts.filter(timePeriod => {
      return allowedPeriods.includes(timePeriod.name)
    })
  } else {
    periods = allowedPeriods.map(name => ({ name, value: name }))
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  if (!periods.length) return null

  const togglePeriodSelection = (selected, period) => {
    let majorPeriods =
      filterContext.currentlySelectedFilters?.()?.majorPeriods?.slice() ?? []
    if (selected) {
      majorPeriods.push(period)
    } else {
      majorPeriods = majorPeriods.filter(item => item !== period)
    }
    filterContext.setFilter("majorPeriods", majorPeriods)
  }

  const currentFilters = filterContext.currentlySelectedFilters?.()
  const hasBelowTheFoldMajorPeriodFilter =
    intersection(
      currentFilters?.majorPeriods ?? [],
      periods.slice(INITIAL_ITEMS_TO_SHOW).map(({ name }) => name)
    ).length > 0
  const hasMajorPeriodFilter = (currentFilters?.majorPeriods?.length ?? 0) > 0

  const resultsSorted = sortResults(currentFilters?.majorPeriods ?? [], periods)

  return (
    <FilterExpandable label={label} expanded={hasMajorPeriodFilter || expanded}>
      <Flex flexDirection="column">
        <ShowMore expanded={hasBelowTheFoldMajorPeriodFilter}>
          {resultsSorted.map(({ name }, index) => {
            return (
              <Checkbox
                selected={currentFilters?.majorPeriods?.includes(name)}
                key={index}
                onSelect={selected => togglePeriodSelection(selected, name)}
                my={tokens.my}
              >
                {getTimePeriodToDisplay(name)}
              </Checkbox>
            )
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}

const allowedPeriods = [
  "2020",
  "2010",
  "2000",
  "1990",
  "1980",
  "1970",
  "1960",
  "1950",
  "1940",
  "1930",
  "1920",
  "1910",
  "1900",
  "Late 19th Century",
  "Mid 19th Century",
  "Early 19th Century",
  "18th Century & Earlier",
]
