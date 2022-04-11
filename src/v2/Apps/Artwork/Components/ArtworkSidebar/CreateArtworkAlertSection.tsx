import React from "react"
import { Separator, Spacer, Flex, Text, Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { CreateArtworkAlertSection_artwork } from "v2/__generated__/CreateArtworkAlertSection_artwork.graphql"
import {
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "v2/Components/SavedSearchAlert/types"
import { compact } from "lodash"
import { getAllowedSearchCriteria } from "v2/Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { OwnerType } from "@artsy/cohesion"
import { SavedSearchCreateAlertButton } from "v2/Components/SavedSearchAlert/Components/SavedSearchCreateAlertButton"
import { ContextModule, Intent } from "@artsy/cohesion"
import { AuthModalOptions } from "v2/Utils/openAuthModal"
import { Aggregations } from "v2/Components/ArtworkFilter/ArtworkFilterContext"

interface CreateArtworkAlertSectionProps {
  artwork: CreateArtworkAlertSection_artwork
}

export const CreateArtworkAlertSection: React.FC<CreateArtworkAlertSectionProps> = ({
  artwork,
}) => {
  let aggregations: Aggregations = []
  let additionalGeneIDs: string[] = []
  const artists = compact(artwork.artists)
  const attributionClass = compact([artwork.attributionClass?.internalID])
  const artistIDs = artists.map(artist => artist.internalID)
  const placeholder = `Artworks like: ${artwork.title!}`
  const entity: SavedSearchEntity = {
    placeholder,
    artists: artists.map(artist => ({
      id: artist.internalID,
      name: artist.name ?? "",
      slug: artist.slug,
    })),
    owner: {
      type: OwnerType.artwork,
      slug: artwork.slug,
      id: artwork.internalID,
      name: artwork.title!,
    },
  }

  if (
    artwork.mediumType?.filterGene?.name &&
    artwork.mediumType?.filterGene.slug
  ) {
    additionalGeneIDs = [artwork.mediumType.filterGene.slug]
    aggregations = [
      {
        slice: "MEDIUM",
        counts: [
          {
            name: artwork.mediumType.filterGene.name,
            value: artwork.mediumType.filterGene.slug,
            count: 0,
          },
        ],
      },
    ]
  }

  const criteria: SearchCriteriaAttributes = {
    artistIDs,
    attributionClass,
    additionalGeneIDs,
  }
  const allowedCriteria = getAllowedSearchCriteria(criteria)

  const getAuthModalOptions = (): AuthModalOptions => {
    return {
      entity: {
        name: artwork.title!,
        slug: artwork.slug,
      },
      afterSignUpAction: {
        action: "createAlert",
        kind: "artworks",
        objectId: artwork.internalID,
      },
      contextModule: ContextModule.artworkSidebar,
      intent: Intent.createAlert,
      redirectTo: location.href,
      copy: "Sign up to create your alert",
    }
  }

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
        <SavedSearchCreateAlertButton
          entity={entity}
          criteria={allowedCriteria}
          aggregations={aggregations}
          getAuthModalOptions={getAuthModalOptions}
        />
      </Flex>
    </Box>
  )
}

export const CreateArtworkAlertSectionFragmentContainer = createFragmentContainer(
  CreateArtworkAlertSection,
  {
    artwork: graphql`
      fragment CreateArtworkAlertSection_artwork on Artwork {
        internalID
        title
        slug
        artists {
          internalID
          name
          slug
        }
        attributionClass {
          internalID
        }
        mediumType {
          filterGene {
            slug
            name
          }
        }
      }
    `,
  }
)
