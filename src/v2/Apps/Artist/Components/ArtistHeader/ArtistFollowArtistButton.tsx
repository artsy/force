import {
  AuthContextModule,
  ContextModule,
  FollowedArgs,
  followedArtist,
  Intent,
  unfollowedArtist,
} from "@artsy/cohesion"
import { Button, ButtonProps } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext, useSystemContext } from "v2/System"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { ArtistFollowArtistButton_artist } from "v2/__generated__/ArtistFollowArtistButton_artist.graphql"
import { followArtistMutation } from "./Mutations/FollowArtistMutation"

interface FollowArtistButtonProps {
  artist: ArtistFollowArtistButton_artist
  contextModule?: AuthContextModule
  buttonProps?: Partial<ButtonProps> // Pass palette props to button
}

export const ArtistFollowArtistButton: React.FC<FollowArtistButtonProps> = ({
  artist,
  contextModule = ContextModule.artistHeader,
  buttonProps = {},
}) => {
  const tracking = useTracking()
  const { mediator, relayEnvironment, user } = useSystemContext()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const isAuthenticated = () => {
    if (user) {
      return true
    } else {
      openAuthToFollowSave(mediator!, {
        contextModule,
        entity: {
          slug: artist.slug!,
          name: artist.name!,
        },
        intent: Intent.followArtist,
      })
    }
  }

  const handleClick = async event => {
    event.preventDefault()

    if (isAuthenticated()) {
      trackEvent()

      await followArtistMutation(
        relayEnvironment!,
        artist.internalID,
        artist.isFollowed!
      )
    }
  }

  const trackEvent = () => {
    const args: FollowedArgs = {
      contextModule,
      contextOwnerId: contextPageOwnerId,
      contextOwnerSlug: contextPageOwnerSlug,
      contextOwnerType: contextPageOwnerType!,
      ownerId: artist.internalID,
      ownerSlug: artist.slug,
    }

    const trackingData = artist.isFollowed
      ? unfollowedArtist(args)
      : followedArtist(args)

    tracking.trackEvent(trackingData)
  }

  return (
    <Button
      variant="secondaryOutline"
      width="100%"
      onClick={handleClick}
      data-test="followButton"
      {...buttonProps}
    >
      {artist.isFollowed ? "Following" : "Follow"}
    </Button>
  )
}

export const ArtistFollowArtistButtonFragmentContainer = createFragmentContainer(
  ArtistFollowArtistButton,
  {
    artist: graphql`
      fragment ArtistFollowArtistButton_artist on Artist {
        internalID
        slug
        name
        isFollowed
      }
    `,
  }
)
