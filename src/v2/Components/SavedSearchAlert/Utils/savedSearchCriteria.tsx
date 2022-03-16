import {
  ArtworkFiltersState,
  initialArtworkFilterState,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { allowedSearchCriteriaKeys } from "../constants"
import { SavedSearchEntity, SearchCriteriaAttributes } from "../types"

export const isDefaultValue = (
  paramName: string,
  paramValue: string | boolean | string[] | null
) => {
  if (Array.isArray(paramValue)) {
    return paramValue.length === 0
  }

  return initialArtworkFilterState[paramName] === paramValue || !paramValue
}

export const getAllowedSearchCriteria = (
  criteria: SearchCriteriaAttributes
) => {
  const allowedCriteria: SearchCriteriaAttributes = {}

  Object.entries(criteria).forEach(entry => {
    const [key, value] = entry
    const isAllowedKey = allowedSearchCriteriaKeys.includes(key)

    if (isAllowedKey && !isDefaultValue(key, value)) {
      allowedCriteria[key] = criteria[key]
    }
  })

  return allowedCriteria
}

export const getSearchCriteriaFromFilters = (
  entity: SavedSearchEntity,
  filters: ArtworkFiltersState
): SearchCriteriaAttributes => {
  const allowedFilters = getAllowedSearchCriteria(filters)
  const artistIDs = entity.artists.map(artist => artist.id)

  return {
    artistIDs,
    ...allowedFilters,
  }
}
