import { compact, flatten, keyBy } from "lodash"
import {
  Aggregations,
  ArtworkFilters,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import {
  isCustomSize,
  parseRange,
} from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { aggregationForFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/helpers"
import { shouldExtractValueNamesFromAggregation } from "v2/Components/ArtworkFilter/SavedSearch/constants"

export const extractPillFromAggregation = (
  filter: {
    paramName: string
    paramValue?: string | number | boolean | string[]
  },
  aggregations: Aggregations
) => {
  const { paramName, paramValue } = filter
  const aggregation = aggregationForFilter(paramName, aggregations)

  if (aggregation) {
    const aggregationByValue = keyBy(aggregation.counts, "value")

    return (paramValue as string[]).map(value => {
      return aggregationByValue[value]?.name
    })
  }

  return []
}

export const extractSizeLabel = (prefix: string, value: string) => {
  const sizes = parseRange(value)

  if (!sizes) {
    return null
  }

  let label

  if (sizes[0] === "*") {
    label = `from ${sizes[0]}`
  } else if (sizes[1] === "*") {
    label = `to ${sizes[1]}`
  } else {
    label = `${sizes[0]}-${sizes[1]}`
  }

  return `${prefix}: ${label} cm`
}

export const extractPills = (
  filters: ArtworkFilters,
  aggregations: Aggregations
) => {
  const pills = Object.entries(filters).map(filter => {
    const [paramName, paramValue] = filter

    // we shouldn't create pills for page and sort param
    if (paramName === "page" || paramName === "sort") {
      return null
    }
    // skip width/height if value is *-*
    if (paramName === "width" && !isCustomSize(paramValue)) {
      return null
    }
    if (paramName === "height" && !isCustomSize(paramValue)) {
      return null
    }

    if (paramName === "width") {
      return extractSizeLabel("w", paramValue)
    }

    if (paramName === "height") {
      return extractSizeLabel("h", paramValue)
    }

    // Extract label from aggregations
    if (shouldExtractValueNamesFromAggregation.includes(paramName)) {
      return extractPillFromAggregation({ paramName, paramValue }, aggregations)
    }

    return paramValue
  })

  return compact(flatten(pills))
}
