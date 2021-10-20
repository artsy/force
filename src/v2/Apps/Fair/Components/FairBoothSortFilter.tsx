import * as React from "react";
import { SortFilter } from "v2/Components/SortFilter"
import { useBoothsFilterContext } from "./BoothFilterContext"

export const FairBoothSortFilter: React.FC = () => {
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
