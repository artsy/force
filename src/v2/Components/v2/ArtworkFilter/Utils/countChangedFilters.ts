import { ArtworkFilters } from "../ArtworkFilterContext"
import { isEqual } from "lodash"

export const countChangedFilters = (
  filtersBefore: ArtworkFilters,
  filtersAfter: ArtworkFilters
) => {
  let changedCount = 0
  let key

  // simple keys
  for (key of [
    "medium",
    "priceRange",
    "offerable",
    "acquireable",
    "atAuction",
    "inquireableOnly",
    "color",
  ]) {
    if (filtersAfter[key] != filtersBefore[key]) {
      changedCount++
    }
  }

  // array-valued keys
  for (key of ["sizes", "majorPeriods"]) {
    if (!isEqual(filtersBefore[key], filtersAfter[key])) {
      changedCount++
    }
  }

  return changedCount
}
