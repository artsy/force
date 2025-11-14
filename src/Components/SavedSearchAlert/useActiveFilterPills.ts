import {
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { DEFAULT_METRIC } from "Utils/metrics"
import { isArray } from "lodash"
import { extractPillsFromCriteria } from "./Utils/extractPills"
import type { FilterPill } from "./types"

export const useActiveFilterPills = (defaultPills: FilterPill[] = []) => {
  const { aggregations, setFilter, filters } = useArtworkFilterContext()

  const criteria = allowedFilters(filters ?? {})

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

    let filterValue = (filters || {})[pill.field]

    if (isArray(filterValue)) {
      filterValue = filterValue.filter(value => value !== pill.value)
    } else {
      filterValue = initialArtworkFilterState[pill.field]
    }

    setFilter(pill.field as keyof ArtworkFilters, filterValue)
  }

  return { pills, removePill }
}
