import {
  Box,
  Button,
  Checkbox,
  Flex,
  Join,
  Message,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { NewSavedSearchAlertEditFormQuery } from "__generated__/NewSavedSearchAlertEditFormQuery.graphql"
import { NewSavedSearchAlertEditForm_me$data } from "__generated__/NewSavedSearchAlertEditForm_me.graphql"
import { NewSavedSearchAlertEditForm_artistsConnection$data } from "__generated__/NewSavedSearchAlertEditForm_artistsConnection.graphql"
import { NewSavedSearchAlertEditForm_viewer$data } from "__generated__/NewSavedSearchAlertEditForm_viewer.graphql"
import { NewSavedSearchAlertEditForm_artworksConnection$data } from "__generated__/NewSavedSearchAlertEditForm_artworksConnection.graphql"

import { Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { EditAlertEntity } from "Apps/Settings/Routes/SavedSearchAlerts/types"
import { useEditSavedSearchAlert } from "Apps/Settings/Routes/SavedSearchAlerts/useEditSavedSearchAlert"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { SavedSearchAlertEditFormPlaceholder } from "./SavedSearchAlertEditFormPlaceholder"
import { isEqual } from "lodash"
import {
  SavedSearchAlertContextProvider,
  useSavedSearchAlertContext,
} from "Components/SavedSearchAlert/SavedSearchAlertContext"
import {
  SavedSearchAlertFormValues,
  SavedSearchEntity,
  SavedSearchEntityCriteria,
  SavedSearchFrequency,
} from "Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { SavedSearchAlertPills } from "Components/SavedSearchAlert/Components/SavedSearchAlertPills"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType } from "@artsy/cohesion"
import { extractNodes } from "Utils/extractNodes"
import { RouterLink } from "System/Router/RouterLink"
import { DEFAULT_FREQUENCY } from "Components/SavedSearchAlert/constants"
import { FrequenceRadioButtons } from "Components/SavedSearchAlert/Components/FrequencyRadioButtons"
import { PriceRangeFilter } from "Components/SavedSearchAlert/Components/PriceRangeFilter"
import { SavedSearchAlertNameInputQueryRenderer } from "Components/SavedSearchAlert/Components/SavedSearchAlertNameInput"
import { DetailsInput } from "Components/SavedSearchAlert/Components/DetailsInput"

const logger = createLogger(
  "Apps/SavedSearchAlerts/Components/NewSavedSearchAlertEditForm"
)

interface NewSavedSearchAlertEditFormQueryRendererProps {
  editAlertEntity: EditAlertEntity
  onDeleteClick: () => void
  onCompleted: () => void
}

interface NewSavedSearchAlertEditFormProps {
  me: NewSavedSearchAlertEditForm_me$data
  viewer: NewSavedSearchAlertEditForm_viewer$data
  artistsConnection: NewSavedSearchAlertEditForm_artistsConnection$data
  artworksConnection?: NewSavedSearchAlertEditForm_artworksConnection$data | null
  editAlertEntity: EditAlertEntity
  onDeleteClick: () => void
  onCompleted: () => void
}

const NewSavedSearchAlertEditForm: React.FC<NewSavedSearchAlertEditFormProps> = ({
  me,
  viewer,
  editAlertEntity,
  onDeleteClick,
  onCompleted,
}) => {
  const { savedSearch } = me
  const { userAlertSettings } = savedSearch!
  const { submitMutation: submitEditAlert } = useEditSavedSearchAlert()
  const { trackEvent } = useTracking()
  const {
    pills,
    criteria,
    isCriteriaChanged,
    removePill,
  } = useSavedSearchAlertContext()

  const initialValues: SavedSearchAlertFormValues = {
    name: userAlertSettings.name ?? "",
    push: userAlertSettings.push,
    email: userAlertSettings.email,
    frequency: userAlertSettings.frequency as SavedSearchFrequency,
    details: userAlertSettings.details ?? "",
  }
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

  const handleSubmit = async (values: SavedSearchAlertFormValues) => {
    try {
      const updatedAlertSettings: SavedSearchAlertFormValues = {
        ...values,
        name: values.name || "",
        frequency: values.push ? values.frequency : DEFAULT_FREQUENCY,
        details: values.details ?? "",
      }

      await submitEditAlert({
        variables: {
          input: {
            searchCriteriaID: editAlertEntity!.id,
            attributes: criteria,
            userAlertSettings: updatedAlertSettings,
          },
        },
      })

      trackEvent({
        action: ActionType.editedSavedSearch,
        saved_search_id: editAlertEntity.id,
        current: JSON.stringify(userAlertSettings),
        changed: JSON.stringify(updatedAlertSettings),
      })

      onCompleted()
    } catch (error) {
      logger.error(error)
    }
  }

  return (
    <Formik initialValues={{ ...initialValues }} onSubmit={handleSubmit}>
      {({
        isSubmitting,
        values,
        errors,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
      }) => {
        let isSaveAlertButtonDisabled = true

        if (isCriteriaChanged || !isEqual(initialValues, values)) {
          isSaveAlertButtonDisabled = false
        }

        if (!values.email && !values.push) {
          isSaveAlertButtonDisabled = true
        }

        return (
          <Box>
            <Join separator={<Spacer y={[4, 6]} />}>
              <SavedSearchAlertNameInputQueryRenderer />

              <Box>
                <Text variant="xs">Filters</Text>

                <Spacer y={2} />

                <Flex flexWrap="wrap" gap={1}>
                  <SavedSearchAlertPills
                    items={pills}
                    onDeletePress={removePill}
                  />
                </Flex>

                <Separator my={2} />
                <PriceRangeFilter />

                <Separator my={2} />
                <DetailsInput />
                <Separator my={2} />
              </Box>

              <Box>
                <Checkbox
                  onSelect={selected => setFieldValue("email", selected)}
                  selected={values.email}
                >
                  Email Alerts
                </Checkbox>
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

                <Checkbox
                  onSelect={selected => {
                    setFieldValue("push", selected)

                    // Restore initial frequency when "Mobile Alerts" is unselected
                    if (!selected) {
                      setFieldValue("frequency", initialValues.frequency)
                    }
                  }}
                  selected={values.push}
                >
                  Mobile Alerts
                </Checkbox>

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
                    onClick={() => handleSubmit()}
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
                  onClick={() => handleSubmit()}
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

const NewSavedSearchAlertEditFormContainer: React.FC<NewSavedSearchAlertEditFormProps> = props => {
  const { artworksConnection, artistsConnection, me } = props
  const { savedSearch } = me
  const aggregations = artworksConnection?.aggregations as Aggregations
  const criteria = getAllowedSearchCriteria(savedSearch as any)
  const artists = extractNodes(artistsConnection)
  const defaultArtistsCriteria: SavedSearchEntityCriteria[] = artists.map(
    artist => {
      return {
        displayValue: artist.name ?? "",
        value: artist.internalID,
      }
    }
  )

  const entity: SavedSearchEntity = {
    defaultCriteria: {
      artistIDs: defaultArtistsCriteria,
    },
    owner: {
      type: OwnerType.savedSearch,
      id: savedSearch?.internalID!,
      // alert doesn't have a slug, for this reason we pass internalID
      slug: savedSearch?.internalID!,
      name: savedSearch?.userAlertSettings.name ?? undefined,
    },
  }

  return (
    <SavedSearchAlertContextProvider
      entity={entity}
      criteria={criteria}
      aggregations={aggregations}
    >
      <NewSavedSearchAlertEditForm {...props} />
    </SavedSearchAlertContextProvider>
  )
}

export const NewSavedSearchAlertEditFormFragmentContainer = createFragmentContainer(
  NewSavedSearchAlertEditFormContainer,
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
          internalID
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
    artistsConnection: graphql`
      fragment NewSavedSearchAlertEditForm_artistsConnection on ArtistConnection {
        edges {
          node {
            internalID
            name
            slug
          }
        }
      }
    `,
    artworksConnection: graphql`
      fragment NewSavedSearchAlertEditForm_artworksConnection on FilterArtworksConnection {
        aggregations {
          slice
          counts {
            count
            name
            value
          }
        }
      }
    `,
  }
)

const SAVED_SEARCH_ALERT_EDIT_FORM_QUERY = graphql`
  query NewSavedSearchAlertEditFormQuery($id: ID!, $artistIds: [String!]) {
    viewer {
      ...NewSavedSearchAlertEditForm_viewer
    }
    me {
      ...NewSavedSearchAlertEditForm_me @arguments(savedSearchId: $id)
    }
    # If we pass artist IDs using ids argument, we will get an empty array.
    # For this reason we use slugs argument, in which ids can also be passed
    artistsConnection(slugs: $artistIds) {
      ...NewSavedSearchAlertEditForm_artistsConnection
    }
    artworksConnection(
      first: 0
      artistIDs: $artistIds
      aggregations: [LOCATION_CITY, MATERIALS_TERMS, MEDIUM, PARTNER, COLOR]
    ) {
      ...NewSavedSearchAlertEditForm_artworksConnection
    }
  }
`

export const NewSavedSearchAlertEditFormQueryRenderer: React.FC<NewSavedSearchAlertEditFormQueryRendererProps> = ({
  editAlertEntity,
  onDeleteClick,
  onCompleted,
}) => {
  console.log(
    "[LOGD] NewSavedSearchAlertEditFormQueryRenderer = ",
    editAlertEntity
  )

  return (
    <SystemQueryRenderer<NewSavedSearchAlertEditFormQuery>
      query={SAVED_SEARCH_ALERT_EDIT_FORM_QUERY}
      variables={{
        id: editAlertEntity.id,
        artistIds: editAlertEntity.artistIds,
      }}
      placeholder={<SavedSearchAlertEditFormPlaceholder />}
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (
          props?.artistsConnection &&
          props.artworksConnection &&
          props.me &&
          props.viewer
        ) {
          return (
            <NewSavedSearchAlertEditFormFragmentContainer
              me={props.me}
              viewer={props.viewer}
              artistsConnection={props.artistsConnection}
              artworksConnection={props.artworksConnection!}
              editAlertEntity={editAlertEntity}
              onDeleteClick={onDeleteClick}
              onCompleted={onCompleted}
            />
          )
        }

        return <SavedSearchAlertEditFormPlaceholder />
      }}
    />
  )
}
