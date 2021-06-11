import { AuthContextModule, Intent } from "@artsy/cohesion"
import { SaveButton_artwork } from "v2/__generated__/SaveButton_artwork.graphql"
import React, { useState } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { TrackingProp } from "react-tracking"
import * as RelayRuntimeTypes from "relay-runtime"
import styled, { css } from "styled-components"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { CloseIcon, Flex, HeartIcon, Clickable } from "@artsy/palette"
import { SaveArtwork } from "./SaveArtworkMutation"
import { themeGet } from "@styled-system/theme-get"
import { useSystemContext } from "v2/System"

export interface SaveTrackingProps {
  context_page?: string
}

export interface SaveButtonProps {
  artwork: SaveButton_artwork
  contextModule: AuthContextModule
  relay?: RelayProp
  relayEnvironment?: RelayRuntimeTypes.Environment
  tracking?: TrackingProp
  trackingData?: SaveTrackingProps
  render?: (props: SaveButtonProps, state: SaveButtonState) => JSX.Element
}

// TODO: This will be refactored out once Artworks / Grids are full Relay in Force
// and intermediate local state becomes unnecessary
export interface SaveButtonState {
  is_saved: boolean | null
  isHovered: boolean
}

export const SaveButton: React.FC<SaveButtonProps> = props => {
  const { user, mediator } = useSystemContext()
  const { render, artwork, tracking } = props

  const [state, setState] = useState<SaveButtonState>({
    is_saved: null,
    isHovered: false,
  })

  const isSaved = state.is_saved === null ? !!artwork.is_saved : state.is_saved
  const isRemoveable = isSaved && state.isHovered

  const handleSave = async () => {
    const { artwork, contextModule, relay, relayEnvironment } = props

    const environment = (relay && relay.environment) || relayEnvironment

    if (environment && user && user.id) {
      try {
        const { saveArtwork } = await SaveArtwork(
          environment,
          {
            artworkID: artwork.internalID,
            remove: isSaved,
          },
          {
            saveArtwork: {
              artwork: {
                id: artwork.id,
                slug: artwork.slug,
                is_saved: !isSaved,
              },
            },
          }
        )

        if (render) {
          setState(prevState => ({
            ...prevState,
            is_saved: !!saveArtwork?.artwork?.is_saved,
          }))
        }

        // TRACKING

        // FIXME: needs cohesion schema
        const trackingData: SaveTrackingProps = props.trackingData || {}
        const action = !saveArtwork?.artwork?.is_saved
          ? "Removed Artwork"
          : "Saved Artwork"

        const entityInfo = {
          entity_slug: artwork.slug,
          entity_id: artwork.internalID,
        }

        if (tracking) {
          tracking.trackEvent({ action, ...entityInfo, ...trackingData })
        }
      } catch (err) {
        console.error("Artwork/Save Error saving artwork: ", err)

        if (render) {
          setState(prevState => ({ ...prevState, is_saved: isSaved }))
        }
      }
    } else {
      openAuthToFollowSave(mediator!, {
        contextModule,
        intent: Intent.saveArtwork,
        entity: {
          slug: artwork.slug,
          name: artwork.title ?? "",
        },
      })
    }
  }

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()
    handleSave()
  }

  const handleMouseEnter = () => {
    setState(prevState => ({ ...prevState, isHovered: true }))
  }

  const handleMouseLeave = () => {
    setState(prevState => ({ ...prevState, isHovered: false }))
  }

  if (render) {
    return (
      <Clickable
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-test="saveButton"
      >
        {render(props, state)}
      </Clickable>
    )
  }

  return (
    <Container
      data-test="saveButton"
      position="absolute"
      right={10}
      bottom={10}
      isSaved={isSaved}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Inner isSaved={isSaved}>
        {isRemoveable ? (
          <CloseIcon fill="white100" width={24} height={24} />
        ) : (
          <HeartIcon fill="white100" width={24} height={24} />
        )}
      </Inner>
    </Container>
  )
}

export const Container = styled(Clickable)<{ isSaved: boolean }>`
  position: absolute;
  right: ${themeGet("space.1")};
  bottom: ${themeGet("space.1")};
  opacity: ${({ isSaved }) => (isSaved ? 1 : 0)};
`

export const Inner = styled(Flex)<{ isSaved: boolean }>`
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
