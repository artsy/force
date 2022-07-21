import { Location } from "found"
import { ArtworkFilters } from "../ArtworkFilterContext"
import { allowedFilters } from "./allowedFilters"
import { paramsToCamelCase } from "./urlBuilder"

export const getInitialFilterState = (
  query: Location["query"]
): ArtworkFilters => {
  const initialFilterState = allowedFilters(paramsToCamelCase(query))
  return initialFilterState
}
