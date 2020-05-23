/**
 * FIXME: This file also used to handle ‘profile’ follows, as implemented in https://github.com/artsy/reaction/pull/175,
 * but this was reverted because the metaphysics PR never landed https://github.com/artsy/metaphysics/pull/662.
 *
 * When this is revisited, rather than having this file do both, it’s probably better to have an abstract implementation
 * and two specialised components that use composition to achieve the desired functionality.
 */

import {
  Intent,
  ContextModule,
  AuthContextModule,
  AuthIntent,
} from "@artsy/cohesion"
import { Follow_artist } from "v2/__generated__/Follow_artist.graphql"
import { FollowArtistMutation } from "v2/__generated__/FollowArtistMutation.graphql"
import * as Artsy from "v2/Artsy"
import React from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import styled from "styled-components"
import { getMobileAuthLink, openAuthToFollowSave } from "v2/Utils/openAuthModal"
import colors from "../Assets/Colors"
import { ModalType } from "./Authentication/Types"
import Icon from "./Icon"

const SIZE = 32

interface Props
  extends React.HTMLProps<FollowButton>,
  Artsy.SystemContextProps {
  style?: any
  relay: RelayProp
  artist: Follow_artist
  contextModule: AuthContextModule
}

export const StyledFollowButton = styled.div`
  display: flex;
  cursor: pointer;
  color: black;
  font-size: 16px;
  align-items: center;
  margin-left: 5px;

  &::after {
    content: "Follow";
  }

  &:hover {
    color: ${colors.purpleRegular};
  }

  &[data-followed="true"] {
    &::after {
      content: "Following";
    }

    &:hover {
      color: ${colors.redBold};

      &::after {
        content: "Unfollow";
      }
    }
  }
`

export class FollowButton extends React.Component<Props, null> {
  handleFollow() {
    const { artist, user, relay, mediator, contextModule } = this.props
    if (user && user.id) {
      commitMutation<FollowArtistMutation>(relay.environment, {
        mutation: graphql`
          mutation FollowArtistMutation($input: FollowArtistInput!) {
            followArtist(input: $input) {
              artist {
                id
                is_followed: isFollowed
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
        // TODO: Relay Modern: This is not working yet
        optimisticResponse: {
          followArtist: {
            artist: {
              id: artist.id,
              is_followed: !artist.is_followed,
            },
          },
        },
      })
    } else {
      const options: {
        contextModule: AuthContextModule
        intent: AuthIntent
      } = {
        contextModule: contextModule || ContextModule.relatedArtistsRail,
        intent: Intent.followArtist,
      }

      if (mediator) {
        openAuthToFollowSave(mediator, {
          entity: {
            slug: artist.internalID,
            name: artist.name,
          },
          ...options,
        })
      } else {
        window.location.href = getMobileAuthLink(ModalType.signup, {
          kind: "artist",
          objectId: artist.internalID,
          action: "follow",
          ...options,
        })
      }
    }
  }

  render() {
    const { style, artist } = this.props
    const iconName = artist.is_followed
      ? "follow-circle.is-following"
      : "follow-circle"

    return (
      <StyledFollowButton
        className={this.props.className}
        style={style}
        onClick={() => this.handleFollow()}
        data-followed={artist.is_followed}
      >
        <Icon
          name={iconName}
          height={SIZE}
          style={{ verticalAlign: "middle", color: "inherit", margin: 0 }}
        />
      </StyledFollowButton>
    )
  }
}

export default createFragmentContainer(Artsy.withSystemContext(FollowButton), {
  artist: graphql`
    fragment Follow_artist on Artist {
      id
      internalID
      name
      is_followed: isFollowed
    }
  `,
})
