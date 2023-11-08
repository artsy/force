import {
  FC,
  createContext,
  useRef,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react"

import {
  SearchCriteriaAttributeKeys,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { useCreateAlert } from "Components/Alert/Hooks/useCreateAlert"
import { useSystemContext } from "System/SystemContext"
import {
  PreviewSavedSearchAttributes,
  useAlertContextPreviewQuery,
} from "__generated__/useAlertContextPreviewQuery.graphql"
import { Environment, fetchQuery, graphql } from "react-relay"

type Settings = {
  details: string
  email: boolean
  name: string
  push: boolean
}

type Label = {
  displayValue: string
  field: string
  value: string
}

type Preview = {
  labels: (Label | null)[]
  displayName: string
}

export type State = {
  settings: Settings
  criteria: SearchCriteriaAttributes
  searchCriteriaID?: string
  currentArtworkID?: string
  preview: Preview
}

export const DEFAULT_STATE: State = {
  settings: {
    name: "",
    details: "",
    email: true,
    push: false,
  },
  criteria: {},
  preview: {
    displayName: "",
    labels: [],
  },
}

type Action =
  | { type: "RESET" }
  | { type: "SET_SETTINGS"; payload: Settings }
  | { type: "SET_CRITERIA"; payload: SearchCriteriaAttributes }
  | {
      type: "SET_CRITERIA_ATTRIBUTE"
      payload: {
        key: SearchCriteriaAttributeKeys
        value: string | string[] | number | boolean | null
      }
    }
  | {
      type: "REMOVE_CRITERIA_ATTRIBUTE_VALUE"
      payload: {
        key: SearchCriteriaAttributeKeys
        value: string | string[] | number | boolean | null
      }
    }
  | { type: "SET_SEARCH_CRITERIA_ID"; payload: string }
  | { type: "SET_PREVIEW"; payload: Preview }

const reducer = (onReset: () => State) => (state: State, action: Action) => {
  switch (action.type) {
    case "RESET":
      return onReset()

    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.payload,
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

    case "SET_PREVIEW":
      return {
        ...state,
        preview: action.payload,
      }

    default:
      return state
  }
}

const AlertContext = createContext<{
  current: "ALERT_DETAILS" | "ALERT_FILTERS" | "ALERT_CONFIRMATION"
  dispatch: React.Dispatch<Action>
  goToFilters(): void
  goToDetails(): void
  onComplete(): void
  state: State
}>({
  current: "ALERT_DETAILS",
  dispatch: () => {},
  goToDetails: () => {},
  goToFilters: () => {},
  onComplete: () => {},
  state: DEFAULT_STATE,
})

interface AlertProviderProps {
  initialCriteria?: SearchCriteriaAttributes
  currentArtworkID?: string
}

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  initialCriteria,
  currentArtworkID,
}) => {
  const { relayEnvironment } = useSystemContext()

  const initialState = {
    settings: DEFAULT_STATE.settings,
    criteria:
      getAllowedSearchCriteria(initialCriteria as SearchCriteriaAttributes) ??
      DEFAULT_STATE.criteria,
    currentArtworkID,
    preview: {
      displayName: "",
      labels: [],
    },
  }
  const basis = useRef<State>(initialState)
  const [current, setCurrent] = useState<
    "ALERT_DETAILS" | "ALERT_FILTERS" | "ALERT_CONFIRMATION"
  >("ALERT_DETAILS")

  const { submitMutation } = useCreateAlert()

  const handleComplete = async () => {
    try {
      const reponse = await submitMutation({
        variables: {
          input: {
            attributes: state.criteria,
            userAlertSettings: state.settings,
          },
        },
      })
      if (reponse.createSavedSearch?.savedSearchOrErrors.internalID) {
        dispatch({
          type: "SET_SEARCH_CRITERIA_ID",
          payload: reponse.createSavedSearch?.savedSearchOrErrors.internalID,
        })
      }
      setCurrent("ALERT_CONFIRMATION")
    } catch (error) {
      console.error("Alert/useAlertContext", error)
    }
  }

  const reset = () => {
    setCurrent("ALERT_DETAILS")
    return initialState
  }

  const [state, dispatch] = useReducer(reducer(reset), initialState)

  useEffect(() => {
    basis.current = state
  }, [state])

  // Fetching the display name and labels for alert name input placeholder and the criteria pills, when the criteria changes.
  useEffect(() => {
    const fetchPreview = async (criteriaState: SearchCriteriaAttributes) => {
      const data = await fetchQuery<useAlertContextPreviewQuery>(
        relayEnvironment as Environment,
        graphql`
          query useAlertContextPreviewQuery(
            $attributes: PreviewSavedSearchAttributes
          ) {
            viewer {
              previewSavedSearch(attributes: $attributes) {
                displayName
                labels {
                  displayValue
                  field
                  value
                }
              }
            }
          }
        `,
        { attributes: criteriaState as PreviewSavedSearchAttributes }
      ).toPromise()

      dispatch({
        type: "SET_PREVIEW",
        payload: {
          labels: (data?.viewer?.previewSavedSearch?.labels as Label[]) ?? [],
          displayName: data?.viewer?.previewSavedSearch?.displayName ?? "",
        },
      })
    }

    fetchPreview(state.criteria)
  }, [state.criteria, relayEnvironment])

  return (
    <AlertContext.Provider
      value={{
        current,
        dispatch,
        goToDetails: () => {
          setCurrent("ALERT_DETAILS")
        },
        goToFilters: () => {
          setCurrent("ALERT_FILTERS")
        },
        onComplete: handleComplete,
        state,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export const useAlertContext = () => {
  return useContext(AlertContext)
}
