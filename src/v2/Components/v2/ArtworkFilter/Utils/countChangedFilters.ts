import { ArtworkFilters } from "../ArtworkFilterContext"
import { isEqual } from "lodash"

export const countChangedFilters = (
  filtersBefore: ArtworkFilters,
  filtersAfter: ArtworkFilters
) => {
  let changedCount = 0
  let key

  // simple keys
  for (key of ["medium", "priceRange", "color"]) {
    if (filtersAfter[key] != filtersBefore[key]) {
      changedCount++
    }
  }

  // boolean-valued keys
  for (key of ["offerable", "acquireable", "atAuction", "inquireableOnly"]) {
    // `filtersBefore[key]` will always be `undefined`
    // Just uses the `true` or `false` value to determine count
    if (filtersAfter[key]) {
      changedCount++
    }
  }

  // array-valued keys
  for (key of [
    "additionalGeneIDs",
    "artistNationalities",
    "attributionClass",
    "colors",
    "locationCities",
    "sizes",
    "majorPeriods",
    "partnerIDs",
    "geneIDs",
    "artistIDs",
    "materialsTerms",
  ]) {
    if (!isEqual(filtersBefore[key], filtersAfter[key])) {
      changedCount++
    }
  }

  return changedCount
}
