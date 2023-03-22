import { ContextModule } from "@artsy/cohesion"
import { ArtworkActionsWatchLotButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsWatchLotButton"
import { SaveUtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/SaveUtilButton"
import { useArtworkLists } from "Components/Artwork/useArtworkLists"
import { ProgressiveOnboardingSaveArtworkQueryRenderer } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { ArtworkActionsSaveButtonV2_artwork$data } from "__generated__/ArtworkActionsSaveButtonV2_artwork.graphql"

const logger = createLogger("ArtworkActionsSaveButtonV2")

interface ArtworkActionsSaveButtonV2Props {
  artwork: ArtworkActionsSaveButtonV2_artwork$data
}

export const ArtworkActionsSaveButtonV2: FC<ArtworkActionsSaveButtonV2Props> = ({
  artwork,
}) => {
  const { isAuction, isClosed } = artwork.sale ?? {}
  const isOpenSale = isAuction && !isClosed
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
      isInAuction: !!isOpenSale,
    },
  })

  const handleSave = async () => {
    try {
      await saveArtworkToLists()
    } catch (error) {
      logger.error(error)
    }
  }

  if (isOpenSale) {
    return (
      <ArtworkActionsWatchLotButtonFragmentContainer
        artwork={artwork}
        onClick={handleSave}
      />
    )
  }

  return (
    <ProgressiveOnboardingSaveArtworkQueryRenderer>
      <SaveUtilButton isSaved={isSaved} onClick={handleSave} />
    </ProgressiveOnboardingSaveArtworkQueryRenderer>
  )
}

export const ArtworkActionsSaveButtonV2FragmentContainer = createFragmentContainer(
  ArtworkActionsSaveButtonV2,
  {
    artwork: graphql`
      fragment ArtworkActionsSaveButtonV2_artwork on Artwork {
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
        sale {
          isAuction
          isClosed
        }
        ...ArtworkActionsWatchLotButton_artwork
      }
    `,
  }
)
