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
import { useUpdateAlert } from "Components/Alert/Hooks/useUpdateAlert"
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
import { useToasts } from "@artsy/palette"
import { t } from "i18next"
import createLogger from "Utils/logger"
import { DEFAULT_METRIC, Metric } from "Utils/metrics"
import { useFeatureFlag } from "System/useFeatureFlag"

const logger = createLogger("AlertProvider.tsx")
interface AlertProviderProps {
  initialCriteria?: SearchCriteriaAttributes
  initialSettings?: Settings
  currentArtworkID?: string
  searchCriteriaID?: string
  visible?: boolean
  metric?: Metric
  isEditMode?: boolean
}

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  initialCriteria,
  initialSettings,
  currentArtworkID,
  searchCriteriaID,
  visible,
  metric,
  isEditMode,
}) => {
  const newAlertModalEnabled = useFeatureFlag("onyx_artwork_alert_modal_v2")
  const { createdAlert } = useAlertTracking()
  const { showAuthDialog } = useAuthDialog()
  const { value, clearValue } = useAuthIntent()
  const { submitMutation } = useCreateAlert()
  const { submitMutation: submitUpdateAlert } = useUpdateAlert()
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
    criteria: getAllowedSearchCriteria(initialCriteria ?? { artistIDs: [] }),
    currentArtworkID,
    searchCriteriaID,
    preview: null,
    visible: visible ?? false,
    isEditMode,
    criteriaChanged: false,
    metric: metric ?? userPreferences?.metric ?? DEFAULT_METRIC,
  }

  const [current, setCurrent] = useState<
    "ALERT_DETAILS" | "ALERT_FILTERS" | "ALERT_CONFIRMATION"
  >("ALERT_DETAILS")

  useEffect(() => {
    // inject the values only when creating the alert
    // for the edit mode we inject the values on mount
    if (isEditMode) return
    const criteria = getAllowedSearchCriteria(
      initialCriteria ?? { artistIDs: [] }
    )

    dispatch({ type: "SET_CRITERIA", payload: criteria })
  }, [initialCriteria, isEditMode])

  const handleCompleteEdit = async () => {
    if (!searchCriteriaID) {
      return sendToast({
        variant: "error",
        message: t("common.errors.somethingWentWrong"),
      })
    }
    try {
      await submitUpdateAlert({
        variables: {
          input: {
            id: searchCriteriaID,
            ...state.criteria,
            settings: state.settings,
          },
        },
      })
    } catch (error) {
      console.error("Alert/useAlertContext", error)
      logger.error(error)
    }
  }

  const handleComplete = async () => {
    try {
      const reponse = await submitMutation({
        variables: {
          input: {
            ...state.criteria,
            settings: state.settings,
          },
        },
      })

      const searchCriteriaID =
        reponse.createAlert?.responseOrError?.alert?.internalID

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
      logger.error(error)
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
    // inject the values only when creating the alert
    // for the edit mode we inject the values on mount
    if (!state.visible && !state.isEditMode) return

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
  }, [state.visible, debouncedCriteria, relayEnvironment, state.isEditMode])

  useEffect(() => {
    if (!newAlertModalEnabled || !value || value.action !== Intent.createAlert)
      return

    dispatch({ type: "SHOW" })

    clearValue()
  }, [newAlertModalEnabled, value, clearValue])

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
        onComplete: isEditMode ? handleCompleteEdit : handleComplete,
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
