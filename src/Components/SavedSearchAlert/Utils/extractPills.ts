import { compact, difference, find, flatten, keyBy } from "lodash"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { COLOR_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { getTimePeriodToDisplay } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { isCustomValue } from "Components/ArtworkFilter/ArtworkFilters/Utils/isCustomValue"
import { WAYS_TO_BUY_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { DEFAULT_METRIC, Metric } from "Utils/metrics"
import { shouldExtractValueNamesFromAggregation } from "Components/SavedSearchAlert/constants"
import {
  FilterPill,
  SavedSearchDefaultCriteria,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { aggregationForFilter } from "./aggregationForFilter"
import {
  getPredefinedSizesByMetric,
  parseSizeRange,
} from "Utils/customSizeUtils"

export const extractPillFromAggregation = (
  filter: {
    paramName: string
    paramValue?: string | number | boolean | string[]
  },
  aggregations: Aggregations
) => {
  const { paramName, paramValue } = filter

  const aggregation = aggregationForFilter(paramName, aggregations)
  const aggregationByValue = keyBy(aggregation?.counts, "value")
  const pills = (paramValue as string[]).map(value => {
    if (aggregationByValue[value]) {
      return {
        value,
        displayValue: aggregationByValue[value].name,
        field: paramName,
      }
    }

    // Use hardcoded medium values for some grids (e.g. fair, collect grids)
    if (paramName === "additionalGeneIDs") {
      const hardcodedValue = MEDIUM_OPTIONS.find(v => v.value === value)

      if (hardcodedValue) {
        return {
          value,
          displayValue: hardcodedValue.name,
          field: paramName,
        }
      }
    }

    return null
  })

  return compact(pills)
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
  const [min, max] = parseSizeRange(value, metric)

  let label: string

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

  let label: string

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
  aggregations?: Aggregations
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
          displayValue: find(
            ATTRIBUTION_CLASS_OPTIONS,
            option => value === option.value
          )?.name,
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
      case "includeArtworksByFollowedArtists": {
        result = {
          field: paramName,
          value: paramValue,
          displayValue: "Artists You Follow",
        }
        break
      }
      case "forSale": {
        result = {
          field: paramName,
          value: paramValue,
          displayValue: "For sale",
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

export const extractPillsFromDefaultCriteria = (
  defaultCriteria: SavedSearchDefaultCriteria
) => {
  return Object.entries(defaultCriteria).reduce((acc, entry) => {
    const [field, criteria] = entry

    if (Array.isArray(criteria)) {
      const defaultPills = criteria.map(v => ({
        isDefault: true,
        value: v.value.toString(),
        displayValue: v.displayValue,
        field,
      }))

      return [...acc, ...defaultPills]
    }

    return [
      ...acc,
      {
        isDefault: true,
        value: criteria.value.toString(),
        displayValue: criteria.displayValue,
        field,
      },
    ]
  }, [])
}

export const excludeDefaultCriteria = (
  criteria: SearchCriteriaAttributes,
  defaultCriteria: SavedSearchDefaultCriteria
) => {
  const excluded = {}

  Object.entries(criteria).forEach(entry => {
    const [field, value] = entry

    if (field in defaultCriteria) {
      const defaultCriteriaEntity = defaultCriteria[field]

      if (Array.isArray(defaultCriteriaEntity)) {
        const defaultCriteriaValues = defaultCriteriaEntity.map(v => v.value)
        const values = difference(value, defaultCriteriaValues)

        if (values.length > 0) {
          excluded[field] = values
        }
      }

      return
    }

    excluded[field] = value
  })

  return excluded
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
  const defaultCriteria = entity?.defaultCriteria ?? {}
  const defaultPills = extractPillsFromDefaultCriteria(defaultCriteria)
  const excludedCriteria = excludeDefaultCriteria(criteria, defaultCriteria)
  const pillsFromCriteria = extractPillsFromCriteria({
    criteria: excludedCriteria,
    aggregations,
    metric,
  })

  return compact([...defaultPills, ...pillsFromCriteria])
}
