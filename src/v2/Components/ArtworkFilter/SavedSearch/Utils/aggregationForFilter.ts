import { Aggregations } from "../../ArtworkFilterContext"
import { aggregationNameFromFilter } from "./constants"

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
