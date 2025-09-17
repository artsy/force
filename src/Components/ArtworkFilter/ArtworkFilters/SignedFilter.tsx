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
  const { setFilter } = useArtworkFilterContext()
  const currentSelectedFilters = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.signed,
  )
  const label = `Signed${filtersCount}`

  const isSelected = currentSelectedFilters?.signed

  return (
    <FilterExpandable
      label={label}
      expanded={isSelected || expanded}
      ignoreBounds
    >
      <Checkbox
        selected={!!currentSelectedFilters?.signed}
        onSelect={value => setFilter("signed", value)}
        my={1}
      >
        Show only signed works
      </Checkbox>
    </FilterExpandable>
  )
}
