import { SelectedFiltersCounts } from "../ArtworkFilterContext"

export const getTotalSelectedFiltersCount = (
  selectedFiltersCounts: Partial<SelectedFiltersCounts> = {}
) => {
  return Object.values(selectedFiltersCounts).reduce(
    (total: number, curr: number) => total + curr,
    0
  )
}
