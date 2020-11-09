import { Flex, Radio, RadioGroup, Toggle } from "@artsy/palette"
import React, { FC } from "react"
import { get } from "v2/Utils/get"
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

  const selectedPeriod = get(
    filterContext.currentlySelectedFilters(),
    f => f.majorPeriods[0] || ""
  )

  return (
    <Toggle label="Time period" expanded={expanded}>
      <Flex flexDirection="column">
        <RadioGroup
          deselectable
          defaultValue={selectedPeriod}
          onSelect={selectedOption => {
            filterContext.setFilter("majorPeriods", selectedOption)
          }}
        >
          {periods.map((timePeriod, index) => {
            return (
              <Radio
                my={0.3}
                value={timePeriod.name}
                key={index}
                label={<OptionText>{timePeriod.name}</OptionText>}
              />
            )
          })}
        </RadioGroup>
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
