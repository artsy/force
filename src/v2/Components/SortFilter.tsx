import { Box, Flex, Select } from "@artsy/palette"
import React from "react"

export const SortFilter: React.FC<any> = ({
  sortOptions,
  selected,
  onSort,
}) => {
  if (!sortOptions) {
    return null
  }

  return (
    <Flex justifyContent={["space-between", "flex-end"]} alignItems="center">
      <Box>
        <Select
          variant="inline"
          title="Sort:"
          options={sortOptions}
          selected={selected}
          onSelect={onSort}
        />
      </Box>
    </Flex>
  )
}
