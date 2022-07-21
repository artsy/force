import { isArray } from "lodash"
import {
  ArtworkFilters,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { DEFAULT_METRIC } from "Utils/metrics"
import { usePrepareFiltersForPills } from "Components/ArtworkFilter/Utils/usePrepareFiltersForPills"
import { FilterPill } from "./types"
import { extractPillsFromCriteria } from "./Utils/extractPills"
import { getAllowedSearchCriteria } from "./Utils/savedSearchCriteria"

export const useActiveFilterPills = (defaultPills: FilterPill[] = []) => {
  const { aggregations, setFilter } = useArtworkFilterContext()
  const filters = usePrepareFiltersForPills()
  const criteria = getAllowedSearchCriteria(filters ?? {})
  const metric = filters?.metric ?? DEFAULT_METRIC
  const filterPills = extractPillsFromCriteria({
    criteria,
    aggregations,
    metric,
  })
  const pills = [...defaultPills, ...filterPills]

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    let filterValue = filters![pill.field]

    if (isArray(filterValue)) {
      filterValue = filterValue.filter(value => value !== pill.value)
    } else {
      filterValue = initialArtworkFilterState[pill.field]
    }

    setFilter(pill.field as keyof ArtworkFilters, filterValue)

    if (pill.field === "artistIDs") {
      setFilter("includeArtworksByFollowedArtists", false)
    }
  }

  return { pills, removePill }
}
