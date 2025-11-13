import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { isTouch } from "Utils/device"
import type { AuthContextModule } from "@artsy/cohesion"
import HeartFillIcon from "@artsy/icons/HeartFillIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import { Clickable, Flex, Text } from "@artsy/palette"
import type { SaveArtworkToListsButton_artwork$data } from "__generated__/SaveArtworkToListsButton_artwork.graphql"
import type { SaveButton_artwork$data } from "__generated__/SaveButton_artwork.graphql"
import type { SaveButtonQuery } from "__generated__/SaveButtonQuery.graphql"
import type * as React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useSaveArtwork } from "./useSaveArtwork"

export interface SaveButtonProps {
  artwork: SaveButton_artwork$data
  contextModule: AuthContextModule
}

interface SaveButtonBaseProps {
  isSaved: boolean
  artwork:
    | SaveArtworkToListsButton_artwork$data
    | SaveButton_artwork$data
    | { collectorSignals: null } // when used as a placeholder
  // `onClick` is optional when used as a placeholder
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  testID?: string
}

const BTN_HEIGHT = 18
const BTN_WIDTH = 18

export const SaveButtonBase: React.FC<
  React.PropsWithChildren<SaveButtonBaseProps>
> = ({ isSaved, onClick, artwork, testID = "saveButton" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const title = isSaved ? "Unsave" : "Save"
  const { lotWatcherCount, lotClosesAt } =
    artwork.collectorSignals?.auction || {}

  const shouldDisplayLotCount =
    !!lotWatcherCount && (!lotClosesAt || new Date(lotClosesAt) >= new Date())

  const handleMouseEnter = () => {
    if (!isTouch) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isTouch) {
      setIsHovered(false)
    }
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    onClick?.(event)
  }

  return (
    <Flex alignItems="center">
      {shouldDisplayLotCount && (
        <Text variant="sm-display" lineHeight="22px" color="mono100">
          {lotWatcherCount}
        </Text>
      )}

      <Clickable
        aria-label={isSaved ? "Unsave" : "Save"}
        data-test={testID}
        height={BTN_HEIGHT}
        width={BTN_WIDTH}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {isSaved || isHovered ? (
          <HeartFillIcon
            title={title}
            fill="blue100"
            width={BTN_WIDTH}
            height={BTN_HEIGHT}
          />
        ) : (
          <HeartStrokeIcon
            title={title}
            fill="mono100"
            width={BTN_WIDTH}
            height={BTN_HEIGHT}
          />
        )}
      </Clickable>
    </Flex>
  )
}

export const SaveButton: React.FC<React.PropsWithChildren<SaveButtonProps>> = ({
  artwork,
  contextModule,
}) => {
  const tracking = useTracking()
  const isSaved = !!artwork.isSaved

  const { handleSave } = useSaveArtwork({
    isSaved,
    artwork: {
      internalID: artwork.internalID,
      slug: artwork.slug,
      collectorSignals: {
        auction: {
          lotWatcherCount:
            artwork.collectorSignals?.auction?.lotWatcherCount ?? 0,
        },
      },
      id: artwork.id,
    },
    contextModule,
    onSave: ({ action, artwork }) => {
      tracking.trackEvent({
        action,
        // @ts-expect-error TODO: Cohesion schema
        entity_slug: artwork.slug,
        entity_id: artwork.internalID,
      })
    },
  })

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    handleSave()
  }

  return (
    <SaveButtonBase artwork={artwork} isSaved={isSaved} onClick={handleClick} />
  )
}

export const SaveButtonFragmentContainer = createFragmentContainer(SaveButton, {
  artwork: graphql`
    fragment SaveButton_artwork on Artwork {
      id
      internalID
      slug
      isSaved
      title
      collectorSignals {
        auction {
          lotWatcherCount
          lotClosesAt
        }
      }
    }
  `,
})

interface SaveButtonQueryRendererProps
  extends Omit<SaveButtonProps, "artwork"> {
  id: string
}

export const SaveButtonQueryRenderer: React.FC<
  React.PropsWithChildren<SaveButtonQueryRendererProps>
> = ({ id, contextModule }) => {
  const placeholderArtwork = {
    collectorSignals: null,
  }

  return (
    <SystemQueryRenderer<SaveButtonQuery>
      lazyLoad
      query={graphql`
        query SaveButtonQuery($id: String!) {
          artwork(id: $id) {
            ...SaveButton_artwork
          }
        }
      `}
      placeholder={
        <SaveButtonBase
          isSaved={false}
          artwork={placeholderArtwork}
          testID="saveButtonPlaceholder"
        />
      }
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.artwork) {
          return (
            <SaveButtonBase
              isSaved={false}
              artwork={placeholderArtwork}
              testID="saveButtonPlaceholder"
            />
          )
        }
        return (
          <SaveButtonFragmentContainer
            artwork={props.artwork}
            contextModule={contextModule}
          />
        )
      }}
    />
  )
}
