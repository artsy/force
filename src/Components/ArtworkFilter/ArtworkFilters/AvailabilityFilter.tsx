import { Checkbox } from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"

export const AvailabilityFilter: React.FC = () => {
  const { setFilter } = useArtworkFilterContext()
  const currentSelectedFilters = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.forSale
  )
  const label = `Availability${filtersCount}`

  return (
    <FilterExpandable label={label} expanded>
      <Checkbox
        selected={!!currentSelectedFilters?.forSale}
        onSelect={selected => setFilter("forSale", selected)}
        my={1}
      >
        Only works for sale
      </Checkbox>
    </FilterExpandable>
  )
}
