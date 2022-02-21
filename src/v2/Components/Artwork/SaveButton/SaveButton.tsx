import { AuthContextModule } from "@artsy/cohesion"
import { SaveButton_artwork$data } from "v2/__generated__/SaveButton_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { CloseIcon, Flex, HeartIcon, Clickable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useState } from "react"
import { useSaveArtwork } from "./useSaveArtwork"
import { useTracking } from "v2/System"

export interface SaveTrackingProps {
  context_page?: string
}

export interface SaveButtonProps {
  artwork: SaveButton_artwork$data
  contextModule: AuthContextModule
}

export const SaveButton: React.FC<SaveButtonProps> = ({
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
      data-test="saveButton"
      position="absolute"
      right={10}
      bottom={10}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Inner isSaved={isSaved}>
        {isSaved && isHovered ? (
          <CloseIcon fill="white100" width={24} height={24} />
        ) : (
          <HeartIcon fill="white100" width={24} height={24} />
        )}
      </Inner>
    </Clickable>
  )
}

const Inner = styled(Flex)<{ isSaved: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  ${({ isSaved }) => {
    return isSaved
      ? css`
          background-color: ${themeGet("colors.brand")};
          &:hover {
            background-color: ${themeGet("colors.red100")};
          }
        `
      : css`
          background-color: rgba(0, 0, 0, 0.4);
          &:hover {
            background-color: ${themeGet("colors.black100")};
          }
        `
  }}
`

export const SaveButtonFragmentContainer = createFragmentContainer(SaveButton, {
  artwork: graphql`
    fragment SaveButton_artwork on Artwork {
      id
      internalID
      slug
      is_saved: isSaved
      title
    }
  `,
})
