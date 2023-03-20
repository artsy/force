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

interface SavedSearchAlertContextProps {
  pills: FilterPill[]
  entity: SavedSearchEntity
  criteria: SearchCriteriaAttributes
  isCriteriaChanged: boolean
  removeCriteriaValue: (
    key: SearchCriteriaAttributeKeys,
    value: string | number | boolean
  ) => void
  removePill: (pill: FilterPill) => void
}

interface SavedSearchAlertContextProviderProps {
  entity: SavedSearchEntity
  aggregations?: Aggregations
  criteria: SearchCriteriaAttributes
  metric?: Metric
}

const SavedSearchAlertContext = createContext<SavedSearchAlertContextProps>({
  pills: [],
  entity: {} as SavedSearchEntity,
  criteria: {} as SearchCriteriaAttributes,
  isCriteriaChanged: false,
  removeCriteriaValue: () => {},
  removePill: () => {},
})

export const SavedSearchAlertContextProvider: React.FC<SavedSearchAlertContextProviderProps> = ({
  entity,
  aggregations,
  criteria: criteriaFromArgument,
  metric,
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

    const updatedCriteria = getAllowedSearchCriteria({
      ...criteria,
      [key]: criteriaValue,
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

  const contextValue: SavedSearchAlertContextProps = {
    pills,
    entity,
    criteria,
    isCriteriaChanged,
    removeCriteriaValue,
    removePill,
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
