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
import { useCreateArtworkAlert } from "Components/ArtworkAlert/Hooks/useCreateArtworkAlert"

type Settings = {
  details: string
  email: boolean
  name: string
  push: boolean
}

export type State = {
  settings: Settings
  criteria: SearchCriteriaAttributes
  searchCriteriaID?: string
  currentArtworkID?: string
}

export const DEFAULT_STATE: State = {
  settings: {
    name: "",
    details: "",
    email: true,
    push: false,
  },
  criteria: {},
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

    default:
      return state
  }
}

const ArtworkAlertContext = createContext<{
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

interface ArtworkAlertProviderProps {
  initialCriteria?: SearchCriteriaAttributes
  currentArtworkID?: string
}

export const ArtworkAlertProvider: FC<ArtworkAlertProviderProps> = ({
  children,
  initialCriteria,
  currentArtworkID,
}) => {
  const initialState = {
    settings: DEFAULT_STATE.settings,
    criteria:
      getAllowedSearchCriteria(initialCriteria as SearchCriteriaAttributes) ??
      DEFAULT_STATE.criteria,
    currentArtworkID,
  }
  const basis = useRef<State>(initialState)
  const [current, setCurrent] = useState<
    "ALERT_DETAILS" | "ALERT_FILTERS" | "ALERT_CONFIRMATION"
  >("ALERT_DETAILS")

  const { submitMutation } = useCreateArtworkAlert()

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
      console.error("ArtworkAlert/useArtworkAlertContext", error)
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

  return (
    <ArtworkAlertContext.Provider
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
    </ArtworkAlertContext.Provider>
  )
}

export const useArtworkAlertContext = () => {
  return useContext(ArtworkAlertContext)
}
