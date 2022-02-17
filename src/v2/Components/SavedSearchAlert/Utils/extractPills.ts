import { compact, find, flatten, keyBy } from "lodash"
import {
  Aggregations,
  ArtworkFilters,
  DEFAULT_METRIC,
  Metric,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { checkboxValues } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { COLOR_OPTIONS } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import {
  getMetricLabel,
  getPredefinedSizesByMetric,
  parseRange,
} from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { getTimePeriodToDisplay } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { isCustomValue } from "v2/Components/ArtworkFilter/ArtworkFilters/Utils/isCustomValue"
import { WAYS_TO_BUY_OPTIONS } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import {
  DefaultFilterPill,
  NonDefaultFilterPill,
} from "v2/Components/ArtworkFilter/SavedSearch/Utils/FilterPillsContext"
import {
  aggregationForFilter,
  shouldExtractValueNamesFromAggregation,
} from "v2/Components/ArtworkFilter/SavedSearch/Utils"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"

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
      displayName: aggregationByValue[value]?.name ?? "",
      filterName: paramName,
    }))
  }

  return []
}

export const extractSizeLabel = (
  prefix: string,
  value: string,
  metric: Metric
) => {
  const [min, max] = parseRange(value, metric)!
  const metricLabel = getMetricLabel(metric)

  let label
  if (max === "*") {
    label = `from ${min}`
  } else if (min === "*") {
    label = `to ${max}`
  } else {
    label = `${min}-${max}`
  }

  return `${prefix}: ${label} ${metricLabel}`
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

export const extractPillsFromFilters = (options: {
  filters: ArtworkFilters
  aggregations: Aggregations
  metric?: Metric
}) => {
  const { filters, aggregations = [], metric = DEFAULT_METRIC } = options
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
          name: paramName,
          displayName: WAYS_TO_BUY_OPTIONS[paramName].name,
        }
      )
    }

    switch (paramName) {
      case "width":
      case "height": {
        if (paramValue && isCustomValue(paramValue)) {
          result = {
            filterName: paramName,
            name: paramValue,
            displayName: extractSizeLabel(paramName[0], paramValue, metric),
          }
        }
        break
      }
      case "sizes": {
        const predefinedValues = getPredefinedSizesByMetric(metric)
        result = paramValue.map(value => ({
          filterName: paramName,
          name: value,
          displayName: find(predefinedValues, option => value === option.name)
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
        if (paramValue && isCustomValue(paramValue)) {
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

export const extractArtistPill = (
  savedSearchAttributes?: SavedSearchAttributes
): DefaultFilterPill | null => {
  if (savedSearchAttributes?.name && savedSearchAttributes.slug) {
    return {
      isDefault: true,
      name: savedSearchAttributes.slug,
      displayName: savedSearchAttributes.name,
    }
  }

  return null
}

export const extractPills = (options: {
  filters: ArtworkFilters
  aggregations?: Aggregations
  savedSearchAttributes?: SavedSearchAttributes
  metric?: Metric
}) => {
  const { filters, aggregations = [], savedSearchAttributes, metric } = options
  const artistPill = extractArtistPill(savedSearchAttributes)
  const pillsFromFilters = extractPillsFromFilters({
    filters,
    aggregations,
    metric,
  })

  return compact([artistPill, ...pillsFromFilters])
}
