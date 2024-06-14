import { ContextModule, Intent } from "@artsy/cohesion"
import { FC, useReducer, useEffect, useState } from "react"
import { Environment, fetchQuery, graphql } from "react-relay"

import {
  AlertContext,
  PreviewSavedSearch,
  Settings,
  State,
  reducer,
} from "Components/Alert/AlertContext"
import { Modal } from "Components/Alert/Components/Modal/Modal"
import { Steps } from "Components/Alert/Components/Steps"
import { useAlertTracking } from "Components/Alert/Hooks/useAlertTracking"
import { useCreateAlert } from "Components/Alert/Hooks/useCreateAlert"
import { useEditSavedSearchAlert } from "Components/Alert/Hooks/useEditSavedSearchAlert"
import { useAuthDialog } from "Components/AuthDialog"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useSystemContext } from "System/Hooks/useSystemContext"

import {
  AlertProviderPreviewQuery,
  PreviewSavedSearchAttributes,
} from "__generated__/AlertProviderPreviewQuery.graphql"
import { useToasts } from "@artsy/palette"
import createLogger from "Utils/logger"
import { DEFAULT_METRIC, Metric } from "Utils/metrics"

const logger = createLogger("AlertProvider.tsx")
interface AlertProviderProps {
  initialCriteria?: SearchCriteriaAttributes
  initialSettings?: Settings
  currentArtworkID?: string
  searchCriteriaID?: string
  alertID?: string
  visible?: boolean
  metric?: Metric
  isEditMode?: boolean
  isAlertArtworksView?: boolean
}

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  initialCriteria,
  initialSettings,
  currentArtworkID,
  searchCriteriaID,
  alertID,
  visible,
  metric,
  isEditMode,
  isAlertArtworksView,
}) => {
  const { createdAlert } = useAlertTracking()
  const { showAuthDialog } = useAuthDialog()
  const { value, clearValue } = useAuthIntent()
  const { submitMutation: submitCreateAlert } = useCreateAlert()
  const { submitMutation: submitEditAlert } = useEditSavedSearchAlert()
  const { sendToast } = useToasts()
  const { isLoggedIn, relayEnvironment } = useSystemContext()
  const { userPreferences } = useSystemContext()

  const initialState: State = {
    settings: {
      details: initialSettings?.details ?? "",
      email: initialSettings?.email ?? true,
      push: initialSettings?.push ?? false,
      name: initialSettings?.name ?? "",
    },
    criteria: getAllowedSearchCriteria(initialCriteria ?? {}),
    currentArtworkID,
    searchCriteriaID,
    alertID,
    preview: null,
    visible: visible ?? false,
    isEditMode,
    isAlertArtworksView,
    criteriaChanged: false,
    metric: metric ?? userPreferences?.metric ?? DEFAULT_METRIC,
  }

  const [current, setCurrent] = useState<
    "ALERT_DETAILS" | "ALERT_FILTERS" | "ALERT_CONFIRMATION" | "ALERT_ARTWORKS"
  >(isAlertArtworksView ? "ALERT_ARTWORKS" : "ALERT_DETAILS")

  const [createAlertError, setCreateAlertError] = useState<string>("")

  useEffect(() => {
    // inject the values only when creating the alert
    // for the edit mode we inject the values on mount
    if (isEditMode || isAlertArtworksView) return
    const criteria = getAllowedSearchCriteria(initialCriteria ?? {})

    // `forSale` is allowed as a filter criterion,
    // but NOT as an alert criterion, so we remove it.
    // (Alerts, by definition, stipulate forSale=true
    // when they are created in Gravity.)
    delete criteria.forSale

    dispatch({ type: "SET_CRITERIA", payload: criteria })
  }, [initialCriteria, isEditMode, isAlertArtworksView])

  const handleCompleteEdit = async () => {
    if (!alertID) {
      return sendToast({
        variant: "error",
        message: "Something went wrong. Please try again.",
      })
    }
    try {
      dispatch({ type: "SET_IS_SUBMITTING", payload: true })

      await submitEditAlert({
        variables: {
          input: {
            id: alertID,
            ...state.criteria,
            settings: state.settings,
          },
        },
        rejectIf: res => {
          return !res.updateAlert?.responseOrError?.alert
        },
      })

      dispatch({ type: "SET_IS_SUBMITTING", payload: false })

      sendToast({
        message: "Your Alert has been updated.",
      })
    } catch (error) {
      dispatch({ type: "SET_IS_SUBMITTING", payload: false })

      setCreateAlertError("Something went wrong. Please try again.")

      console.error("Alert/useAlertContext", error)
      logger.error(error)
    }
  }

  const handleComplete = async () => {
    try {
      dispatch({ type: "SET_IS_SUBMITTING", payload: true })

      const response = await submitCreateAlert({
        variables: {
          input: {
            ...state.criteria,
            settings: state.settings,
          } as { artistIDs: string[] }, // artistIDs is required in the input type
        },
        rejectIf: res => {
          return !res.createAlert?.responseOrError?.alert
        },
      })

      const alertID = response.createAlert?.responseOrError?.alert?.internalID
      const searchCriteriaID =
        response.createAlert?.responseOrError?.alert?.searchCriteriaID

      if (alertID) {
        dispatch({
          type: "SET_ALERT_ID",
          payload: alertID,
        })
      }

      if (searchCriteriaID) {
        dispatch({
          type: "SET_SEARCH_CRITERIA_ID",
          payload: searchCriteriaID,
        })
        createdAlert(searchCriteriaID)
      }

      dispatch({ type: "SET_IS_SUBMITTING", payload: false })
      setCurrent("ALERT_CONFIRMATION")
    } catch (error) {
      dispatch({ type: "SET_IS_SUBMITTING", payload: false })

      setCreateAlertError("Something went wrong. Please try again.")

      console.error("Alert/useAlertContext", error)
      logger.error(error)
    }
  }

  const onReset = (): State => {
    setCreateAlertError("")
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
    // inject the values only when creating the alert
    // for the edit mode we inject the values on mount
    if (!state.visible && !state.isEditMode && !state.isAlertArtworksView)
      return

    const subscription = fetchQuery<AlertProviderPreviewQuery>(
      relayEnvironment as Environment,
      graphql`
        query AlertProviderPreviewQuery(
          $attributes: PreviewSavedSearchAttributes
        ) {
          viewer {
            previewSavedSearch(attributes: $attributes) {
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
  }, [
    state.visible,
    debouncedCriteria,
    relayEnvironment,
    state.isEditMode,
    state.isAlertArtworksView,
  ])

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
          setCreateAlertError("")
          setCurrent("ALERT_FILTERS")
        },
        onComplete: isEditMode ? handleCompleteEdit : handleComplete,
        state,
        createAlertError,
      }}
    >
      {children}
      {state.visible && (
        <>
          <Modal
            onClose={() => {
              dispatch({ type: "RESET" })
            }}
          >
            <Steps />
          </Modal>
        </>
      )}
    </AlertContext.Provider>
  )
}
