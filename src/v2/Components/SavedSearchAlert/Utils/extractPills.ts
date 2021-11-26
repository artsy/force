import { compact, find, flatten, keyBy } from "lodash"
import {
  Aggregations,
  ArtworkFilters,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { checkboxValues } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { COLOR_OPTIONS } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import {
  isCustomSize,
  parseRange,
  SIZES,
} from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { getTimePeriodToDisplay } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WAYS_TO_BUY_OPTIONS } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import {
  aggregationForFilter,
  shouldExtractValueNamesFromAggregation,
} from "v2/Components/ArtworkFilter/SavedSearch/Utils"

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
  const [min, max] = parseRange(value)!

  let label
  if (max === "*") {
    label = `from ${min}`
  } else if (min === "*") {
    label = `to ${max}`
  } else {
    label = `${min}-${max}`
  }

  return `${prefix}: ${label} cm`
}

const extractPriceLabel = (range: string) => {
  const [min, max] = range.split("-").map(value => {
    return value === "*" ? value : (+value).toLocaleString()
  })

  let label

  if (min === "*") {
    label = `$0-$${max}`
  } else if (max === "*") {
    label = `$${min}+`
  } else {
    label = `$${min}-$${max}`
  }

  return label
}

export const extractPills = (
  filters: ArtworkFilters,
  aggregations: Aggregations
) => {
  const pills = Object.entries(filters).map(filter => {
    const [paramName, paramValue] = filter

    if (shouldExtractValueNamesFromAggregation.includes(paramName)) {
      return extractPillFromAggregation({ paramName, paramValue }, aggregations)
    }

    if (paramName in WAYS_TO_BUY_OPTIONS) {
      return paramValue && WAYS_TO_BUY_OPTIONS[paramName].name
    }

    switch (paramName) {
      case "width":
      case "height": {
        if (!isCustomSize(paramValue)) {
          return null
        }
        return extractSizeLabel(paramName[0], paramValue)
      }
      case "sizes": {
        return paramValue.map(
          value => find(SIZES, option => value === option.name)?.displayName
        )
      }
      case "colors": {
        return paramValue.map(
          value => find(COLOR_OPTIONS, option => value === option.value)?.name
        )
      }
      case "attributionClass": {
        return paramValue.map(
          value => find(checkboxValues, option => value === option.value)?.name
        )
      }
      case "majorPeriods": {
        return paramValue.map(value => getTimePeriodToDisplay(value))
      }
      case "priceRange": {
        return extractPriceLabel(paramValue)
      }
      default: {
        return paramName
      }
    }
  })

  return compact(flatten(pills))
}
