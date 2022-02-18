import { useContext, useState } from "react"
import { createContext } from "react"
import {
  Aggregations,
  initialArtworkFilterState,
} from "../ArtworkFilter/ArtworkFilterContext"
import {
  FilterPill,
  SavedSearchEntity,
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "./types"
import { extractPills } from "./Utils/extractPills"

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
  children,
}) => {
  const [criteria, setCriteria] = useState(criteriaFromArgument)
  const [isCriteriaChanged, setIsCriteriaChanged] = useState(false)
  const pills = extractPills(criteria, aggregations, entity)

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
      criteriaValue = initialArtworkFilterState[key]
    }

    setIsCriteriaChanged(true)
    setCriteria({
      ...criteria,
      [key]: criteriaValue,
    })
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
