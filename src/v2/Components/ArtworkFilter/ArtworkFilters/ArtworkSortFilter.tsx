import * as React from "react"
import { SortFilter } from "v2/Components/SortFilter"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

export const ArtworkSortFilter: React.FC = () => {
  const context = useArtworkFilterContext()
  const { sortOptions, filters } = context

  console.log(filters.sort)

  return (
    <SortFilter
      sortOptions={sortOptions!}
      selected={filters?.sort!}
      onSort={sort => {
        context.setFilter("sort", sort)
      }}
    />
  )
}
