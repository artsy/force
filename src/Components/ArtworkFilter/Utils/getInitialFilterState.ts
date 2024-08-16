import { Location } from "found"
import { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"

export const getInitialFilterState = (
  query: Location["query"]
): ArtworkFilters => {
  const initialFilterState = allowedFilters(paramsToCamelCase(query))
  return initialFilterState
}
