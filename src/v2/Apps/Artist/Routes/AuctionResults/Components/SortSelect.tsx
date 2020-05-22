import { SelectSmall } from "@artsy/palette"
import React from "react"
import { useAuctionResultsFilterContext } from "../AuctionResultsFilterContext"

// TODO: move this to sortOptions?
const SORTS = [
  {
    value: "DATE_DESC",
    text: "Sale Date (Most recent)",
  },
  {
    value: "ESTIMATE_AND_DATE_DESC",
    text: "Estimate",
  },
  {
    value: "PRICE_AND_DATE_DESC",
    text: "Sale price",
  },
]

export const SortSelect = () => {
  const filterContext = useAuctionResultsFilterContext()

  return (
    <SelectSmall
      options={SORTS}
      selected={filterContext.filters.sort}
      onSelect={sort => {
        filterContext.setFilter("sort", sort)
      }}
    />
  )
}
