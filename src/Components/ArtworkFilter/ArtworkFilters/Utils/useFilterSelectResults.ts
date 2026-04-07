import type { FilterSelectChangeState } from "@artsy/palette"
import {
  type SelectedFiltersCountsLabels,
  type Slice,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import type { MultiSelectArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { useFilterLabelCountByKey } from "Components/ArtworkFilter/Utils/useFilterLabelCountByKey"

export interface UseFilterSelectResultsProps {
  facetName: keyof MultiSelectArtworkFilters
  filtersCountKey: SelectedFiltersCountsLabels
  label: string
  slice: Slice
}

export const useFilterSelectResults = ({
  facetName,
  filtersCountKey,
  label,
  slice,
}: UseFilterSelectResultsProps) => {
  const { aggregations, setFilter } = useArtworkFilterContext()

  const selectedFilters = useCurrentlySelectedFilters()
  const filtersCount = useFilterLabelCountByKey(filtersCountKey)

  const labelWithCount = `${label}${filtersCount}`
  const filtersByFaceName = selectedFilters[facetName] ?? []

  const items =
    aggregations
      ?.find(aggregation => aggregation.slice === slice)
      ?.counts.map(item => ({ label: item.name, ...item })) ?? []

  const selectedItems = filtersByFaceName.flatMap(selectedFacetName => {
    return items.find(item => item.value === selectedFacetName) ?? []
  })

  const handleFilterSelectChange = (state: FilterSelectChangeState) => {
    const selectedNationalities = state.selectedItems.map(item => item.value)
    setFilter(facetName, selectedNationalities)
  }

  return {
    handleFilterSelectChange,
    items,
    labelWithCount,
    selectedItems,
  }
}
