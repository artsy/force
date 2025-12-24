import {
  type AuthContextModule,
  ContextModule,
  Intent,
  OwnerType,
} from "@artsy/cohesion"
import type { ButtonProps } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useMutation } from "Utils/Hooks/useMutation"
import type { FollowArtistButtonMutation } from "__generated__/FollowArtistButtonMutation.graphql"
import type { FollowArtistButtonQuery } from "__generated__/FollowArtistButtonQuery.graphql"
import type { FollowArtistButton_artist$data } from "__generated__/FollowArtistButton_artist.graphql"
import type { FollowArtistButton_me$data } from "__generated__/FollowArtistButton_me.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FollowButton, type FollowButtonRenderProps } from "./Button"
import { useFollowButtonTracking } from "./useFollowButtonTracking"

interface FollowArtistButtonProps
  extends ButtonProps,
    React.PropsWithChildren<FollowButtonRenderProps> {
  artist: FollowArtistButton_artist$data
  contextModule?: AuthContextModule
  me: FollowArtistButton_me$data | null | undefined
  onFollow?: (followed: boolean) => void
}

const FollowArtistButton = ({
  artist,
  contextModule = ContextModule.artistHeader,
  me,
  onFollow,
  ...rest
}: FollowArtistButtonProps) => {
  const { isLoggedIn } = useSystemContext()

  const { trackFollow } = useFollowButtonTracking({
    ownerType: OwnerType.artist,
    ownerId: artist.internalID,
    ownerSlug: artist.slug,
    contextModule,
  })

  const artistCount = artist.counts?.follows ?? 0
  const meCount = me?.counts?.followedArtists ?? 0

  const { submitMutation } = useMutation<FollowArtistButtonMutation>({
    mutation: graphql`
      mutation FollowArtistButtonMutation($input: FollowArtistInput!) {
        followArtist(input: $input) {
          me {
            id
            counts {
              followedArtists
            }
          }
          artist {
            id
            isFollowed
            counts {
              follows
            }
          }
        }
      }
    `,
    optimisticResponse: {
      followArtist: {
        me: {
          id: me?.id ?? "logged-out",
          counts: {
            followedArtists: artist.isFollowed // Not yet followed
              ? meCount - 1
              : meCount + 1,
          },
        },
        artist: {
          id: artist.id,
          isFollowed: !artist.isFollowed,
          counts: {
            follows: artist.isFollowed // Not yet followed
              ? artistCount - 1
              : artistCount + 1,
          },
        },
      },
    },
    updater: (store, data) => {
      if (!data?.followArtist?.artist || !data?.followArtist.me) return

      const { artist, me } = data.followArtist

      const artistProxy = store.get(artist.id)
      const meProxy = store.get(me.id)

      if (!artistProxy || !meProxy) return

      const artistCountsProxy = artistProxy.getLinkedRecord("counts")
      const meCountsProxy = meProxy.getLinkedRecord("counts")

      if (!artistCountsProxy || !meCountsProxy) return

      artistCountsProxy.setValue(
        artist.isFollowed // Is followed now
          ? artistCount + 1
          : artistCount - 1,
        "follows",
      )

      meCountsProxy.setValue(
        artist.isFollowed // Is followed now
          ? meCount + 1
          : meCount - 1,
        "followedArtists",
      )
    },
  })

  const { showAuthDialog } = useAuthDialog()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      showAuthDialog({
        options: {
          title: `Sign up or log in to follow ${artist.name}`,
          afterAuthAction: {
            action: "follow",
            kind: "artist",
            objectId: artist.slug,
          },
          image: artist.coverArtwork?.image,
        },
        analytics: {
          intent: Intent.followArtist,
          contextModule,
        },
      })

      return
    }

    submitMutation({
      variables: {
        input: {
          artistID: artist.internalID,
          unfollow: artist.isFollowed,
        },
      },
    })

    onFollow?.(!artist.isFollowed)
    trackFollow(!!artist.isFollowed)
  }

  return (
    <FollowButton
      data-test="followArtistButton"
      isFollowed={!!artist.isFollowed}
      handleFollow={event => {
        handleClick(event)
      }}
      aria-label={
        artist.isFollowed ? `Unfollow ${artist.name}` : `Follow ${artist.name}`
      }
      {...rest}
    />
  )
}

export const FollowArtistButtonFragmentContainer = createFragmentContainer(
  FollowArtistButton,
  {
    me: graphql`
      fragment FollowArtistButton_me on Me {
        id
        counts {
          followedArtists
        }
      }
    `,
    artist: graphql`
      fragment FollowArtistButton_artist on Artist
      @argumentDefinitions(
        isLoggedIn: { type: "Boolean!", defaultValue: false }
      ) {
        id
        slug
        name
        internalID
        isFollowed @include(if: $isLoggedIn)
        counts {
          follows
        }
        coverArtwork {
          image {
            url(version: "x-large")
            aspectRatio
          }
        }
      }
    `,
  },
)

interface FollowArtistButtonQueryRendererProps
  extends Omit<FollowArtistButtonProps, "artist" | "me"> {
  id: string
}

export const FollowArtistButtonQueryRenderer = ({
  id,
  ...rest
}: FollowArtistButtonQueryRendererProps) => {
  const { isLoggedIn } = useSystemContext()
  return (
    <SystemQueryRenderer<FollowArtistButtonQuery>
      lazyLoad
      query={graphql`
        query FollowArtistButtonQuery($id: String!, $isLoggedIn: Boolean!) {
          me {
            ...FollowArtistButton_me
          }
          artist(id: $id) {
            ...FollowArtistButton_artist @arguments(isLoggedIn: $isLoggedIn)
          }
        }
      `}
      placeholder={<FollowButton {...rest} />}
      variables={{ id, isLoggedIn }}
      render={({ error, props }) => {
        if (error || !props?.artist) {
          return <FollowButton {...rest} />
        }

        return (
          <FollowArtistButtonFragmentContainer
            {...rest}
            me={props.me}
            artist={props.artist}
          />
        )
      }}
    />
  )
}
