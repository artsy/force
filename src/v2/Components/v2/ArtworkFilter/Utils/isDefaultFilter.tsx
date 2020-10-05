import { ArtworkFilters } from "../ArtworkFilterContext"

export const isDefaultFilter: (
  name: keyof ArtworkFilters,
  value: any
) => boolean = (name, value) => {
  if (!value) {
    return false
  }

  switch (true) {
    case name === "majorPeriods":
      return value.length === 0
    case name === "sizes" || name === "artistIDs":
      return value.length === 0
    case name === "sort":
      return value === "-decayed_merch"
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
