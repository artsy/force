import { ArtworkFilters } from "../ArtworkFilterContext"

export const isDefaultFilter: (
  name: keyof ArtworkFilters,
  value: any,
  defaultValues?: Partial<ArtworkFilters>
) => boolean = (name, value, defaultValues = {}) => {
  if (!value) {
    return false
  }

  const isCustomDefaultValuePassed = !!defaultValues[name]

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
    case isCustomDefaultValuePassed:
      return value === defaultValues[name]
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
