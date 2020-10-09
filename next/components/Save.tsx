import { AuthContextModule, Intent } from "@artsy/cohesion"
// import { Save_artwork } from "v2/__generated__/Save_artwork.graphql"
// import { SaveArtworkMutation } from "v2/__generated__/SaveArtworkMutation.graphql"
// import { track } from "v2/Artsy/Analytics"
import { extend, isNull } from "lodash"
import React from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { TrackingProp } from "react-tracking"
import * as RelayRuntimeTypes from "relay-runtime"
import styled from "styled-components"
// import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
// import Icon from "../Icon"

const SIZE = 40

export interface SaveTrackingProps {
  context_page?: string
}

// TODO: This will be refactored out once Artworks / Grids are full Relay in Force
// and intermediate local state becomes unnecessary
export interface SaveState {
  is_saved: boolean
  isHovered: boolean
}

export class SaveButton extends React.Component<any, SaveState> {
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
    const trackingData: SaveTrackingProps = this.props.trackingData || {}
    const action = is_saved ? "Removed Artwork" : "Saved Artwork"
    const entityInfo = {
      entity_slug: slug,
      entity_id: internalID,
    }

    if (tracking) {
      tracking.trackEvent(extend({ action }, entityInfo, trackingData))
    }
  }

  handleSave() {
    const { user, artwork, relay, relayEnvironment } = this.props
    const environment = (relay && relay.environment) || relayEnvironment

    if (environment && user && user.id) {
      commitMutation(environment, {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation SaveArtworkMutation($input: SaveArtworkInput!) {
            saveArtwork(input: $input) {
              artwork {
                id
                slug
                is_saved: isSaved
              }
            }
          }
        `,
        variables: {
          input: {
            artworkID: artwork.internalID,
            remove: this.isSaved,
          },
        },
        optimisticResponse: {
          saveArtwork: {
            artwork: {
              id: artwork.id,
              slug: artwork.slug,
              is_saved: !this.isSaved,
            },
          },
        },
        onError: error => {
          // Revert optimistic update
          if (this.props.render) {
            this.setState({
              is_saved: this.isSaved,
            })
          }

          console.error("Artwork/Save Error saving artwork: ", error)
        },
        onCompleted: ({ saveArtwork }: any) => {
          if (this.props.render) {
            this.setState({
              is_saved: saveArtwork.artwork.is_saved,
            })
          }
        },
      })
      this.trackSave()
    } else {
      // save
    }
  }

  mixinButtonActions() {
    return {
      onClick: () => this.handleSave(),
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
    const { style } = this.props
    const saveStyle = this.isSaved ? { opacity: 1.0 } : {}
    const fullStyle = { ...style, ...saveStyle }
    const iconName =
      this.isSaved && this.state.isHovered ? "remove-small" : "heart"
    const iconFontSize = iconName === "heart" ? "24px" : "16px"

    return (
      <div
        data-test="saveButton"
        className={this.props.className}
        style={fullStyle}
        {...this.mixinButtonActions()}
      >
        <Container data-saved={this.isSaved}>some icon</Container>
      </div>
    )
  }

  renderCustomButton() {
    return (
      <div {...this.mixinButtonActions()} data-test="saveButton">
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

export const Container = styled.div`
  display: block;
  width: ${SIZE}px;
  height: ${SIZE}px;
  text-align: center;
  cursor: pointer;
  color: white;
  background-color: #666;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  font-size: 16px;
  line-height: ${SIZE}px;

  &:hover {
    background-color: black;
  }

  &[data-saved="true"] {
    background-color: purple;

    &:hover {
      background-color: red;
    }
  }
`

export default createFragmentContainer(SaveButton, {
  artwork: graphql`
    fragment Save_artwork on Artwork {
      id
      internalID
      slug
      is_saved: isSaved
      title
    }
  `,
})
