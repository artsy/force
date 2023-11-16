import {
  ArtworkFiltersState,
  initialArtworkFilterState,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { allowedSearchCriteriaKeys } from "Components/SavedSearchAlert/constants"
import {
  SavedSearchDefaultCriteria,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"

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

  Object.entries(criteria ?? {}).forEach(entry => {
    const [key, value] = entry
    const isAllowedKey = allowedSearchCriteriaKeys.includes(key)

    if (isAllowedKey && !isDefaultValue(key, value)) {
      if (Array.isArray(value)) {
        allowedCriteria[key] = criteria[key].filter(v => v)
      } else {
        allowedCriteria[key] = criteria[key]
      }
    }
  })

  return allowedCriteria
}

export const parseDefaultCriteria = (
  defaultCriteria: SavedSearchDefaultCriteria
) => {
  const criteria = {}

  Object.entries(defaultCriteria).forEach(entry => {
    const [field, criteriaValue] = entry

    if (Array.isArray(criteriaValue)) {
      criteria[field] = criteriaValue.map(v => v.value)
    } else {
      criteria[field] = criteriaValue.value
    }
  })

  return criteria
}

export const getSearchCriteriaFromFilters = (
  entity: SavedSearchEntity,
  filters: ArtworkFiltersState
): SearchCriteriaAttributes => {
  const allowedFilters = getAllowedSearchCriteria(filters)
  const defaultCriteria = parseDefaultCriteria(entity.defaultCriteria ?? {})

  return {
    ...allowedFilters,
    ...defaultCriteria,
  }
}
