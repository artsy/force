import * as React from "react"
import { Checkbox, Flex, Text } from "@artsy/palette"
import { FilterExpandable } from "v2/Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "v2/Components/ArtworkFilter/ArtworkFilters/ShowMore"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "../../AuctionResultsFilterContext"

export const sizeMap = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40 – 100cm)", name: "MEDIUM" },
  { displayName: "Large (over 100cm)", name: "LARGE" },
]

/**
 * Note: This implementation was cloned to:
 * src/v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter.tsx
 */
export const SizeFilter: React.FC = () => {
  const { setFilter } = useAuctionResultsFilterContext()
  const { sizes = [] } = useCurrentlySelectedFiltersForAuctionResults()

  const toggleSelection = (selected: boolean, name: string) => {
    let updatedValues = sizes

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    setFilter?.("sizes", updatedValues)
  }

  return (
    <FilterExpandable label="Size" expanded>
      <Flex flexDirection="column" alignItems="left">
        <Text variant="sm">
          This is based on the artwork’s average dimension.
        </Text>
        <ShowMore>
          {sizeMap.map((checkbox, index) => {
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
