import { ContextModule } from "@artsy/cohesion"
import { ArtworkActionsWatchLotButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsWatchLotButton"
import { SaveUtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/SaveUtilButton"
import { useArtworkLists } from "Components/Artwork/useArtworkLists"
import { ProgressiveOnboardingSaveArtwork } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import createLogger from "Utils/logger"
import { ArtworkActionsSaveButtonV2_artwork$data } from "__generated__/ArtworkActionsSaveButtonV2_artwork.graphql"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"

const logger = createLogger("ArtworkActionsSaveButtonV2")

interface ArtworkActionsSaveButtonV2Props {
  artwork: ArtworkActionsSaveButtonV2_artwork$data
}

export const ArtworkActionsSaveButtonV2: FC<ArtworkActionsSaveButtonV2Props> = ({
  artwork,
}) => {
  const { isAuction, isClosed } = artwork.sale ?? {}
  const isOpenOrUpcomingSale = isAuction && !isClosed

  const { isSaved, saveArtworkToLists } = useArtworkLists({
    contextModule: ContextModule.artworkImage,
    artwork: {
      internalID: artwork.internalID,
      id: artwork.id,
      slug: artwork.slug,
      title: artwork.title!,
      year: artwork.date,
      artistNames: artwork.artistNames,
      imageURL: artwork.preview?.url ?? null,
      isSavedToDefaultList: !!artwork.isSaved,
      isSavedToCustomLists: artwork.isSavedToList,
    },
  })

  const { handleSave: saveToDefaultCollection } = useSaveArtwork({
    isSaved: !!artwork.isSaved,
    artwork,
    contextModule: ContextModule.artworkImage,
  })

  const handleSave = async () => {
    try {
      await saveArtworkToLists()
    } catch (error) {
      logger.error(error)
    }
  }

  const handleSaveArtworkInAuction = async () => {
    try {
      await saveToDefaultCollection()
    } catch (error) {
      logger.error(error)
    }
  }

  if (isOpenOrUpcomingSale) {
    return (
      <ArtworkActionsWatchLotButtonFragmentContainer
        isSaved={!!artwork.isSaved}
        artwork={artwork}
        onClick={handleSaveArtworkInAuction}
        canShowRegistrationPopover={!artwork.isSavedToList}
      />
    )
  }

  return (
    <ProgressiveOnboardingSaveArtwork>
      <SaveUtilButton isSaved={isSaved} onClick={handleSave} />
    </ProgressiveOnboardingSaveArtwork>
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
        artistNames
        preview: image {
          url(version: "square")
        }
        isSavedToList
        sale {
          isAuction
          isClosed
        }
        ...ArtworkActionsWatchLotButton_artwork
      }
    `,
  }
)
