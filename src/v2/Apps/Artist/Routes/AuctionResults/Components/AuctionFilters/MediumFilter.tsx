import { Box, Checkbox, Flex, Toggle } from "@artsy/palette"
import React from "react"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"

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
    let categories = filterContext.filters.categories.slice()
    if (selected) {
      categories.push(name)
    } else {
      categories = categories.filter(item => item !== name)
    }
    filterContext.setFilter("categories", categories)
  }

  return (
    <Toggle label="Medium" expanded>
      <Flex flexDirection="column" alignItems="left">
        <Box mt={0.5}>
          {categoryMap.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              key: index,
              onSelect: selected => {
                toggleSelection(selected, name)
              },
              selected: filterContext.filters.categories.includes(name),
            }
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </Box>
      </Flex>
    </Toggle>
  )
}
