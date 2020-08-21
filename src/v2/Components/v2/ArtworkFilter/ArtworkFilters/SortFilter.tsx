import { SelectSmall } from "@artsy/palette/dist/elements/Select"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import { Box } from "@artsy/palette/dist/elements/Box"
import React from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

export const SortFilter: React.FC = () => {
  const context = useArtworkFilterContext()

  if (!context.sortOptions) {
    return null
  }

  return (
    <Flex justifyContent={["space-between", "flex-end"]} alignItems="center">
      <Box>
        <SelectSmall
          options={context.sortOptions}
          selected={context.filters.sort}
          title="Sort"
          onSelect={sort => {
            context.setFilter("sort", sort)
          }}
        />
      </Box>
    </Flex>
  )
}
