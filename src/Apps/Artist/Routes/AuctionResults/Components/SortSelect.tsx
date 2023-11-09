import { Select, SelectProps } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { useAuctionResultsFilterContext } from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"

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
        <Select {...props} title="Sort" />
      </Media>
    </>
  )
}
