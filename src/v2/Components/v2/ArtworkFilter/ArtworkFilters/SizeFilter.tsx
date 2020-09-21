import React from "react"
import { Box, Checkbox, Flex, Sans, Toggle } from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

const sizeMap = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40 – 100cm)", name: "MEDIUM" },
  { displayName: "Large (over 100cm)", name: "LARGE" },
]

/**
 * Note: This is a clone of the implementation at
 * src/v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/SizeFilter.tsx
 * adapted to work with the common ArtworkFilter.
 */
export const SizeFilter: React.FC = () => {
  const filterContext = useArtworkFilterContext()

  const toggleSelection = (selected, name) => {
    let sizes = filterContext.currentlySelectedFilters().sizes.slice()
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
              selected: filterContext
                .currentlySelectedFilters()
                .sizes.includes(name),
            }
            return (
              <Checkbox {...props}>
                <OptionText>{displayName}</OptionText>
              </Checkbox>
            )
          })}
        </Box>
      </Flex>
    </Toggle>
  )
}
