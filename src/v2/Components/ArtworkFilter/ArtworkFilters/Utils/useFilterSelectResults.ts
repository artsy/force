import { FilterSelectChangeState, FilterSelectItems } from "@artsy/palette"
import {
  MultiSelectArtworkFilters,
  SelectedFiltersCountsLabels,
  Slice,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { useFilterLabelCountByKey } from "../../Utils/useFilterLabelCountByKey"

export interface UseFilterSelectResultsProps {
  facetName: keyof MultiSelectArtworkFilters
  filtersCountKey: SelectedFiltersCountsLabels
  label
  slice: Slice
}

export const useFilterSelectResults = ({
  facetName,
  filtersCountKey,
  label,
  slice,
}: UseFilterSelectResultsProps) => {
  const {
    aggregations,
    setFilter,
    currentlySelectedFilters,
  } = useArtworkFilterContext()

  const filtersCount = useFilterLabelCountByKey(filtersCountKey)
  const labelWithCount = `${label}${filtersCount}`

  const items = aggregations
    ?.find(aggregation => aggregation.slice === slice)
    ?.counts.map(item => ({ label: item.name, ...item })) as FilterSelectItems

  const selectedItems = (currentlySelectedFilters?.()[facetName] ?? []).map(
    selectedFacetName => {
      const selectedItem = items.find(item => item.value === selectedFacetName)
      return selectedItem
    }
  ) as FilterSelectItems

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
