import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { SortFilter } from "Components/SortFilter"
import type * as React from "react"

export const ArtworkSortFilter: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
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
