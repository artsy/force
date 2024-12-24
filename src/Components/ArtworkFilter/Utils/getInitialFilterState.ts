import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import type { Location } from "found"

export const getInitialFilterState = (
  query: Location["query"],
): ArtworkFilters => {
  const initialFilterState = allowedFilters(paramsToCamelCase(query))
  return initialFilterState
}
