import { ContextModule, Intent } from "@artsy/cohesion"
import { FC, useReducer, useEffect, useState } from "react"
import { Environment, fetchQuery, graphql } from "react-relay"

import {
  AlertContext,
  PreviewSavedSearch,
  State,
  reducer,
} from "Components/Alert/AlertContext"
import { Modal } from "Components/Alert/Components/Modal"
import { Steps } from "Components/Alert/Components/Steps"
import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"
import { useCreateAlert } from "Components/Alert/Hooks/useCreateAlert"
import { useEditSavedSearchAlert } from "Components/Alert/Hooks/useEditSavedSearchAlert"
import { useAuthDialog } from "Components/AuthDialog"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useSystemContext } from "System/SystemContext"

import {
  AlertProviderPreviewQuery,
  PreviewSavedSearchAttributes,
} from "__generated__/AlertProviderPreviewQuery.graphql"

interface AlertProviderProps {
  initialCriteria?: SearchCriteriaAttributes
  currentArtworkID?: string
  visible?: boolean
  isEditMode?: boolean
}

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  initialCriteria,
  currentArtworkID,
  visible,
  isEditMode,
}) => {
  const { createdAlert } = useAlertTracking()
  const { showAuthDialog } = useAuthDialog()
  const { value, clearValue } = useAuthIntent()
  const { submitMutation } = useCreateAlert()
  const { submitMutation: submitEditAlert } = useEditSavedSearchAlert()

  const { isLoggedIn, relayEnvironment } = useSystemContext()

  const initialState: State = {
    settings: {
      details: "",
      email: true,
      push: false,
      frequency: "daily",
      name: "",
    },
    criteria: getAllowedSearchCriteria(initialCriteria ?? {}),
    currentArtworkID,
    preview: null,
    visible: visible ?? false,
    isEditMode,
  }

  const [current, setCurrent] = useState<
    | "ALERT_DETAILS"
    | "ALERT_FILTERS"
    | "ALERT_CONFIRMATION"
    | "EDIT_ALERT_DETAILS"
    | "EDIT_ALERT_FILTERS"
  >(isEditMode ? "EDIT_ALERT_DETAILS" : "ALERT_DETAILS")

  useEffect(() => {
    if (isEditMode) return
    const criteria = getAllowedSearchCriteria(initialCriteria ?? {})

    dispatch({ type: "SET_CRITERIA", payload: criteria })
  }, [initialCriteria, isEditMode])

  const handleCompleteEdit = async () => {
    console.log("[LOGD] 123edit state = ", state)

    if (!state.searchCriteriaID) return // TODO: return error
    try {
      const reponse = await submitEditAlert({
        // TODO: add mutation on edit
        variables: {
          input: {
            searchCriteriaID: state.searchCriteriaID,
            attributes: state.criteria,
            userAlertSettings: state.settings,
          },
        },
      })
      console.log("[LOGD] 123edit reponse = ", reponse)

      // onCompleted()
    } catch (error) {
      console.error("Alert/useAlertContext", error)
      //logger.error(error)
    }
  }

  const handleComplete = async () => {
    try {
      console.log("[LOGD] reponse state = ", state)

      const reponse = await submitMutation({
        // TODO: add mutation on edit
        variables: {
          input: {
            attributes: state.criteria,
            userAlertSettings: state.settings,
          },
        },
      })
      console.log("[LOGD] reponse = ", reponse)
      const searchCriteriaID =
        reponse.createSavedSearch?.savedSearchOrErrors.internalID

      if (searchCriteriaID) {
        dispatch({
          type: "SET_SEARCH_CRITERIA_ID",
          payload: searchCriteriaID,
        })
        console.log("[LOGD] reponse searchCriteriaID = ", searchCriteriaID)

        createdAlert(searchCriteriaID)
      }
      //  setCurrent("ALERT_CONFIRMATION")
    } catch (error) {
      console.error("Alert/useAlertContext", error)
    }
  }

  const onReset = (): State => {
    setCurrent(isEditMode ? "EDIT_ALERT_DETAILS" : "ALERT_DETAILS")

    return initialState
  }

  const onShow = (state: State): State => {
    if (!isLoggedIn) {
      showAuthDialog({
        mode: "SignUp",
        options: {
          title: "Sign up to create your alert",
          afterAuthAction: {
            action: Intent.createAlert,
          },
        },
        analytics: {
          intent: Intent.createAlert,
          contextModule: ContextModule.createAlert,
        },
      })

      return state
    }

    return {
      ...state,
      visible: true,
    }
  }

  const [state, dispatch] = useReducer(reducer(onShow, onReset), initialState)

  // Fetching the display name and labels for alert name input placeholder and the criteria pills, when the criteria changes.

  const { debouncedValue: debouncedCriteria } = useDebouncedValue({
    value: state.criteria,
    delay: 200,
    settings: { leading: true },
  })

  useEffect(() => {
    //  if (!state.visible) return

    const subscription = fetchQuery<AlertProviderPreviewQuery>(
      relayEnvironment as Environment,
      graphql`
        query AlertProviderPreviewQuery(
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
      { attributes: debouncedCriteria as PreviewSavedSearchAttributes }
    )?.subscribe?.({
      next: data => {
        if (!data?.viewer?.previewSavedSearch) return
        dispatch({
          type: "SET_PREVIEW",
          payload: data?.viewer?.previewSavedSearch as PreviewSavedSearch,
        })
      },
    })

    return () => {
      subscription?.unsubscribe?.()
    }
  }, [state.visible, debouncedCriteria, relayEnvironment])

  useEffect(() => {
    if (!value || value.action !== Intent.createAlert) return

    dispatch({ type: "SHOW" })

    clearValue()
  }, [value, clearValue])

  return (
    <AlertContext.Provider
      value={{
        current,
        dispatch,
        goToDetails: () => {
          setCurrent(isEditMode ? "EDIT_ALERT_DETAILS" : "ALERT_DETAILS")
        },
        goToFilters: () => {
          setCurrent(isEditMode ? "EDIT_ALERT_FILTERS" : "ALERT_FILTERS")
        },
        onComplete: handleComplete,
        onCompleteEdit: handleCompleteEdit,
        state,
      }}
    >
      {children}
      {state.visible && (
        <Modal
          onClose={() => {
            dispatch({ type: "RESET" })
          }}
        >
          <Steps />
        </Modal>
      )}
    </AlertContext.Provider>
  )
}
