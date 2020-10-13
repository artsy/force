import { ArtworkFilters } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { isDefaultFilter } from "v2/Components/v2/ArtworkFilter/Utils/isDefaultFilter"
import { camelCase, snakeCase } from "lodash"
import qs from "qs"

// Utility method to convert keys of a hash into snake case.
export const paramsToSnakeCase = params => {
  return Object.entries(params).reduce((acc, [field, value]) => {
    let snakeCased = snakeCase(field)
    if (snakeCased.endsWith("i_ds")) {
      snakeCased = snakeCased.replace("i_ds", "ids")
    } else if (snakeCased.endsWith("i_d")) {
      snakeCased = snakeCased.replace("i_d", "ids")
    }

    return { ...acc, [snakeCased]: value }
  }, {})
}

// Utility method to convert keys of a hash into camel case.
// It will fully capitalize an `_id` or `_ids` suffix as well.
export const paramsToCamelCase = params => {
  return Object.entries(params).reduce((acc, [field, value]) => {
    let camelCased = camelCase(field)
    if (camelCased.endsWith("Ids")) {
      camelCased = camelCased.replace("Ids", "IDs")
    } else if (camelCased.endsWith("Id")) {
      camelCased = camelCased.replace("Id", "ID")
    }

    return { ...acc, [camelCased]: value }
  }, {})
}

export const buildUrl = (state: ArtworkFilters): string => {
  const params = removeDefaultValues(state)

  const queryString = qs.stringify(paramsToSnakeCase(params))
  const url = queryString
    ? `${window.location.pathname}?${queryString}`
    : window.location.pathname

  return url
}

export const updateUrl = (state: ArtworkFilters) => {
  const url = buildUrl(state)

  if (typeof window !== "undefined") {
    window.history.replaceState({}, "", url)
  }
}

export const removeDefaultValues = (state: ArtworkFilters) => {
  return Object.entries(state).reduce(
    (acc, [key, value]: [keyof ArtworkFilters, any]) => {
      if (isDefaultFilter(key, value)) {
        return acc
      } else {
        return { ...acc, [key]: value }
      }
    },
    {}
  )
}
