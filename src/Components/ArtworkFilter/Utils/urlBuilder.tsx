import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { isDefaultFilter } from "Components/ArtworkFilter/Utils/isDefaultFilter"
import { paramsToSnakeCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import qs from "qs"

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
