import { omit } from "lodash"
import { useContext, useReducer, useState } from "react"
import * as React from "react"
import useDeepCompareEffect from "use-deep-compare-effect"
import { SortOptions } from "../SortFilter"
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
  attributionClass: [],
  partnerIDs: [],
  additionalGeneIDs: [],
  colors: [],
  locationCities: [],
  artistNationalities: [],
  materialsTerms: [],
  height: "*-*",
  width: "*-*",
  priceRange: "*-*",
}

/**
 * General filter types and objects
 */
export enum FilterParamName {
  additionalGeneIDs = "additionalGeneIDs",
  artistIDs = "artistIDs",
  artistNationalities = "artistNationalities",
  artistsIFollow = "includeArtworksByFollowedArtists",
  attributionClass = "attributionClass",
  colors = "colors",
  height = "height",
  keyword = "keyword",
  locationCities = "locationCities",
  materialsTerms = "materialsTerms",
  medium = "medium",
  partnerIDs = "partnerIDs",
  priceRange = "priceRange",
  sizes = "sizes",
  sort = "sort",
  timePeriod = "majorPeriods",
  waysToBuyBid = "atAuction",
  waysToBuyBuy = "acquireable",
  waysToBuyInquire = "inquireableOnly",
  waysToBuyMakeOffer = "offerable",
  width = "width",
}

/**
 * A list of filters that support multiple selections
 */
export interface MultiSelectArtworkFilters {
  attributionClass?: string[]
  artistIDs?: string[]
  colors?: string[]
  additionalGeneIDs?: string[]
  majorPeriods?: string[]
  partnerIDs?: string[]
  sizes?: string[]
  locationCities?: string[]
  artistNationalities?: string[]
  materialsTerms?: string[]
}

/**
 * A list of all possible artwork filters across all apps
 */
export interface ArtworkFilters extends MultiSelectArtworkFilters {
  acquireable?: boolean
  artist_id?: string
  atAuction?: boolean
  color?: string
  forSale?: boolean
  height?: string
  includeArtworksByFollowedArtists?: boolean
  inquireableOnly?: boolean
  keyword?: string
  medium?: string
  offerable?: boolean
  page?: number
  partnerID?: string
  priceRange?: string
  sort?: string
  term?: string
  width?: string
}

export interface ArtworkFiltersState extends ArtworkFilters {
  reset?: boolean
}

export type Slice =
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
  | "PARTNER"
  | "LOCATION_CITY"
  | "ARTIST_NATIONALITY"
  | "MATERIALS_TERMS"

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

export interface Counts {
  for_sale_artworks?: number
  ecommerce_artworks?: number
  auction_artworks?: number
  artworks?: number
  has_make_offer_artworks?: boolean
  followedArtists?: number
}

export type SelectedFiltersCounts = {
  [Name in FilterParamName | "waysToBuy"]: number
}

// TODO: merge or make a generic base of `ArtworkFilterContextProps` and `AuctionResultsFilterContextProps`.
// Possibly just extend `BaseFilterContext` and make the former ones into `BaseFilterContext<ArtworkFilters>`
// and `BaseFilterContext<AuctionResultFilters>`.
export interface ArtworkFilterContextProps {
  /** The current artwork filter state (which determines the network request and the url querystring) */
  filters?: ArtworkFiltersState

  /** Interim filter state, to be manipulated before being applied to the current filter state */
  stagedFilters?: ArtworkFiltersState

  /** Getter for the appropriate source of truth to render in the filter UI */
  currentlySelectedFilters?: () => ArtworkFiltersState

  // Components
  ZeroState?: React.FC

  // Sorting
  sortOptions?: SortOptions
  aggregations?: Aggregations
  counts?: Counts
  setCounts?: (counts: Counts) => void

  // Handlers
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
  setFilters?: (state: ArtworkFilters, opts?: { force: boolean }) => void

  // Has the ArtworkFilterContext been mounted in the tree
  mountedContext?: boolean
}

/**
 * Context behavior shared globally across the ArtworkFilter component tree
 */
export const ArtworkFilterContext = React.createContext<
  ArtworkFilterContextProps
>({
  filters: initialArtworkFilterState,
  hasFilters: false,
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  isDefaultValue: null,
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  rangeToTuple: null,
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  resetFilters: null,
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  setFilter: null,
  sortOptions: [],
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  unsetFilter: null,
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  ZeroState: null,
  mountedContext: false,
})

export type SharedArtworkFilterContextProps = Pick<
  ArtworkFilterContextProps,
  | "aggregations"
  | "counts"
  | "filters"
  | "sortOptions"
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
    mountedContext: true,

    filters: artworkFilterState,
    hasFilters: hasFilters(artworkFilterState),
    stagedFilters: stagedArtworkFilterState,
    currentlySelectedFilters: currentlySelectedFilters,

    // Handlers
    onFilterClick,

    // Sorting
    sortOptions,
    aggregations,
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
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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

    setFilters: (newState, opts = { force: true }) => {
      const action: ArtworkFiltersAction = {
        type: "SET_FILTERS",
        payload: newState,
      }
      const { force } = opts
      force ? dispatch(action) : dispatchOrStage(action)
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

export type ArrayArtworkFilter =
  | "artistIDs"
  | "partnerIDs"
  | "locationCities"
  | "artistNationalities"
  | "materialsTerms"

const artworkFilterReducer = (
  state: ArtworkFiltersState,
  action: ArtworkFiltersAction
): ArtworkFiltersState => {
  const arrayFilterTypes: Array<keyof ArtworkFilters> = [
    "sizes",
    "artistIDs",
    "attributionClass",
    "partnerIDs",
    "additionalGeneIDs",
    "majorPeriods",
    "colors",
    "locationCities",
    "artistNationalities",
    "materialsTerms",
  ]

  switch (action.type) {
    /**
     * Setting  and updating filters
     */
    case "SET": {
      const { name, value } = action.payload

      let filterState: ArtworkFilters = {
        page: 1,
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
