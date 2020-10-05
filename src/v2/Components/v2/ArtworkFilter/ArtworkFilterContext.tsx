import { omit } from "lodash"
import React, { useContext, useReducer, useState } from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { hasFilters } from "./Utils/hasFilters"
import { isDefaultFilter } from "./Utils/isDefaultFilter"
import { rangeToTuple } from "./Utils/rangeToTuple"
import { paramsToCamelCase } from "./Utils/urlBuilder"

/**
 * Initial filter state
 */
export const initialArtworkFilterState: ArtworkFilters = {
  majorPeriods: [],
  page: 1,
  sizes: [],
  sort: "-decayed_merch",
  artistIDs: [],

  // TODO: Remove these unneeded default props
  // height: "*-*",
  // price_range: "*-*",
  // width: "*-*",
}

/**
 * A list of all possible artwork filters across all apps
 */
export interface ArtworkFilters {
  acquireable?: boolean
  artist_id?: string
  artistIDs?: string[]
  atAuction?: boolean
  color?: string
  forSale?: boolean
  height?: string
  includeArtworksByFollowedArtists?: boolean
  inquireableOnly?: boolean
  keyword?: string
  majorPeriods?: string[]
  medium?: string
  offerable?: boolean
  page?: number
  partnerID?: string
  priceRange?: string
  sizes?: string[]
  sort?: string
  term?: string
  width?: string
}

interface ArtworkFiltersState extends ArtworkFilters {
  reset?: boolean
}

/**
 * Possible aggregations that can be passed
 */
export type Aggregations = Array<{
  slice:
    | "COLOR"
    | "DIMENSION_RANGE"
    | "GALLERY"
    | "INSTITUTION"
    | "MAJOR_PERIOD"
    | "MEDIUM"
    | "MERCHANDISABLE_ARTISTS"
    | "PARTNER_CITY"
    | "PERIOD"
    | "PRICE_RANGE"
    | "TOTAL"
    | "ARTIST"
  counts: Array<{
    count: number
    value: string
    name: string
  }>
}>

interface Counts {
  for_sale_artworks?: number
  ecommerce_artworks?: number
  auction_artworks?: number
  artworks?: number
  has_make_offer_artworks?: boolean
  followedArtists?: number
}

// TODO: merge or make a generic base of `ArtworkFilterContextProps` and `AuctionResultsFilterContextProps`.
// Possibly just extend `BaseFilterContext` and make the former ones into `BaseFilterContext<ArtworkFilters>`
// and `BaseFilterContext<AuctionResultFilters>`.
export interface ArtworkFilterContextProps {
  /** The current artwork filter state (which determines the network request and the url querystring) */
  filters?: ArtworkFilters

  /** Interim filter state, to be manipulated before being applied to the current filter state */
  stagedFilters?: ArtworkFilters

  /** Getter for the appropriate source of truth to render in the filter UI */
  currentlySelectedFilters?: () => ArtworkFilters

  // Components
  ZeroState?: React.FC

  // Sorting
  sortOptions?: SortOptions
  aggregations?: Aggregations
  setAggregations?: (aggregations: Aggregations) => void
  counts?: Counts
  setCounts?: (counts: Counts) => void

  // Handlers
  onArtworkBrickClick?: (artwork: any, props: any) => void
  onFilterClick?: (
    key: keyof ArtworkFilters,
    value: string,
    filterState: ArtworkFilters
  ) => void

  // Filter manipulation
  hasFilters: boolean
  isDefaultValue: (name: keyof ArtworkFilters) => boolean
  rangeToTuple: (name: keyof ArtworkFilters) => [number, number]
  resetFilters: () => void
  setFilter: (name: keyof ArtworkFilters, value: any) => void
  unsetFilter: (name: keyof ArtworkFilters) => void

  // Staging filter changes
  shouldStageFilterChanges?: boolean
  setShouldStageFilterChanges?: (value: boolean) => void
  setStagedFilters?: (state: ArtworkFilters) => void
  setFilters?: (state: ArtworkFilters) => void
}

/**
 * Context behavior shared globally across the ArtworkFilter component tree
 */
export const ArtworkFilterContext = React.createContext<
  ArtworkFilterContextProps
>({
  filters: initialArtworkFilterState,
  hasFilters: false,
  isDefaultValue: null,
  rangeToTuple: null,
  resetFilters: null,
  setFilter: null,
  sortOptions: [],
  unsetFilter: null,
  ZeroState: null,
})

export type SortOptions = Array<{
  value: string
  text: string
}>

export type SharedArtworkFilterContextProps = Pick<
  ArtworkFilterContextProps,
  | "aggregations"
  | "counts"
  | "filters"
  | "sortOptions"
  | "onArtworkBrickClick"
  | "onFilterClick"
  | "ZeroState"
> & {
  onChange?: (filterState) => void
}

export const ArtworkFilterContextProvider: React.FC<
  SharedArtworkFilterContextProps & {
    children: React.ReactNode
  }
> = ({
  aggregations = [],
  children,
  counts = {},
  filters = {},
  onArtworkBrickClick,
  onChange,
  onFilterClick,
  sortOptions,
  ZeroState,
}) => {
  const initialFilterState = {
    ...initialArtworkFilterState,
    ...paramsToCamelCase(filters),
  }

  const [artworkFilterState, dispatch] = useReducer(
    artworkFilterReducer,
    initialFilterState
  )

  const [stagedArtworkFilterState, stage] = useReducer(artworkFilterReducer, {})

  // TODO: Consolidate this into additional reducer
  const [filterAggregations, setAggregations] = useState(aggregations)
  const [artworkCounts, setCounts] = useState(counts)
  const [shouldStageFilterChanges, setShouldStageFilterChanges] = useState(
    false
  )

  useDeepCompareEffect(() => {
    if (onChange) {
      onChange(omit(artworkFilterState, ["reset"]))
    }
  }, [artworkFilterState])

  // If in staged mode, return the staged filters for UI display
  const currentlySelectedFilters = () => {
    return shouldStageFilterChanges
      ? stagedArtworkFilterState
      : artworkFilterState
  }

  // If in staged mode, manipulate the staged version of filter state
  // instead of "real" one
  const dispatchOrStage = (action: ArtworkFiltersAction) => {
    shouldStageFilterChanges ? stage(action) : dispatch(action)
  }

  const artworkFilterContext = {
    filters: artworkFilterState,
    hasFilters: hasFilters(artworkFilterState),
    stagedFilters: stagedArtworkFilterState,
    currentlySelectedFilters: currentlySelectedFilters,

    // Handlers
    onArtworkBrickClick,
    onFilterClick,

    // Sorting
    sortOptions,
    aggregations: filterAggregations,
    setAggregations,
    counts: artworkCounts,
    setCounts,

    // Components
    ZeroState,

    // Filter manipulation
    isDefaultValue: field => {
      return isDefaultFilter(field, artworkFilterState[field])
    },

    rangeToTuple: range => {
      return rangeToTuple(currentlySelectedFilters(), range)
    },

    setFilter: (name, val) => {
      if (onFilterClick) {
        onFilterClick(name, val, { ...currentlySelectedFilters(), [name]: val })
      }

      const action: ArtworkFiltersAction = {
        type: "SET",
        payload: {
          name,
          value: val,
        },
      }
      dispatchOrStage(action)
    },

    unsetFilter: name => {
      const action: ArtworkFiltersAction = {
        type: "UNSET",
        payload: {
          name,
        },
      }
      dispatchOrStage(action)
    },

    resetFilters: () => {
      const action: ArtworkFiltersAction = {
        type: "RESET",
        payload: null,
      }
      dispatchOrStage(action)
    },

    // Staging & applying filter changes
    shouldStageFilterChanges,
    setShouldStageFilterChanges,

    setStagedFilters: currentState => {
      const action: ArtworkFiltersAction = {
        type: "SET_STAGED_FILTERS",
        payload: currentState,
      }
      stage(action)
    },

    setFilters: newState => {
      const action: ArtworkFiltersAction = {
        type: "SET_FILTERS",
        payload: newState,
      }
      dispatch(action)
    },
  }

  return (
    <ArtworkFilterContext.Provider value={artworkFilterContext}>
      {children}
    </ArtworkFilterContext.Provider>
  )
}

interface ArtworkFiltersAction {
  type: "SET" | "UNSET" | "RESET" | "SET_FILTERS" | "SET_STAGED_FILTERS"
  payload: { name: keyof ArtworkFilters; value?: any }
}

const artworkFilterReducer = (
  state: ArtworkFiltersState,
  action: ArtworkFiltersAction
): ArtworkFiltersState => {
  const arrayFilterTypes: Array<keyof ArtworkFilters> = ["sizes", "artistIDs"]

  switch (action.type) {
    /**
     * Setting  and updating filters
     */
    case "SET": {
      const { name, value } = action.payload

      let filterState: ArtworkFilters = {
        page: 1,
      }

      if (name === "majorPeriods") {
        filterState = {
          majorPeriods: value ? [value] : [],
        }
      }
      if (name === "page") {
        filterState[name] = Number(value)
      }

      arrayFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value || []
        }
      })

      // String filter types
      const stringFilterTypes: Array<keyof ArtworkFilters> = [
        "color",
        "height",
        "medium",
        "partnerID",
        "priceRange",
        "sort",
        "width",
      ]
      stringFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = value
        }
      })

      // Boolean filter types
      const booleanFilterTypes: Array<keyof ArtworkFilters> = [
        "acquireable",
        "atAuction",
        "forSale",
        "includeArtworksByFollowedArtists",
        "inquireableOnly",
        "offerable",
      ]
      booleanFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = Boolean(value)
        }
      })

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
      const { name } = action.payload as { name: keyof ArtworkFilters }

      let filterState: ArtworkFilters = {
        page: 1,
      }

      if (name === "majorPeriods") {
        filterState = {
          majorPeriods: [],
        }
      }
      if (name === "medium") {
        filterState = {
          medium: "*",
        }
      }
      if (name === "page") {
        filterState = {
          page: 1,
        }
      }

      arrayFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = []
        }
      })

      const filters: Array<keyof ArtworkFilters> = [
        "acquireable",
        "atAuction",
        "color",
        "forSale",
        "includeArtworksByFollowedArtists",
        "inquireableOnly",
        "offerable",
        "partnerID",
      ]
      filters.forEach(filter => {
        if (name === filter) {
          filterState[name as string] = null
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
        ...initialArtworkFilterState,
        reset: true,
      }
    }

    /**
     * Initializing a staged filter state from current choices (mobile)
     */
    case "SET_STAGED_FILTERS": {
      return action.payload as ArtworkFiltersState
    }

    /**
     * Replacing current filters eventually with staged filter choices (mobile)
     */
    case "SET_FILTERS": {
      return action.payload as ArtworkFiltersState
    }

    default:
      return state
  }
}

/**
 * Hook to conveniently access filter state context
 */
export const useArtworkFilterContext = () => {
  const artworkFilterContext = useContext(ArtworkFilterContext)
  return artworkFilterContext
}
