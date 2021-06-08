import { AuthContextModule, ContextModule, Intent } from "@artsy/cohesion"
import { Button, ButtonProps } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { FollowArtist2Button_artist } from "v2/__generated__/FollowArtist2Button_artist.graphql"
import { followArtistMutation } from "../Mutations/FollowArtistMutation"

interface FollowArtistButtonProps {
  artist: FollowArtist2Button_artist
  contextModule?: AuthContextModule
  buttonProps?: Partial<ButtonProps> // Pass palette props to button
}

export const BaseFollowArtistButton: React.FC<FollowArtistButtonProps> = ({
  artist,
  contextModule = ContextModule.artistHeader,
  buttonProps = {},
}) => {
  const { mediator, relayEnvironment, user } = useSystemContext()

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
      await followArtistMutation(
        relayEnvironment!,
        artist.internalID,
        artist.isFollowed!
      )
    }
  }

  return (
    <Button
      variant="secondaryOutline"
      width="100%"
      onClick={handleClick}
      {...buttonProps}
    >
      {artist.isFollowed ? "Following" : "Follow"}
    </Button>
  )
}

export const FollowArtist2ButtonFragmentContainer = createFragmentContainer(
  BaseFollowArtistButton,
  {
    artist: graphql`
      fragment FollowArtist2Button_artist on Artist {
        internalID
        slug
        name
        isFollowed
      }
    `,
  }
)
