import React, { useState } from "react"
import {
  Separator,
  Spacer,
  Flex,
  Button,
  BellIcon,
  Text,
  Box,
} from "@artsy/palette"
import {
  SavedSearchAlertContextProvider,
  useSavedSearchAlertContext,
} from "v2/Components/SavedSearchAlert/SavedSearchAlertContext"
import { createFragmentContainer, graphql } from "react-relay"
import { CreateArtworkAlertSection_artwork } from "v2/__generated__/CreateArtworkAlertSection_artwork.graphql"
import {
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "v2/Components/SavedSearchAlert/types"
import { compact } from "lodash"
import { checkboxValues } from "v2/Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { getAllowedSearchCriteria } from "v2/Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { SavedSearchAlertModal } from "v2/Components/SavedSearchAlert/SavedSearchAlertModal"
import { OwnerType } from "@artsy/cohesion"

interface CreateArtworkAlertSectionProps {
  artwork: CreateArtworkAlertSection_artwork
}

export const CreateArtworkAlertSection: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const { entity } = useSavedSearchAlertContext()

  const openModal = () => setVisible(true)
  const closeModal = () => setVisible(false)

  return (
    <Box my={2}>
      <Separator />
      <Spacer m={2} />
      <Flex
        flexDirection="row"
        py={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text variant="xs" mr={2}>
          Be notified when a similar piece is available
        </Text>
        <Button variant="secondaryOutline" size="small" onClick={openModal}>
          <BellIcon mr={0.5} fill="currentColor" />
          <Text variant="xs">Create Alert</Text>
        </Button>
      </Flex>

      {visible ? (
        <SavedSearchAlertModal
          initialValues={{ name: "", email: true, push: false }}
          entity={entity}
          onClose={closeModal}
          onComplete={closeModal}
        />
      ) : null}
    </Box>
  )
}

export const CreateArtworkAlertSectionContainer: React.FC<CreateArtworkAlertSectionProps> = ({
  artwork,
}) => {
  const artists = compact(artwork.artists)
  const artistIDs = artists.map(artist => artist.internalID)
  const placeholder = `Artworks like: ${artwork.title!}`
  const attributionClass = getAttributionClassIdByLabel(
    artwork.attributionClass?.name ?? ""
  )

  const entity: SavedSearchEntity = {
    placeholder,
    artists: artists.map(artist => ({
      id: artist.internalID,
      name: artist.name ?? "",
      slug: artist.slug,
    })),
    analytics: {
      ownerType: OwnerType.artwork,
    },
  }
  const criteria: SearchCriteriaAttributes = {
    artistIDs,
    attributionClass,
  }
  const allowedCriteria = getAllowedSearchCriteria(criteria)

  return (
    <SavedSearchAlertContextProvider criteria={allowedCriteria} entity={entity}>
      <CreateArtworkAlertSection />
    </SavedSearchAlertContextProvider>
  )
}

export const CreateArtworkAlertSectionFragmentContainer = createFragmentContainer(
  CreateArtworkAlertSectionContainer,
  {
    artwork: graphql`
      fragment CreateArtworkAlertSection_artwork on Artwork {
        title
        artists {
          internalID
          name
          slug
        }
        attributionClass {
          name
        }
      }
    `,
  }
)

export const getAttributionClassIdByLabel = (label: string) => {
  const option = checkboxValues.find(
    value => value.name.toLowerCase() === label.toLowerCase()
  )

  if (option?.value) {
    return [option.value]
  }

  return []
}
