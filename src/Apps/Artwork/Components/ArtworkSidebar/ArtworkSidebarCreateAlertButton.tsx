import { ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import { Button } from "@artsy/palette"
import { compact } from "lodash"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Aggregations } from "Components/ArtworkFilter/ArtworkFilterContext"
import { SavedSearchCreateAlertButtonContainer } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import {
  SavedSearchEntity,
  SavedSearchEntityCriteria,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { ArtworkSidebarCreateAlertButton_artwork$data } from "__generated__/ArtworkSidebarCreateAlertButton_artwork.graphql"

interface ArtworkSidebarCreateAlertButtonProps {
  artwork: ArtworkSidebarCreateAlertButton_artwork$data
}

const ArtworkSidebarCreateAlertButton: FC<ArtworkSidebarCreateAlertButtonProps> = ({
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

  return (
    <SavedSearchCreateAlertButtonContainer
      entity={entity}
      criteria={criteria}
      aggregations={aggregations}
      authDialogOptions={{
        options: {
          title: "Sign up to create your alert",
          afterAuthAction: {
            action: "createAlert",
            kind: "artworks",
            objectId: artwork.internalID,
          },
        },
        analytics: {
          contextModule: ContextModule.artworkSidebar,
          intent: Intent.createAlert,
        },
      }}
      renderButton={({ onClick }) => (
        <Button width="100%" size="large" onClick={onClick}>
          Create Alert
        </Button>
      )}
    />
  )
}

export const ArtworkSidebarCreateAlertButtonFragmentContainer = createFragmentContainer(
  ArtworkSidebarCreateAlertButton,
  {
    artwork: graphql`
      fragment ArtworkSidebarCreateAlertButton_artwork on Artwork {
        slug
        internalID
        title
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
