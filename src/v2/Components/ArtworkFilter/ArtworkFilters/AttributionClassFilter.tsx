import * as React from "react"
import { Checkbox, Flex } from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "../ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"

export const checkboxValues = [
  {
    name: "Unique",
    value: "unique",
  },
  {
    name: "Limited Edition",
    value: "limited edition",
  },
  {
    name: "Open Edition",
    value: "open edition",
  },
  {
    name: "Unknown Edition",
    value: "unknown edition",
  },
]

export interface AttributionClassFilterProps {
  expanded?: boolean
}

export const AttributionClassFilter: React.FC<AttributionClassFilterProps> = ({
  expanded,
}) => {
  const { setFilter } = useArtworkFilterContext()
  const { attributionClass = [] } = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.attributionClass
  )
  const label = `Rarity${filtersCount}`

  const toggleSelection = (selected, name) => {
    let updatedValues = attributionClass

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    setFilter("attributionClass", updatedValues)
  }

  return (
    <FilterExpandable label={label} expanded={expanded}>
      <Flex flexDirection="column">
        {checkboxValues.map(({ name, value }, index) => {
          return (
            <Checkbox
              key={index}
              my={1}
              onSelect={selected => toggleSelection(selected, value)}
              selected={attributionClass.includes(value)}
            >
              {name}
            </Checkbox>
          )
        })}
      </Flex>
    </FilterExpandable>
  )
}
