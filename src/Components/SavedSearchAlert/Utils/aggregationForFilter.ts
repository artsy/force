import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { aggregationNameFromFilter } from "Components/SavedSearchAlert/constants"

export const aggregationForFilter = (
  filterKey: string,
  aggregations: Aggregations
) => {
  const aggregationName = aggregationNameFromFilter[filterKey]
  const aggregation = aggregations!.find(
    value => value.slice === aggregationName
  )
  return aggregation
}
