import {
  createContextStore,
  Action,
  action,
  Thunk,
  thunk,
  Computed,
  computed,
} from "easy-peasy"
import {
  type AuctionResultsFilters,
  initialAuctionResultsFilterState,
} from "Apps/Artist/Routes/AuctionResults/initialAuctionResultsFilterState"
import { type Metric, getSupportedMetric } from "Utils/metrics"
import { omit } from "lodash"
import * as React from "react"
import { useContext } from "react"

export type Slice =
  | "SIMPLE_PRICE_HISTOGRAM"
  | "CURRENCIES_COUNT"
  | "LOTS_BY_SALE_YEAR"
  | "LOTS_BY_CREATED_YEAR"

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

type ChangableFilter = keyof Omit<
  AuctionResultsFilters,
  "earliestCreatedYear" | "latestCreatedYear"
>

// Store model interface
interface AuctionResultsFilterStoreModel {
  // State
  filters: AuctionResultsFiltersState
  stagedFilters: AuctionResultsFiltersState
  shouldStageFilterChanges: boolean
  aggregations: Aggregations
  earliestCreatedYear: number | null
  latestCreatedYear: number | null
  defaultFilters: AuctionResultsFilters

  // Computed
  currentlySelectedFilters: Computed<
    AuctionResultsFilterStoreModel,
    AuctionResultsFiltersState
  >

  // Actions
  setFilter: Action<
    AuctionResultsFilterStoreModel,
    { name: ChangableFilter; value: any }
  >
  unsetFilter: Action<AuctionResultsFilterStoreModel, { name: ChangableFilter }>
  resetFilters: Action<AuctionResultsFilterStoreModel>
  setShouldStageFilterChanges: Action<AuctionResultsFilterStoreModel, boolean>
  setStagedFilters: Action<
    AuctionResultsFilterStoreModel,
    AuctionResultsFilters
  >
  setFilters: Action<
    AuctionResultsFilterStoreModel,
    { filters: AuctionResultsFilters; force?: boolean }
  >

  // Thunks
  applyFilterChange: Thunk<
    AuctionResultsFilterStoreModel,
    {
      name: ChangableFilter
      value: any
      onFilterClick?: (
        key: ChangableFilter,
        value: string,
        filterState: AuctionResultsFilters,
      ) => void
    }
  >
}

const arrayFilterTypes: Array<keyof AuctionResultsFilters> = [
  "organizations",
  "categories",
  "sizes",
]

// Create the context store
export const createAuctionResultsFilterStore = (initialConfig: {
  filters?: AuctionResultsFilters
  earliestCreatedYear?: number | null
  latestCreatedYear?: number | null
  userPreferredMetric?: Metric
  aggregations?: Aggregations
}) => {
  const defaultFilters = initialAuctionResultsFilterState({
    startDate: initialConfig.earliestCreatedYear,
    endDate: initialConfig.latestCreatedYear,
    metric: initialConfig.userPreferredMetric,
  })

  const initialFilterState = {
    ...defaultFilters,
    ...(initialConfig.filters || {}),
  }

  // Use only allowed metric
  if (initialConfig.filters?.metric) {
    initialFilterState.metric = getSupportedMetric(initialConfig.filters.metric)
  }

  return createContextStore<AuctionResultsFilterStoreModel>(() => ({
    // State
    filters: initialFilterState,
    stagedFilters: {},
    shouldStageFilterChanges: false,
    aggregations: initialConfig.aggregations || [],
    earliestCreatedYear: initialConfig.earliestCreatedYear || null,
    latestCreatedYear: initialConfig.latestCreatedYear || null,
    defaultFilters,

    // Computed
    currentlySelectedFilters: computed(state =>
      state.shouldStageFilterChanges ? state.stagedFilters : state.filters,
    ),

    // Actions
    setFilter: action((state, { name, value }) => {
      const targetFilters = state.shouldStageFilterChanges
        ? state.stagedFilters
        : state.filters
      const filterUpdate: Partial<AuctionResultsFilters> = { page: 1 }

      // Handle array filter types
      if (arrayFilterTypes.includes(name as any)) {
        filterUpdate[name] = value || []
      } else {
        // Handle primitive filter types
        filterUpdate[name] = value
      }

      // Special handling for year ranges
      if (name === "createdBeforeYear" && value) {
        if (
          !targetFilters.createdAfterYear ||
          targetFilters.createdAfterYear > value
        ) {
          filterUpdate.createdAfterYear = value
        }
      }

      if (name === "createdAfterYear" && value) {
        if (
          !targetFilters.createdBeforeYear ||
          targetFilters.createdBeforeYear < value
        ) {
          filterUpdate.createdBeforeYear = value
        }
      }

      delete targetFilters.reset
      Object.assign(targetFilters, filterUpdate)
    }),

    unsetFilter: action((state, { name }) => {
      const targetFilters = state.shouldStageFilterChanges
        ? state.stagedFilters
        : state.filters
      targetFilters.page = 1

      if (arrayFilterTypes.includes(name as any)) {
        targetFilters[name] = []
      } else if (name === "sort") {
        targetFilters[name] = null
      }
    }),

    resetFilters: action(state => {
      const resetState = {
        ...initialAuctionResultsFilterState({
          startDate: state.earliestCreatedYear,
          endDate: state.latestCreatedYear,
          metric: state.defaultFilters.metric,
        }),
        reset: true,
      }

      if (state.shouldStageFilterChanges) {
        state.stagedFilters = resetState
      } else {
        state.filters = resetState
      }
    }),

    setShouldStageFilterChanges: action((state, payload) => {
      state.shouldStageFilterChanges = payload
    }),

    setStagedFilters: action((state, payload) => {
      state.stagedFilters = payload
    }),

    setFilters: action((state, { filters, force = true }) => {
      if (force || !state.shouldStageFilterChanges) {
        state.filters = filters
      } else {
        state.stagedFilters = filters
      }
    }),

    // Thunks
    applyFilterChange: thunk(
      (actions, { name, value, onFilterClick }, { getState }) => {
        const state = getState()
        const currentFilters = state.currentlySelectedFilters

        if (onFilterClick) {
          onFilterClick(name, value, { ...currentFilters, [name]: value })
        }

        actions.setFilter({ name, value })
      },
    ),
  }))
}

// Default store instance
export const AuctionResultsFilterStore = createAuctionResultsFilterStore({})

// Context interface for backward compatibility
export interface AuctionResultsFilterContextProps {
  filters?: AuctionResultsFilters
  stagedFilters?: AuctionResultsFiltersState
  currentlySelectedFilters?: () => AuctionResultsFiltersState
  ZeroState?: React.FC<React.PropsWithChildren<unknown>> | null
  onChange?: (filterState) => void
  resetFilters?: (() => void) | null
  setFilter?: ((name: ChangableFilter, value: any) => void) | null
  unsetFilter?: ((name: ChangableFilter) => void) | null
  onFilterClick?: (
    key: ChangableFilter,
    value: string,
    filterState: AuctionResultsFilters,
  ) => void
  shouldStageFilterChanges?: boolean
  setShouldStageFilterChanges?: (value: boolean) => void
  setStagedFilters?: (state: AuctionResultsFilters) => void
  setFilters?: (state: AuctionResultsFilters, opts?: { force: boolean }) => void
  earliestCreatedYear?: number | null
  latestCreatedYear?: number | null
  userPreferredMetric?: Metric
  aggregations?: Aggregations
}

// Original context for backward compatibility
export const AuctionResultsFilterContext =
  React.createContext<AuctionResultsFilterContextProps>({
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

// Provider component
export const AuctionResultsFilterContextProvider: React.FC<
  React.PropsWithChildren<
    SharedAuctionResultsFilterContextProps & {
      children: React.ReactNode
    }
  >
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
  // Create store with configuration
  const store = React.useMemo(
    () =>
      createAuctionResultsFilterStore({
        filters,
        earliestCreatedYear,
        latestCreatedYear,
        userPreferredMetric,
        aggregations,
      }),
    [
      filters,
      earliestCreatedYear,
      latestCreatedYear,
      userPreferredMetric,
      aggregations,
    ],
  )

  // Watch for filter changes
  const currentFilters = store.useStoreState(state => state.filters)
  const isInitialRender = React.useRef(true)

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (onChange) {
      onChange(omit(currentFilters, ["reset"]))
    }
  }, [currentFilters, onChange])

  return (
    <store.Provider>
      <AuctionResultsFilterContextWrapper
        onFilterClick={onFilterClick}
        ZeroState={ZeroState}
        onChange={onChange}
      >
        {children}
      </AuctionResultsFilterContextWrapper>
    </store.Provider>
  )
}

// Wrapper to provide backward compatible context
const AuctionResultsFilterContextWrapper: React.FC<any> = ({
  children,
  onFilterClick,
  ZeroState,
}) => {
  const state = AuctionResultsFilterStore.useStoreState(state => state)
  const actions = AuctionResultsFilterStore.useStoreActions(actions => actions)

  const contextValue: AuctionResultsFilterContextProps = {
    filters: state.filters,
    stagedFilters: state.stagedFilters,
    currentlySelectedFilters: () => state.currentlySelectedFilters,
    earliestCreatedYear: state.earliestCreatedYear,
    latestCreatedYear: state.latestCreatedYear,
    aggregations: state.aggregations,

    // Pass through
    onFilterClick,
    ZeroState,

    // Actions
    setFilter: (name, value) => {
      actions.applyFilterChange({ name, value, onFilterClick })
    },
    unsetFilter: name => actions.unsetFilter({ name }),
    resetFilters: () => actions.resetFilters(),

    // Staging
    shouldStageFilterChanges: state.shouldStageFilterChanges,
    setShouldStageFilterChanges: actions.setShouldStageFilterChanges,
    setStagedFilters: actions.setStagedFilters,
    setFilters: (filters, opts) =>
      actions.setFilters({ filters, force: opts?.force }),
  }

  return (
    <AuctionResultsFilterContext.Provider value={contextValue}>
      {children}
    </AuctionResultsFilterContext.Provider>
  )
}

// Hooks
export const useAuctionResultsFilterContext = () => {
  const artworkFilterContext = useContext(AuctionResultsFilterContext)
  return artworkFilterContext
}

export const useCurrentlySelectedFiltersForAuctionResults = () => {
  const { currentlySelectedFilters } = useAuctionResultsFilterContext()
  return currentlySelectedFilters?.() ?? {}
}
