import { Aggregations } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { aggregationNameFromFilter } from "../constants"

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
