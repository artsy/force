import { useContext, useState } from "react"
import { createContext } from "react"
import { Aggregations } from "../ArtworkFilter/ArtworkFilterContext"
import { Metric } from "../ArtworkFilter/Utils/metrics"
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

  const contextValue: SavedSearchAlertContextProps = {
    pills,
    entity,
    criteria,
    isCriteriaChanged,
    removeCriteriaValue,
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
