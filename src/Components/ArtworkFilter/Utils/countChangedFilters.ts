import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterContext"
import { isEqual, transform, isObject } from "lodash"

const difference = (initial: {}, next: {}) => {
  return transform(next, (result, value, key) => {
    if (!isEqual(value, initial[key])) {
      result[key] =
        isObject(value) && isObject(initial[key])
          ? // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            difference(value, initial[key])
          : value
    }
  })
}

export const countChangedFilters = (
  filtersBefore: ArtworkFilters,
  filtersAfter: ArtworkFilters
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
