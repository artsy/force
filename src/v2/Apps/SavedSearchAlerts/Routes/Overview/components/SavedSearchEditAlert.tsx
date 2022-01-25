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
import { Formik, Form } from "formik"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ArtworkFilters,
  Aggregations,
  initialArtworkFilterState,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { Pills } from "v2/Components/ArtworkFilter/SavedSearch/Components/Pills"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import { getSearchCriteriaFromFilters } from "v2/Components/ArtworkFilter/SavedSearch/Utils"
import { FilterPill } from "v2/Components/ArtworkFilter/SavedSearch/Utils/FilterPillsContext"
import { SavedSearchAleftFormValues } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"
import { extractPills } from "v2/Components/SavedSearchAlert/Utils/extractPills"
import { getNamePlaceholder } from "v2/Components/SavedSearchAlert/Utils/getNamePlaceholder"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import createLogger from "v2/Utils/logger"
import { SavedSearchEditAlertQuery } from "v2/__generated__/SavedSearchEditAlertQuery.graphql"
import { SavedSearchEditAlert_savedSearch } from "v2/__generated__/SavedSearchEditAlert_savedSearch.graphql"
import { SavedSearchEditAlert_artist } from "v2/__generated__/SavedSearchEditAlert_artist.graphql"
import { SavedSearchEditAlert_artworksConnection } from "v2/__generated__/SavedSearchEditAlert_artworksConnection.graphql"
import { useEditSavedSearchAlert } from "../useEditSavedSearchAlert"

const logger = createLogger(
  "v2/Apps/SavedSearchAlerts/Routes/Overview/components/SavedSearchEditAlert"
)

interface SavedSearchAlertEditQueryRendererProps {
  id: string
  artistId: string
  onCompleted: () => void
}

interface SavedSearchEditAlertProps {
  savedSearch: SavedSearchEditAlert_savedSearch
  artist: SavedSearchEditAlert_artist
  artworksConnection: SavedSearchEditAlert_artworksConnection
  onCompleted: () => void
}

const SavedSearchEditAlert: React.FC<SavedSearchEditAlertProps> = ({
  savedSearch,
  artist,
  artworksConnection,
  onCompleted,
}) => {
  const { userAlertSettings, internalID, ...other } = savedSearch
  const [filters, setFilters] = useState((other as unknown) as ArtworkFilters)
  const { submitMutation: submitEditAlert } = useEditSavedSearchAlert()

  const initialValues: SavedSearchAleftFormValues = {
    name: userAlertSettings.name ?? "",
    push: userAlertSettings.push,
    email: userAlertSettings.email,
  }
  const attributes: SavedSearchAttributes = {
    type: "artist",
    id: artist.internalID,
    name: artist.name ?? "",
    slug: artist.slug ?? "",
  }
  const pills = extractPills(
    filters,
    artworksConnection.aggregations as Aggregations,
    attributes
  )
  const namePlaceholder = getNamePlaceholder(attributes.name, pills)

  const handleSubmit = async (values: SavedSearchAleftFormValues) => {
    try {
      const criteria = getSearchCriteriaFromFilters(attributes.id, filters)
      await submitEditAlert({
        input: {
          searchCriteriaID: savedSearch.internalID,
          attributes: criteria,
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

  const handleRemovePillPress = (pill: FilterPill) => {
    if (pill.isDefault) {
      return
    }

    let filterValue = filters[pill.filterName]

    if (Array.isArray(filterValue)) {
      filterValue = filterValue.filter(value => value !== pill.name)
    } else {
      filterValue = initialArtworkFilterState[pill.filterName]
    }

    setFilters({
      ...filters,
      [pill.filterName]: filterValue,
    })
  }

  return (
    <Formik<SavedSearchAleftFormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        isSubmitting,
        submitCount,
        setFieldValue,
        handleChange,
        handleBlur,
      }) => {
        const isSaveAlertButtonDisabled = !values.email && !values.push

        return (
          <Form>
            <Join separator={<Spacer mt={4} />}>
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
                  <Pills items={pills} onDeletePress={handleRemovePillPress} />
                </Flex>
              </Box>

              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Text>Email Alerts</Text>
                  <Checkbox
                    onSelect={selected => setFieldValue("email", selected)}
                    selected={values.email}
                  />
                </Box>
                <Spacer mt={4} />
                <Box display="flex" justifyContent="space-between">
                  <Text>Mobile Alerts</Text>
                  <Checkbox
                    onSelect={selected => setFieldValue("push", selected)}
                    selected={values.push}
                  />
                </Box>
              </Box>
              <Button
                type="submit"
                disabled={isSaveAlertButtonDisabled}
                loading={isSubmitting}
                width="100%"
              >
                Save Alert ({submitCount})
              </Button>
            </Join>
          </Form>
        )
      }}
    </Formik>
  )
}

const SavedSearchEditAlertFragmentContainer = createFragmentContainer(
  SavedSearchEditAlert,
  {
    savedSearch: graphql`
      fragment SavedSearchEditAlert_savedSearch on SearchCriteria {
        internalID
        acquireable
        additionalGeneIDs
        artistID
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
      fragment SavedSearchEditAlert_artist on Artist {
        internalID
        name
        slug
      }
    `,
    artworksConnection: graphql`
      fragment SavedSearchEditAlert_artworksConnection on FilterArtworksConnection {
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

const SavedSearchAlertEditPlaceholder = () => {
  return (
    <Box>
      <Text>SavedSearchAlertEditPlaceholder</Text>
    </Box>
  )
}

const SAVED_SEARCH_EDIT_ALERT_QUERY = graphql`
  query SavedSearchEditAlertQuery($id: ID!, $artistId: String!) {
    me {
      savedSearch(id: $id) {
        ...SavedSearchEditAlert_savedSearch
      }
    }
    artist(id: $artistId) {
      ...SavedSearchEditAlert_artist
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
      ...SavedSearchEditAlert_artworksConnection
    }
  }
`

export const SavedSearchAlertEditQueryRenderer: React.FC<SavedSearchAlertEditQueryRendererProps> = ({
  id,
  artistId,
  onCompleted,
}) => {
  return (
    <SystemQueryRenderer<SavedSearchEditAlertQuery>
      query={SAVED_SEARCH_EDIT_ALERT_QUERY}
      variables={{ id, artistId }}
      placeholder={<SavedSearchAlertEditPlaceholder />}
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return <SavedSearchAlertEditPlaceholder />
        }

        return (
          <SavedSearchEditAlertFragmentContainer
            savedSearch={props.me?.savedSearch!}
            artist={props.artist!}
            artworksConnection={props.artworksConnection!}
            onCompleted={onCompleted}
          />
        )
      }}
    />
  )
}
