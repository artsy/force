import {
  createContextStore,
  Action,
  action,
  Thunk,
  thunk,
  Computed,
  computed,
} from "easy-peasy"
import type { ArtworkFilters } from "Components/ArtworkFilter/ArtworkFilterTypes"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import type { SortOptions } from "Components/SortFilter"
import { DEFAULT_METRIC, type Metric, getSupportedMetric } from "Utils/metrics"
import { isArray, omit } from "lodash"
import { hasFilters } from "./Utils/hasFilters"
import { isDefaultFilter } from "./Utils/isDefaultFilter"
import { rangeToTuple } from "./Utils/rangeToTuple"

// Re-export types from original
export * from "./ArtworkFilterContext"

// Store model interface
interface ArtworkFilterStoreModel {
  // Core filter state
  filters: ArtworkFilters
  stagedFilters: ArtworkFilters
  defaultFilters: ArtworkFilters

  // UI state
  shouldStageFilterChanges: boolean

  // Additional state
  counts: Counts
  followedArtists: FollowedArtists
  aggregations: Aggregations
  sortOptions?: SortOptions

  // Computed values
  hasFilters: Computed<ArtworkFilterStoreModel, boolean>
  currentlySelectedFilters: Computed<ArtworkFilterStoreModel, ArtworkFilters>
  selectedFiltersCounts: Computed<
    ArtworkFilterStoreModel,
    Partial<SelectedFiltersCounts>
  >

  // Actions
  setFilter: Action<
    ArtworkFilterStoreModel,
    { name: keyof ArtworkFilters; value: any }
  >
  unsetFilter: Action<ArtworkFilterStoreModel, { name: keyof ArtworkFilters }>
  resetFilters: Action<ArtworkFilterStoreModel>
  setShouldStageFilterChanges: Action<ArtworkFilterStoreModel, boolean>
  setStagedFilters: Action<ArtworkFilterStoreModel, ArtworkFilters>
  setFilters: Action<
    ArtworkFilterStoreModel,
    { filters: ArtworkFilters; force?: boolean }
  >
  setCounts: Action<ArtworkFilterStoreModel, Counts>
  setFollowedArtists: Action<ArtworkFilterStoreModel, FollowedArtists>

  // Thunks for complex operations
  applyFilterChange: Thunk<
    ArtworkFilterStoreModel,
    {
      name: keyof ArtworkFilters
      value: any
      onFilterClick?: (
        key: keyof ArtworkFilters,
        value: string,
        filterState: ArtworkFilters,
      ) => void
    }
  >
}

// Helper to determine array filter types
const arrayFilterTypes: Array<keyof ArtworkFilters> = [
  "sizes",
  "artistIDs",
  "artistSeriesIDs",
  "attributionClass",
  "partnerIDs",
  "additionalGeneIDs",
  "majorPeriods",
  "colors",
  "locationCities",
  "artistNationalities",
  "materialsTerms",
]

// Helper function for getting selected filters counts
const getSelectedFiltersCounts = (
  currentFilters: ArtworkFilters,
  defaultFilters: ArtworkFilters,
): Partial<SelectedFiltersCounts> => {
  const counts: Partial<SelectedFiltersCounts> = {}

  Object.entries(currentFilters).forEach(([key, value]) => {
    if (key in SelectedFiltersCountsLabels && value !== defaultFilters[key]) {
      if (Array.isArray(value)) {
        counts[key] = value.length
      } else if (value !== null && value !== undefined && value !== "*-*") {
        counts[key] = 1
      }
    }
  })

  // Special handling for ways to buy
  const waysToBuyCount = waysToBuyFilterNames.reduce((acc, name) => {
    return acc + (currentFilters[name] ? 1 : 0)
  }, 0)

  if (waysToBuyCount > 0) {
    counts.waysToBuy = waysToBuyCount
  }

  return counts
}

// Create the context store
export const createArtworkFilterStore = (
  initialState: Partial<ArtworkFilterStoreModel> = {},
) => {
  return createContextStore<ArtworkFilterStoreModel>(runtimeModel => {
    const defaultFilters =
      runtimeModel?.defaultFilters ||
      initialState.defaultFilters ||
      initialArtworkFilterState
    const initialFilters =
      runtimeModel?.filters || initialState.filters || defaultFilters

    return {
      // State
      filters: initialFilters,
      stagedFilters: {},
      defaultFilters,
      shouldStageFilterChanges: false,
      counts: runtimeModel?.counts || {},
      followedArtists: runtimeModel?.followedArtists || [],
      aggregations: runtimeModel?.aggregations || [],
      sortOptions: runtimeModel?.sortOptions,

      // Computed
      hasFilters: computed(state => hasFilters(state.filters)),

      currentlySelectedFilters: computed(state =>
        state.shouldStageFilterChanges ? state.stagedFilters : state.filters,
      ),

      selectedFiltersCounts: computed(state =>
        getSelectedFiltersCounts(
          state.shouldStageFilterChanges ? state.stagedFilters : state.filters,
          state.defaultFilters,
        ),
      ),

      // Actions
      setFilter: action((state, { name, value }) => {
        const targetFilters = state.shouldStageFilterChanges
          ? state.stagedFilters
          : state.filters

        if (arrayFilterTypes.includes(name) && !isArray(value)) {
          const currentValue = targetFilters[name] as string[]
          if (currentValue?.includes(value)) {
            targetFilters[name] = currentValue.filter(x => x !== value)
          } else {
            targetFilters[name] = [...(currentValue || []), value]
          }
        } else {
          targetFilters[name] = value
        }
      }),

      unsetFilter: action((state, { name }) => {
        const targetFilters = state.shouldStageFilterChanges
          ? state.stagedFilters
          : state.filters
        const defaultValue = state.defaultFilters[name]

        if (isArray(defaultValue)) {
          targetFilters[name] = []
        } else if (defaultValue === null || defaultValue === undefined) {
          delete targetFilters[name]
        } else {
          targetFilters[name] = defaultValue
        }
      }),

      resetFilters: action(state => {
        if (state.shouldStageFilterChanges) {
          state.stagedFilters = { ...state.defaultFilters }
        } else {
          state.filters = { ...state.defaultFilters, reset: true }
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

      setCounts: action((state, payload) => {
        state.counts = payload
      }),

      setFollowedArtists: action((state, payload) => {
        state.followedArtists = payload
      }),

      // Thunks
      applyFilterChange: thunk(
        (actions, { name, value, onFilterClick }, { getState }) => {
          const state = getState()
          const currentFilters = state.shouldStageFilterChanges
            ? state.stagedFilters
            : state.filters

          if (onFilterClick) {
            onFilterClick(name, value, { ...currentFilters, [name]: value })
          }

          actions.setFilter({ name, value })
        },
      ),
    }
  })
}

// Default store instance
export const ArtworkFilterStore = createArtworkFilterStore()

// Provider component
export const ArtworkFilterContextProvider: React.FC<
  React.PropsWithChildren<
    SharedArtworkFilterContextProps & { children: React.ReactNode }
  >
> = ({
  aggregations = [],
  children,
  counts = {},
  filters = {},
  followedArtists = [],
  onChange = updateUrl,
  onFilterClick,
  sortOptions,
  userPreferredMetric,
  ZeroState,
}) => {
  const camelCasedFilters = paramsToCamelCase(filters)
  const defaultSort = sortOptions?.[0].value ?? initialArtworkFilterState.sort
  const defaultMetric = userPreferredMetric ?? initialArtworkFilterState.metric
  const defaultFilters = {
    ...initialArtworkFilterState,
    sort: defaultSort,
    metric: defaultMetric,
  }
  const initialFilterState = {
    ...defaultFilters,
    ...camelCasedFilters,
  }

  if (camelCasedFilters.metric) {
    initialFilterState.metric = getSupportedMetric(camelCasedFilters.metric)
  }

  // Create store with initial state
  const store = createArtworkFilterStore({
    filters: initialFilterState,
    defaultFilters,
    counts,
    followedArtists,
    aggregations,
    sortOptions,
  })

  // Watch for filter changes and call onChange
  store.useStoreState(state => {
    if (onChange && !state.filters.reset) {
      onChange(omit(state.filters, ["reset"]))
    }
    return null
  })

  return (
    <store.Provider>
      <ArtworkFilterContextWrapper
        onFilterClick={onFilterClick}
        ZeroState={ZeroState}
        userPreferredMetric={userPreferredMetric}
      >
        {children}
      </ArtworkFilterContextWrapper>
    </store.Provider>
  )
}

// Wrapper to provide backward compatible context
const ArtworkFilterContextWrapper: React.FC<any> = ({
  children,
  onFilterClick,
  ZeroState,
}) => {
  const state = ArtworkFilterStore.useStoreState(state => state)
  const actions = ArtworkFilterStore.useStoreActions(actions => actions)

  const contextValue: ArtworkFilterContextProps = {
    defaultFilters: state.defaultFilters,
    filters: state.filters,
    hasFilters: state.hasFilters,
    stagedFilters: state.stagedFilters,
    currentlySelectedFilters: () => state.currentlySelectedFilters,
    selectedFiltersCounts: state.selectedFiltersCounts,

    // Pass through props
    onFilterClick,
    ZeroState,

    // State
    sortOptions: state.sortOptions,
    aggregations: state.aggregations,
    counts: state.counts,
    setCounts: actions.setCounts,
    followedArtists: state.followedArtists,
    setFollowedArtists: actions.setFollowedArtists,

    // Methods
    isDefaultValue: field => isDefaultFilter(field, state.filters[field]),
    rangeToTuple: range => rangeToTuple(state.currentlySelectedFilters, range),

    setFilter: (name, value) => {
      actions.applyFilterChange({ name, value, onFilterClick })
    },

    unsetFilter: name => actions.unsetFilter({ name }),
    resetFilters: actions.resetFilters,

    // Staging
    shouldStageFilterChanges: state.shouldStageFilterChanges,
    setShouldStageFilterChanges: actions.setShouldStageFilterChanges,
    setStagedFilters: actions.setStagedFilters,
    setFilters: (filters, opts) =>
      actions.setFilters({ filters, force: opts?.force }),

    mountedContext: true,
  }

  return (
    <ArtworkFilterContext.Provider value={contextValue}>
      {children}
    </ArtworkFilterContext.Provider>
  )
}

// Hook for using the context
export const useArtworkFilterContext = () => {
  return useContext(ArtworkFilterContext)
}

// Export alias for migration compatibility
export { ArtworkFilterStore as ArtworkFilterContext }
