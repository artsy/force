import qs from "qs"
import { ArtworkFilters } from "../ArtworkFilterContext"
import { isDefaultFilter } from "./isDefaultFilter"

/**
 * Returns a string representing the query part of a URL. It removes default
 * values, and rewrites keyword -> term.
 */
export const urlFragmentFromState = (state: ArtworkFilters) => {
  const { keyword: term } = state
  const filters = Object.entries(state).reduce(
    (acc, [key, value]: [keyof ArtworkFilters, any]) => {
      if (isDefaultFilter(key, value)) {
        return acc
      } else {
        return { ...acc, [key]: value }
      }
    },
    {}
  )

  return qs.stringify({
    ...filters,
    term,
  })
}
