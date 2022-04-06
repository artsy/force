import { ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import { Button } from "@artsy/palette"
import { compact } from "lodash"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SavedSearchCreateAlertBase } from "v2/Components/SavedSearchAlert/Components/SavedSearchCreateAlertBase"
import {
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "v2/Components/SavedSearchAlert/types"
import { getAttributionClassValueByLabel } from "v2/Components/SavedSearchAlert/Utils/getAttributionClassValueByLabel"
import { AuthModalOptions } from "v2/Utils/openAuthModal"
import { ArtworkSidebarCreateAlertButton_artwork } from "v2/__generated__/ArtworkSidebarCreateAlertButton_artwork.graphql"

interface ArtworkSidebarCreateAlertButtonProps {
  artwork: ArtworkSidebarCreateAlertButton_artwork
}

const ArtworkSidebarCreateAlertButton: FC<ArtworkSidebarCreateAlertButtonProps> = ({
  artwork,
}) => {
  const attributionClass = getAttributionClassValueByLabel(
    artwork.attributionClass?.name ?? ""
  )
  const artists = compact(artwork.artists)
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
  const criteria: SearchCriteriaAttributes = {
    artistIDs,
    attributionClass,
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
    <SavedSearchCreateAlertBase
      entity={entity}
      criteria={criteria}
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
          name
        }
      }
    `,
  }
)
