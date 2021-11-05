import { Aggregations } from "../ArtworkFilterContext"
import { aggregationNameFromFilter } from "../SavedSearch/constants"

export const getElementParams = element => {
  const height = element.clientHeight
  const top = element.getBoundingClientRect().top
  return { height, top }
}

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
