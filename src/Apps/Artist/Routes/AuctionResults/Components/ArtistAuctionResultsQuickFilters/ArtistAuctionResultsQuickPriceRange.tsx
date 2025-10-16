import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { PriceRangeFilter } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/PriceRangeFilter"
import { DropdownFilter } from "Components/DropdownFilter"
import { DEFAULT_PRICE_RANGE } from "Components/PriceRange/constants"

export const ArtistAuctionResultsQuickPriceRange = () => {
  const { setFilter } = useAuctionResultsFilterContext()
  const { priceRange } = useCurrentlySelectedFiltersForAuctionResults()

  return (
    <DropdownFilter
      label="Price Range"
      count={priceRange !== DEFAULT_PRICE_RANGE ? 1 : 0}
      onClear={() => {
        setFilter("priceRange", DEFAULT_PRICE_RANGE)
      }}
    >
      <PriceRangeFilter isExpandable={false} />
    </DropdownFilter>
  )
}
