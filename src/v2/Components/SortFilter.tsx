import { Box, Flex, Select } from "@artsy/palette"
import React from "react"

export type SortOptions = Array<{
  value: string
  text: string
}>

interface SortFilterProps {
  sortOptions: SortOptions
  selected: string
  onSort: (sort: string) => void
}

export const SortFilter: React.FC<SortFilterProps> = ({
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
