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
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  Aggregations,
  ArtworkFilters,
  initialArtworkFilterState,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { Pills } from "v2/Components/ArtworkFilter/SavedSearch/Components/Pills"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import { SavedSearchAleftFormValues } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"
import { getNamePlaceholder } from "v2/Components/SavedSearchAlert/Utils/getNamePlaceholder"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SavedSearchAlertEditFormQuery } from "v2/__generated__/SavedSearchAlertEditFormQuery.graphql"
import { SavedSearchAlertEditForm_savedSearch } from "v2/__generated__/SavedSearchAlertEditForm_savedSearch.graphql"
import { SavedSearchAlertEditForm_artist } from "v2/__generated__/SavedSearchAlertEditForm_artist.graphql"
import { SavedSearchAlertEditForm_artworksConnection } from "v2/__generated__/SavedSearchAlertEditForm_artworksConnection.graphql"
import { extractPills } from "v2/Components/SavedSearchAlert/Utils/extractPills"
import { FilterPill } from "v2/Components/ArtworkFilter/SavedSearch/Utils/FilterPillsContext"
import { EditAlertEntity } from "../types"
import { getSearchCriteriaFromFilters } from "v2/Components/ArtworkFilter/SavedSearch/Utils"
import { useEditSavedSearchAlert } from "../useEditSavedSearchAlert"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { SavedSearchAlertEditFormPlaceholder } from "./SavedSearchAlertEditFormPlaceholder"
import { isEqual } from "lodash"

const logger = createLogger(
  "v2/Apps/SavedSearchAlerts/Components/SavedSearchAlertEditForm"
)

interface SavedSearchAlertEditFormQueryRendererProps {
  editAlertEntity: EditAlertEntity
  onDeleteClick: () => void
  onCompleted: () => void
}

interface SavedSearchAlertEditFormProps {
  savedSearch: SavedSearchAlertEditForm_savedSearch
  artist: SavedSearchAlertEditForm_artist
  artworksConnection: SavedSearchAlertEditForm_artworksConnection
  editAlertEntity: EditAlertEntity
  onDeleteClick: () => void
  onCompleted: () => void
}

const SavedSearchAlertEditForm: React.FC<SavedSearchAlertEditFormProps> = ({
  savedSearch,
  artist,
  artworksConnection,
  editAlertEntity,
  onDeleteClick,
  onCompleted,
}) => {
  const { userAlertSettings, internalID, ...other } = savedSearch
  const { submitMutation: submitEditAlert } = useEditSavedSearchAlert()
  const [hasChangedFilters, setHasChangedFilters] = useState(false)
  const [searchCriteriaAttributes, setSearchCriteriaAttributes] = useState(
    (other as unknown) as ArtworkFilters
  )

  const initialValues: SavedSearchAleftFormValues = {
    name: userAlertSettings.name ?? "",
    push: userAlertSettings.push,
    email: userAlertSettings.email,
  }
  const entity: SavedSearchAttributes = {
    type: "artist",
    id: artist.internalID,
    name: artist.name ?? "",
    slug: artist.slug ?? "",
  }

  const aggregations = artworksConnection.aggregations as Aggregations
  const pills = extractPills(searchCriteriaAttributes, aggregations, entity)
  const namePlaceholder = getNamePlaceholder(entity?.name ?? "", pills)

  const removePill = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    let filterValue = searchCriteriaAttributes![pill.filterName]

    if (Array.isArray(filterValue)) {
      filterValue = filterValue.filter(value => value !== pill.name)
    } else {
      filterValue = initialArtworkFilterState[pill.filterName]
    }

    setHasChangedFilters(true)
    setSearchCriteriaAttributes({
      ...searchCriteriaAttributes,
      [pill.filterName]: filterValue,
    })
  }

  const handleSubmit = async (values: SavedSearchAleftFormValues) => {
    try {
      const namePlaceholder = getNamePlaceholder(entity!.name, pills)
      const searchCriteria = getSearchCriteriaFromFilters(
        entity!.id,
        searchCriteriaAttributes as ArtworkFilters
      )
      await submitEditAlert({
        input: {
          searchCriteriaID: editAlertEntity!.id,
          attributes: searchCriteria,
          userAlertSettings: {
            ...values,
            name: values.name || namePlaceholder,
          },
        },
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

        if (hasChangedFilters || !isEqual(initialValues, values)) {
          isSaveAlertButtonDisabled = false
        }

        if (!values.email && !values.push) {
          isSaveAlertButtonDisabled = true
        }

        return (
          <Box>
            <Join separator={<Spacer mt={[4, 6]} />}>
              <Input
                title="Name"
                name="name"
                placeholder={namePlaceholder}
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
                  <Pills items={pills} onDeletePress={removePill} />
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

export const SavedSearchAlertEditFormFragmentContainer = createFragmentContainer(
  SavedSearchAlertEditForm,
  {
    savedSearch: graphql`
      fragment SavedSearchAlertEditForm_savedSearch on SearchCriteria {
        internalID
        acquireable
        additionalGeneIDs
        artistIDs
        atAuction
        attributionClass
        colors
        dimensionRange
        sizes
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
        width
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
  query SavedSearchAlertEditFormQuery($id: ID!, $artistId: String!) {
    me {
      savedSearch(id: $id) {
        ...SavedSearchAlertEditForm_savedSearch
      }
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
    ) {
      ...SavedSearchAlertEditForm_artworksConnection
    }
  }
`

export const SavedSearchAlertEditFormQueryRenderer: React.FC<SavedSearchAlertEditFormQueryRendererProps> = ({
  editAlertEntity,
  onDeleteClick,
  onCompleted,
}) => {
  return (
    <SystemQueryRenderer<SavedSearchAlertEditFormQuery>
      query={SAVED_SEARCH_ALERT_EDIT_FORM_QUERY}
      variables={{ id: editAlertEntity.id, artistId: editAlertEntity.artistId }}
      placeholder={<SavedSearchAlertEditFormPlaceholder />}
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.artist && props.artworksConnection && props.me) {
          return (
            <SavedSearchAlertEditFormFragmentContainer
              savedSearch={props.me?.savedSearch!}
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
