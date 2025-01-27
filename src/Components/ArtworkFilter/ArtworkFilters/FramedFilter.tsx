import { Checkbox } from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"

interface FramedFilterProps {
  expanded?: boolean
}

export const FramedFilter: React.FC<FramedFilterProps> = ({ expanded }) => {
  const { unsetFilter, setFilter } = useArtworkFilterContext()
  const currentSelectedFilters = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.framed,
  )
  const label = `Framed${filtersCount}`

  const isSelected = currentSelectedFilters?.framed

  const handleOnSelect = (selected: boolean) => {
    if (selected) {
      setFilter("framed", true)
    } else {
      unsetFilter("framed")
    }
  }

  return (
    <FilterExpandable label={label} expanded={isSelected || expanded}>
      <Checkbox
        selected={!!currentSelectedFilters?.framed}
        onSelect={handleOnSelect}
        my={1}
      >
        Only framed works
      </Checkbox>
    </FilterExpandable>
  )
}
