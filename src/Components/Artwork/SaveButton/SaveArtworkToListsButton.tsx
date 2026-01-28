import type { AuthContextModule } from "@artsy/cohesion"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { ResultAction } from "Components/Artwork/SaveButton/useSaveArtworkToLists"
import { useArtworkLists } from "Components/Artwork/useArtworkLists"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import createLogger from "Utils/logger"
import type { SaveArtworkToListsButtonQuery } from "__generated__/SaveArtworkToListsButtonQuery.graphql"
import type { SaveArtworkToListsButton_artwork$data } from "__generated__/SaveArtworkToListsButton_artwork.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

const logger = createLogger("SaveArtworkToListsButton")

interface SaveArtworkToListsButtonProps {
  artwork: SaveArtworkToListsButton_artwork$data
  contextModule: AuthContextModule
}

const SaveArtworkToListsButton: FC<
  React.PropsWithChildren<SaveArtworkToListsButtonProps>
> = ({ artwork, contextModule }) => {
  const tracking = useTracking()

  const { saveArtworkToLists } = useArtworkLists({
    contextModule,
    artwork: {
      internalID: artwork.internalID,
      id: artwork.id,
      slug: artwork.slug,
      title: artwork.title ?? "",
      year: artwork.date,
      artistNames: artwork.artistNames,
      imageURL: artwork.preview?.url ?? null,
      image: artwork.image,
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
      const action = await saveArtworkToLists()

      if (
        action === ResultAction.SavedToDefaultList ||
        action === ResultAction.RemovedFromDefaultList
      ) {
        const label = labelByResultAction[action]

        tracking.trackEvent({
          action: label,
          entity_slug: artwork.slug,
          entity_id: artwork.internalID,
        })
      }
    } catch (error) {
      logger.error(error)
    }
  }

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    handleSave()
  }

  return (
    <SaveButtonBase
      isSaved={artwork.isSavedToAnyList}
      onClick={handleClick}
      artwork={artwork}
    />
  )
}

export const SaveArtworkToListsButtonFragmentContainer =
  createFragmentContainer(SaveArtworkToListsButton, {
    artwork: graphql`
      fragment SaveArtworkToListsButton_artwork on Artwork {
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
          url(version: "main")
          aspectRatio
          blurhash
        }
        isInAuction
        isSavedToAnyList
        collectorSignals {
          auction {
            lotWatcherCount
            lotClosesAt
            liveBiddingStarted
          }
        }
      }
    `,
  })

const labelByResultAction = {
  [ResultAction.SavedToDefaultList]: "Saved Artwork",
  [ResultAction.RemovedFromDefaultList]: "Removed Artwork",
}

interface SaveArtworkToListsButtonQueryRendererProps
  extends Omit<SaveArtworkToListsButtonProps, "artwork"> {
  id: string
}

export const SaveArtworkToListsButtonQueryRenderer: FC<
  React.PropsWithChildren<SaveArtworkToListsButtonQueryRendererProps>
> = ({ id, contextModule }) => {
  return (
    <SystemQueryRenderer<SaveArtworkToListsButtonQuery>
      lazyLoad
      query={graphql`
        query SaveArtworkToListsButtonQuery($id: String!) {
          artwork(id: $id) {
            ...SaveArtworkToListsButton_artwork
          }
        }
      `}
      placeholder={
        <SaveButtonBase
          isSaved={false}
          artwork={{} as SaveArtworkToListsButton_artwork$data}
          testID="saveButtonPlaceholder"
        />
      }
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.artwork) {
          return (
            <SaveButtonBase
              isSaved={false}
              artwork={{} as SaveArtworkToListsButton_artwork$data}
              testID="saveButtonPlaceholder"
            />
          )
        }

        return (
          <SaveArtworkToListsButtonFragmentContainer
            artwork={props.artwork}
            contextModule={contextModule}
          />
        )
      }}
    />
  )
}
