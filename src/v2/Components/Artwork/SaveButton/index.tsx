import { AuthContextModule, Intent } from "@artsy/cohesion"
import { SaveButton_artwork } from "v2/__generated__/SaveButton_artwork.graphql"
import * as Artsy from "v2/Artsy"
import { extend, isNull } from "lodash"
import React from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import { TrackingProp } from "react-tracking"
import * as RelayRuntimeTypes from "relay-runtime"
import styled from "styled-components"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import {
  color,
  CloseIcon,
  Flex,
  HeartIcon,
  Clickable,
  space,
} from "@artsy/palette"
import { SaveArtwork } from "./SaveArtworkMutation"
import { themeGet } from "@styled-system/theme-get"

const SIZE = 40
const ICON_SIZE = "24px"

export interface SaveTrackingProps {
  context_page?: string
}

export interface SaveButtonProps
  extends Artsy.SystemContextProps,
    React.HTMLProps<React.ComponentType> {
  artwork: SaveButton_artwork
  contextModule: AuthContextModule
  relay?: RelayProp
  relayEnvironment?: RelayRuntimeTypes.Environment
  render?: (props, state) => JSX.Element
  trackingData?: SaveTrackingProps
  tracking?: TrackingProp
}

// TODO: This will be refactored out once Artworks / Grids are full Relay in Force
// and intermediate local state becomes unnecessary
export interface SaveButtonState {
  is_saved: boolean
  isHovered: boolean
}

export class SaveButton extends React.Component<
  SaveButtonProps,
  SaveButtonState
> {
  // @ts-expect-error STRICT_NULL_CHECK
  state = {
    is_saved: null,
    isHovered: false,
  }

  get isSaved() {
    const isSaved = isNull(this.state.is_saved)
      ? this.props.artwork.is_saved
      : this.state.is_saved

    return isSaved
  }

  trackSave = () => {
    const {
      tracking,
      artwork: { is_saved, slug, internalID },
    } = this.props
    // FIXME: needs cohesion schema
    const trackingData: SaveTrackingProps = this.props.trackingData || {}
    const action = !is_saved ? "Removed Artwork" : "Saved Artwork"
    const entityInfo = {
      entity_slug: slug,
      entity_id: internalID,
    }

    if (tracking) {
      tracking.trackEvent(extend({ action }, entityInfo, trackingData))
    }
  }

  handleSave = async () => {
    const {
      user,
      artwork,
      contextModule,
      relay,
      relayEnvironment,
      mediator,
    } = this.props
    const environment = (relay && relay.environment) || relayEnvironment
    if (environment && user && user.id) {
      try {
        const { saveArtwork } = await SaveArtwork(
          environment,
          {
            artworkID: artwork.internalID,
            remove: this.isSaved,
          },
          {
            saveArtwork: {
              artwork: {
                id: artwork.id,
                slug: artwork.slug,
                is_saved: !this.isSaved,
              },
            },
          }
        )

        if (this.props.render) {
          this.setState({
            // @ts-expect-error STRICT_NULL_CHECK
            is_saved: saveArtwork.artwork.is_saved,
          })
        }
        this.trackSave()
      } catch (err) {
        if (this.props.render) {
          this.setState({
            // @ts-expect-error STRICT_NULL_CHECK
            is_saved: this.isSaved,
          })
        }
        console.error("Artwork/Save Error saving artwork: ", err)
      }
    } else {
      // @ts-expect-error STRICT_NULL_CHECK
      openAuthToFollowSave(mediator, {
        contextModule,
        entity: {
          slug: artwork.slug,
          name: artwork.title,
        },
        intent: Intent.saveArtwork,
      })
    }
  }

  mixinButtonActions() {
    return {
      onClick: event => {
        event.preventDefault()
        this.handleSave()
      },
      onMouseEnter: () => {
        this.setState({
          isHovered: true,
        })
      },
      onMouseLeave: () => {
        this.setState({
          isHovered: false,
        })
      },
    }
  }

  renderDefaultButton() {
    const isRemoveable = this.isSaved && this.state.isHovered

    return (
      <ClickContainer
        data-test="saveButton"
        {...this.mixinButtonActions()}
        // @ts-expect-error STRICT_NULL_CHECK
        isSaved={this.isSaved}
      >
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <Container isSaved={this.isSaved}>
          {isRemoveable ? (
            <CloseIcon fill="white100" width={ICON_SIZE} height={ICON_SIZE} />
          ) : (
            <HeartIcon fill="white100" width={ICON_SIZE} height={ICON_SIZE} />
          )}
        </Container>
      </ClickContainer>
    )
  }

  renderCustomButton() {
    return (
      <div {...this.mixinButtonActions()} data-test="saveButton">
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {this.props.render(this.props, this.state)}
      </div>
    )
  }

  render() {
    return this.props.render
      ? this.renderCustomButton()
      : this.renderDefaultButton()
  }
}

export const ClickContainer = styled(Clickable)<{ isSaved: boolean }>`
  position: absolute;
  right: ${space(1)}px;
  bottom: ${space(1)}px;
  opacity: ${({ isSaved }) => (isSaved ? 1 : 0)};
`

export const Container = styled(Flex)<{ isSaved: boolean }>`
  width: ${SIZE}px;
  height: ${SIZE}px;
  background-color: ${({ isSaved }) =>
    isSaved ? themeGet("colors.brand") : "rgba(0, 0, 0, 0.4)"};
  border-radius: 50%;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ isSaved }) =>
      isSaved ? color("red100") : color("black100")};
  }
`

export const SaveButtonFragmentContainer = createFragmentContainer(
  Artsy.withSystemContext(SaveButton) as React.ComponentType<SaveButtonProps>,
  {
    artwork: graphql`
      fragment SaveButton_artwork on Artwork {
        id
        internalID
        slug
        is_saved: isSaved
        title
      }
    `,
  }
)
