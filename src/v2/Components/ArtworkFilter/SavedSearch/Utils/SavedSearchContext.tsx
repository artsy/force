import { useContext } from "react"
import { createContext } from "react"
import { extractPills } from "v2/Components/SavedSearchAlert/Utils/extractPills"
import { Aggregations, ArtworkFiltersState } from "../../ArtworkFilterContext"
import { getAllowedFiltersForSavedSearchInput } from "../../Utils/allowedFilters"
import { SavedSearchAttributes } from "../types"

export interface DefaultFilterPill {
  isDefault: true
  name: string
  displayName: string
}

export interface NonDefaultFilterPill {
  isDefault?: false
  name: string
  displayName: string
  filterName: string
}

export type FilterPill = DefaultFilterPill | NonDefaultFilterPill

export interface SavedSearchContextProps {
  pills: FilterPill[]
  entity: SavedSearchAttributes
}

interface SavedSearchContextProviderProps {
  entity: SavedSearchAttributes
  aggregations: Aggregations
  filters: ArtworkFiltersState
}

export const SavedSearchContext = createContext<SavedSearchContextProps>({
  pills: [],
  entity: {} as SavedSearchAttributes,
})

export const SavedSearchContextProvider: React.FC<SavedSearchContextProviderProps> = ({
  entity,
  aggregations,
  filters,
  children,
}) => {
  const allowedFilters = getAllowedFiltersForSavedSearchInput(filters ?? {})
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
