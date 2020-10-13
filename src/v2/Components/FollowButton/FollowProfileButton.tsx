import { FollowProfileButtonMutation } from "v2/__generated__/FollowProfileButtonMutation.graphql"
import * as Artsy from "v2/Artsy"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import { FollowProfileButton_profile } from "../../__generated__/FollowProfileButton_profile.graphql"
import { FollowButton } from "./Button"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import {
  AuthContextModule,
  FollowedArgs,
  Intent,
  followedPartner,
  unfollowedPartner,
} from "@artsy/cohesion"
import {
  AnalyticsContextProps,
  withAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"
import { ButtonProps, Clickable } from "@artsy/palette"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"

interface Props
  extends React.HTMLProps<FollowProfileButton>,
    Artsy.SystemContextProps,
    AnalyticsContextProps {
  relay?: RelayProp
  profile?: FollowProfileButton_profile
  tracking?: TrackingProp
  contextModule: AuthContextModule
  /**
   * Pass palette props to button
   */
  buttonProps?: Partial<ButtonProps>
  /**
   * Custom renderer if palette button is not desired
   */
  render?: (profile: FollowProfileButton_profile) => JSX.Element
}

export class FollowProfileButton extends React.Component<Props> {
  static defaultProps = {
    buttonProps: {},
  }

  trackFollow = () => {
    const {
      tracking,
      profile,
      contextModule,
      contextPageOwnerId,
      contextPageOwnerSlug,
      contextPageOwnerType,
    } = this.props

    const args: FollowedArgs = {
      ownerId: profile.internalID,
      ownerSlug: profile.slug,
      contextModule,
      contextOwnerId: contextPageOwnerId,
      contextOwnerSlug: contextPageOwnerSlug,
      contextOwnerType: contextPageOwnerType,
    }

    const analyticsData = profile.is_followed
      ? unfollowedPartner(args)
      : followedPartner(args)

    tracking.trackEvent(analyticsData)
  }

  handleFollow = e => {
    e.preventDefault() // If this button is part of a link, we _probably_ dont want to actually follow the link.
    const { contextModule, profile, user, relay, mediator } = this.props

    if (user && user.id) {
      commitMutation<FollowProfileButtonMutation>(relay.environment, {
        // TODO: Inputs to the mutation might have changed case of the keys!
        mutation: graphql`
          mutation FollowProfileButtonMutation($input: FollowProfileInput!) {
            followProfile(input: $input) {
              profile {
                id
                is_followed: isFollowed
              }
            }
          }
        `,
        variables: {
          input: {
            profileID: profile.internalID,
            unfollow: profile.is_followed,
          },
        },
        optimisticResponse: {
          followProfile: {
            profile: {
              id: profile.id,
              is_followed: !profile.is_followed,
            },
          },
        },
      })
      this.trackFollow()
    } else {
      openAuthToFollowSave(mediator, {
        entity: {
          name: profile.name,
          slug: profile.slug,
        },
        contextModule,
        intent: Intent.followPartner,
      })
    }
  }

  render() {
    const { profile, buttonProps, render } = this.props

    // Custom button renderer
    if (render) {
      return (
        <Clickable onClick={this.handleFollow} data-test="followButton">
          {render(profile)}
        </Clickable>
      )
    } else {
      return (
        <FollowButton
          isFollowed={profile && profile.is_followed}
          handleFollow={this.handleFollow}
          buttonProps={buttonProps}
        />
      )
    }
  }
}

export const FollowProfileButtonFragmentContainer = track({})(
  createFragmentContainer(
    Artsy.withSystemContext(
      withAnalyticsContext(FollowProfileButton)
    ) as React.ComponentType<Props>,
    {
      profile: graphql`
        fragment FollowProfileButton_profile on Profile {
          id
          slug
          name
          internalID
          is_followed: isFollowed
        }
      `,
    }
  )
)
