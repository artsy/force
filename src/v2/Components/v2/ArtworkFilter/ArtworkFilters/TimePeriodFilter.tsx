import { Checkbox, Flex, Toggle } from "@artsy/palette"
import React, { FC } from "react"
import { intersection } from "underscore"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"
import { INITIAL_ITEMS_TO_SHOW, ShowMore } from "./ShowMore"

interface TimePeriodFilterProps {
  expanded?: boolean // set to true to force expansion
}

export const TimePeriodFilter: FC<TimePeriodFilterProps> = ({
  expanded = false,
}) => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const timePeriods = aggregations.find(agg => agg.slice === "MAJOR_PERIOD")

  let periods
  if (timePeriods && timePeriods.counts) {
    periods = timePeriods.counts.filter(timePeriod => {
      return allowedPeriods.includes(timePeriod.name)
    })
  } else {
    periods = allowedPeriods.map(name => ({ name }))
  }

  const togglePeriodSelection = (selected, period) => {
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

  const currentFilters = filterContext.currentlySelectedFilters()
  const hasBelowTheFoldMajorPeriodFilter =
    intersection(
      currentFilters.majorPeriods,
      periods.slice(INITIAL_ITEMS_TO_SHOW).map(({ name }) => name)
    ).length > 0
  const hasMajorPeriodFilter = currentFilters.majorPeriods.length > 0

  return (
    <Toggle label="Time period" expanded={hasMajorPeriodFilter || expanded}>
      <Flex flexDirection="column">
        <ShowMore expanded={hasBelowTheFoldMajorPeriodFilter}>
          {periods.map(({ name }, index) => {
            return (
              <Checkbox
                selected={currentFilters.majorPeriods.includes(name)}
                key={index}
                onSelect={selected => togglePeriodSelection(selected, name)}
              >
                <OptionText>{name}</OptionText>
              </Checkbox>
            )
          })}
        </ShowMore>
      </Flex>
    </Toggle>
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
