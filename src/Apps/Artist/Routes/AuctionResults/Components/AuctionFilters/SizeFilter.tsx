import * as React from "react"
import { Checkbox, Flex, Radio, RadioGroup, Text } from "@artsy/palette"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "../../AuctionResultsFilterContext"
import { Metric } from "Utils/metrics"

export const sizeMap = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40 – 100cm)", name: "MEDIUM" },
  { displayName: "Large (over 100cm)", name: "LARGE" },
]

export const sizeMapInInches = [
  { displayName: "Small (under 16in)", name: "SMALL" },
  { displayName: "Medium (16 – 40in)", name: "MEDIUM" },
  { displayName: "Large (over 40in)", name: "LARGE" },
]

/**
 * Note: This implementation was cloned to:
 * src/Components/ArtworkFilter/ArtworkFilters/SizeFilter.tsx
 */
export const SizeFilter: React.FC = () => {
  const { setFilter } = useAuctionResultsFilterContext()
  const { sizes = [], metric } = useCurrentlySelectedFiltersForAuctionResults()
  const options = metric === "in" ? sizeMapInInches : sizeMap

  const toggleSelection = (selected: boolean, name: string) => {
    let updatedValues = sizes

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    setFilter?.("sizes", updatedValues)
  }

  const handleSelectMetric = (nextMetric: Metric) => {
    if (metric === nextMetric) {
      return
    }

    setFilter?.("metric", nextMetric)
  }

  return (
    <FilterExpandable label="Size" expanded>
      <Flex flexDirection="column" alignItems="left">
        <Text variant="sm">
          This is based on the artwork’s average dimension.
        </Text>

        <RadioGroup
          defaultValue={metric}
          onSelect={handleSelectMetric}
          flexDirection="row"
          my={2}
        >
          <Radio value="cm" label="cm" flex={1} />
          <Radio value="in" label="in" flex={1} />
        </RadioGroup>

        <ShowMore>
          {options.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              key: index,
              onSelect: (selected: boolean) => {
                toggleSelection(selected, name)
              },
              my: 1,
              selected: sizes.includes(name),
              testID: `size-filter-${name}`,
            }
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
