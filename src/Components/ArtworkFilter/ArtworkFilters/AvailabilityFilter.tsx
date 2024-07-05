import { Checkbox } from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"

interface AvailabilityFilterProps {
  expanded?: boolean
}

export const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ expanded }) => {
  const { setFilter } = useArtworkFilterContext()
  const currentSelectedFilters = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.forSale
  )
  const label = `Availability${filtersCount}`

  const isSelected = currentSelectedFilters?.forSale

  return (
    <FilterExpandable label={label} expanded={isSelected || expanded}>
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
