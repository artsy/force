import { difference } from "lodash"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { hardcodedMediums } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { Metric } from "Components/ArtworkFilter/Utils/metrics"
import { shouldExtractValueNamesFromAggregation } from "../constants"
import {
  SavedSearchDefaultCriteria,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "../types"
import { aggregationForFilter } from "./aggregationForFilter"
import { Entity, OptionItem } from "Utils/pills/types"
import { extractPillsFromEntities } from "Utils/pills/extractPills"

interface ExtractPillsFromCriteriaOptions {
  criteria: SearchCriteriaAttributes
  aggregations?: Aggregations
  metric: Metric
}

interface ExtractPillsOptions extends ExtractPillsFromCriteriaOptions {
  entity?: SavedSearchEntity
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

const convertCriteriaToEntities = ({
  criteria,
  aggregations = [],
  metric,
}: {
  criteria: SearchCriteriaAttributes
  aggregations?: Aggregations
  metric: Metric
}) => {
  const entities: Entity[] = []

  Object.entries(criteria).forEach(entry => {
    const [key, value] = entry

    if (shouldExtractValueNamesFromAggregation.includes(key)) {
      const aggregation = aggregationForFilter(key, aggregations)
      let options: OptionItem[] | undefined

      // Pass also hardcoded medium values for some grids (e.g. fair, collect grids)
      if (key === "additionalGeneIDs") {
        options = hardcodedMediums.map(option => ({
          value: option.value,
          displayName: option.name,
        }))
      }

      entities.push({
        field: key,
        value,
        payload: {
          options,
          aggregation,
        },
      })

      return
    }

    if (key === "sizes" || key === "width" || key === "height") {
      entities.push({
        field: key,
        value,
        payload: {
          metric,
        },
      })

      return
    }

    entities.push({
      field: key,
      value,
    })
  })

  return entities
}

export const extractPillsFromCriteria = (
  options: ExtractPillsFromCriteriaOptions
) => {
  const { criteria, aggregations = [], metric } = options
  const entities = convertCriteriaToEntities({
    criteria,
    aggregations,
    metric,
  })

  return extractPillsFromEntities(entities)
}

export const extractPills = (options: ExtractPillsOptions) => {
  const { criteria, aggregations = [], entity, metric } = options
  const defaultCriteria = entity?.defaultCriteria ?? {}
  const defaultPills = extractPillsFromDefaultCriteria(defaultCriteria)
  const excludedCriteria = excludeDefaultCriteria(criteria, defaultCriteria)
  const pillsFromCriteria = extractPillsFromCriteria({
    criteria: excludedCriteria,
    aggregations,
    metric,
  })

  return [...defaultPills, ...pillsFromCriteria]
}
