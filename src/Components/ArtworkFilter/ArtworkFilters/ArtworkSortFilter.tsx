import * as React from "react"
import { SortFilter } from "Components/SortFilter"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

export const ArtworkSortFilter: React.FC = () => {
  const context = useArtworkFilterContext()
  const { sortOptions, filters } = context

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
