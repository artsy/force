import { AuthContextModule } from "@artsy/cohesion"
import { SaveButton_artwork$data } from "__generated__/SaveButton_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Clickable, Flex, Text } from "@artsy/palette"
import { useSaveArtwork } from "./useSaveArtwork"
import { useTracking } from "react-tracking"
import { useState } from "react"
import { isTouch } from "Utils/device"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import HeartFillIcon from "@artsy/icons/HeartFillIcon"
import { SaveArtworkToListsButton_artwork$data } from "__generated__/SaveArtworkToListsButton_artwork.graphql"

export interface SaveButtonProps {
  artwork: SaveButton_artwork$data
  contextModule: AuthContextModule
}

interface SaveButtonBaseProps {
  isSaved: boolean
  artwork: SaveArtworkToListsButton_artwork$data | SaveButton_artwork$data
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const BTN_HEIGHT = 18
const BTN_WIDTH = 18

export const SaveButtonBase: React.FC<SaveButtonBaseProps> = ({
  isSaved,
  onClick,
  artwork,
}) => {
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

  return (
    <Flex alignItems="center">
      {shouldDisplayLotCount && (
        <Text variant="sm-display" lineHeight="22px" color="black100">
          {lotWatcherCount}
        </Text>
      )}

      <Clickable
        aria-label={isSaved ? "Unsave" : "Save"}
        data-test="saveButton"
        height={BTN_HEIGHT}
        width={BTN_WIDTH}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
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
            fill="black100"
            width={BTN_WIDTH}
            height={BTN_HEIGHT}
          />
        )}
      </Clickable>
    </Flex>
  )
}

export const SaveButton: React.FC<SaveButtonProps> = ({
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
        // @ts-ignore TODO: Cohesion schema
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
