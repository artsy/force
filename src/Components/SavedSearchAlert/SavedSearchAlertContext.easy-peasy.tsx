import {
  createContextStore,
  Action,
  action,
  Computed,
  computed,
} from "easy-peasy"
import type { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { paramsToSnakeCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { allowedSearchCriteriaKeys } from "Components/SavedSearchAlert/constants"
import type { Metric } from "Utils/metrics"
import qs from "qs"
import { extractPills } from "./Utils/extractPills"
import { getAllowedSearchCriteria } from "./Utils/savedSearchCriteria"
import type {
  FilterPill,
  SavedSearchEntity,
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "./types"

// Easy-peasy store model interface
interface SavedSearchAlertStoreModel {
  // State
  criteria: SearchCriteriaAttributes
  isCriteriaChanged: boolean

  // Computed
  pills: Computed<
    SavedSearchAlertStoreModel,
    FilterPill[],
    {
      entity: SavedSearchEntity
      aggregations?: Aggregations
      metric?: Metric
    }
  >

  // Actions
  setCriteriaValue: Action<
    SavedSearchAlertStoreModel,
    {
      key: SearchCriteriaAttributeKeys
      value: string | string[] | number | boolean | null
    }
  >
  removeCriteriaValue: Action<
    SavedSearchAlertStoreModel,
    {
      key: SearchCriteriaAttributeKeys
      value: string | number | boolean
    }
  >
  removePill: Action<SavedSearchAlertStoreModel, FilterPill>
}

// Create context store factory to support runtime props
export const createSavedSearchAlertStore = ({
  entity,
  aggregations,
  metric,
  artistSlug,
}: {
  entity: SavedSearchEntity
  aggregations?: Aggregations
  metric?: Metric
  artistSlug?: string
}) => {
  return createContextStore<SavedSearchAlertStoreModel>(runtimeModel => ({
    // State
    criteria: runtimeModel?.criteria || ({} as SearchCriteriaAttributes),
    isCriteriaChanged: runtimeModel?.isCriteriaChanged || false,

    // Computed
    pills: computed([state => state.criteria], criteria => {
      return extractPills({
        criteria,
        aggregations,
        entity,
        metric,
      })
    }),

    // Actions
    setCriteriaValue: action((state, { key, value }) => {
      const updatedCriteria = getAllowedSearchCriteria({
        ...state.criteria,
        [key]: value,
      })

      state.criteria = updatedCriteria
      state.isCriteriaChanged = true
    }),

    removeCriteriaValue: action((state, { key, value }) => {
      let criteriaValue = state.criteria[key]

      if (Array.isArray(criteriaValue)) {
        criteriaValue = criteriaValue.filter(
          currentValue => currentValue !== value,
        )
      } else {
        criteriaValue = null
      }

      const updatedCriteria = getAllowedSearchCriteria({
        ...state.criteria,
        [key]: criteriaValue,
      })

      state.criteria = updatedCriteria
      state.isCriteriaChanged = true
    }),

    removePill: action((state, pill) => {
      if (pill.isDefault) {
        return
      }

      // Delegate to removeCriteriaValue action
      const removeCriteriaValueAction = state.removeCriteriaValue as any
      removeCriteriaValueAction({
        key: pill.field as SearchCriteriaAttributeKeys,
        value: pill.value,
      })
    }),
  }))
}

export interface SavedSearchAlertContextProviderProps {
  entity: SavedSearchEntity
  aggregations?: Aggregations
  criteria: SearchCriteriaAttributes
  metric?: Metric
  artistSlug?: string
  /** Artwork ID, if the current alert is being set from an artwork */
  currentArtworkID?: string
}

/**
 * Provider component with backward compatibility
 */
export const SavedSearchAlertContextProvider: React.FC<
  React.PropsWithChildren<SavedSearchAlertContextProviderProps>
> = ({
  entity,
  aggregations,
  criteria: criteriaFromArgument,
  metric,
  artistSlug,
  currentArtworkID,
  children,
}) => {
  // Create store with dependencies
  const SavedSearchAlertStore = createSavedSearchAlertStore({
    entity,
    aggregations,
    metric,
    artistSlug,
  })

  // href calculated from criteria and primary artist slug
  const criteriaHref = () => {
    if (!artistSlug) return null

    const criteria = SavedSearchAlertStore.getState().criteria
    const allowedCriteriaValues = Object.fromEntries(
      Object.entries(criteria).filter(([key, _]) => {
        if (key === "artistIDs") return false
        return allowedSearchCriteriaKeys.includes(key)
      }),
    )
    const queryParams = qs.stringify(paramsToSnakeCase(allowedCriteriaValues))

    return `/artist/${artistSlug}?${queryParams}&for_sale=true`
  }

  return (
    <SavedSearchAlertStore.Provider
      runtimeModel={{
        criteria: criteriaFromArgument,
        isCriteriaChanged: false,
      }}
    >
      <SavedSearchAlertContextProviderWrapper
        store={SavedSearchAlertStore}
        entity={entity}
        currentArtworkID={currentArtworkID}
        criteriaHref={criteriaHref}
      >
        {children}
      </SavedSearchAlertContextProviderWrapper>
    </SavedSearchAlertStore.Provider>
  )
}

// Internal wrapper to access store hooks
const SavedSearchAlertContextProviderWrapper: React.FC<{
  store: ReturnType<typeof createSavedSearchAlertStore>
  entity: SavedSearchEntity
  currentArtworkID?: string
  criteriaHref: () => string | null
  children: React.ReactNode
}> = ({ store, entity, currentArtworkID, criteriaHref, children }) => {
  const state = store.useStoreState(state => state)
  const actions = store.useStoreActions(actions => actions)

  return (
    <SavedSearchAlertContext.Provider
      value={{
        pills: state.pills,
        entity,
        criteria: state.criteria,
        isCriteriaChanged: state.isCriteriaChanged,
        currentArtworkID,
        removeCriteriaValue: (key, value) =>
          actions.removeCriteriaValue({ key, value }),
        setCriteriaValue: (key, value) =>
          actions.setCriteriaValue({ key, value }),
        removePill: actions.removePill,
        criteriaHref,
      }}
    >
      {children}
    </SavedSearchAlertContext.Provider>
  )
}

// Legacy context for backward compatibility
interface SavedSearchAlertContextProps {
  pills: FilterPill[]
  entity: SavedSearchEntity
  criteria: SearchCriteriaAttributes
  isCriteriaChanged: boolean
  /** Artwork ID, if the current alert is being set from an artwork */
  currentArtworkID?: string

  removeCriteriaValue: (
    key: SearchCriteriaAttributeKeys,
    value: string | number | boolean,
  ) => void
  setCriteriaValue: (
    key: SearchCriteriaAttributeKeys,
    value: string | string[] | number | boolean | null,
  ) => void
  removePill: (pill: FilterPill) => void
  criteriaHref: () => string | null
}

const SavedSearchAlertContext = createContext<SavedSearchAlertContextProps>({
  pills: [],
  entity: {} as SavedSearchEntity,
  criteria: {} as SearchCriteriaAttributes,
  isCriteriaChanged: false,
  removeCriteriaValue: () => {},
  setCriteriaValue: () => {},
  removePill: () => {},
  criteriaHref: () => null,
})

// Backward compatible hook
export const useSavedSearchAlertContext = () => {
  return useContext(SavedSearchAlertContext)
}
