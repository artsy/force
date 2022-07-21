import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterContext"
import { isDefaultFilter } from "Components/ArtworkFilter/Utils/isDefaultFilter"
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

interface BuildUrlOptions {
  pathname?: string
  defaultValues?: Partial<ArtworkFilters>
}

export const buildUrl = (
  state: ArtworkFilters,
  options?: BuildUrlOptions
): string => {
  const params = removeDefaultValues(state, {
    defaultValues: options?.defaultValues,
  })
  const queryString = qs.stringify(paramsToSnakeCase(params))

  let pathname = options?.pathname
  if (!pathname && typeof window !== "undefined") {
    pathname = window.location.pathname
  }

  const url = queryString ? `${pathname}?${queryString}` : pathname

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  return url
}

export const updateUrl = (state: ArtworkFilters, options?: BuildUrlOptions) => {
  const url = buildUrl(state, { defaultValues: options?.defaultValues })

  if (typeof window !== "undefined") {
    window.history.replaceState({}, "", url)
  }
}

export const removeDefaultValues = (
  state: ArtworkFilters,
  options?: BuildUrlOptions
) => {
  return Object.entries(state).reduce(
    (acc, [key, value]: [keyof ArtworkFilters, any]) => {
      if (isDefaultFilter(key, value, options?.defaultValues)) {
        return acc
      } else {
        return { ...acc, [key]: value }
      }
    },
    {}
  )
}
