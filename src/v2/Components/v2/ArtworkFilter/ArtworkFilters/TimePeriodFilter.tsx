import { Checkbox, Flex, Toggle } from "@artsy/palette"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

interface TimePeriodFilterProps {
  expanded?: boolean
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

  return (
    <Toggle label="Time period" expanded={expanded}>
      <Flex flexDirection="column">
        {periods.map(({ name }, index) => {
          const selected = currentFilters.majorPeriods.includes(name)
          const props = {
            key: index,
            onSelect: selected => {
              togglePeriodSelection(selected, name)
            },
            selected,
          }
          return (
            <Checkbox {...props}>
              <OptionText>{name}</OptionText>
            </Checkbox>
          )
        })}
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
