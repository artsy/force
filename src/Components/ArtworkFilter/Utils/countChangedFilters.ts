import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { isEqual } from "es-toolkit"
import { isObject } from "es-toolkit/compat"
const difference = (
  initial: Record<string, any>,
  next: Record<string, any>
): Record<string, any> => {
  return Object.keys(next).reduce<Record<string, any>>((result, key) => {
    const value = next[key]
    if (!isEqual(value, initial[key])) {
      result[key] =
        isObject(value) && isObject(initial[key])
          ? difference(value, initial[key])
          : value
    }
    return result
  }, {})
}

export const countChangedFilters = (
  filtersBefore: ArtworkFilters,
  filtersAfter: ArtworkFilters,
) => {
  // Backfill the boolean filters with `false` values.
  // Initially these are `undefined`.
  const filtersInitial = {
    offerable: false,
    acquireable: false,
    atAuction: false,
    inquireableOnly: false,
    forSale: false,
    ...filtersBefore,
  }

  // We take the difference but just look at the number of keys changed,
  // which is equivalent to the number of filters changing.
  return Object.keys(difference(filtersInitial, filtersAfter)).length
}
