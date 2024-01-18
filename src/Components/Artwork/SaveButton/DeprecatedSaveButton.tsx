import { AuthContextModule } from "@artsy/cohesion"
import { DeprecatedSaveButton_artwork$data } from "__generated__/DeprecatedSaveButton_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { Flex, Clickable } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useState } from "react"
import { useSaveArtwork } from "./useSaveArtwork"
import { useTracking } from "react-tracking"
import CloseIcon from "@artsy/icons/CloseIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"

export interface DeprecatedSaveButtonProps {
  artwork: DeprecatedSaveButton_artwork$data
  contextModule: AuthContextModule
}

export const DeprecatedSaveButton: React.FC<DeprecatedSaveButtonProps> = ({
  artwork,
  contextModule,
}) => {
  const tracking = useTracking()
  const [isHovered, setIsHovered] = useState(false)

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

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Clickable
      data-test="deprecatedSaveButton"
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
          <HeartStrokeIcon fill="white100" width={24} height={24} />
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

  ${({ isSaved, theme }) => {
    const rgb = theme.name === "light" ? "0, 0, 0" : "255, 255, 255"
    return isSaved
      ? css`
          background-color: ${themeGet("colors.brand")};
          &:hover {
            background-color: ${themeGet("colors.red100")};
          }
        `
      : css`
          background-color: rgba(${rgb}, 0.4);
          &:hover {
            background-color: ${themeGet("colors.black100")};
          }
        `
  }}
`

export const DeprecatedSaveButtonFragmentContainer = createFragmentContainer(
  DeprecatedSaveButton,
  {
    artwork: graphql`
      fragment DeprecatedSaveButton_artwork on Artwork {
        id
        internalID
        slug
        isSaved
        title
      }
    `,
  }
)
