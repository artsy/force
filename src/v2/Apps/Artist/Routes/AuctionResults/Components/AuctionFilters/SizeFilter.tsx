import { Box, Checkbox, Flex, Sans, Toggle } from "@artsy/palette"
import React from "react"

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
 * src/v2/Components/v2/ArtworkFilter/ArtworkFilters/SizeFilter.tsx
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
