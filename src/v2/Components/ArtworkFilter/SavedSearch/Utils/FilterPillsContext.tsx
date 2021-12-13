import { useContext, useState } from "react"
import * as React from "react"

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

export interface FilterPillsContextProps {
  pills?: FilterPill[]
  setPills?: (val: FilterPill[]) => void
}

export const FilterPillsContext = React.createContext<FilterPillsContextProps>(
  {}
)

export const FilterPillsContextProvider: React.FC<FilterPillsContextProps> = ({
  pills: initialPills = [],
  children,
}) => {
  const [pills, setPills] = useState<FilterPill[]>(initialPills)

  const filterPillsContext: FilterPillsContextProps = {
    pills,
    setPills,
  }

  return (
    <FilterPillsContext.Provider value={filterPillsContext}>
      {children}
    </FilterPillsContext.Provider>
  )
}

export const useFilterPillsContext = () => {
  const filterPillsContext = useContext(FilterPillsContext)
  return filterPillsContext
}
