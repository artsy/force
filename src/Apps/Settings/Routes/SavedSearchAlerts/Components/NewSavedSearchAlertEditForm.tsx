import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Flex,
  Join,
  Message,
  ModalDialog,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { NewSavedSearchAlertEditFormQuery } from "__generated__/NewSavedSearchAlertEditFormQuery.graphql"
import { NewSavedSearchAlertEditForm_viewer$data } from "__generated__/NewSavedSearchAlertEditForm_viewer.graphql"

import { Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EditAlertEntity } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { Media } from "Utils/Responsive"
import { SavedSearchAlertEditFormPlaceholder } from "./SavedSearchAlertEditFormPlaceholder"
import {
  SavedSearchFrequency,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { RouterLink } from "System/Router/RouterLink"
import { FrequenceRadioButtons } from "Components/SavedSearchAlert/Components/FrequencyRadioButtons"
import { DetailsInput } from "Components/SavedSearchAlert/Components/DetailsInput"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { CriteriaPills } from "Components/Alert/Components/CriteriaPills"
import { AlertNameInput } from "Components/Alert/Components/Form/AlertNameInput"
import { Filters } from "Components/Alert/Components/Steps/Filters"
import CloseIcon from "@artsy/icons/CloseIcon"
import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { AlertProvider } from "Components/Alert/AlertProvider"

interface NewSavedSearchAlertEditFormQueryRendererProps {
  editAlertEntity: EditAlertEntity
  onDeleteClick: () => void
  onCompleted: () => void
  onCloseClick: () => void
}

interface NewSavedSearchAlertEditStepsProps {
  savedSearch: NonNullable<
    NewSavedSearchAlertEditFormQuery["response"]["me"]
  >["savedSearch"]
  viewer: NewSavedSearchAlertEditForm_viewer$data
  onDeleteClick: () => void
  onCompleted: () => void
  onCloseClick: () => void
}

interface NewSavedSearchAlertEditFormProps {
  viewer: NewSavedSearchAlertEditForm_viewer$data
  onDeleteClick: () => void
  onCompleted: () => void
}
const NewSavedSearchAlertEditSteps: React.FC<NewSavedSearchAlertEditStepsProps> = ({
  viewer,
  onDeleteClick,
  onCompleted,
  onCloseClick,
}) => {
  const { current, dispatch } = useAlertContext()

  return (
    <>
      <Media greaterThanOrEqual="md">
        {current === "EDIT_ALERT_DETAILS" && (
          <Box flex={1} p={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text variant={["md", "lg"]} flex={1} mr={1}>
                Edit Alert
              </Text>
              <Clickable
                onClick={() => {
                  onCloseClick()
                  dispatch({ type: "RESET" })
                }}
              >
                <CloseIcon display="flex" />
              </Clickable>
            </Flex>
            <Spacer y={6} />
            <NewSavedSearchAlertEditForm
              viewer={viewer}
              onDeleteClick={onDeleteClick}
              onCompleted={onCompleted}
            />
          </Box>
        )}
        {current === "EDIT_ALERT_FILTERS" && (
          <Box flex={1} p={2}>
            <Filters />
          </Box>
        )}
      </Media>

      <Media lessThan="md">
        <ModalDialog
          header={null}
          title={current === "EDIT_ALERT_DETAILS" ? "Edit Alert" : "Edit Alert"}
          m={0}
          dialogProps={{
            width: "100%",
            height: "100%",
          }}
          onClose={onCloseClick}
        >
          {current === "EDIT_ALERT_DETAILS" && (
            <>
              <Spacer y={4} />

              <NewSavedSearchAlertEditForm
                viewer={viewer}
                onDeleteClick={onDeleteClick}
                onCompleted={onCompleted}
              />
            </>
          )}
          {current === "EDIT_ALERT_FILTERS" && (
            <Box m={-2}>
              <Filters />
            </Box>
          )}
        </ModalDialog>
      </Media>
    </>
  )
}
const NewSavedSearchAlertEditForm: React.FC<NewSavedSearchAlertEditFormProps> = ({
  viewer,
  onDeleteClick,
  onCompleted,
}) => {
  const { state, goToFilters, dispatch, onCompleteEdit } = useAlertContext()

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
  const shouldShowEmailWarning = !!state.settings.email && !userAllowsEmails

  return (
    <Formik<AlertFormikValues>
      initialValues={state.settings}
      onSubmit={onCompleteEdit}
      validateOnChange
    >
      {({ isSubmitting, values, setFieldValue, handleSubmit, dirty }) => {
        const transitionToFilters = () => {
          dispatch({ type: "SET_SETTINGS", payload: values })
          goToFilters()
        }

        const finishEditing = () => {
          dispatch({ type: "SET_SETTINGS", payload: values })
          handleSubmit()
          setTimeout(() => {
            onCompleted()
          }, 1000)
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

                <Clickable onClick={transitionToFilters} width="100%">
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
                        setFieldValue("frequency", state.settings.frequency)
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
                    onClick={finishEditing}
                    disabled={
                      !dirty &&
                      !state.criteriaChanged &&
                      (values.push || values.email)
                    }
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
                  onClick={finishEditing}
                  disabled={
                    !dirty &&
                    !state.criteriaChanged &&
                    (values.push || values.email)
                  }
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
  NewSavedSearchAlertEditSteps,
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
    savedSearch: graphql`
      fragment NewSavedSearchAlertEditForm_searchCriteria on SearchCriteria {
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
    `,
  }
)

const SAVED_SEARCH_ALERT_EDIT_FORM_QUERY = graphql`
  query NewSavedSearchAlertEditFormQuery($id: ID!) {
    viewer {
      ...NewSavedSearchAlertEditForm_viewer
    }
    me {
      savedSearch(id: $id) {
        ...NewSavedSearchAlertEditForm_searchCriteria @relay(mask: false)
      }
    }
  }
`

export const NewSavedSearchAlertEditFormQueryRenderer: React.FC<NewSavedSearchAlertEditFormQueryRendererProps> = ({
  editAlertEntity,
  onDeleteClick,
  onCompleted,
  onCloseClick,
}) => {
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

        if (props?.me?.savedSearch && props?.viewer) {
          return (
            <AlertProvider
              initialCriteria={getAllowedSearchCriteria(
                (props.me.savedSearch as unknown) as SearchCriteriaAttributes
              )}
              searchCriteriaID={props.me.savedSearch.internalID}
              initialSettings={{
                name: props.me.savedSearch.userAlertSettings.name ?? "",
                push: props.me.savedSearch.userAlertSettings.push,
                email: props.me.savedSearch.userAlertSettings.email,
                frequency: props.me.savedSearch.userAlertSettings
                  .frequency as SavedSearchFrequency,
                details: props?.me?.savedSearch.userAlertSettings.details ?? "",
              }}
              isEditMode
            >
              <NewSavedSearchAlertEditFormFragmentContainer
                savedSearch={props.me.savedSearch}
                viewer={props.viewer}
                onDeleteClick={onDeleteClick}
                onCompleted={onCompleted}
                onCloseClick={onCloseClick}
              />
            </AlertProvider>
          )
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
