import { AuthContextModule } from "@artsy/cohesion"
import { NewSaveButton_artwork$data } from "__generated__/NewSaveButton_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HeartIcon, Clickable, HeartFillIcon } from "@artsy/palette"
import { useSaveArtwork } from "./useSaveArtwork"
import { useTracking } from "react-tracking"
import { useState } from "react"
import { isTouch } from "Utils/device"

export interface SaveTrackingProps {
  context_page?: string
}

export interface SaveButtonProps {
  artwork: NewSaveButton_artwork$data
  contextModule: AuthContextModule
}

interface NewSaveButtonBaseProps {
  isSaved: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const BTN_HEIGHT = 20
const BTN_WIDTH = 20

export const NewSaveButtonBase: React.FC<NewSaveButtonBaseProps> = ({
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
        <HeartIcon
          title={title}
          fill="black100"
          width={BTN_WIDTH}
          height={BTN_HEIGHT}
        />
      )}
    </Clickable>
  )
}

export const NewSaveButton: React.FC<SaveButtonProps> = ({
  artwork,
  contextModule,
}) => {
  const tracking = useTracking()
  const isSaved = !!artwork.is_saved

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

  return <NewSaveButtonBase isSaved={isSaved} onClick={handleClick} />
}

export const NewSaveButtonFragmentContainer = createFragmentContainer(
  NewSaveButton,
  {
    artwork: graphql`
      fragment NewSaveButton_artwork on Artwork {
        id
        internalID
        slug
        is_saved: isSaved
        title
      }
    `,
  }
)
