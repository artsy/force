import { ContextModule, Intent } from "@artsy/cohesion"
import { Button } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { FollowArtist2Button_artist } from "v2/__generated__/FollowArtist2Button_artist.graphql"
import { followArtistMutation } from "../Mutations/FollowArtistMutation"

interface FollowArtist2ButtonProps {
  artist: FollowArtist2Button_artist
}

const FollowArtist2Button: React.FC<FollowArtist2ButtonProps> = ({
  artist,
}) => {
  const { mediator, relayEnvironment, user } = useSystemContext()

  const isAuthenticated = () => {
    if (user) {
      return true
    } else {
      openAuthToFollowSave(mediator!, {
        contextModule: ContextModule.artistHeader,
        entity: {
          slug: artist.slug!,
          name: artist.name!,
        },
        intent: Intent.followArtist,
      })
    }
  }

  const handleClick = async () => {
    if (isAuthenticated()) {
      await followArtistMutation(
        relayEnvironment!,
        artist.internalID,
        artist.isFollowed!
      )
    }
  }

  return (
    <Button variant="secondaryOutline" width="100%" onClick={handleClick}>
      {artist.isFollowed ? "Following" : "Follow"}
    </Button>
  )
}

export const FollowArtist2ButtonFragmentContainer = createFragmentContainer(
  FollowArtist2Button,
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
