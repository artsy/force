import React from "react"
import { Checkbox, Flex, Expandable, Text } from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

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
    <Expandable mb={1} label="Size" expanded>
      <Flex flexDirection="column" alignItems="left">
        <Text variant="small" color="black60" mb={1}>
          This is based on the artwork’s average dimension.
        </Text>

        <Flex flexDirection="column">
          {sizeMap.map(({ name, displayName }, index) => {
            return (
              <Checkbox
                key={index}
                onSelect={selected => toggleSelection(selected, name)}
                selected={filterContext
                  .currentlySelectedFilters()
                  .sizes.includes(name)}
              >
                {displayName}
              </Checkbox>
            )
          })}
        </Flex>
      </Flex>
    </Expandable>
  )
}
