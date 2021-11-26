import { compact, find, flatten, keyBy } from "lodash"
import {
  Aggregations,
  ArtworkFilters,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { checkboxValues } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { COLOR_OPTIONS } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import {
  parseRange,
  SIZES,
} from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { getTimePeriodToDisplay } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { isCustomValue } from "v2/Components/ArtworkFilter/ArtworkFilters/Utils/isCustomValue"
import { WAYS_TO_BUY_OPTIONS } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { NonDefaultFilterPill } from "v2/Components/ArtworkFilter/SavedSearch/Components/FiltersPills"
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

    return (paramValue as string[]).map(value => ({
      name: value,
      displayName: aggregationByValue[value].name,
      filterName: paramName,
    }))
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
  const pills: NonDefaultFilterPill[] = Object.entries(filters).map(filter => {
    const [paramName, paramValue] = filter

    let result: NonDefaultFilterPill | NonDefaultFilterPill[] | null = null

    if (shouldExtractValueNamesFromAggregation.includes(paramName)) {
      return extractPillFromAggregation({ paramName, paramValue }, aggregations)
    }

    if (paramName in WAYS_TO_BUY_OPTIONS) {
      return (
        paramValue && {
          filterName: paramName,
          displayName: WAYS_TO_BUY_OPTIONS[paramName].name,
        }
      )
    }

    switch (paramName) {
      case "width":
      case "height": {
        if (isCustomValue(paramValue)) {
          result = {
            filterName: paramName,
            name: paramValue,
            displayName: extractSizeLabel(paramName[0], paramValue),
          }
        }
        break
      }
      case "sizes": {
        result = paramValue.map(value => ({
          filterName: paramName,
          name: value,
          displayName: find(SIZES, option => value === option.name)
            ?.displayName,
        }))
        break
      }
      case "colors": {
        result = paramValue.map(value => ({
          filterName: paramName,
          name: value,
          displayName: find(COLOR_OPTIONS, option => value === option.value)
            ?.name,
        }))
        break
      }
      case "attributionClass": {
        result = paramValue.map(value => ({
          filterName: paramName,
          name: value,
          displayName: find(checkboxValues, option => value === option.value)
            ?.name,
        }))
        break
      }
      case "majorPeriods": {
        result = paramValue.map(value => ({
          filterName: paramName,
          name: value,
          displayName: getTimePeriodToDisplay(value),
        }))
        break
      }
      case "priceRange": {
        if (isCustomValue(paramValue)) {
          result = {
            filterName: paramName,
            name: paramValue,
            displayName: extractPriceLabel(paramValue),
          }
        }
        break
      }
      default: {
        result = null
      }
    }
    return result
  })

  return compact(flatten(pills))
}
