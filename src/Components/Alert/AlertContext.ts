import { createContext } from "react"

import { CustomRange } from "Components/PriceRange/constants"
import {
  SavedSearchFrequency,
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"

import { AlertProviderPreviewQuery } from "__generated__/AlertProviderPreviewQuery.graphql"

type Settings = {
  details: string
  email: boolean
  name: string
  push: boolean
  frequency?: SavedSearchFrequency
}

export type PreviewSavedSearch = NonNullable<
  AlertProviderPreviewQuery["response"]["viewer"]
>["previewSavedSearch"]

export type State = {
  settings: Settings
  criteria: SearchCriteriaAttributes
  searchCriteriaID?: string
  currentArtworkID?: string
  preview: PreviewSavedSearch
  visible: boolean
  isEditMode?: boolean
  initialized?: boolean
}

export const DEFAULT_STATE: State = {
  settings: {
    name: "",
    details: "",
    email: true,
    push: false,
    frequency: "daily",
  },
  criteria: {},
  preview: null,
  visible: false,
  initialized: false,
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
  | {
      type: "SET_INITIAL_STATE_ON_EDIT"
      payload: {
        settings: Settings
        initialized: boolean
        criteria: SearchCriteriaAttributes
        searchCriteriaID: string
      }
    }

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
      }

    case "SET_CRITERIA_ATTRIBUTE":
      return {
        ...state,
        criteria: {
          ...state.criteria,
          [action.payload.key]: action.payload.value,
        },
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
      }

    case "SET_SEARCH_CRITERIA_ID":
      return {
        ...state,
        searchCriteriaID: action.payload,
      }

    case "SET_INITIAL_STATE_ON_EDIT":
      return {
        ...state,
        settings: action.payload.settings,
        initialized: true,
        criteria: action.payload.criteria,
        searchCriteriaID: action.payload.searchCriteriaID,
      }

    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.payload,
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
    | "EDIT_ALERT_DETAILS"
    | "EDIT_ALERT_FILTERS"
  dispatch: React.Dispatch<Action>
  goToFilters(): void
  goToDetails(): void
  onComplete(): void
  onCompleteEdit(): void
  state: State
}

export const AlertContext = createContext<AlertContextProps>(
  ({} as unknown) as AlertContextProps
)
