import { Box, Checkbox, Flex, Sans, Toggle } from "@artsy/palette"
import React from "react"
import { useAuctionResultsFilterContext } from "../../AuctionResultsFilterContext"

const sizeMap = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40–70cm)", name: "MEDIUM" },
  { displayName: "Large (over 70cm)", name: "LARGE" },
]

export const SizeFilter: React.FC = () => {
  const filterContext = useAuctionResultsFilterContext()

  const toggleSelection = (selected, name) => {
    let sizes = filterContext.filters.sizes.slice()
    if (selected) {
      sizes.push(name)
    } else {
      sizes = sizes.filter(item => item !== name)
    }
    filterContext.setFilter("sizes", sizes)
  }

  return (
    <Toggle label="Size" expanded>
      <Flex flexDirection="column" alignItems="left">
        <Sans size="2" color="black60">
          This is based on the artwork’s average dimension.
        </Sans>
        <Box mt={0.25}>
          {sizeMap.map((checkbox, index) => {
            const { name, displayName } = checkbox
            const props = {
              key: index,
              onSelect: selected => {
                toggleSelection(selected, name)
              },
              selected: filterContext.filters.sizes.includes(name),
            }
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </Box>
      </Flex>
    </Toggle>
  )
}
