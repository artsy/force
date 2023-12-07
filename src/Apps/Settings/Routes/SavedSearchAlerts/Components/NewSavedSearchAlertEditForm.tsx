import {
  Box,
  Button,
  Clickable,
  Flex,
  Join,
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
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { DetailsInput } from "Components/SavedSearchAlert/Components/DetailsInput"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { CriteriaPills } from "Components/Alert/Components/CriteriaPills"
import { AlertNameInput } from "Components/Alert/Components/Form/AlertNameInput"
import { Filters } from "Components/Alert/Components/Steps/Filters"
import CloseIcon from "@artsy/icons/CloseIcon"
import { AlertFormikValues } from "Components/Alert/Components/Steps/Details"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { isEqual } from "lodash"
import { FiltersFooter } from "Components/Alert/Components/Steps/StepsFooter/FiltersFooter"
import { ModalHeader } from "Components/Alert/Components/Modal/ModalHeader"
import { Modal } from "Components/Alert/Components/Modal/Modal"
import { NotificationPreferencesQueryRenderer } from "Components/Alert/Components/NotificationPreferences"

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
  const { current } = useAlertContext()

  return (
    <>
      <Media greaterThanOrEqual="md">
        {current === "ALERT_DETAILS" && (
          <Box flex={1} p={4}>
            <Flex justifyContent="space-between">
              <ModalHeader />
              <Clickable onClick={onCloseClick}>
                <CloseIcon display="flex" />
              </Clickable>
            </Flex>
            <Spacer y={4} />
            <NewSavedSearchAlertEditForm
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
              <NewSavedSearchAlertEditForm
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

const NewSavedSearchAlertEditForm: React.FC<NewSavedSearchAlertEditFormProps> = ({
  onDeleteClick,
  onCompleted,
}) => {
  const { state, goToFilters, dispatch, onComplete } = useAlertContext()

  return (
    <Formik<AlertFormikValues>
      initialValues={state.settings}
      onSubmit={() => {
        onComplete()
        onCompleted()
      }}
      validateOnChange
    >
      {({ isSubmitting, values, handleSubmit }) => {
        let isSaveAlertButtonDisabled = true

        if (state.criteriaChanged || !isEqual(state.settings, values)) {
          isSaveAlertButtonDisabled = false
        }

        if (!values.email && !values.push) {
          isSaveAlertButtonDisabled = true
        }

        const transitionToFilters = () => {
          goToFilters()
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
                    loading={isSubmitting}
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
          details
        }
      }
    `,
  }
)

export const NewSavedSearchAlertEditFormQueryRenderer: React.FC<NewSavedSearchAlertEditFormQueryRendererProps> = ({
  editAlertEntity,
  onDeleteClick,
  onCompleted,
  onCloseClick,
}) => {
  return (
    <SystemQueryRenderer<NewSavedSearchAlertEditFormQuery>
      query={graphql`
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
      `}
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

        if (!props?.me?.savedSearch || !props?.viewer) {
          return (
            <Box flex={1} p={4}>
              <SavedSearchAlertEditFormPlaceholder />
            </Box>
          )
        }

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
      }}
    />
  )
}
