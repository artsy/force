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
import { useAuthDialog } from "Components/AuthDialog"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useSystemContext } from "System/SystemContext"

import {
  PreviewSavedSearchAttributes,
  AlertProviderPreviewQuery,
} from "__generated__/AlertProviderPreviewQuery.graphql"

interface AlertProviderProps {
  initialCriteria?: SearchCriteriaAttributes
  currentArtworkID?: string
}

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  initialCriteria,
  currentArtworkID,
}) => {
  const { createdAlert } = useAlertTracking()
  const { showAuthDialog } = useAuthDialog()
  const { value, clearValue } = useAuthIntent()
  const { submitMutation } = useCreateAlert()
  const { isLoggedIn, relayEnvironment } = useSystemContext()

  const initialState = {
    settings: {
      details: "",
      email: true,
      push: false,
      name: "",
    },
    criteria: getAllowedSearchCriteria(initialCriteria ?? {}),
    currentArtworkID,
    preview: null,
    visible: false,
  }
  const [current, setCurrent] = useState<
    "ALERT_DETAILS" | "ALERT_FILTERS" | "ALERT_CONFIRMATION"
  >("ALERT_DETAILS")

  useEffect(() => {
    const criteria = getAllowedSearchCriteria(initialCriteria ?? {})

    dispatch({ type: "SET_CRITERIA", payload: criteria })
  }, [initialCriteria])

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
      const searchCriteriaID =
        reponse.createSavedSearch?.savedSearchOrErrors.internalID

      if (searchCriteriaID) {
        dispatch({
          type: "SET_SEARCH_CRITERIA_ID",
          payload: searchCriteriaID,
        })

        createdAlert(searchCriteriaID)
      }
      setCurrent("ALERT_CONFIRMATION")
    } catch (error) {
      console.error("Alert/useAlertContext", error)
    }
  }

  const onReset = (): State => {
    setCurrent("ALERT_DETAILS")

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
    if (!state.visible) return

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
