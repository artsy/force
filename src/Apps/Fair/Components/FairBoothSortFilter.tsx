import { SortFilter } from "Components/SortFilter"
import type * as React from "react"
import { useBoothsFilterContext } from "./BoothFilterContext"

export const FairBoothSortFilter: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const context = useBoothsFilterContext()
  const { sortOptions, filters, setFilter } = context

  return (
    <SortFilter
      sortOptions={sortOptions!}
      selected={filters?.sort!}
      onSort={sort => {
        setFilter("sort", sort)
      }}
    />
  )
}
