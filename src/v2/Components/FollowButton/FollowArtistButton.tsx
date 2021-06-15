import {
  AuthContextModule,
  FollowedArgs,
  Intent,
  followedArtist,
  unfollowedArtist,
} from "@artsy/cohesion"
import { Box, ButtonProps, Popover } from "@artsy/palette"
import { FollowArtistButtonMutation } from "v2/__generated__/FollowArtistButtonMutation.graphql"
import * as Artsy from "v2/System"
import { FollowArtistPopoverFragmentContainer } from "v2/Components/FollowArtistPopover"
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
} from "v2/System/Analytics/AnalyticsContext"
import { Mediator } from "lib/mediator"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

interface Props
  extends React.HTMLProps<FollowArtistButton>,
    AnalyticsContextProps {
  relay?: RelayProp
  mediator?: Mediator
  artist?: FollowArtistButton_artist
  tracking?: TrackingProp
  contextModule: AuthContextModule
  user?: User | null
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

const Container = styled.span`
  display: inline-block;
`

@track()
export class FollowArtistButton extends React.Component<Props> {
  static defaultProps = {
    buttonProps: {},
    triggerSuggestions: false,
  }

  trackFollow = () => {
    const {
      tracking,
      artist,
      contextModule,
      contextPageOwnerId,
      contextPageOwnerSlug,
      contextPageOwnerType,
    } = this.props

    if (!artist) return

    const args: FollowedArgs = {
      contextModule,
      contextOwnerId: contextPageOwnerId,
      contextOwnerSlug: contextPageOwnerSlug,
      // @ts-expect-error STRICT_NULL_CHECK
      contextOwnerType: contextPageOwnerType,
      ownerId: artist.internalID,
      ownerSlug: artist.slug,
    }

    const analyticsData = artist.is_followed
      ? unfollowedArtist(args)
      : followedArtist(args)

    // @ts-expect-error STRICT_NULL_CHECK
    tracking.trackEvent(analyticsData)
  }

  handleFollow = (
    e:
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
      | React.KeyboardEvent<HTMLSpanElement>
  ) => {
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
    const { artist, relay } = this.props

    if (!artist) return

    const newFollowCount = artist.is_followed
      ? (artist.counts?.follows ?? 0) - 1
      : (artist.counts?.follows ?? 0) + 1

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
            id: artist.id,
            is_followed: !artist.is_followed,
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
          artistID: artist.internalID,
          unfollow: artist.is_followed,
        },
      },
    })
    this.trackFollow()
  }

  render() {
    const { artist, buttonProps, render, user, triggerSuggestions } = this.props

    return (
      <Box data-test="followArtistButton">
        <Popover
          title="Other artists you might like"
          placement="bottom"
          popover={
            <FollowArtistPopoverFragmentContainer
              user={user!}
              artist={artist!}
            />
          }
        >
          {({ anchorRef, onVisible }) => {
            const openSuggestions = () => {
              if (triggerSuggestions && !artist?.is_followed) {
                onVisible()
              }
            }

            return render ? (
              <Container
                ref={anchorRef as any}
                tabIndex={0}
                role="button"
                onKeyPress={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    this.handleFollow(event)
                    openSuggestions()
                  }
                }}
                onClick={e => {
                  this.handleFollow(e)
                  openSuggestions()
                }}
              >
                {" "}
                {/* @ts-expect-error STRICT_NULL_CHECK */}
                {render(artist)}
              </Container>
            ) : (
              <FollowButton
                ref={anchorRef}
                isFollowed={!!artist?.is_followed}
                handleFollow={e => {
                  this.handleFollow(e)
                  openSuggestions()
                }}
                buttonProps={buttonProps}
              />
            )
          }}
        </Popover>
      </Box>
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
