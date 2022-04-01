import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { Formik } from "formik"
import { createFragmentContainer, graphql } from "react-relay"
import { Aggregations } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SavedSearchAlertEditFormQuery } from "v2/__generated__/SavedSearchAlertEditFormQuery.graphql"
import { SavedSearchAlertEditForm_me } from "v2/__generated__/SavedSearchAlertEditForm_me.graphql"
import { SavedSearchAlertEditForm_artist } from "v2/__generated__/SavedSearchAlertEditForm_artist.graphql"
import { EditAlertEntity } from "../types"
import { SavedSearchAlertEditForm_artworksConnection } from "v2/__generated__/SavedSearchAlertEditForm_artworksConnection.graphql"
import { useEditSavedSearchAlert } from "../useEditSavedSearchAlert"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { SavedSearchAlertEditFormPlaceholder } from "./SavedSearchAlertEditFormPlaceholder"
import { isEqual } from "lodash"
import {
  SavedSearchAlertContextProvider,
  useSavedSearchAlertContext,
} from "v2/Components/SavedSearchAlert/SavedSearchAlertContext"
import {
  FilterPill,
  SavedSearchAleftFormValues,
  SavedSearchEntity,
  SearchCriteriaAttributeKeys,
} from "v2/Components/SavedSearchAlert/types"
import { getAllowedSearchCriteria } from "v2/Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { SavedSearchAlertPills } from "v2/Components/SavedSearchAlert/Components/SavedSearchAlertPills"
import { useTracking } from "react-tracking"
import { ActionType, OwnerType } from "@artsy/cohesion"
import {
  convertLabelsToPills,
  LabelEntity,
} from "v2/Components/SavedSearchAlert/Utils/convertLabelsToPills"
import { useFeatureFlag } from "v2/System/useFeatureFlag"

const logger = createLogger(
  "v2/Apps/SavedSearchAlerts/Components/SavedSearchAlertEditForm"
)

interface SavedSearchAlertEditFormQueryRendererProps {
  editAlertEntity: EditAlertEntity
  onDeleteClick: () => void
  onCompleted: () => void
}

interface SavedSearchAlertEditFormProps {
  me: SavedSearchAlertEditForm_me
  artist: SavedSearchAlertEditForm_artist
  artworksConnection?: SavedSearchAlertEditForm_artworksConnection | null
  editAlertEntity: EditAlertEntity
  shouldFetchLabelsFromMetaphysics?: boolean
  onDeleteClick: () => void
  onCompleted: () => void
}

const SavedSearchAlertEditForm: React.FC<SavedSearchAlertEditFormProps> = ({
  me,
  editAlertEntity,
  shouldFetchLabelsFromMetaphysics,
  onDeleteClick,
  onCompleted,
}) => {
  const { savedSearch } = me
  const { userAlertSettings } = savedSearch!
  const { submitMutation: submitEditAlert } = useEditSavedSearchAlert()
  const { trackEvent } = useTracking()
  const {
    pills,
    entity,
    criteria,
    isCriteriaChanged,
    removeCriteriaValue,
    removePill,
  } = useSavedSearchAlertContext()

  const initialValues: SavedSearchAleftFormValues = {
    name: userAlertSettings.name ?? "",
    push: userAlertSettings.push,
    email: userAlertSettings.email,
  }

  const handleRemovePill = (pill: FilterPill) => {
    if (shouldFetchLabelsFromMetaphysics) {
      return removePill(pill)
    }

    if (pill.isDefault) {
      return
    }

    removeCriteriaValue(pill.field as SearchCriteriaAttributeKeys, pill.value)
  }

  const handleSubmit = async (values: SavedSearchAleftFormValues) => {
    try {
      const updatedAlertSettings = {
        ...values,
        name: values.name || entity.placeholder,
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
            <Join separator={<Spacer mt={[4, 6]} />}>
              <Input
                title="Alert Name"
                name="name"
                placeholder={entity.placeholder}
                value={values.name}
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                error={errors.name}
                maxLength={75}
              />

              <Box>
                <Text variant="xs" textTransform="uppercase">
                  Filters
                </Text>
                <Spacer mt={2} />
                <Flex flexWrap="wrap" mx={-0.5}>
                  <SavedSearchAlertPills
                    items={pills}
                    onDeletePress={handleRemovePill}
                  />
                </Flex>
              </Box>

              <Box>
                <Checkbox
                  onSelect={selected => setFieldValue("email", selected)}
                  selected={values.email}
                >
                  Email Alerts
                </Checkbox>
                <Spacer mt={4} />
                <Checkbox
                  onSelect={selected => setFieldValue("push", selected)}
                  selected={values.push}
                >
                  Mobile Alerts
                </Checkbox>
              </Box>

              <Media greaterThanOrEqual="md">
                <Spacer mt={6} />

                <Flex>
                  <Button
                    variant="secondaryOutline"
                    flex={1}
                    onClick={onDeleteClick}
                  >
                    Delete Alert
                  </Button>
                  <Spacer ml={2} />
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
                <Spacer mt={4} />

                <Button
                  loading={isSubmitting}
                  width="100%"
                  onClick={() => handleSubmit()}
                  disabled={isSaveAlertButtonDisabled}
                >
                  Save Alert
                </Button>

                <Spacer mt={1} />

                <Button
                  variant="secondaryOutline"
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

const SavedSearchAlertEditFormContainer: React.FC<SavedSearchAlertEditFormProps> = props => {
  const {
    artworksConnection,
    artist,
    me,
    shouldFetchLabelsFromMetaphysics,
  } = props
  const { savedSearch } = me
  const aggregations = artworksConnection?.aggregations as Aggregations
  const criteria = getAllowedSearchCriteria(savedSearch as any)
  const entity: SavedSearchEntity = {
    placeholder: artist.name ?? "",
    artists: [
      {
        id: artist.internalID,
        name: artist.name ?? "",
        slug: artist.slug ?? "",
      },
    ],
    owner: {
      type: OwnerType.savedSearch,
      id: savedSearch?.internalID!,
      // alert doesn't have a slug, for this reason we pass internalID
      slug: savedSearch?.internalID!,
      name: savedSearch?.userAlertSettings.name ?? "",
    },
  }

  let labels: LabelEntity[] | undefined
  let pills: FilterPill[] | undefined

  if (shouldFetchLabelsFromMetaphysics) {
    labels = (savedSearch?.labels as LabelEntity[]) ?? []
    pills = convertLabelsToPills(labels)
  }

  return (
    <SavedSearchAlertContextProvider
      entity={entity}
      criteria={criteria}
      aggregations={aggregations}
      initialPills={pills}
    >
      <SavedSearchAlertEditForm {...props} />
    </SavedSearchAlertContextProvider>
  )
}

export const SavedSearchAlertEditFormFragmentContainer = createFragmentContainer(
  SavedSearchAlertEditFormContainer,
  {
    me: graphql`
      fragment SavedSearchAlertEditForm_me on Me
        @argumentDefinitions(
          savedSearchId: { type: "ID" }
          withAggregations: { type: "Boolean!" }
        ) {
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
          }
          labels @skip(if: $withAggregations) {
            field
            value
            displayValue
          }
        }
      }
    `,
    artist: graphql`
      fragment SavedSearchAlertEditForm_artist on Artist {
        internalID
        name
        slug
      }
    `,
    artworksConnection: graphql`
      fragment SavedSearchAlertEditForm_artworksConnection on FilterArtworksConnection {
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
  query SavedSearchAlertEditFormQuery(
    $id: ID!
    $artistId: String!
    $withAggregations: Boolean!
  ) {
    me {
      ...SavedSearchAlertEditForm_me
        @arguments(savedSearchId: $id, withAggregations: $withAggregations)
    }
    artist(id: $artistId) {
      ...SavedSearchAlertEditForm_artist
    }
    artworksConnection(
      first: 0
      artistID: $artistId
      aggregations: [
        ARTIST
        LOCATION_CITY
        MATERIALS_TERMS
        MEDIUM
        PARTNER
        COLOR
      ]
    ) @include(if: $withAggregations) {
      ...SavedSearchAlertEditForm_artworksConnection
    }
  }
`

export const SavedSearchAlertEditFormQueryRenderer: React.FC<SavedSearchAlertEditFormQueryRendererProps> = ({
  editAlertEntity,
  onDeleteClick,
  onCompleted,
}) => {
  const shouldFetchLabelsFromMetaphysics = useFeatureFlag(
    "force-fetch-alert-labels-from-metaphysics"
  )

  return (
    <SystemQueryRenderer<SavedSearchAlertEditFormQuery>
      query={SAVED_SEARCH_ALERT_EDIT_FORM_QUERY}
      variables={{
        id: editAlertEntity.id,
        artistId: editAlertEntity.artistId,
        withAggregations: !shouldFetchLabelsFromMetaphysics,
      }}
      placeholder={<SavedSearchAlertEditFormPlaceholder />}
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (shouldFetchLabelsFromMetaphysics && props?.artist && props.me) {
          return (
            <SavedSearchAlertEditFormFragmentContainer
              me={props.me}
              artist={props.artist!}
              editAlertEntity={editAlertEntity}
              artworksConnection={null}
              onDeleteClick={onDeleteClick}
              onCompleted={onCompleted}
              shouldFetchLabelsFromMetaphysics={true}
            />
          )
        }

        if (props?.artist && props.artworksConnection && props.me) {
          return (
            <SavedSearchAlertEditFormFragmentContainer
              me={props.me}
              artist={props.artist!}
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
