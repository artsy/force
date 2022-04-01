import { compact, find, flatten, keyBy } from "lodash"
import { Aggregations } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { checkboxValues } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { COLOR_OPTIONS } from "v2/Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import {
  getPredefinedSizesByMetric,
  parseRange,
} from "v2/Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { getTimePeriodToDisplay } from "v2/Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { isCustomValue } from "v2/Components/ArtworkFilter/ArtworkFilters/Utils/isCustomValue"
import { WAYS_TO_BUY_OPTIONS } from "v2/Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import {
  DEFAULT_METRIC,
  Metric,
} from "v2/Components/ArtworkFilter/Utils/metrics"
import { shouldExtractValueNamesFromAggregation } from "../constants"
import {
  FilterPill,
  SavedSearchEntity,
  SavedSearchEntityArtist,
  SearchCriteriaAttributes,
} from "../types"
import { aggregationForFilter } from "./aggregationForFilter"

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
      value,
      displayValue: aggregationByValue[value]?.name ?? "",
      field: paramName,
    }))
  }

  return []
}

export const extractSizeLabel = ({
  prefix,
  value,
  metric,
}: {
  prefix: string
  value: string
  metric: Metric
}) => {
  const [min, max] = parseRange(value, metric)!

  let label
  if (max === "*") {
    label = `from ${min}`
  } else if (min === "*") {
    label = `to ${max}`
  } else {
    label = `${min}-${max}`
  }

  return `${prefix}: ${label} ${metric.toLowerCase()}`
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

export const extractPillsFromCriteria = ({
  criteria,
  aggregations = [],
  metric,
}: {
  criteria: SearchCriteriaAttributes
  aggregations: Aggregations
  metric: Metric
}) => {
  const pills: FilterPill[] = Object.entries(criteria).map(filter => {
    const [paramName, paramValue] = filter

    let result: FilterPill | FilterPill[] | null = null

    if (shouldExtractValueNamesFromAggregation.includes(paramName)) {
      return extractPillFromAggregation({ paramName, paramValue }, aggregations)
    }

    if (paramName in WAYS_TO_BUY_OPTIONS) {
      return (
        paramValue && {
          field: paramName,
          value: paramName,
          displayValue: WAYS_TO_BUY_OPTIONS[paramName].name,
        }
      )
    }

    switch (paramName) {
      case "width":
      case "height": {
        if (paramValue && isCustomValue(paramValue)) {
          result = {
            field: paramName,
            value: paramValue,
            displayValue: extractSizeLabel({
              prefix: paramName[0],
              value: paramValue,
              metric,
            }),
          }
        }
        break
      }
      case "sizes": {
        result = paramValue.map(value => {
          const SIZES = getPredefinedSizesByMetric(metric)
          const sizeItem = find(SIZES, option => value === option.name)

          return {
            field: paramName,
            value,
            displayValue: sizeItem?.displayName,
          }
        })
        break
      }
      case "colors": {
        result = paramValue.map(value => ({
          field: paramName,
          value,
          displayValue: find(COLOR_OPTIONS, option => value === option.value)
            ?.name,
        }))
        break
      }
      case "attributionClass": {
        result = paramValue.map(value => ({
          field: paramName,
          value,
          displayValue: find(checkboxValues, option => value === option.value)
            ?.name,
        }))
        break
      }
      case "majorPeriods": {
        result = paramValue.map(value => ({
          field: paramName,
          value,
          displayValue: getTimePeriodToDisplay(value),
        }))
        break
      }
      case "priceRange": {
        if (paramValue && isCustomValue(paramValue)) {
          result = {
            field: paramName,
            value: paramValue,
            displayValue: extractPriceLabel(paramValue),
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

export const extractArtistPills = (
  artists: SavedSearchEntityArtist[] = []
): FilterPill[] => {
  return artists.map(artist => {
    return {
      isDefault: true,
      value: artist.id,
      displayValue: artist.name,
      field: "artistIDs",
    }
  })
}

export const extractPills = ({
  criteria,
  aggregations = [],
  entity,
  metric = DEFAULT_METRIC,
}: {
  criteria: SearchCriteriaAttributes
  aggregations?: Aggregations
  entity?: SavedSearchEntity
  metric?: Metric
}) => {
  const artistPills = extractArtistPills(entity?.artists)
  const pillsFromCriteria = extractPillsFromCriteria({
    criteria,
    aggregations,
    metric,
  })

  return compact([...artistPills, ...pillsFromCriteria])
}
