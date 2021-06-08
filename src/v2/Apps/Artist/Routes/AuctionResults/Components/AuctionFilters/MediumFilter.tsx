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
  const filterContext = useAuctionResultsFilterContext()

  const toggleSelection = (selected, name) => {
    // @ts-expect-error STRICT_NULL_CHECK
    let categories = filterContext.filters.categories.slice()
    if (selected) {
      categories.push(name)
    } else {
      categories = categories.filter(item => item !== name)
    }
    filterContext.setFilter("categories", categories)
  }

  return (
    <FilterExpandable label="Medium" expanded>
      <Flex flexDirection="column" alignItems="left">
        <ShowMore>
          {categoryMap.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              key: index,
              onSelect: selected => {
                toggleSelection(selected, name)
              },
              my: 1,
              // @ts-expect-error STRICT_NULL_CHECK
              selected: filterContext.filters.categories.includes(name),
            }
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
