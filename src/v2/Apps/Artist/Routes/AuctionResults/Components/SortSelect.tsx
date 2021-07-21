import { Select, SelectProps } from "@artsy/palette"
import React from "react"
import { Media } from "v2/Utils/Responsive"
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

  const props: SelectProps = {
    width: "auto",
    variant: "inline",
    options: SORTS,
    selected: filterContext?.filters?.sort,
    onSelect: sort => {
      filterContext.setFilter?.("sort", sort)
    },
  }
  return (
    <>
      <Media at="xs">
        <Select {...props} />
      </Media>
      <Media greaterThan="xs">
        <Select {...props} title="Sort:" />
      </Media>
    </>
  )
}
