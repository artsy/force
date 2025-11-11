import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import {
  YearCreated,
  getCreatedYearBounds,
} from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/YearCreated"
import { DropdownFilter } from "Components/DropdownFilter"

export const ArtistAuctionResultsQuickYear = () => {
  const { setFilter, aggregations } = useAuctionResultsFilterContext()
  const { createdAfterYear, createdBeforeYear } =
    useCurrentlySelectedFiltersForAuctionResults()

  const { minYear, maxYear } = getCreatedYearBounds(aggregations)

  const isDefaultRange =
    (createdAfterYear == null ||
      (minYear != null && createdAfterYear === minYear)) &&
    (createdBeforeYear == null ||
      (maxYear != null && createdBeforeYear === maxYear))

  // No aggregations means nothing to filter against
  if (!minYear && !maxYear) {
    return null
  }

  return (
    <DropdownFilter
      label="Year Created"
      count={isDefaultRange ? 0 : 1}
      onClear={() => {
        setFilter("createdAfterYear", minYear)
        setFilter("createdBeforeYear", maxYear)
      }}
    >
      <YearCreated isExpandable={false} />
    </DropdownFilter>
  )
}
