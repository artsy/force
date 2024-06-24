import {
  Box,
  Button,
  Flex,
  Join,
  Spacer,
  THEME,
  Text,
  useToasts,
} from "@artsy/palette"
import { SavedSearchAlertEditFormQuery } from "__generated__/SavedSearchAlertEditFormQuery.graphql"
import { SavedSearchAlertEditForm_viewer$data } from "__generated__/SavedSearchAlertEditForm_viewer.graphql"
import { Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EditAlertEntity } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { Media } from "Utils/Responsive"
import { SavedSearchAlertEditFormPlaceholder } from "./SavedSearchAlertEditFormPlaceholder"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { DetailsInput } from "Components/SavedSearchAlert/Components/DetailsInput"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { CriteriaPills } from "Components/Alert/Components/CriteriaPills"
import { Filters } from "Components/Alert/Components/Steps/Filters"
import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { isEqual } from "lodash"
import { FiltersFooter } from "Components/Alert/Components/Steps/StepsFooter/FiltersFooter"
import { ModalHeader } from "Components/Alert/Components/Modal/ModalHeader"
import { Modal } from "Components/Alert/Components/Modal/Modal"
import { NotificationPreferencesQueryRenderer } from "Components/Alert/Components/NotificationPreferences"
import { SugggestedFiltersQueryRenderer } from "Components/Alert/Components/Form/SuggestedFilters"
import { useJump } from "Utils/Hooks/useJump"
import { useEffect } from "react"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { FadeInBox } from "Components/FadeInBox"

interface SavedSearchAlertEditFormQueryRendererProps {
  editAlertEntity: EditAlertEntity
  onDeleteClick: () => void
  onCompleted: () => void
  onCloseClick?: () => void
}

interface SavedSearchAlertEditStepsProps {
  savedSearch: NonNullable<
    SavedSearchAlertEditFormQuery["response"]["me"]
  >["alert"]
  viewer: SavedSearchAlertEditForm_viewer$data
  onDeleteClick: () => void
  onCompleted: () => void
  onCloseClick?: () => void
}

interface SavedSearchAlertEditFormProps {
  viewer: SavedSearchAlertEditForm_viewer$data
  onDeleteClick: () => void
  onCompleted: () => void
}

const SavedSearchAlertEditSteps: React.FC<SavedSearchAlertEditStepsProps> = ({
  viewer,
  onDeleteClick,
  onCompleted,
  onCloseClick,
}) => {
  const { current } = useAlertContext()

  return (
    <>
      <Media greaterThanOrEqual="md">
        {current === "ALERT_DETAILS" && (
          <Box p={4}>
            <Flex justifyContent="space-between">
              <ModalHeader />
            </Flex>

            <Spacer y={4} />

            <SavedSearchAlertEditForm
              viewer={viewer}
              onDeleteClick={onDeleteClick}
              onCompleted={onCompleted}
            />
          </Box>
        )}

        {current === "ALERT_FILTERS" && (
          <Box flex={1} px={2} pt={4}>
            <ModalHeader />

            <Filters />

            <FiltersFooter />
          </Box>
        )}
      </Media>

      <Media lessThan="md">
        <Modal onClose={onCloseClick}>
          <Flex mx={2}>
            {current === "ALERT_DETAILS" && (
              <SavedSearchAlertEditForm
                viewer={viewer}
                onDeleteClick={onDeleteClick}
                onCompleted={onCompleted}
              />
            )}

            {current === "ALERT_FILTERS" && <Filters />}
          </Flex>
        </Modal>
      </Media>
    </>
  )
}

const SavedSearchAlertEditForm: React.FC<SavedSearchAlertEditFormProps> = ({
  onDeleteClick,
  onCompleted,
}) => {
  const {
    state,
    goToFilters,
    dispatch,
    onComplete,
    createAlertError,
  } = useAlertContext()
  const { jumpTo } = useJump()
  const { sendToast } = useToasts()

  const mWebView = __internal__useMatchMedia(THEME.mediaQueries.xs)

  useEffect(() => {
    createAlertError &&
      !mWebView &&
      sendToast({
        variant: "error",
        message: "Something went wrong. Please try again.",
      })
  }, [createAlertError, mWebView, sendToast])

  const handleSubmit = () => {
    onComplete()
    onCompleted()
  }

  return (
    <Formik<AlertFormikValues>
      initialValues={state.settings}
      onSubmit={handleSubmit}
      validateOnChange
    >
      {({ values, handleSubmit }) => {
        let isSaveAlertButtonDisabled = true

        if (state.criteriaChanged || !isEqual(state.settings, values)) {
          isSaveAlertButtonDisabled = false
        }

        const transitionToFilters = () => {
          goToFilters()
          jumpTo("Alerts")
        }

        return (
          <FadeInBox flex={1}>
            <Join separator={<Spacer y={4} />}>
              <Box>
                <Text variant="sm-display" mb={1}>
                  We'll send you alerts for
                </Text>
                <Flex flexWrap="wrap" gap={1}>
                  <CriteriaPills />
                </Flex>
              </Box>

              <SugggestedFiltersQueryRenderer
                transitionToFiltersAndTrack={transitionToFilters}
              />

              <DetailsInput />

              <NotificationPreferencesQueryRenderer mode="edit" />

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
                    loading={state.isSubmitting}
                    onClick={() => {
                      dispatch({ type: "SET_SETTINGS", payload: values })
                      handleSubmit()
                    }}
                    disabled={isSaveAlertButtonDisabled}
                  >
                    Save Alert
                  </Button>
                </Flex>
              </Media>

              <Media lessThan="md">
                <Spacer y={4} />
                {!!createAlertError && (
                  <Text mb={1} color="red100" variant="xs">
                    {createAlertError}
                  </Text>
                )}
                <Button
                  loading={state.isSubmitting}
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
                  mb={2}
                  variant="secondaryBlack"
                  width="100%"
                  onClick={onDeleteClick}
                >
                  Delete Alert
                </Button>
              </Media>
            </Join>
          </FadeInBox>
        )
      }}
    </Formik>
  )
}

export const SavedSearchAlertEditFormFragmentContainer = createFragmentContainer(
  SavedSearchAlertEditSteps,
  {
    viewer: graphql`
      fragment SavedSearchAlertEditForm_viewer on Viewer {
        notificationPreferences {
          status
          name
          channel
        }
      }
    `,
    savedSearch: graphql`
      fragment SavedSearchAlertEditForm_alert on Alert {
        internalID
        acquireable
        additionalGeneIDs
        artistIDs
        artistSeriesIDs
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
        settings {
          name
          email
          push
          details
        }
      }
    `,
  }
)

export const SavedSearchAlertEditFormQueryRenderer: React.FC<SavedSearchAlertEditFormQueryRendererProps> = ({
  editAlertEntity,
  onDeleteClick,
  onCompleted,
  onCloseClick,
}) => {
  return (
    <SystemQueryRenderer<SavedSearchAlertEditFormQuery>
      query={graphql`
        query SavedSearchAlertEditFormQuery($id: String!) {
          viewer {
            ...SavedSearchAlertEditForm_viewer
          }
          me {
            alert(id: $id) {
              ...SavedSearchAlertEditForm_alert @relay(mask: false)
            }
          }
        }
      `}
      variables={{
        id: editAlertEntity.id,
      }}
      placeholder={
        <SavedSearchAlertEditFormPlaceholder onCloseClick={onCloseClick} />
      }
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me?.alert || !props?.viewer) {
          return (
            <SavedSearchAlertEditFormPlaceholder onCloseClick={onCloseClick} />
          )
        }

        return (
          <AlertProvider
            initialCriteria={getAllowedSearchCriteria(
              (props.me.alert as unknown) as SearchCriteriaAttributes
            )}
            alertID={props.me.alert.internalID}
            initialSettings={{
              name: props.me.alert.settings.name ?? "",
              push: props.me.alert.settings.push,
              email: props.me.alert.settings.email,
              details: props?.me?.alert.settings.details ?? "",
            }}
            isEditMode
          >
            <SavedSearchAlertEditFormFragmentContainer
              savedSearch={props.me.alert}
              viewer={props.viewer}
              onDeleteClick={onDeleteClick}
              onCompleted={onCompleted}
              onCloseClick={onCloseClick}
            />
          </AlertProvider>
        )
      }}
    />
  )
}
