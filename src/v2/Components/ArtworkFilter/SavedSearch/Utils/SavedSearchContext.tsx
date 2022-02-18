import { useContext, useState } from "react"
import { createContext } from "react"
import { extractPills } from "v2/Components/SavedSearchAlert/Utils/extractPills"
import {
  Aggregations,
  initialArtworkFilterState,
} from "../../ArtworkFilterContext"
import {
  FilterPill,
  SavedSearchEntity,
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "../types"

export interface SavedSearchContextProps {
  pills: FilterPill[]
  entity: SavedSearchEntity
  criteria: SearchCriteriaAttributes
  isCriteriaChanged: boolean
  removeCriteriaValue: (
    key: SearchCriteriaAttributeKeys,
    value: string | number | boolean
  ) => void
}

interface SavedSearchContextProviderProps {
  entity: SavedSearchEntity
  aggregations?: Aggregations
  criteria: SearchCriteriaAttributes
}

export const SavedSearchContext = createContext<SavedSearchContextProps>({
  pills: [],
  entity: {} as SavedSearchEntity,
  criteria: {} as SearchCriteriaAttributes,
  isCriteriaChanged: false,
  removeCriteriaValue: () => {},
})

export const SavedSearchContextProvider: React.FC<SavedSearchContextProviderProps> = ({
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

  const contextValue: SavedSearchContextProps = {
    pills,
    entity,
    criteria,
    isCriteriaChanged,
    removeCriteriaValue,
  }

  return (
    <SavedSearchContext.Provider value={contextValue}>
      {children}
    </SavedSearchContext.Provider>
  )
}

export const useSavedSearchContext = () => {
  return useContext(SavedSearchContext)
}
