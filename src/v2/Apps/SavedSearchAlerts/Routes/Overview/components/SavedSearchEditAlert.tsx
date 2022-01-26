import { Box, Checkbox, Flex, Input, Join, Spacer, Text } from "@artsy/palette"
import { Form, useFormikContext } from "formik"
import { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Aggregations } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { Pills } from "v2/Components/ArtworkFilter/SavedSearch/Components/Pills"
import {
  SavedSearchAttributes,
  SearchCriteriaAttributes,
} from "v2/Components/ArtworkFilter/SavedSearch/types"
import { SavedSearchAleftFormValues } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"
import { getNamePlaceholder } from "v2/Components/SavedSearchAlert/Utils/getNamePlaceholder"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { SavedSearchEditAlertQuery } from "v2/__generated__/SavedSearchEditAlertQuery.graphql"
import { SavedSearchEditAlert_savedSearch } from "v2/__generated__/SavedSearchEditAlert_savedSearch.graphql"
import { SavedSearchEditAlert_artist } from "v2/__generated__/SavedSearchEditAlert_artist.graphql"
import { SavedSearchEditAlert_artworksConnection } from "v2/__generated__/SavedSearchEditAlert_artworksConnection.graphql"
import { useSavedSearchAlertContext } from "../SavedSearchAlertContext"

interface SavedSearchAlertEditQueryRendererProps {
  id: string
  artistId: string
}

interface SavedSearchEditAlertProps {
  savedSearch: SavedSearchEditAlert_savedSearch
  artist: SavedSearchEditAlert_artist
  artworksConnection: SavedSearchEditAlert_artworksConnection
}

const SavedSearchEditAlert: React.FC<SavedSearchEditAlertProps> = ({
  savedSearch,
  artist,
  artworksConnection,
}) => {
  const { userAlertSettings, internalID, ...other } = savedSearch
  const { pills, attributes, init, removePill } = useSavedSearchAlertContext()
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<SavedSearchAleftFormValues>()

  useEffect(() => {
    const userSettings: SavedSearchAleftFormValues = {
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
    const aggregations = artworksConnection.aggregations as Aggregations
    const searchCriteriaAttributes = (other as unknown) as SearchCriteriaAttributes

    init({
      userSettings,
      aggregations,
      searchCriteriaAttributes,
      attributes,
    })
  }, [])

  const namePlaceholder = getNamePlaceholder(attributes?.name ?? "", pills)

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
            <Pills items={pills} onDeletePress={removePill} />
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
      </Join>
    </Form>
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
          />
        )
      }}
    />
  )
}
