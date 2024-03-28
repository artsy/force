import { createContext } from "react"

import { CustomRange } from "Components/PriceRange/constants"
import {
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"

import { AlertProviderPreviewQuery } from "__generated__/AlertProviderPreviewQuery.graphql"
import { DEFAULT_METRIC, Metric } from "Utils/metrics"

export type Settings = {
  details: string
  email: boolean
  name: string
  push: boolean
}

export type PreviewSavedSearch = NonNullable<
  AlertProviderPreviewQuery["response"]["viewer"]
>["previewSavedSearch"]

export type State = {
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

type Action =
  | { type: "HIDE" }
  | { type: "SHOW" }
  | { type: "RESET" }
  | { type: "SET_PREVIEW"; payload: PreviewSavedSearch }
  | { type: "SET_CRITERIA"; payload: SearchCriteriaAttributes }
  | {
      type: "SET_CRITERIA_ATTRIBUTE"
      payload: {
        key: SearchCriteriaAttributeKeys
        value: string | string[] | number | boolean | null | CustomRange
      }
    }
  | {
      type: "REMOVE_CRITERIA_ATTRIBUTE_VALUE"
      payload: {
        key: SearchCriteriaAttributeKeys
        value: string | string[] | number | boolean | null | CustomRange
      }
    }
  | { type: "SET_SETTINGS"; payload: Settings }
  | { type: "SET_SEARCH_CRITERIA_ID"; payload: string }
  | { type: "SET_ALERT_ID"; payload: string }
  | { type: "SET_METRIC"; payload: Metric }
  | { type: "SET_IS_SUBMITTING"; payload: boolean }

export const reducer = (onShow: (State) => State, onReset: () => State) => (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case "SHOW":
      return onShow(state)

    case "RESET":
      return onReset()

    case "SET_PREVIEW":
      return {
        ...state,
        preview: action.payload,
      }

    case "SET_CRITERIA":
      return {
        ...state,
        criteria: action.payload,
        criteriaChanged: true,
      }

    case "SET_CRITERIA_ATTRIBUTE":
      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.key]: action.payload.value,
        },
        criteriaChanged: true,
      }

    case "REMOVE_CRITERIA_ATTRIBUTE_VALUE":
      let criteriaValue = state.criteria[action.payload.key]

      if (Array.isArray(criteriaValue)) {
        criteriaValue = criteriaValue.filter(
          currentValue => currentValue !== action.payload.value
        )
      } else {
        criteriaValue = null
      }

      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.key]: criteriaValue,
        },
        criteriaChanged: true,
      }

    case "SET_SEARCH_CRITERIA_ID":
      return {
        ...state,
        searchCriteriaID: action.payload,
      }

    case "SET_ALERT_ID":
      return {
        ...state,
        alertID: action.payload,
      }

    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.payload,
        criteriaChanged: true,
      }

    case "SET_METRIC":
      return {
        ...state,
        metric: action.payload,
      }

    case "SET_IS_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.payload,
      }

    default:
      return state
  }
}

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

export const AlertContext = createContext<AlertContextProps>(
  ({} as unknown) as AlertContextProps
)
