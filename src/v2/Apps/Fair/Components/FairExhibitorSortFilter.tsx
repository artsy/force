import React from "react"
import { SortFilter } from "v2/Components/SortFilter"
import { useExhibitorsFilterContext } from "../Routes/ExhibitorFilterContext"

export const FairExhibitorSortFilter: React.FC = () => {
  const context = useExhibitorsFilterContext()
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
