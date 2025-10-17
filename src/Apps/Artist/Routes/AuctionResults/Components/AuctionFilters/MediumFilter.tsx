import { Checkbox, Flex } from "@artsy/palette"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "Components/ArtworkFilter/ArtworkFilters/ShowMore"
import type * as React from "react"

export const categoryMap = [
  { displayName: "Painting", name: "Painting" },
  { displayName: "Work on paper", name: "Work on Paper" },
  { displayName: "Sculpture", name: "Sculpture" },
  { displayName: "Print", name: "Print" },
  { displayName: "Photography", name: "Photography" },
  { displayName: "Textile arts", name: "Textile Arts" },
]

interface MediumFilterProps {
  isExpandable?: boolean
}

export const MediumFilter: React.FC<
  React.PropsWithChildren<MediumFilterProps>
> = ({ isExpandable = true }) => {
  const { setFilter } = useAuctionResultsFilterContext()
  const { categories = [] } = useCurrentlySelectedFiltersForAuctionResults()

  const toggleSelection = (selected: boolean, name: string) => {
    const nextValues = selected
      ? [...categories, name]
      : categories.filter(item => item !== name)

    setFilter("categories", nextValues)
  }

  return (
    <FilterExpandable label="Medium" expanded enabled={isExpandable}>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          {categoryMap.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              onSelect: (selected: boolean) => {
                toggleSelection(selected, name)
              },
              my: 1,
              selected: categories?.includes(name),
              testID: `medium-filter-${name}`,
            }
            return (
              <Checkbox key={index} {...props}>
                {displayName}
              </Checkbox>
            )
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
