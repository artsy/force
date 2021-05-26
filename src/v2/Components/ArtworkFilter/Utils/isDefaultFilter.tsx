import { ArtworkFilters } from "../ArtworkFilterContext"
import { getENV } from "v2/Utils/getENV"

export const isDefaultFilter: (
  name: keyof ArtworkFilters,
  value: any
) => boolean = (name, value) => {
  if (!value) {
    return false
  }

  const defaultSort =
    getENV("DECAYED_MERCH_V3") === "experiment"
      ? "-decayed_merch_v2"
      : "-decayed_merch"

  switch (true) {
    case name === "sizes" ||
      name === "artistIDs" ||
      name === "attributionClass" ||
      name === "partnerIDs" ||
      name === "additionalGeneIDs" ||
      name === "majorPeriods" ||
      name === "colors" ||
      name === "locationCities" ||
      name === "artistNationalities" ||
      name === "materialsTerms":
      return value.length === 0
    case name === "sort":
      return value === defaultSort
    case name === "medium":
      return value === "*" || !value
    case name === "priceRange" || name === "height" || name === "width":
      return value === "*-*"
    case name === "page":
      return value === 1
    default:
      return !value
  }
}
