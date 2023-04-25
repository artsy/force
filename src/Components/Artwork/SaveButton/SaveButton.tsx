import { AuthContextModule } from "@artsy/cohesion"
import { SaveButton_artwork$data } from "__generated__/SaveButton_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Clickable } from "@artsy/palette"
import { useSaveArtwork } from "./useSaveArtwork"
import { useTracking } from "react-tracking"
import { useState } from "react"
import { isTouch } from "Utils/device"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import HeartFillIcon from "@artsy/icons/HeartFillIcon"

export interface SaveButtonProps {
  artwork: SaveButton_artwork$data
  contextModule: AuthContextModule
}

interface SaveButtonBaseProps {
  isSaved: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const BTN_HEIGHT = 20
const BTN_WIDTH = 20

export const SaveButtonBase: React.FC<SaveButtonBaseProps> = ({
  isSaved,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const title = isSaved ? "Unsave" : "Save"

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
    artwork,
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

  return <SaveButtonBase isSaved={isSaved} onClick={handleClick} />
}

export const SaveButtonFragmentContainer = createFragmentContainer(SaveButton, {
  artwork: graphql`
    fragment SaveButton_artwork on Artwork {
      id
      internalID
      slug
      isSaved
      title
    }
  `,
})
