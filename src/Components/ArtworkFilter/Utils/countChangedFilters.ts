import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import isEqual from "lodash/isEqual"
import isObject from "lodash/isObject"
import transform from "lodash/transform"

type Obj = Record<string, unknown>

const difference = (initial: Obj, next: Obj): Obj => {
  return transform(
    next,
    (result: Obj, value: unknown, key: string) => {
      if (!isEqual(value, initial[key])) {
        result[key] =
          isObject(value) && isObject(initial[key])
            ? difference(value as Obj, initial[key] as Obj)
            : value
      }
    },
    {} as Obj,
  )
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
  return Object.keys(
    difference(filtersInitial as Obj, filtersAfter as Obj),
  ).length
}
