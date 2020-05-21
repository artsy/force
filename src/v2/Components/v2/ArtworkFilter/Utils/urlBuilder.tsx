import { ArtworkFilters } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { isDefaultFilter } from "v2/Components/v2/ArtworkFilter/Utils/isDefaultFilter"
import { camelCase, snakeCase } from "lodash"
import qs from "qs"

// Utility method to convert keys of a hash into snake case.
export const paramsToSnakeCase = params => {
  return Object.entries(params).reduce((acc, [field, value]) => {
    return { ...acc, [snakeCase(field)]: value }
  }, {})
}

// Utility method to convert keys of a hash into camel case.
// It will fully capitalize an `_id` suffix as well.
export const paramsToCamelCase = params => {
  return Object.entries(params).reduce((acc, [field, value]) => {
    const camelCasedField = camelCase(field).replace(/Id$/, "ID")
    return { ...acc, [camelCasedField]: value }
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
    // FIXME: Is this the best way to guard against history updates
    // in Storybooks?
    if (!process.env.IS_STORYBOOK) {
      window.history.replaceState({}, "", url)
    }
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
