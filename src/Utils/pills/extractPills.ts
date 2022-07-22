import { compact, keyBy } from "lodash"
import {
  ATTRIBUTION_OPTIONS,
  COLOR_OPTIONS,
  WAYS_TO_BUY_OPTIONS,
} from "./constants"
import { extractPriceLabel } from "./extractPriceLabel"
import { extractCustomSizeLabel } from "./extractCustomSizeLabel"
import { getPredefinedSizesByMetric } from "./getPredefinedSizesByMetric"
import { Entity, OptionItem, Pill } from "./types"

export const extractFromAggregation = (entity: Entity) => {
  const aggregationByValue = keyBy(entity.payload?.aggregation?.counts, "value")
  const pills = (entity.value as string[]).map(value => {
    if (aggregationByValue[value]) {
      return {
        value,
        displayValue: aggregationByValue[value].name,
        field: entity.field,
      }
    }

    if (entity.payload?.options) {
      const option = entity.payload.options.find(v => v.value === value)

      if (option) {
        return {
          value,
          displayValue: option.displayName,
          field: entity.field,
        }
      }
    }

    return null
  })

  return pills
}

const extractFromOptions = (entity: Entity, options: OptionItem[]) => {
  return (entity.value as string[]).map(value => {
    const option = options.find(sizeOption => sizeOption.value === value)

    if (option) {
      return {
        field: entity.field,
        value,
        displayValue: option.displayName,
      }
    }

    return null
  })
}

export const extractSizes = (entity: Entity) => {
  const SIZE_OPTIONS = getPredefinedSizesByMetric(entity.payload!.metric!)
  return extractFromOptions(entity, SIZE_OPTIONS)
}

export const extractColors = (entity: Entity) => {
  return extractFromOptions(entity, COLOR_OPTIONS)
}

export const extractAttributions = (entity: Entity) => {
  return extractFromOptions(entity, ATTRIBUTION_OPTIONS)
}

export const extractWaysToBuy = (entity: Entity) => {
  const option = WAYS_TO_BUY_OPTIONS.find(
    option => option.value === entity.field
  )

  if (entity.value && option) {
    return {
      field: entity.field,
      value: entity.field,
      displayValue: option.displayName,
    }
  }

  return null
}

export const extractMajorPeriods = (entity: Entity) => {
  return (entity.value as string[]).map(value => ({
    field: entity.field,
    value,
    displayValue: isNaN((value as unknown) as number) ? value : `${value}s`,
  }))
}

export const extractPriceRange = (entity: Entity) => {
  const { field, value } = entity

  if (value && value !== "*-*") {
    return {
      field,
      value,
      displayValue: extractPriceLabel(value),
    }
  }

  return null
}

export const extractCustomSize = (entity: Entity) => {
  const { field, value, payload } = entity

  if (value && value !== "*-*") {
    const displayValue = extractCustomSizeLabel({
      prefix: entity.field[0],
      value: entity.value,
      metric: payload!.metric!,
    })

    return {
      field,
      value,
      displayValue,
    }
  }

  return null
}

export const extractPillsFromEntities = (entities: Entity[]) => {
  const pills: (Pill | null)[] = []

  entities.forEach(entity => {
    const { field, payload } = entity
    const waysToBuyKeys = WAYS_TO_BUY_OPTIONS.map(option => option.value)

    if (payload?.aggregation) {
      const extractedPills = extractFromAggregation(entity)
      pills.push(...extractedPills)
    }

    if (waysToBuyKeys.includes(field)) {
      pills.push(extractWaysToBuy(entity))
    }

    if (field === "width" || field === "height") {
      pills.push(extractCustomSize(entity))
    }

    if (field === "sizes") {
      pills.push(...extractSizes(entity))
    }

    if (field === "colors") {
      pills.push(...extractColors(entity))
    }

    if (field === "attributionClass") {
      pills.push(...extractAttributions(entity))
    }

    if (field === "majorPeriods") {
      pills.push(...extractMajorPeriods(entity))
    }

    if (field === "priceRange") {
      pills.push(extractPriceRange(entity))
    }
  })

  return compact(pills)
}
