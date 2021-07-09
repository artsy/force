import React, { useContext, useReducer, useState } from "react"
import { omit } from "lodash"
import useDeepCompareEffect from "use-deep-compare-effect"
import { StringifyOptions } from "querystring"

export interface AuctionResultsFilters {
  organizations?: string[]
  categories?: string[]
  sizes?: string[]
  keyword?: StringifyOptions
  pageAndCursor?: { page: number; cursor: string | null }
  sort?: string
  createdAfterYear?: number | null
  createdBeforeYear?: number | null
  allowEmptyCreatedDates?: boolean

  /** Used to get the overall earliest created year for all lots of given artist */
  readonly earliestCreatedYear?: number | null
  /** Used to get the overall latest created year for all lots of given artist */
  readonly latestCreatedYear?: number | null
}

interface AuctionResultsFiltersState extends AuctionResultsFilters {
  reset?: boolean
}
/**
 * Initial filter state
 */
export const initialAuctionResultsFilterState: AuctionResultsFilters = {
  organizations: [],
  categories: [],
  sizes: [],
  keyword: undefined,
  pageAndCursor: { page: 1, cursor: null },
  sort: "DATE_DESC",
  allowEmptyCreatedDates: true,
}

/**
 * The names of all filters which can be changed by the user
 */
type ChangableFilter = keyof Omit<
  AuctionResultsFilters,
  "earliestCreatedYear" | "latestCreatedYear"
>

interface AuctionResultsFiltersActionPayload {
  name: keyof AuctionResultsFilters
  value?: any
}

interface AuctionResultsFiltersAction {
  type: "SET" | "UNSET" | "RESET" | "SET_FILTERS" | "SET_STAGED_FILTERS"
  payload: AuctionResultsFiltersActionPayload | null
}

export interface AuctionResultsFilterContextProps {
  filters?: AuctionResultsFilters
  stagedFilters?: AuctionResultsFiltersState
  currentlySelectedFilters?: () => AuctionResultsFiltersState
  ZeroState?: React.FC | null
  onChange?: (filterState) => void
  resetFilters?: (() => void) | null
  setFilter?: ((name: ChangableFilter, value: any) => void) | null
  unsetFilter?: ((name: ChangableFilter) => void) | null
  onFilterClick?: (
    key: ChangableFilter,
    value: string,
    filterState: AuctionResultsFilters
  ) => void
  shouldStageFilterChanges?: boolean
  setShouldStageFilterChanges?: (value: boolean) => void
  setStagedFilters?: (state: AuctionResultsFilters) => void
  setFilters?: (state: AuctionResultsFilters, opts?: { force: boolean }) => void
}

/**
 * Context behavior shared globally across the AuctionResultsFilter component tree
 */
export const AuctionResultsFilterContext = React.createContext<
  AuctionResultsFilterContextProps
>({
  filters: initialAuctionResultsFilterState,
  setFilter: null,
  resetFilters: null,
  unsetFilter: null,
  ZeroState: null,
})

export type SharedAuctionResultsFilterContextProps = Pick<
  AuctionResultsFilterContextProps,
  "filters" | "onFilterClick" | "filters" | "onFilterClick" | "ZeroState"
> & {
  onChange?: (filterState) => void
}

export let auctionResultsFilterResetState: AuctionResultsFilters = initialAuctionResultsFilterState

export const AuctionResultsFilterContextProvider: React.FC<
  SharedAuctionResultsFilterContextProps & {
    children: React.ReactNode
  }
> = ({ children, filters = {}, onFilterClick, onChange, ZeroState }) => {
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

  const [auctionResultsFilterState, dispatch] = useReducer(
    AuctionResultsFilterReducer,
    initialFilterState
  )
  const [stagedAuctionResultsFilterState, stage] = useReducer(
    AuctionResultsFilterReducer,
    {}
  )
  const [shouldStageFilterChanges, setShouldStageFilterChanges] = useState(
    false
  )

  useDeepCompareEffect(() => {
    if (onChange) {
      onChange(omit(auctionResultsFilterState, ["reset"]))
    }
  }, [auctionResultsFilterState])

  const currentlySelectedFilters = () => {
    return shouldStageFilterChanges
      ? stagedAuctionResultsFilterState
      : auctionResultsFilterState
  }

  const dispatchOrStage = (action: AuctionResultsFiltersAction) => {
    shouldStageFilterChanges ? stage(action) : dispatch(action)
  }

  const auctionResultsFilterContext: AuctionResultsFilterContextProps = {
    filters: auctionResultsFilterState,

    stagedFilters: stagedAuctionResultsFilterState,
    currentlySelectedFilters: currentlySelectedFilters,

    // Handlers
    onFilterClick,

    // Components
    ZeroState,

    // Filter manipulation
    setFilter: (name, val) => {
      if (onFilterClick) {
        onFilterClick(name, val, { ...currentlySelectedFilters(), [name]: val })
      }

      const action: AuctionResultsFiltersAction = {
        type: "SET",
        payload: {
          name,
          value: val,
        },
      }

      dispatchOrStage(action)
    },

    unsetFilter: name => {
      const action: AuctionResultsFiltersAction = {
        type: "UNSET",
        payload: {
          name,
        },
      }
      dispatchOrStage(action)
    },

    resetFilters: () => {
      const action: AuctionResultsFiltersAction = {
        type: "RESET",
        payload: null,
      }
      dispatchOrStage(action)
    },

    // Staging & applying filter changes
    shouldStageFilterChanges,
    setShouldStageFilterChanges,

    setStagedFilters: currentState => {
      const action: AuctionResultsFiltersAction = {
        type: "SET_STAGED_FILTERS",
        payload: currentState as AuctionResultsFiltersActionPayload,
      }
      stage(action)
    },

    setFilters: (newState, options = { force: true }) => {
      const action: AuctionResultsFiltersAction = {
        type: "SET_FILTERS",
        payload: newState as AuctionResultsFiltersActionPayload,
      }
      const { force } = options
      force ? dispatch(action) : dispatchOrStage(action)
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
  action: AuctionResultsFiltersAction
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
      const { name, value } = action.payload || {}
      const filterState: AuctionResultsFilters = {
        pageAndCursor: { page: 1, cursor: null },
      }

      arrayFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value || []
        }
      })

      // primitive filter types
      const primitiveFilterTypes: Array<keyof AuctionResultsFilters> = [
        "sort",
        "keyword",
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

      // do not allow a real cursor to be set for page 1. to agree with initial
      // filter state.
      if (filterState.pageAndCursor && filterState.pageAndCursor.page === 1) {
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
      const { name } = action.payload || {}

      const filterState: AuctionResultsFilters = {
        pageAndCursor: { page: 1, cursor: null },
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
        earliestCreatedYear: state.earliestCreatedYear,
        latestCreatedYear: state.latestCreatedYear,
        createdAfterYear: state.earliestCreatedYear,
        createdBeforeYear: state.latestCreatedYear,
        reset: true,
      }
    }

    /**
     * Initializing a staged filter state from current choices (mobile)
     */
    case "SET_STAGED_FILTERS": {
      return action.payload as AuctionResultsFiltersState
    }

    /**
     * Replacing current filters eventually with staged filter choices (mobile)
     */
    case "SET_FILTERS": {
      return action.payload as AuctionResultsFiltersState
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
