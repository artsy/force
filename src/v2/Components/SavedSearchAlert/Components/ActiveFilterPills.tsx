import React from "react"
import { isArray } from "lodash"
import {
  ArtworkFilters,
  initialArtworkFilterState,
  useArtworkFilterContext,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { extractPillsFromCriteria } from "../Utils/extractPills"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"
import { FilterPill } from "../types"
import { getAllowedSearchCriteria } from "../Utils/savedSearchCriteria"
import { DEFAULT_METRIC } from "v2/Components/ArtworkFilter/Utils/metrics"

interface ActiveFilterPillsProps {
  defaultPills?: FilterPill[]
}

export const ActiveFilterPills: React.FC<ActiveFilterPillsProps> = props => {
  const { defaultPills = [] } = props
  const { filters, aggregations, setFilter } = useArtworkFilterContext()
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
  }

  return <SavedSearchAlertPills items={pills} onDeletePress={removePill} />
}
