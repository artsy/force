import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
import type { CustomRange } from "Components/PriceRange/constants"
import type {
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { DEFAULT_METRIC, type Metric } from "Utils/metrics"
import type { AlertProviderPreviewQuery } from "__generated__/AlertProviderPreviewQuery.graphql"

export type Settings = {
  details: string
  email: boolean
  name: string
  push: boolean
}

export type PreviewSavedSearch = NonNullable<
  AlertProviderPreviewQuery["response"]["viewer"]
>["previewSavedSearch"]

// Store model interface
interface AlertStoreModel {
  // State
  settings: Settings
  criteria: SearchCriteriaAttributes
  alertID?: string
  searchCriteriaID?: string
  currentArtworkID?: string
  preview: PreviewSavedSearch
  visible: boolean
  isEditMode?: boolean
  isAlertArtworksView?: boolean
  criteriaChanged?: boolean
  metric?: Metric
  isSubmitting?: boolean

  // Actions
  hide: Action<AlertStoreModel>
  show: Thunk<AlertStoreModel, State>
  reset: Thunk<AlertStoreModel>
  setPreview: Action<AlertStoreModel, PreviewSavedSearch>
  setCriteria: Action<AlertStoreModel, SearchCriteriaAttributes>
  setCriteriaAttribute: Action<
    AlertStoreModel,
    {
      key: SearchCriteriaAttributeKeys
      value: string | string[] | number | boolean | null | CustomRange
    }
  >
  removeCriteriaAttributeValue: Action<
    AlertStoreModel,
    {
      key: SearchCriteriaAttributeKeys
      value: string | string[] | number | boolean | null | CustomRange
    }
  >
  setSettings: Action<AlertStoreModel, Settings>
  setSearchCriteriaID: Action<AlertStoreModel, string>
  setAlertID: Action<AlertStoreModel, string>
  setMetric: Action<AlertStoreModel, Metric>
  setIsSubmitting: Action<AlertStoreModel, boolean>
}

type State = {
  settings: Settings
  criteria: SearchCriteriaAttributes
  alertID?: string
  searchCriteriaID?: string
  currentArtworkID?: string
  preview: PreviewSavedSearch
  visible: boolean
  isEditMode?: boolean
  isAlertArtworksView?: boolean
  criteriaChanged?: boolean
  metric?: Metric
  isSubmitting?: boolean
}

export const DEFAULT_STATE: State = {
  settings: {
    name: "",
    details: "",
    email: true,
    push: false,
  },
  criteria: {},
  preview: null,
  visible: false,
  metric: DEFAULT_METRIC,
  criteriaChanged: false,
}

// Create the context store with factory pattern for callbacks
export const createAlertStore = (
  onShow: (state: State) => State,
  onReset: () => State,
) => {
  return createContextStore<AlertStoreModel>(runtimeModel => ({
    // State
    settings: runtimeModel?.settings || DEFAULT_STATE.settings,
    criteria: runtimeModel?.criteria || DEFAULT_STATE.criteria,
    alertID: runtimeModel?.alertID,
    searchCriteriaID: runtimeModel?.searchCriteriaID,
    currentArtworkID: runtimeModel?.currentArtworkID,
    preview: runtimeModel?.preview || DEFAULT_STATE.preview,
    visible: runtimeModel?.visible || DEFAULT_STATE.visible,
    isEditMode: runtimeModel?.isEditMode,
    isAlertArtworksView: runtimeModel?.isAlertArtworksView,
    criteriaChanged:
      runtimeModel?.criteriaChanged || DEFAULT_STATE.criteriaChanged,
    metric: runtimeModel?.metric || DEFAULT_STATE.metric,
    isSubmitting: runtimeModel?.isSubmitting || false,

    // Actions
    hide: action(state => {
      // Reset to initial state
      Object.assign(state, DEFAULT_STATE)
    }),

    show: thunk((actions, payload, { getState }) => {
      const currentState = getState()
      const newState = onShow(currentState)
      // Update all state properties
      Object.entries(newState).forEach(([key, value]) => {
        if (key in currentState) {
          ;(currentState as any)[key] = value
        }
      })
    }),

    reset: thunk(actions => {
      const resetState = onReset()
      // Update all state properties
      Object.entries(resetState).forEach(([key, value]) => {
        if (key !== "hide" && key !== "show" && key !== "reset") {
          ;(actions as any)[
            `set${key.charAt(0).toUpperCase() + key.slice(1)}`
          ]?.(value)
        }
      })
    }),

    setPreview: action((state, payload) => {
      state.preview = payload
    }),

    setCriteria: action((state, payload) => {
      state.criteria = payload
      state.criteriaChanged = true
    }),

    setCriteriaAttribute: action((state, { key, value }) => {
      state.criteria[key] = value
      state.criteriaChanged = true
    }),

    removeCriteriaAttributeValue: action((state, { key, value }) => {
      let criteriaValue = state.criteria[key]

      if (Array.isArray(criteriaValue)) {
        criteriaValue = criteriaValue.filter(
          currentValue => currentValue !== value,
        )
      } else {
        criteriaValue = null
      }

      state.criteria[key] = criteriaValue
      state.criteriaChanged = true
    }),

    setSearchCriteriaID: action((state, payload) => {
      state.searchCriteriaID = payload
    }),

    setAlertID: action((state, payload) => {
      state.alertID = payload
    }),

    setSettings: action((state, payload) => {
      state.settings = payload
      state.criteriaChanged = true
    }),

    setMetric: action((state, payload) => {
      state.metric = payload
    }),

    setIsSubmitting: action((state, payload) => {
      state.isSubmitting = payload
    }),
  }))
}

// Default store instance
export const AlertStore = createAlertStore(
  state => ({ ...state, visible: true }),
  () => DEFAULT_STATE,
)

// Backward compatible context interface
export interface AlertContextProps {
  current:
    | "ALERT_DETAILS"
    | "ALERT_FILTERS"
    | "ALERT_CONFIRMATION"
    | "ALERT_ARTWORKS"
  dispatch: React.Dispatch<Action>
  goToFilters(): void
  goToDetails(): void
  onComplete(): void
  state: State
  createAlertError: string
}

// Hook for backward compatibility
export const useAlertContext = () => {
  const state = AlertStore.useStoreState(state => state)
  const actions = AlertStore.useStoreActions(actions => actions)

  // Map dispatch to actions for backward compatibility
  const dispatch = (action: any) => {
    switch (action.type) {
      case "HIDE":
        actions.hide()
        break
      case "SHOW":
        actions.show(state)
        break
      case "RESET":
        actions.reset()
        break
      case "SET_PREVIEW":
        actions.setPreview(action.payload)
        break
      case "SET_CRITERIA":
        actions.setCriteria(action.payload)
        break
      case "SET_CRITERIA_ATTRIBUTE":
        actions.setCriteriaAttribute(action.payload)
        break
      case "REMOVE_CRITERIA_ATTRIBUTE_VALUE":
        actions.removeCriteriaAttributeValue(action.payload)
        break
      case "SET_SEARCH_CRITERIA_ID":
        actions.setSearchCriteriaID(action.payload)
        break
      case "SET_ALERT_ID":
        actions.setAlertID(action.payload)
        break
      case "SET_SETTINGS":
        actions.setSettings(action.payload)
        break
      case "SET_METRIC":
        actions.setMetric(action.payload)
        break
      case "SET_IS_SUBMITTING":
        actions.setIsSubmitting(action.payload)
        break
    }
  }

  // These would be implemented in the provider component
  const stubMethods = {
    current: "ALERT_FILTERS" as const,
    goToFilters: () => {},
    goToDetails: () => {},
    onComplete: () => {},
    createAlertError: "",
  }

  return {
    state,
    dispatch,
    ...stubMethods,
  }
}

// Export alias for migration compatibility
export const AlertContext = AlertStore
