import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import { MediumFilter } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/MediumFilter"
import { DropdownFilter } from "Components/DropdownFilter"

export const ArtistAuctionResultsQuickMedium = () => {
  const { setFilter } = useAuctionResultsFilterContext()
  const { categories: mediums = [] } =
    useCurrentlySelectedFiltersForAuctionResults()

  return (
    <DropdownFilter
      label="Medium"
      count={mediums.length}
      onClear={() => {
        setFilter("categories", [])
      }}
    >
      <MediumFilter isExpandable={false} />
    </DropdownFilter>
  )
}
