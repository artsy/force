import { Checkbox } from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { FilterExpandable } from "Components/ArtworkFilter/ArtworkFilters/FilterExpandable"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"

interface SignedFilterProps {
  expanded?: boolean
}

export const SignedFilter: React.FC<SignedFilterProps> = ({ expanded }) => {
  const { unsetFilter, setFilter } = useArtworkFilterContext()
  const currentSelectedFilters = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.signed,
  )
  const label = `Signed${filtersCount}`

  const isSelected = currentSelectedFilters?.signed

  const handleOnSelect = (selected: boolean) => {
    if (selected) {
      setFilter("signed", true)
    } else {
      unsetFilter("signed")
    }
  }

  return (
    <FilterExpandable label={label} expanded={isSelected || expanded}>
      <Checkbox
        selected={!!currentSelectedFilters?.signed}
        onSelect={handleOnSelect}
        my={1}
      >
        Show only signed works
      </Checkbox>
    </FilterExpandable>
  )
}
