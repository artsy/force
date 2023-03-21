import { ContextModule } from "@artsy/cohesion"
import { SaveUtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/SaveUtilButton"
import { useSaveArtworkToLists } from "Components/Artwork/SaveButton/useSaveArtworkToLists"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsSaveToListsButton_artwork$data } from "__generated__/ArtworkActionsSaveToListsButton_artwork.graphql"

interface ArtworkActionsSaveToListsButtonProps {
  artwork: ArtworkActionsSaveToListsButton_artwork$data
}

export const ArtworkActionsSaveToListsButton: FC<ArtworkActionsSaveToListsButtonProps> = ({
  artwork,
}) => {
  const { isSaved, onSave } = useSaveArtworkToLists({
    artwork,
    contextModule: ContextModule.artworkImage,
    customListsCount: artwork.customCollections?.totalCount ?? 0,
    isSaved: !!artwork.isSaved,
  })

  return <SaveUtilButton isSaved={isSaved} onClick={onSave} />
}

export const ArtworkActionsSaveToListsButtonFragmentContainer = createFragmentContainer(
  ArtworkActionsSaveToListsButton,
  {
    artwork: graphql`
      fragment ArtworkActionsSaveToListsButton_artwork on Artwork {
        id
        internalID
        isSaved
        slug
        title
        date
        preview: image {
          url(version: "square")
        }
        customCollections: collectionsConnection(
          first: 0
          default: false
          saves: true
        ) {
          totalCount
        }
      }
    `,
  }
)
