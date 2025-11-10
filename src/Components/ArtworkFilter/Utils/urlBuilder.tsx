import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { isDefaultFilter } from "Components/ArtworkFilter/Utils/isDefaultFilter"
import { paramsToSnakeCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import qs from "qs"

interface BuildUrlOptions {
  pathname?: string
  defaultValues?: Partial<ArtworkFilters>
}

export const buildUrl = (
  state: ArtworkFilters,
  options?: BuildUrlOptions,
): string => {
  const params = removeDefaultValues(state, {
    defaultValues: options?.defaultValues,
  })
  const queryString = qs.stringify(paramsToSnakeCase(params), {
    skipNulls: true,
  })

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
  options?: BuildUrlOptions,
) => {
  return Object.entries(state).reduce(
    (acc, [key, value]: [keyof ArtworkFilters, any]) => {
      if (isDefaultFilter(key, value, options?.defaultValues)) {
        return acc
      } else {
        return { ...acc, [key]: value }
      }
    },
    {},
  )
}

/**
 * Update the URL with the given state nested under a namespace key.
 * This is useful when multiple filter contexts share the same page and
 * must not collide on top-level query param names like `page` or `sort`.
 */
export const updateUrlWithNamespace = <T extends Record<string, unknown>>(
  state: T,
  options: { namespace: string; pathname?: string },
) => {
  const namespaced = {
    [options.namespace]: paramsToSnakeCase(state),
  }

  const queryString = qs.stringify(namespaced, { skipNulls: true })

  let pathname = options?.pathname
  if (!pathname && typeof window !== "undefined") {
    pathname = window.location.pathname
  }

  const url = queryString ? `${pathname}?${queryString}` : pathname

  if (typeof window !== "undefined") {
    window.history.replaceState({}, "", url)
  }
}
