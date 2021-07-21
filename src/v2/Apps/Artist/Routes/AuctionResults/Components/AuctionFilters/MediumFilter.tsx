import { Checkbox, Flex } from "@artsy/palette"
import React from "react"
import { ShowMore } from "v2/Components/ArtworkFilter/ArtworkFilters/ShowMore"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"
import { FilterExpandable } from "v2/Components/ArtworkFilter/ArtworkFilters/FilterExpandable"

const categoryMap = [
  { displayName: "Painting", name: "Painting" },
  { displayName: "Work on paper", name: "Work on Paper" },
  { displayName: "Sculpture", name: "Sculpture" },
  { displayName: "Print", name: "Print" },
  { displayName: "Photography", name: "Photography" },
  { displayName: "Textile arts", name: "Textile Arts" },
]

export const MediumFilter: React.FC = () => {
  const {
    currentlySelectedFilters,
    setFilter,
  } = useAuctionResultsFilterContext()
  const { categories } = currentlySelectedFilters?.() || {}

  const toggleSelection = (selected: boolean, name: string) => {
    let selectedCategories = categories?.slice()
    if (selected) {
      selectedCategories?.push(name)
    } else {
      selectedCategories = selectedCategories?.filter(item => item !== name)
    }
    setFilter?.("categories", selectedCategories)
  }

  return (
    <FilterExpandable label="Medium" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          {categoryMap.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              key: index,
              onSelect: (selected: boolean) => {
                toggleSelection(selected, name)
              },
              my: 1,
              selected: categories?.includes(name),
            }
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
