import { omit } from "lodash"
import * as React from "react"
import { useContext, useReducer, useState } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { DEFAULT_METRIC, getSupportedMetric, Metric } from "Utils/metrics"

const MIN_START_DATE = 0
const MAX_END_DATE = 10000

export interface AuctionResultsFilters {
  organizations?: string[]
  categories?: string[]
  hideUpcoming?: boolean
  sizes?: string[]
  keyword?: string
  page?: number
  sort?: string
  createdAfterYear?: number | null
  createdBeforeYear?: number | null
  allowEmptyCreatedDates?: boolean
  metric?: Metric
  priceRange?: string
  currency?: string
  includeEstimateRange?: boolean
  includeUnknownPrices?: boolean
  saleStartYear?: number | null
  saleEndYear?: number | null
  allowUnspecifiedSaleDates?: boolean
}

export type Slice =
  | "SIMPLE_PRICE_HISTOGRAM"
  | "CURRENCIES_COUNT"
  | "LOTS_BY_SALE_YEAR"
  | "LOTS_BY_CREATED_YEAR"

/**
 * Possible aggregations that can be passed
 */
export type Aggregation = {
  slice: Slice
  counts: Array<{
    count: number
    value: string
    name: string
  }>
}
export type Aggregations = Array<Aggregation>

interface AuctionResultsFiltersState extends AuctionResultsFilters {
  reset?: boolean
}
/**
 * Initial filter state
 */
export const initialAuctionResultsFilterState = ({
  startDate = MIN_START_DATE,
  endDate = MAX_END_DATE,
  metric = DEFAULT_METRIC,
}: {
  startDate?: number | null
  endDate?: number | null
  metric?: Metric
}): AuctionResultsFilters => ({
  organizations: [],
  categories: [],
  hideUpcoming: false,
  sizes: [],
  keyword: undefined,
  page: 1,
  sort: "DATE_DESC",
  createdAfterYear: typeof startDate === "number" ? startDate : MIN_START_DATE,
  createdBeforeYear: typeof endDate === "number" ? endDate : MAX_END_DATE,
  allowEmptyCreatedDates: true,
  metric,
  priceRange: "*-*",
  currency: "",
  includeEstimateRange: false,
  includeUnknownPrices: true,
  saleStartYear: null,
  saleEndYear: null,
  allowUnspecifiedSaleDates: true,
})

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
  /** Used to get the overall earliest created year for all lots of given artist */
  earliestCreatedYear?: number | null
  /** Used to get the overall latest created year for all lots of given artist */
  latestCreatedYear?: number | null
  userPreferredMetric?: Metric
  aggregations?: Aggregations
}

/**
 * Context behavior shared globally across the AuctionResultsFilter component tree
 */
export const AuctionResultsFilterContext = React.createContext<
  AuctionResultsFilterContextProps
>({
  filters: initialAuctionResultsFilterState({
    startDate: null,
    endDate: null,
  }),
  setFilter: null,
  resetFilters: null,
  unsetFilter: null,
  ZeroState: null,
})

export type SharedAuctionResultsFilterContextProps = Pick<
  AuctionResultsFilterContextProps,
  | "aggregations"
  | "filters"
  | "onFilterClick"
  | "ZeroState"
  | "earliestCreatedYear"
  | "latestCreatedYear"
  | "userPreferredMetric"
> & {
  onChange?: (filterState) => void
}

export const AuctionResultsFilterContextProvider: React.FC<
  SharedAuctionResultsFilterContextProps & {
    children: React.ReactNode
  }
> = ({
  aggregations = [],
  children,
  filters = {},
  onFilterClick,
  onChange,
  ZeroState,
  earliestCreatedYear = null,
  latestCreatedYear = null,
  userPreferredMetric,
}) => {
  const initialFilterState = {
    ...initialAuctionResultsFilterState({
      startDate: earliestCreatedYear,
      endDate: latestCreatedYear,
      metric: userPreferredMetric,
    }),
    ...filters,
  }

  // Use only allowed metric
  if (filters.metric) {
    initialFilterState.metric = getSupportedMetric(filters.metric)
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
    earliestCreatedYear,
    latestCreatedYear,
    aggregations,
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
        payload: {
          earliestCreatedYear,
          latestCreatedYear,
          metric: userPreferredMetric,
          saleStartYear: null,
          saleEndYear: null,
        } as any,
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
        page: 1,
      }

      arrayFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value || []
        }
      })

      // primitive filter types
      const primitiveFilterTypes: Array<keyof AuctionResultsFilters> = [
        "sort",
        "hideUpcoming",
        "keyword",
        "page",
        "createdAfterYear",
        "createdBeforeYear",
        "allowEmptyCreatedDates",
        "metric",
        "priceRange",
        "includeEstimateRange",
        "includeUnknownPrices",
        "currency",
        "saleStartYear",
        "saleEndYear",
        "allowUnspecifiedSaleDates",
      ]

      primitiveFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value
        }
      })

      if (
        name === "createdBeforeYear" &&
        value &&
        (!state.createdAfterYear || state.createdAfterYear > value)
      ) {
        filterState.createdAfterYear = value
      }

      if (
        name === "createdAfterYear" &&
        value &&
        (!state.createdBeforeYear || state.createdBeforeYear < value)
      ) {
        filterState.createdBeforeYear = value
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
        page: 1,
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
      const {
        earliestCreatedYear,
        latestCreatedYear,
        metric,
      } = action.payload as any
      return {
        ...initialAuctionResultsFilterState({
          startDate: earliestCreatedYear,
          endDate: latestCreatedYear,
          metric,
        }),
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

export const useCurrentlySelectedFiltersForAuctionResults = () => {
  const { currentlySelectedFilters } = useAuctionResultsFilterContext()

  return currentlySelectedFilters?.() ?? {}
}
