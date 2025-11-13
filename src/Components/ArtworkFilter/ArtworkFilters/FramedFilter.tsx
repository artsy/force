import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"
import { Checkbox } from "@artsy/palette"

interface FramedFilterProps {
  expanded?: boolean
}

export const FramedFilter: React.FC<FramedFilterProps> = ({ expanded }) => {
  const { setFilter } = useArtworkFilterContext()
  const currentSelectedFilters = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.framed
  )
  const label = `Framed${filtersCount}`

  const isSelected = currentSelectedFilters?.framed

  return (
    <FilterExpandable label={label} expanded={isSelected || expanded}>
      <Checkbox
        selected={!!currentSelectedFilters?.framed}
        onSelect={value => setFilter("framed", value)}
        my={1}
      >
        Show only framed works
      </Checkbox>
    </FilterExpandable>
  )
}
