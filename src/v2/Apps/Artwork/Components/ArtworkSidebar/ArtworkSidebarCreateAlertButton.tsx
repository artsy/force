import { ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import { Button } from "@artsy/palette"
import { compact } from "lodash"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Aggregations } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SavedSearchCreateAlertButtonContainer } from "v2/Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import {
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "v2/Components/SavedSearchAlert/types"
import { AuthModalOptions } from "v2/Utils/openAuthModal"
import { ArtworkSidebarCreateAlertButton_artwork } from "v2/__generated__/ArtworkSidebarCreateAlertButton_artwork.graphql"

interface ArtworkSidebarCreateAlertButtonProps {
  artwork: ArtworkSidebarCreateAlertButton_artwork
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
    <SavedSearchCreateAlertButtonContainer
      entity={entity}
      criteria={criteria}
      aggregations={aggregations}
      getAuthModalOptions={getAuthModalOptions}
      renderButton={({ onClick }) => (
        <Button width="100%" size="medium" onClick={onClick}>
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
