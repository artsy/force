import React from "react"
import {
  Checkbox,
  Flex,
  Text,
  useThemeConfig,
  TextVariant,
} from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"

const sizeMap = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40 – 100cm)", name: "MEDIUM" },
  { displayName: "Large (over 100cm)", name: "LARGE" },
]

export interface SizeFilterProps {
  expanded?: boolean
}

/**
 * Note: This is a clone of the implementation at
 * src/v2/Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/SizeFilter.tsx
 * adapted to work with the common ArtworkFilter.
 */
export const SizeFilter: React.FC<SizeFilterProps> = ({ expanded }) => {
  const filterContext = useArtworkFilterContext()

  const toggleSelection = (selected, name) => {
    // @ts-expect-error STRICT_NULL_CHECK
    let sizes = filterContext.currentlySelectedFilters().sizes.slice()
    if (selected) {
      sizes.push(name)
    } else {
      sizes = sizes.filter(item => item !== name)
    }
    filterContext.setFilter("sizes", sizes)
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5, secondaryVariant: "small" as TextVariant },
    v3: { my: 1, secondaryVariant: "xs" as TextVariant },
  })

  return (
    <FilterExpandable label="Size" expanded={expanded}>
      <Flex flexDirection="column" alignItems="left">
        <Text variant={tokens.secondaryVariant} color="black60" mb={1}>
          This is based on the artwork’s average dimension.
        </Text>

        <Flex flexDirection="column">
          {sizeMap.map(({ name, displayName }, index) => {
            return (
              <Checkbox
                key={index}
                onSelect={selected => toggleSelection(selected, name)}
                // @ts-expect-error STRICT_NULL_CHECK
                selected={filterContext
                  .currentlySelectedFilters()
                  .sizes.includes(name)}
                my={tokens.my}
              >
                {displayName}
              </Checkbox>
            )
          })}
        </Flex>
      </Flex>
    </FilterExpandable>
  )
}
