import {
  AuthContextModule,
  FollowedArgs,
  Intent,
  followedArtist,
  unfollowedArtist,
} from "@artsy/cohesion"
import { Box, ButtonProps } from "@artsy/palette"
import { FollowArtistButtonMutation } from "v2/__generated__/FollowArtistButtonMutation.graphql"
import * as Artsy from "v2/Artsy"
import { FollowArtistPopoverFragmentContainer as SuggestionsPopover } from "v2/Components/FollowArtistPopover"
import React from "react"
import track, { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { FollowArtistButton_artist } from "../../__generated__/FollowArtistButton_artist.graphql"
import { FollowArtistButtonQuery } from "../../__generated__/FollowArtistButtonQuery.graphql"
import { FollowButton } from "./Button"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import {
  AnalyticsContextProps,
  withAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"
import { Mediator } from "lib/mediator"
import { useSystemContext } from "v2/Artsy"
import { SystemQueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"

interface Props
  extends React.HTMLProps<FollowArtistButton>,
    Artsy.SystemContextProps,
    AnalyticsContextProps {
  relay?: RelayProp
  mediator?: Mediator
  artist?: FollowArtistButton_artist
  tracking?: TrackingProp
  contextModule: AuthContextModule
  /**
   * Pass palette props to button
   */
  buttonProps?: Partial<ButtonProps>
  /**
   * Custom renderer if palette button is not desired
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

const Container = styled.span`
  display: inline-block;
`

@track()
export class FollowArtistButton extends React.Component<Props, State> {
  static defaultProps = {
    buttonProps: {},
    triggerSuggestions: false,
  }

  state = { openSuggestions: false }

  trackFollow = () => {
    const {
      tracking,
      artist,
      contextModule,
      contextPageOwnerId,
      contextPageOwnerSlug,
      contextPageOwnerType,
    } = this.props

    const args: FollowedArgs = {
      contextModule,
      contextOwnerId: contextPageOwnerId,
      contextOwnerSlug: contextPageOwnerSlug,
      // @ts-expect-error STRICT_NULL_CHECK
      contextOwnerType: contextPageOwnerType,
      // @ts-expect-error STRICT_NULL_CHECK
      ownerId: artist.internalID,
      // @ts-expect-error STRICT_NULL_CHECK
      ownerSlug: artist.slug,
    }

    // @ts-expect-error STRICT_NULL_CHECK
    const analyticsData = artist.is_followed
      ? unfollowedArtist(args)
      : followedArtist(args)

    // @ts-expect-error STRICT_NULL_CHECK
    tracking.trackEvent(analyticsData)
  }

  handleFollow = e => {
    e.preventDefault() // If this button is part of a link, we _probably_ dont want to actually follow the link.
    const { artist, user, mediator, contextModule } = this.props

    if (user && user.id) {
      this.followArtistForUser()
    } else {
      // @ts-expect-error STRICT_NULL_CHECK
      openAuthToFollowSave(mediator, {
        contextModule,
        entity: artist,
        intent: Intent.followArtist,
      })
    }
  }

  followArtistForUser = () => {
    const { artist, relay, triggerSuggestions } = this.props

    // @ts-expect-error STRICT_NULL_CHECK
    const newFollowCount = artist.is_followed
      ? // @ts-expect-error STRICT_NULL_CHECK
        artist.counts.follows - 1
      : // @ts-expect-error STRICT_NULL_CHECK
        artist.counts.follows + 1

    // @ts-expect-error STRICT_NULL_CHECK
    commitMutation<FollowArtistButtonMutation>(relay.environment, {
      mutation: graphql`
        mutation FollowArtistButtonMutation($input: FollowArtistInput!) {
          followArtist(input: $input) {
            artist {
              id
              slug
              is_followed: isFollowed
              counts {
                follows
              }
            }
          }
        }
      `,
      optimisticResponse: {
        followArtist: {
          artist: {
            counts: { follows: newFollowCount },
            // @ts-expect-error STRICT_NULL_CHECK
            id: artist.id,
            // @ts-expect-error STRICT_NULL_CHECK
            is_followed: !artist.is_followed,
            // @ts-expect-error STRICT_NULL_CHECK
            slug: artist.slug,
          },
        },
      },
      updater: (store, data) => {
        // @ts-expect-error STRICT_NULL_CHECK
        const artistProxy = store.get(data.followArtist.artist.id)

        // @ts-expect-error STRICT_NULL_CHECK
        artistProxy
          .getLinkedRecord("counts")
          .setValue(newFollowCount, "follows")
      },
      variables: {
        input: {
          // @ts-expect-error STRICT_NULL_CHECK
          artistID: artist.internalID,
          // @ts-expect-error STRICT_NULL_CHECK
          unfollow: artist.is_followed,
        },
      },
    })
    this.trackFollow()
    // @ts-expect-error STRICT_NULL_CHECK
    if (triggerSuggestions && !artist.is_followed) {
      this.setState({ openSuggestions: true })
    }
  }

  closePopover() {
    this.setState({ openSuggestions: false })
  }

  render() {
    const { artist, buttonProps, render, user } = this.props
    const { openSuggestions } = this.state

    // Custom button renderer
    const content = render ? (
      <Container
        tabIndex={0}
        role="button"
        onKeyPress={event => {
          if (event.key === "Enter" || event.key === " ") {
            this.handleFollow(event)
          }
        }}
        onClick={this.handleFollow}
      >
        {" "}
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {render(artist)}
      </Container>
    ) : (
      <FollowButton
        // @ts-expect-error STRICT_NULL_CHECK
        isFollowed={artist && artist.is_followed}
        handleFollow={this.handleFollow}
        buttonProps={buttonProps}
      />
    )

    return (
      <>
        {content}
        {openSuggestions && (
          <SuggestionsPopoverContainer>
            <SuggestionsPopover
              user={user}
              // @ts-expect-error STRICT_NULL_CHECK
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
  Artsy.withSystemContext(
    withAnalyticsContext(FollowArtistButton)
  ) as React.ComponentType<Props>,
  {
    artist: graphql`
      fragment FollowArtistButton_artist on Artist
        @argumentDefinitions(
          showFollowSuggestions: { type: "Boolean", defaultValue: false }
        ) {
        id
        internalID
        name
        slug
        is_followed: isFollowed
        counts {
          follows
        }
        ...FollowArtistPopover_artist @include(if: $showFollowSuggestions)
      }
    `,
  }
)

export const FollowArtistButtonQueryRenderer: React.FC<
  {
    id: string
  } & Props
> = ({ id, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<FollowArtistButtonQuery>
      environment={relayEnvironment}
      query={graphql`
        query FollowArtistButtonQuery($id: String!) {
          artist(id: $id) {
            ...FollowArtistButton_artist
          }
        }
      `}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props) {
          // @ts-expect-error STRICT_NULL_CHECK
          return <FollowArtistButtonFragmentContainer {...rest} artist={null} />
        }

        return <FollowArtistButtonFragmentContainer {...rest} {...props} />
      }}
    />
  )
}
