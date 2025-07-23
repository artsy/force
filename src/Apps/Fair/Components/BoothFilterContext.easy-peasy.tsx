import { createContextStore, Action, action } from "easy-peasy"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import type { SortOptions } from "Components/SortFilter"
import { omit } from "lodash"
import { createContext, useContext } from "react"
import type * as React from "react"
import useDeepCompareEffect from "use-deep-compare-effect"

export interface BoothFilters {
  sort?: string
  page?: number
}

export interface BoothFiltersState extends BoothFilters {
  reset?: boolean
}

// Easy-peasy store model interface
interface BoothFilterStoreModel {
  // State
  sort: string
  page: number
  reset?: boolean

  // Actions
  setFilter: Action<
    BoothFilterStoreModel,
    { name: keyof BoothFilters; value: any }
  >
}

export const initialBoothFilterState: BoothFilters = {
  sort: "FEATURED_DESC",
  page: 1,
}

// Create context store factory to support callbacks
const createBoothFilterStore = ({
  initialState,
  onFilterClick,
}: {
  initialState: BoothFiltersState
  onFilterClick?: (
    key: keyof BoothFilters,
    value: string,
    filterState: BoothFilters,
  ) => void
}) => {
  return createContextStore<BoothFilterStoreModel>(runtimeModel => ({
    // State
    sort:
      runtimeModel?.sort || initialState.sort || initialBoothFilterState.sort!,
    page:
      runtimeModel?.page || initialState.page || initialBoothFilterState.page!,
    reset: runtimeModel?.reset,

    // Actions
    setFilter: action((state, { name, value }) => {
      // Handle onFilterClick callback
      if (onFilterClick) {
        const newState = {
          ...state,
          [name]: value,
        }
        onFilterClick(name, value, omit(newState, ["reset"]))
      }

      // Reset page when other filters change
      const filterState: BoothFilters = { page: 1 }

      if (name === "page") {
        filterState[name] = Number(value)
      }

      const primitiveFilterTypes: Array<keyof BoothFilters> = ["sort"]
      primitiveFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value
        }
      })

      // Apply filter changes
      Object.assign(state, filterState)
      delete state.reset
    }),
  }))
}

export interface BoothFilterContextProps {
  filters?: BoothFiltersState
  sortOptions?: SortOptions
  setFilter: (name: keyof BoothFilters, value: any) => void
  onFilterClick?: (
    key: keyof BoothFilters,
    value: string,
    filterState: BoothFilters,
  ) => void
}

export type SharedBoothFilterContextProps = Pick<
  BoothFilterContextProps,
  "filters" | "sortOptions" | "onFilterClick"
> & {
  onChange?: (filterState: BoothFilters) => void
}

// Legacy context for backward compatibility
export const BoothFilterContext = createContext<BoothFilterContextProps>({
  filters: initialBoothFilterState,
  sortOptions: [],
  setFilter: () => {},
})

export const BoothFilterContextProvider: React.FC<
  React.PropsWithChildren<SharedBoothFilterContextProps>
> = ({ children, filters = {}, sortOptions, onFilterClick, onChange }) => {
  const initialFilterState = {
    ...initialBoothFilterState,
    ...paramsToCamelCase(filters),
  }

  // Create store with dependencies
  const BoothFilterStore = createBoothFilterStore({
    initialState: initialFilterState,
    onFilterClick,
  })

  return (
    <BoothFilterStore.Provider runtimeModel={initialFilterState}>
      <BoothFilterContextWrapper
        store={BoothFilterStore}
        sortOptions={sortOptions}
        onFilterClick={onFilterClick}
        onChange={onChange}
      >
        {children}
      </BoothFilterContextWrapper>
    </BoothFilterStore.Provider>
  )
}

// Internal wrapper to access store hooks
const BoothFilterContextWrapper: React.FC<{
  store: ReturnType<typeof createBoothFilterStore>
  sortOptions?: SortOptions
  onFilterClick?: BoothFilterContextProps["onFilterClick"]
  onChange?: SharedBoothFilterContextProps["onChange"]
  children: React.ReactNode
}> = ({ store, sortOptions, onFilterClick, onChange, children }) => {
  const boothFilterState = store.useStoreState(state => state)
  const { setFilter } = store.useStoreActions(actions => actions)

  // Handle onChange callback
  useDeepCompareEffect(() => {
    if (onChange) {
      onChange(omit(boothFilterState, ["reset"]))
    }
  }, [boothFilterState])

  const boothFilterContext: BoothFilterContextProps = {
    filters: boothFilterState,
    sortOptions,
    onFilterClick,
    setFilter: (name, value) => setFilter({ name, value }),
  }

  return (
    <BoothFilterContext.Provider value={boothFilterContext}>
      {children}
    </BoothFilterContext.Provider>
  )
}

// Backward compatible hook
export const useBoothsFilterContext = () => {
  const boothFilterContext = useContext(BoothFilterContext)
  return boothFilterContext
}
