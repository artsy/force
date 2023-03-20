import { ContextModule } from "@artsy/cohesion"
import { SaveUtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/SaveUtilButton"
import { useArtworkLists } from "Components/Artwork/useArtworkLists"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { ArtworkActionsSaveToListsButton_artwork$data } from "__generated__/ArtworkActionsSaveToListsButton_artwork.graphql"

const logger = createLogger("ArtworkActionsSaveToListsButton")

interface ArtworkActionsSaveToListsButtonProps {
  artwork: ArtworkActionsSaveToListsButton_artwork$data
}

export const ArtworkActionsSaveToListsButton: FC<ArtworkActionsSaveToListsButtonProps> = ({
  artwork,
}) => {
  const customListsCount = artwork.customCollections?.totalCount ?? 0
  const isSavedToCustomLists = customListsCount > 0

  const { isSaved, saveArtworkToLists } = useArtworkLists({
    contextModule: ContextModule.artworkImage,
    artwork: {
      internalID: artwork.internalID,
      id: artwork.id,
      slug: artwork.slug,
      title: `${artwork.title}, ${artwork.date}`,
      imageURL: artwork.preview?.url ?? null,
      isSavedToDefaultList: !!artwork.isSaved,
      isSavedToCustomLists: isSavedToCustomLists,
    },
  })

  const handleSave = async () => {
    try {
      await saveArtworkToLists()
    } catch (error) {
      logger.error(error)
    }
  }

  return <SaveUtilButton isSaved={isSaved} onClick={handleSave} />
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
