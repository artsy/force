import { FilterPill } from "v2/Components/ArtworkFilter/SavedSearch/Utils/SavedSearchContext"

export const getNamePlaceholder = (artistName: string, pills: FilterPill[]) => {
  const filteredPills = pills.filter(pill => !pill.isDefault)
  const filtersCountLabel = filteredPills.length > 1 ? "filters" : "filter"

  if (filteredPills.length === 0) {
    return artistName
  }

  return `${artistName} • ${filteredPills.length} ${filtersCountLabel}`
}
