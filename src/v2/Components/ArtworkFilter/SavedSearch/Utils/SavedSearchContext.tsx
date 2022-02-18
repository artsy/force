import { useContext } from "react"
import { createContext } from "react"
import { extractPills } from "v2/Components/SavedSearchAlert/Utils/extractPills"
import { getAllowedSearchCriteria } from "."
import { Aggregations } from "../../ArtworkFilterContext"
import {
  FilterPill,
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "../types"

export interface SavedSearchContextProps {
  pills: FilterPill[]
  entity: SavedSearchEntity
}

interface SavedSearchContextProviderProps {
  entity: SavedSearchEntity
  aggregations: Aggregations
  filters: SearchCriteriaAttributes
}

export const SavedSearchContext = createContext<SavedSearchContextProps>({
  pills: [],
  entity: {} as SavedSearchEntity,
})

export const SavedSearchContextProvider: React.FC<SavedSearchContextProviderProps> = ({
  entity,
  aggregations,
  filters,
  children,
}) => {
  const allowedFilters = getAllowedSearchCriteria(filters)
  const pills = extractPills(allowedFilters, aggregations, entity)
  const contextValue: SavedSearchContextProps = {
    pills,
    entity,
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
