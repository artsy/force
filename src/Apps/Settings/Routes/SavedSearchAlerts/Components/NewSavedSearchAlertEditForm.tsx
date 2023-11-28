import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Flex,
  Join,
  Message,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { NewSavedSearchAlertEditFormQuery } from "__generated__/NewSavedSearchAlertEditFormQuery.graphql"
import { NewSavedSearchAlertEditForm_me$data } from "__generated__/NewSavedSearchAlertEditForm_me.graphql"
import { NewSavedSearchAlertEditForm_viewer$data } from "__generated__/NewSavedSearchAlertEditForm_viewer.graphql"

import { Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EditAlertEntity } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { SavedSearchAlertEditFormPlaceholder } from "./SavedSearchAlertEditFormPlaceholder"
import { isEqual } from "lodash"
import { useSavedSearchAlertContext } from "Components/SavedSearchAlert/SavedSearchAlertContext"
import {
  SavedSearchAlertFormValues,
  SavedSearchFrequency,
} from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { RouterLink } from "System/Router/RouterLink"
import { DEFAULT_FREQUENCY } from "Components/SavedSearchAlert/constants"
import { FrequenceRadioButtons } from "Components/SavedSearchAlert/Components/FrequencyRadioButtons"
import { DetailsInput } from "Components/SavedSearchAlert/Components/DetailsInput"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { useEffect } from "react"
import { CriteriaPills } from "Components/Alert/Components/CriteriaPills"
import { AlertNameInput } from "Components/Alert/Components/Form/AlertNameInput"
import { Filters } from "Components/Alert/Components/Steps/Filters"
import CloseIcon from "@artsy/icons/CloseIcon"
import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"

const logger = createLogger(
  "Apps/SavedSearchAlerts/Components/NewSavedSearchAlertEditForm"
) // TODO: move logger to the provider

interface NewSavedSearchAlertEditFormQueryRendererProps {
  editAlertEntity: EditAlertEntity
  onDeleteClick: () => void
  onCompleted: () => void
  onCloseClick: () => void
}

interface NewSavedSearchAlertEditFormProps {
  me: NewSavedSearchAlertEditForm_me$data
  viewer: NewSavedSearchAlertEditForm_viewer$data
  onDeleteClick: () => void
  onCompleted: () => void
}

const NewSavedSearchAlertEditForm: React.FC<NewSavedSearchAlertEditFormProps> = ({
  me,
  viewer,
  onDeleteClick,
  onCompleted,
}) => {
  const { savedSearch } = me
  const { userAlertSettings } = savedSearch!
  const { state, goToFilters, dispatch, onCompleteEdit } = useAlertContext()

  const initialValues: SavedSearchAlertFormValues = {
    name: userAlertSettings.name ?? "",
    push: userAlertSettings.push,
    email: userAlertSettings.email,
    frequency: userAlertSettings.frequency as SavedSearchFrequency,
    details: userAlertSettings.details ?? "",
  }
  useEffect(() => {
    dispatch({
      type: "SET_SETTINGS",
      payload: initialValues,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userAlertSettings])

  useEffect(() => {
    dispatch({
      type: "SET_SEARCH_CRITERIA_ID",
      payload: savedSearch?.internalID ?? "",
    })
  }, [dispatch, savedSearch])

  useEffect(() => {
    if (state.initialized) return
    dispatch({
      type: "SET_CRITERIA_ONCE",
      payload: {
        criteria: getAllowedSearchCriteria(savedSearch),
        initialized: true,
      },
    })
  }, [dispatch, savedSearch, state.initialized])

  const isCustomAlertsNotificationsEnabled = viewer.notificationPreferences.some(
    preference => {
      return (
        preference.channel === "email" &&
        preference.name === "custom_alerts" &&
        preference.status === "SUBSCRIBED"
      )
    }
  )
  const userAllowsEmails = isCustomAlertsNotificationsEnabled ?? false
  const shouldShowEmailWarning = !!initialValues.email && !userAllowsEmails

  // TODO: on close emty state
  return (
    <Formik<AlertFormikValues>
      initialValues={{ ...initialValues }}
      onSubmit={onCompleteEdit}
    >
      {({ isSubmitting, values, setFieldValue, handleSubmit }) => {
        let isSaveAlertButtonDisabled = true

        if (
          !isEqual(initialValues, values) ||
          !isEqual(state.criteria, getAllowedSearchCriteria(savedSearch))
        ) {
          isSaveAlertButtonDisabled = false
        }

        if (!values.email && !values.push) {
          isSaveAlertButtonDisabled = true
        }

        return (
          <Box>
            <Join separator={<Spacer y={[4, 6]} />}>
              <AlertNameInput />
              <Box>
                <Text variant="xs">Filters</Text>
                <Spacer y={2} />
                <Flex flexWrap="wrap" gap={1}>
                  <CriteriaPills />
                </Flex>

                <Separator my={2} />

                <Clickable onClick={() => goToFilters()} width="100%">
                  <Flex justifyContent="space-between" alignItems={"center"}>
                    <Box>
                      <Text variant="sm-display">Add Filters:</Text>

                      <Text variant="sm" color="black60">
                        Including Price Range, Rarity, Medium, Color
                      </Text>
                    </Box>
                    <ChevronRightIcon />
                  </Flex>
                </Clickable>
                <Separator my={2} />
                <DetailsInput />
                <Separator my={2} />
              </Box>

              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Text variant="sm-display">Email</Text>
                  <Checkbox
                    onSelect={selected => setFieldValue("email", selected)}
                    selected={values.email}
                  />
                </Box>
                {shouldShowEmailWarning && (
                  <Message
                    variant="alert"
                    title="Change your email preferences"
                    mt={2}
                  >
                    To receive Email Alerts, please update{" "}
                    <RouterLink inline to="/unsubscribe">
                      your email preferences
                    </RouterLink>
                    .
                  </Message>
                )}

                <Spacer y={4} />

                <Box display="flex" justifyContent="space-between">
                  <Text variant="sm-display">Push Notifications</Text>
                  <Checkbox
                    onSelect={selected => {
                      setFieldValue("push", selected)

                      // Restore initial frequency when "Mobile Alerts" is unselected
                      if (!selected) {
                        setFieldValue("frequency", initialValues.frequency)
                      }
                    }}
                    selected={values.push}
                  />
                </Box>

                <Spacer y={4} />

                {values.push && (
                  <FrequenceRadioButtons
                    defaultFrequence={values.frequency}
                    onSelect={selectedOption =>
                      setFieldValue("frequency", selectedOption)
                    }
                  />
                )}
              </Box>

              <Media greaterThanOrEqual="md">
                <Spacer y={6} />

                <Flex>
                  <Button
                    variant="secondaryBlack"
                    flex={1}
                    onClick={onDeleteClick}
                  >
                    Delete Alert
                  </Button>
                  <Spacer x={2} />
                  <Button
                    flex={1}
                    loading={isSubmitting}
                    onClick={() => {
                      dispatch({ type: "SET_SETTINGS", payload: values })
                      handleSubmit()
                      onCompleted()
                    }}
                    disabled={isSaveAlertButtonDisabled}
                  >
                    Save Alert
                  </Button>
                </Flex>
              </Media>

              <Media lessThan="md">
                <Spacer y={4} />

                <Button
                  loading={isSubmitting}
                  width="100%"
                  onClick={() => {
                    dispatch({ type: "SET_SETTINGS", payload: values })
                    handleSubmit()
                  }}
                  disabled={isSaveAlertButtonDisabled}
                >
                  Save Alert
                </Button>

                <Spacer y={1} />

                <Button
                  variant="secondaryBlack"
                  width="100%"
                  onClick={onDeleteClick}
                >
                  Delete Alert
                </Button>
              </Media>
            </Join>
          </Box>
        )
      }}
    </Formik>
  )
}

export const NewSavedSearchAlertEditFormFragmentContainer = createFragmentContainer(
  NewSavedSearchAlertEditForm,
  {
    viewer: graphql`
      fragment NewSavedSearchAlertEditForm_viewer on Viewer {
        notificationPreferences {
          status
          name
          channel
        }
      }
    `,
    me: graphql`
      fragment NewSavedSearchAlertEditForm_me on Me
        @argumentDefinitions(savedSearchId: { type: "ID" }) {
        savedSearch(id: $savedSearchId) {
          internalID
          acquireable
          additionalGeneIDs
          artistIDs
          atAuction
          attributionClass
          colors
          dimensionRange
          sizes
          width
          height
          inquireableOnly
          locationCities
          majorPeriods
          materialsTerms
          offerable
          partnerIDs
          priceRange
          userAlertSettings {
            name
            email
            push
            frequency
            details
          }
        }
      }
    `,
  }
)

const SAVED_SEARCH_ALERT_EDIT_FORM_QUERY = graphql`
  query NewSavedSearchAlertEditFormQuery($id: ID!) {
    viewer {
      ...NewSavedSearchAlertEditForm_viewer
    }
    me {
      ...NewSavedSearchAlertEditForm_me @arguments(savedSearchId: $id)
    }
  }
`

export const NewSavedSearchAlertEditFormQueryRenderer: React.FC<NewSavedSearchAlertEditFormQueryRendererProps> = ({
  editAlertEntity,
  onDeleteClick,
  onCompleted,
  onCloseClick,
}) => {
  const { current } = useAlertContext()

  return (
    <SystemQueryRenderer<NewSavedSearchAlertEditFormQuery>
      query={SAVED_SEARCH_ALERT_EDIT_FORM_QUERY}
      variables={{
        id: editAlertEntity.id,
        artistIds: editAlertEntity.artistIds,
      }}
      placeholder={
        <Box flex={1} p={4}>
          <SavedSearchAlertEditFormPlaceholder />
        </Box>
      }
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.me && props?.viewer) {
          switch (current) {
            case "EDIT_ALERT_DETAILS":
              return (
                <Box flex={1} p={4}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text variant={["md", "lg"]} flex={1} mr={1}>
                      Edit Alert
                    </Text>
                    <Clickable onClick={onCloseClick}>
                      <CloseIcon display="flex" />
                    </Clickable>
                  </Flex>
                  <Spacer y={6} />
                  <NewSavedSearchAlertEditFormFragmentContainer
                    me={props.me}
                    viewer={props.viewer}
                    onDeleteClick={onDeleteClick}
                    onCompleted={onCompleted}
                  />
                </Box>
              )
            case "EDIT_ALERT_FILTERS":
              return (
                <Box flex={1} p={2}>
                  <Filters />
                </Box>
              )
          }
        }

        return (
          <Box flex={1} p={4}>
            <SavedSearchAlertEditFormPlaceholder />
          </Box>
        )
      }}
    />
  )
}
