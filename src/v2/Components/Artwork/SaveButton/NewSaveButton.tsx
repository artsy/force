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

  return (
    <Clickable
      data-test="newSaveButton"
      position="absolute"
      right={0.5}
      zIndex={2}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isSaved || isHovered ? (
        <HeartFillIcon fill="blue100" width={20} height={20} />
      ) : (
        <HeartIcon fill="black100" width={20} height={20} />
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
