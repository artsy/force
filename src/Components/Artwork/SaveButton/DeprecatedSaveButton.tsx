import type { AuthContextModule } from "@artsy/cohesion"
import CloseIcon from "@artsy/icons/CloseIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import { Clickable, Flex } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { DeprecatedSaveButtonQuery } from "__generated__/DeprecatedSaveButtonQuery.graphql"
import type { DeprecatedSaveButton_artwork$data } from "__generated__/DeprecatedSaveButton_artwork.graphql"
import type * as React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled, { css } from "styled-components"
import { useSaveArtwork } from "./useSaveArtwork"

export interface DeprecatedSaveButtonProps {
  artwork: DeprecatedSaveButton_artwork$data
  contextModule: AuthContextModule
}

export const DeprecatedSaveButton: React.FC<
  React.PropsWithChildren<DeprecatedSaveButtonProps>
> = ({ artwork, contextModule }) => {
  const tracking = useTracking()
  const [isHovered, setIsHovered] = useState(false)

  const { handleSave } = useSaveArtwork({
    isSaved: artwork.isSavedToAnyList,
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
    imageUrl: artwork.image?.url,
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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
      <Inner isSaved={artwork.isSavedToAnyList}>
        {artwork.isSavedToAnyList && isHovered ? (
          <CloseIcon fill="mono0" width={24} height={24} />
        ) : (
          <HeartStrokeIcon fill="mono0" width={24} height={24} />
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
            background-color: ${themeGet("colors.mono100")};
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
        isSavedToAnyList
        title
        image {
          url(version: "large")
        }
        collectorSignals {
          auction {
            lotWatcherCount
          }
        }
      }
    `,
  },
)

interface DeprecatedSaveButtonQueryRendererProps
  extends Omit<DeprecatedSaveButtonProps, "artwork"> {
  id: string
}

export const DeprecatedSaveButtonQueryRenderer: React.FC<
  React.PropsWithChildren<DeprecatedSaveButtonQueryRendererProps>
> = ({ id, contextModule }) => {
  return (
    <SystemQueryRenderer<DeprecatedSaveButtonQuery>
      lazyLoad
      query={graphql`
        query DeprecatedSaveButtonQuery($id: String!) {
          artwork(id: $id) {
            ...DeprecatedSaveButton_artwork
          }
        }
      `}
      placeholder={
        <Clickable onClick={() => {}}>
          <HeartStrokeIcon fill="mono0" width={24} height={24} />
        </Clickable>
      }
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.artwork) {
          return (
            <Clickable onClick={() => {}}>
              <HeartStrokeIcon fill="mono0" width={24} height={24} />
            </Clickable>
          )
        }

        return (
          <DeprecatedSaveButtonFragmentContainer
            artwork={props.artwork}
            contextModule={contextModule}
          />
        )
      }}
    />
  )
}
