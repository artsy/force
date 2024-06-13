import {
  AuthContextModule,
  Intent,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { ButtonProps, Popover } from "@artsy/palette"
import { FollowArtistButtonMutation } from "__generated__/FollowArtistButtonMutation.graphql"
import { FollowArtistPopoverQueryRenderer } from "Components/FollowArtistPopover"
import * as React from "react"
import { FollowArtistButton_artist$data } from "__generated__/FollowArtistButton_artist.graphql"
import { FollowArtistButton_me$data } from "__generated__/FollowArtistButton_me.graphql"
import { FollowArtistButtonQuery } from "__generated__/FollowArtistButtonQuery.graphql"
import { FollowButton, FollowButtonRenderProps } from "./Button"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useFollowButtonTracking } from "./useFollowButtonTracking"
import { useMutation } from "Utils/Hooks/useMutation"
import { useAuthDialog } from "Components/AuthDialog"

interface FollowArtistButtonProps extends ButtonProps {
  artist: FollowArtistButton_artist$data
  children?: FollowButtonRenderProps
  contextModule?: AuthContextModule
  me: FollowArtistButton_me$data | null | undefined
  onFollow?: (followed: boolean) => void
  triggerSuggestions?: boolean
}

const FollowArtistButton: React.FC<FollowArtistButtonProps> = ({
  artist,
  contextModule = ContextModule.artistHeader,
  me,
  onFollow,
  triggerSuggestions = false,
  ...rest
}) => {
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
      if (!data.followArtist?.artist || !data.followArtist.me) return

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
        "follows"
      )

      meCountsProxy.setValue(
        artist.isFollowed // Is followed now
          ? meCount + 1
          : meCount - 1,
        "followedArtists"
      )
    },
  })

  const { showAuthDialog } = useAuthDialog()

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to follow ${artist.name}`
          },
          afterAuthAction: {
            action: "follow",
            kind: "artist",
            objectId: artist.slug,
          },
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
    <Popover
      placement="bottom"
      popover={
        artist ? (
          <FollowArtistPopoverQueryRenderer artistID={artist.internalID} />
        ) : null
      }
    >
      {({ anchorRef, onVisible }) => {
        const openSuggestions = () => {
          if (isLoggedIn && triggerSuggestions && !artist.isFollowed) {
            onVisible()
          }
        }

        return (
          <FollowButton
            data-test="followArtistButton"
            ref={anchorRef}
            isFollowed={!!artist.isFollowed}
            handleFollow={event => {
              handleClick(event)
              openSuggestions()
            }}
            aria-label={
              artist.isFollowed
                ? `Unfollow ${artist.name}`
                : `Follow ${artist.name}`
            }
            {...rest}
          />
        )
      }}
    </Popover>
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
      fragment FollowArtistButton_artist on Artist {
        id
        slug
        name
        internalID
        isFollowed
        counts {
          follows
        }
      }
    `,
  }
)

interface FollowArtistButtonQueryRendererProps
  extends Omit<FollowArtistButtonProps, "artist" | "me"> {
  id: string
}

export const FollowArtistButtonQueryRenderer: React.FC<FollowArtistButtonQueryRendererProps> = ({
  id,
  ...rest
}) => {
  return (
    <SystemQueryRenderer<FollowArtistButtonQuery>
      lazyLoad
      query={graphql`
        query FollowArtistButtonQuery($id: String!) {
          me {
            ...FollowArtistButton_me
          }
          artist(id: $id) {
            ...FollowArtistButton_artist
          }
        }
      `}
      placeholder={<FollowButton {...rest} />}
      variables={{ id }}
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
