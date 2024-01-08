import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { useContext, useState } from "react"
import { createContext } from "react"
import { Metric } from "Utils/metrics"
import {
  FilterPill,
  SavedSearchEntity,
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "./types"
import { extractPills } from "./Utils/extractPills"
import { getAllowedSearchCriteria } from "./Utils/savedSearchCriteria"
import { allowedSearchCriteriaKeys } from "Components/SavedSearchAlert/constants"
import qs from "qs"
import { paramsToSnakeCase } from "Components/ArtworkFilter/Utils/urlBuilder"

interface SavedSearchAlertContextProps {
  pills: FilterPill[]
  entity: SavedSearchEntity
  criteria: SearchCriteriaAttributes
  isCriteriaChanged: boolean
  /** Artwork ID, if the current alert is being set from an artwork */
  currentArtworkID?: string

  removeCriteriaValue: (
    key: SearchCriteriaAttributeKeys,
    value: string | number | boolean
  ) => void
  setCriteriaValue: (
    key: SearchCriteriaAttributeKeys,
    value: string | string[] | number | boolean | null
  ) => void
  removePill: (pill: FilterPill) => void
  criteriaHref: () => string | null
}

export interface SavedSearchAlertContextProviderProps {
  entity: SavedSearchEntity
  aggregations?: Aggregations
  criteria: SearchCriteriaAttributes
  metric?: Metric
  artistSlug?: string
  /** Artwork ID, if the current alert is being set from an artwork */
  currentArtworkID?: string
}

const SavedSearchAlertContext = createContext<SavedSearchAlertContextProps>({
  pills: [],
  entity: {} as SavedSearchEntity,
  criteria: {} as SearchCriteriaAttributes,
  isCriteriaChanged: false,
  removeCriteriaValue: () => {},
  setCriteriaValue: () => {},
  removePill: () => {},
  criteriaHref: () => null,
})

export const SavedSearchAlertContextProvider: React.FC<SavedSearchAlertContextProviderProps> = ({
  entity,
  aggregations,
  criteria: criteriaFromArgument,
  metric,
  artistSlug,
  currentArtworkID,
  children,
}) => {
  const [criteria, setCriteria] = useState(criteriaFromArgument)
  const [isCriteriaChanged, setIsCriteriaChanged] = useState(false)
  const pills = extractPills({
    criteria,
    aggregations,
    entity,
    metric,
  })

  const removeCriteriaValue = (
    key: SearchCriteriaAttributeKeys,
    value: string | number | boolean
  ) => {
    let criteriaValue = criteria[key]

    if (Array.isArray(criteriaValue)) {
      criteriaValue = criteriaValue.filter(
        currentValue => currentValue !== value
      )
    } else {
      criteriaValue = null
    }

    setCriteriaValue(key, criteriaValue)
  }

  const setCriteriaValue = (
    key: SearchCriteriaAttributeKeys,
    value: string | string[] | number | boolean | null
  ) => {
    const updatedCriteria = getAllowedSearchCriteria({
      ...criteria,
      [key]: value,
    })

    setIsCriteriaChanged(true)
    setCriteria(updatedCriteria)
  }

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    removeCriteriaValue(pill.field as SearchCriteriaAttributeKeys, pill.value)
  }

  // href calculated from criteria and primary artist slug
  const criteriaHref = () => {
    if (!artistSlug) return null

    const allowedCriteriaValues = Object.fromEntries(
      Object.entries(criteria).filter(([key, _]) => {
        if (key === "artistIDs") return false
        return allowedSearchCriteriaKeys.includes(key)
      })
    )
    const queryParams = qs.stringify(paramsToSnakeCase(allowedCriteriaValues))

    return `/artist/${artistSlug}?${queryParams}&for_sale=true`
  }

  const contextValue: SavedSearchAlertContextProps = {
    pills,
    entity,
    criteria,
    isCriteriaChanged,
    currentArtworkID,
    removeCriteriaValue,
    setCriteriaValue,
    removePill,
    criteriaHref,
  }

  return (
    <SavedSearchAlertContext.Provider value={contextValue}>
      {children}
    </SavedSearchAlertContext.Provider>
  )
}

export const useSavedSearchAlertContext = () => {
  return useContext(SavedSearchAlertContext)
}
