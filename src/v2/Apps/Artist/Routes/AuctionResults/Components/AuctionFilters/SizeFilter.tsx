import { Checkbox, Flex, Text } from "@artsy/palette"
import React from "react"
import { FilterExpandable } from "v2/Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { ShowMore } from "v2/Components/ArtworkFilter/ArtworkFilters/ShowMore"

const sizeMap = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40 – 100cm)", name: "MEDIUM" },
  { displayName: "Large (over 100cm)", name: "LARGE" },
]

type BaseFilterContext<T> = () => {
  filters?: any
  setFilter: (key: string, value: any) => void
}

/**
 * Note: This implementation was cloned to:
 * src/v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter.tsx
 */
export const SizeFilter: React.FC<{
  useFilterContext: BaseFilterContext<{ sizes: string[] }>
}> = ({ useFilterContext }) => {
  const filterContext = useFilterContext()

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
              onSelect: selected => {
                toggleSelection(selected, name)
              },
              my: 1,
              selected: filterContext.filters.sizes.includes(name),
            }
            return <Checkbox {...props}>{displayName}</Checkbox>
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
