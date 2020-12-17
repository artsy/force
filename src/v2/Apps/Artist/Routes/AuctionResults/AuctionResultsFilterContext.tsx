import React, { useContext, useReducer } from "react"

export interface AuctionResultsFilters {
  organizations?: string[]
  categories?: string[]
  sizes?: string[]
  pageAndCursor?: { page: number; cursor: string }
  sort?: string
  createdAfterYear?: number
  createdBeforeYear?: number
  allowEmptyCreatedDates?: boolean

  /** Used to get the overall earliest created year for all lots of given artist */
  readonly earliestCreatedYear?: number
  /** Used to get the overall latest created year for all lots of given artist */
  readonly latestCreatedYear?: number
}

interface AuctionResultsFiltersState extends AuctionResultsFilters {
  reset?: boolean
}
/**
 * Initial filter state
 */
export const initialAuctionResultsFilterState: AuctionResultsFilters = {
  allowEmptyCreatedDates: true,
  categories: [],
  organizations: [],
  pageAndCursor: { cursor: null, page: 1 },
  sizes: [],
  sort: "DATE_DESC",
}

/**
 * The names of all filters which can be changed by the user
 */
type ChangableFilter = keyof Omit<
  AuctionResultsFilters,
  "earliestCreatedYear" | "latestCreatedYear"
>

export interface AuctionResultsFilterContextProps {
  filters?: AuctionResultsFilters
  onChange?: (filterState) => void
  resetFilters: () => void
  setFilter: (name: ChangableFilter, value: any) => void
  unsetFilter: (name: ChangableFilter) => void
  onFilterClick?: (
    key: ChangableFilter,
    value: string,
    filterState: AuctionResultsFilters
  ) => void
}

/**
 * Context behavior shared globally across the AuctionResultsFilter component tree
 */
export const AuctionResultsFilterContext = React.createContext<
  AuctionResultsFilterContextProps
>({
  filters: initialAuctionResultsFilterState,
  resetFilters: null,
  setFilter: null,
  unsetFilter: null,
})

export type SharedAuctionResultsFilterContextProps = Pick<
  AuctionResultsFilterContextProps,
  "filters" | "onFilterClick"
> & {
  onChange?: (filterState) => void
}

export let auctionResultsFilterResetState: AuctionResultsFilters = initialAuctionResultsFilterState

export const AuctionResultsFilterContextProvider: React.FC<
  SharedAuctionResultsFilterContextProps & {
    children: React.ReactNode
  }
> = ({ children, filters = {}, onFilterClick }) => {
  const initialFilterState = {
    ...initialAuctionResultsFilterState,
    ...filters,
  }

  if (filters.earliestCreatedYear) {
    initialFilterState.createdAfterYear = filters.earliestCreatedYear
  }
  if (filters.latestCreatedYear) {
    initialFilterState.createdBeforeYear = filters.latestCreatedYear
  }

  auctionResultsFilterResetState = initialFilterState

  const [auctionResultsFilterState, dispatch] = useReducer(
    AuctionResultsFilterReducer,
    initialFilterState
  )

  const auctionResultsFilterContext: AuctionResultsFilterContextProps = {
    filters: auctionResultsFilterState,

    // Handlers
    onFilterClick,

    resetFilters: () => {
      dispatch({
        payload: null,
        type: "RESET",
      })
    },

    setFilter: (name, val) => {
      if (onFilterClick) {
        onFilterClick(name, val, { ...auctionResultsFilterState, [name]: val })
      }
      dispatch({
        payload: {
          name,
          value: val,
        },
        type: "SET",
      })
    },

    unsetFilter: name => {
      dispatch({
        payload: {
          name,
        },
        type: "UNSET",
      })
    },
  }

  return (
    <AuctionResultsFilterContext.Provider value={auctionResultsFilterContext}>
      {children}
    </AuctionResultsFilterContext.Provider>
  )
}

const AuctionResultsFilterReducer = (
  state: AuctionResultsFiltersState,
  action: {
    type: "SET" | "UNSET" | "RESET"
    payload: { name: keyof AuctionResultsFilters; value?: any }
  }
): AuctionResultsFiltersState => {
  const arrayFilterTypes: Array<keyof AuctionResultsFilters> = [
    "organizations",
    "categories",
    "sizes",
  ]

  switch (action.type) {
    /**
     * Setting  and updating filters
     */
    case "SET": {
      const { name, value } = action.payload
      const filterState: AuctionResultsFilters = {
        pageAndCursor: { cursor: null, page: 1 },
      }

      arrayFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value || []
        }
      })

      // primitive filter types
      const primitiveFilterTypes: Array<keyof AuctionResultsFilters> = [
        "sort",
        "pageAndCursor",
        "createdAfterYear",
        "createdBeforeYear",
        "allowEmptyCreatedDates",
      ]

      primitiveFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value
        }
      })

      // do not allow a real cursor to be set for page 1. to agree with initial filter state.
      if (filterState.pageAndCursor.page === 1) {
        filterState.pageAndCursor.cursor = null
      }

      if (name === "createdBeforeYear" && value) {
        if (!state.createdAfterYear) {
          filterState.createdAfterYear = state.earliestCreatedYear
        } else if (state.createdAfterYear > value) {
          filterState.createdAfterYear = value
        }
      }

      if (name === "createdAfterYear" && value) {
        if (!state.createdBeforeYear) {
          filterState.createdBeforeYear = state.latestCreatedYear
        } else if (state.createdBeforeYear < value) {
          filterState.createdBeforeYear = value
        }
      }

      delete state.reset

      return {
        ...state,
        ...filterState,
      }
    }

    /**
     * Unsetting a filter
     */
    case "UNSET": {
      const { name } = action.payload as { name: keyof AuctionResultsFilters }

      const filterState: AuctionResultsFilters = {
        pageAndCursor: { cursor: null, page: 1 },
      }

      const filters: Array<keyof AuctionResultsFilters> = ["sort"]
      filters.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = null
        }
      })

      arrayFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = []
        }
      })

      return {
        ...state,
        ...filterState,
      }
    }

    /**
     * Resetting filters back to their initial state
     */
    case "RESET": {
      return {
        ...auctionResultsFilterResetState,
        reset: true,
      }
    }

    default:
      return state
  }
}

/**
 * Hook to conveniently access fiter state context
 */
export const useAuctionResultsFilterContext = () => {
  const artworkFilterContext = useContext(AuctionResultsFilterContext)
  return artworkFilterContext
}
