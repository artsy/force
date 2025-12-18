import { ContextModule } from "@artsy/cohesion"
import { ArtworkActionsWatchLotButtonFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser/ArtworkActionsWatchLotButton"
import { SaveUtilButton } from "Apps/Artwork/Components/ArtworkImageBrowser/SaveUtilButton"
import { useArtworkLists } from "Components/Artwork/useArtworkLists"
import { ProgressiveOnboardingSaveArtwork } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import createLogger from "Utils/logger"
import type { ArtworkActionsSaveButton_artwork$data } from "__generated__/ArtworkActionsSaveButton_artwork.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

const logger = createLogger("ArtworkActionsSaveButton")

interface ArtworkActionsSaveButtonProps {
  artwork: ArtworkActionsSaveButton_artwork$data
}

export const ArtworkActionsSaveButton: FC<
  React.PropsWithChildren<ArtworkActionsSaveButtonProps>
> = ({ artwork }) => {
  const { isAuction, isClosed } = artwork.sale ?? {}
  const isOpenOrUpcomingSale = isAuction && !isClosed

  const { saveArtworkToLists } = useArtworkLists({
    contextModule: ContextModule.artworkImage,
    artwork: {
      internalID: artwork.internalID,
      id: artwork.id,
      slug: artwork.slug,
      title: artwork.title ?? "",
      year: artwork.date,
      artistNames: artwork.artistNames,
      imageURL: artwork.preview?.url ?? null,
      imageURLLarge: artwork.image?.url,
      isInAuction: !!artwork.isInAuction,
      isSavedToAnyList: artwork.isSavedToAnyList,
      collectorSignals: {
        auction: {
          lotWatcherCount:
            artwork.collectorSignals?.auction?.lotWatcherCount ?? 0,
        },
      },
    },
  })

  const handleSave = async () => {
    try {
      await saveArtworkToLists()
    } catch (error) {
      logger.error(error)
    }
  }

  if (isOpenOrUpcomingSale) {
    return (
      <ArtworkActionsWatchLotButtonFragmentContainer
        isSaved={artwork.isSavedToAnyList}
        artwork={artwork}
        onClick={handleSave}
        canShowRegistrationPopover
      />
    )
  }

  return (
    <ProgressiveOnboardingSaveArtwork>
      <SaveUtilButton isSaved={artwork.isSavedToAnyList} onClick={handleSave} />
    </ProgressiveOnboardingSaveArtwork>
  )
}

export const ArtworkActionsSaveButtonFragmentContainer =
  createFragmentContainer(ArtworkActionsSaveButton, {
    artwork: graphql`
      fragment ArtworkActionsSaveButton_artwork on Artwork {
        id
        internalID
        slug
        title
        date
        artistNames
        preview: image {
          url(version: "square")
        }
        image {
          url(version: "large")
        }
        isInAuction
        isSavedToAnyList
        sale {
          isAuction
          isClosed
        }
        collectorSignals {
          auction {
            lotWatcherCount
          }
        }
        ...ArtworkActionsWatchLotButton_artwork
      }
    `,
  })
