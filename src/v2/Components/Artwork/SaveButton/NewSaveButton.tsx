import { AuthContextModule } from "@artsy/cohesion"
import { NewSaveButton_artwork } from "v2/__generated__/NewSaveButton_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { HeartIcon, Clickable, HeartFillIcon } from "@artsy/palette"
import { useSaveArtwork } from "./useSaveArtwork"
import { useTracking } from "v2/System"
import { useState } from "react"

export interface SaveTrackingProps {
  context_page?: string
}

export interface SaveButtonProps {
  artwork: NewSaveButton_artwork
  contextModule: AuthContextModule
}

const BTN_HEIGHT = 20
const BTN_WIDTH = 20

export const NewSaveButton: React.FC<SaveButtonProps> = ({
  artwork,
  contextModule,
}) => {
  const tracking = useTracking()
  const [isHovered, setIsHovered] = useState(false)

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

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const title = isSaved ? "Unsave" : "Save"

  return (
    <Clickable
      data-test="saveButton"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      height={BTN_HEIGHT}
      width={BTN_WIDTH}
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
