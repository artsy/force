import React from "react"
import { Flex, Text, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { CreateArtworkAlertSection_artwork$data } from "__generated__/CreateArtworkAlertSection_artwork.graphql"
import {
  SavedSearchEntity,
  SavedSearchEntityCriteria,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { compact } from "lodash"
import { getAllowedSearchCriteria } from "Components/SavedSearchAlert/Utils/savedSearchCriteria"
import { OwnerType } from "@artsy/cohesion"
import { SavedSearchCreateAlertButton } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButton"
import { ContextModule, Intent } from "@artsy/cohesion"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"

interface CreateArtworkAlertSectionProps {
  artwork: CreateArtworkAlertSection_artwork$data
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
  const defaultArtistsCriteria: SavedSearchEntityCriteria[] = artists.map(
    artist => ({
      value: artist.internalID,
      displayValue: artist.name ?? "",
    })
  )
  const entity: SavedSearchEntity = {
    placeholder,
    defaultCriteria: {
      artistIDs: defaultArtistsCriteria,
    },
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

  return (
    <>
      <Separator
        // FIXME: Remove
        mt={2}
      />
      <Flex
        flexDirection="row"
        py={1}
        alignItems="center"
        justifyContent="space-between"
        // FIXME: Remove
        my={2}
      >
        <Text variant="xs" mr={2}>
          Be notified when a similar work is available
        </Text>
        <SavedSearchCreateAlertButton
          entity={entity}
          criteria={allowedCriteria}
          aggregations={aggregations}
          authModalOptions={{
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
            copy: "Sign up to create your alert",
          }}
        />
      </Flex>
    </>
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
