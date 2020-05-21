import { Intent, ContextModule } from "@artsy/cohesion"
import { Box, ButtonProps } from "@artsy/palette"
import { FollowArtistButtonMutation } from "v2/__generated__/FollowArtistButtonMutation.graphql"
import * as Artsy from "v2/Artsy"
import { FollowArtistPopoverFragmentContainer as SuggestionsPopover } from "v2/Components/FollowArtistPopover"
import { extend } from "lodash"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { FollowArtistButton_artist } from "../../__generated__/FollowArtistButton_artist.graphql"
import { FollowButton } from "./Button"
import { FollowButtonDeprecated } from "./ButtonDeprecated"
import { FollowTrackingData } from "./Typings"

import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

interface Props
  extends React.HTMLProps<FollowArtistButton>,
  Artsy.SystemContextProps {
  relay?: RelayProp
  artist?: FollowArtistButton_artist
  tracking?: TrackingProp
  trackingData?: FollowTrackingData
  onOpenAuthModal?: (type: ModalType, config?: ModalOptions) => void

  /**
   * FIXME: Default is true due to legacy code. If false, use new @artsy/palette
   * design system <Button /> style.
   */
  useDeprecatedButtonStyle?: boolean
  /**
   * FIXME: If useDeprecatedButtonStyle is false pass <Button> style props along
   * to new design-system buttons.
   */
  buttonProps?: Partial<ButtonProps>
  /**
   * Custom renderer for alternative button displays
   */
  render?: (artist: FollowArtistButton_artist) => JSX.Element
  triggerSuggestions?: boolean
}

interface State {
  openSuggestions: boolean
}

const SuggestionsPopoverContainer = styled(Box)`
  position: absolute;
  z-index: 1;
`

@track()
export class FollowArtistButton extends React.Component<Props, State> {
  static defaultProps = {
    useDeprecatedButtonStyle: true,
    buttonProps: {},
    triggerSuggestions: false,
  }

  state = { openSuggestions: false }

  trackFollow = () => {
    const {
      tracking,
      artist: { is_followed },
    } = this.props
    const trackingData: FollowTrackingData = this.props.trackingData || {}
    const action = is_followed ? "Unfollowed Artist" : "Followed Artist"

    tracking.trackEvent(extend({ action }, trackingData))
  }

  handleFollow = e => {
    e.preventDefault() // If this button is part of a link, we _probably_ dont want to actually follow the link.
    const { artist, user, onOpenAuthModal } = this.props
    const trackingData: FollowTrackingData = this.props.trackingData || {}

    if (user && user.id) {
      this.followArtistForUser(user)
    } else if (onOpenAuthModal) {
      onOpenAuthModal(ModalType.signup, {
        contextModule: ContextModule.intextTooltip,
        intent: Intent.followArtist,
        copy: "Sign up to follow artists",
        afterSignUpAction: {
          action: "follow",
          kind: "artist",
          objectId: (artist && artist.internalID) || trackingData.entity_slug,
        },
      })
    }
  }

  followArtistForUser = user => {
    const { artist, relay, triggerSuggestions } = this.props

    const newFollowCount = artist.is_followed
      ? artist.counts.follows - 1
      : artist.counts.follows + 1

    commitMutation<FollowArtistButtonMutation>(relay.environment, {
      mutation: graphql`
        mutation FollowArtistButtonMutation($input: FollowArtistInput!) {
          followArtist(input: $input) {
            artist {
              id
              is_followed: isFollowed
              counts {
                follows
              }
            }
          }
        }
      `,
      variables: {
        input: {
          artistID: artist.internalID,
          unfollow: artist.is_followed,
        },
      },
      optimisticResponse: {
        followArtist: {
          artist: {
            id: artist.id,
            is_followed: !artist.is_followed,
            counts: { follows: newFollowCount },
          },
        },
      },
      updater: (store, data) => {
        const artistProxy = store.get(data.followArtist.artist.id)

        artistProxy
          .getLinkedRecord("counts")
          .setValue(newFollowCount, "follows")
      },
    })
    this.trackFollow()
    if (triggerSuggestions && !artist.is_followed) {
      this.setState({ openSuggestions: true })
    }
  }

  closePopover() {
    this.setState({ openSuggestions: false })
  }

  render() {
    const {
      artist,
      useDeprecatedButtonStyle,
      buttonProps,
      render,
      user,
    } = this.props
    const { openSuggestions } = this.state

    // Custom button renderer
    const content = render ? (
      <span onClick={this.handleFollow}> {render(artist)}</span>
    ) : (
        <>
          {useDeprecatedButtonStyle && (
            <FollowButtonDeprecated
              isFollowed={artist && artist.is_followed}
              handleFollow={this.handleFollow}
              buttonProps={buttonProps}
            />
          )}
          {!useDeprecatedButtonStyle && (
            <FollowButton
              isFollowed={artist && artist.is_followed}
              handleFollow={this.handleFollow}
              buttonProps={buttonProps}
            />
          )}
        </>
      )

    return (
      <>
        {content}
        {openSuggestions && (
          <SuggestionsPopoverContainer>
            <SuggestionsPopover
              user={user}
              artist={artist}
              onClose={() => this.closePopover()}
            />
          </SuggestionsPopoverContainer>
        )}
      </>
    )
  }
}

export const FollowArtistButtonFragmentContainer = createFragmentContainer(
  Artsy.withSystemContext(FollowArtistButton),
  {
    artist: graphql`
      fragment FollowArtistButton_artist on Artist
        @argumentDefinitions(
          showFollowSuggestions: { type: "Boolean", defaultValue: false }
        ) {
        id
        internalID
        name
        is_followed: isFollowed
        counts {
          follows
        }
        ...FollowArtistPopover_artist @include(if: $showFollowSuggestions)
      }
    `,
  }
)
