import { Checkbox, Flex, useThemeConfig } from "@artsy/palette"
import React, { FC } from "react"
import { intersection } from "lodash"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"
import { INITIAL_ITEMS_TO_SHOW, ShowMore } from "./ShowMore"
import { sortResults } from "./ResultsFilter"

export interface TimePeriodFilterProps {
  expanded?: boolean // set to true to force expansion
}

export const TimePeriodFilter: FC<TimePeriodFilterProps> = ({ expanded }) => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  // @ts-expect-error STRICT_NULL_CHECK
  const timePeriods = aggregations.find(agg => agg.slice === "MAJOR_PERIOD")

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
    // @ts-expect-error STRICT_NULL_CHECK
    let majorPeriods = filterContext
      .currentlySelectedFilters()
      .majorPeriods.slice()
    if (selected) {
      majorPeriods.push(period)
    } else {
      majorPeriods = majorPeriods.filter(item => item !== period)
    }
    filterContext.setFilter("majorPeriods", majorPeriods)
  }

  // @ts-expect-error STRICT_NULL_CHECK
  const currentFilters = filterContext.currentlySelectedFilters()
  const hasBelowTheFoldMajorPeriodFilter =
    intersection(
      // @ts-expect-error STRICT_NULL_CHECK
      currentFilters.majorPeriods,
      periods.slice(INITIAL_ITEMS_TO_SHOW).map(({ name }) => name)
    ).length > 0
  // @ts-expect-error STRICT_NULL_CHECK
  const hasMajorPeriodFilter = currentFilters.majorPeriods.length > 0

  // @ts-expect-error STRICT_NULL_CHECK
  const resultsSorted = sortResults(currentFilters.majorPeriods, periods)

  return (
    <FilterExpandable
      label="Time period"
      expanded={hasMajorPeriodFilter || expanded}
    >
      <Flex flexDirection="column">
        <ShowMore expanded={hasBelowTheFoldMajorPeriodFilter}>
          {resultsSorted.map(({ name }, index) => {
            return (
              <Checkbox
                // @ts-expect-error STRICT_NULL_CHECK
                selected={currentFilters.majorPeriods.includes(name)}
                key={index}
                onSelect={selected => togglePeriodSelection(selected, name)}
                my={tokens.my}
              >
                {isNaN(name as any) ? name : `${name}s`}
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
