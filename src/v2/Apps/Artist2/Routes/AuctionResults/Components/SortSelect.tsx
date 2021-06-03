import { Select, Flex } from "@artsy/palette"
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
    <Flex>
      <Select
        width="auto"
        variant="inline"
        title="Sort"
        options={SORTS}
        // @ts-expect-error STRICT_NULL_CHECK
        selected={filterContext.filters.sort}
        onSelect={sort => {
          filterContext.setFilter("sort", sort)
        }}
      />
    </Flex>
  )
}
