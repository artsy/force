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
import { FollowArtistButtonQuery } from "__generated__/FollowArtistButtonQuery.graphql"
import { FollowButton } from "./Button"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useFollowButtonTracking } from "./useFollowButtonTracking"
import { useMutation } from "Utils/Hooks/useMutation"
import { useAuthDialog } from "Components/AuthDialog"

interface FollowArtistButtonProps extends Omit<ButtonProps, "variant"> {
  artist: FollowArtistButton_artist$data
  contextModule?: AuthContextModule
  triggerSuggestions?: boolean
  onFollow?: (followed: boolean) => void
}

const FollowArtistButton: React.FC<FollowArtistButtonProps> = ({
  artist,
  contextModule = ContextModule.artistHeader,
  triggerSuggestions = false,
  onFollow,
  ...rest
}) => {
  const { isLoggedIn } = useSystemContext()

  const { trackFollow } = useFollowButtonTracking({
    ownerType: OwnerType.artist,
    ownerId: artist.internalID,
    ownerSlug: artist.slug,
    contextModule,
  })

  const count = artist.counts?.follows ?? 0

  const { submitMutation } = useMutation<FollowArtistButtonMutation>({
    mutation: graphql`
      mutation FollowArtistButtonMutation($input: FollowArtistInput!) {
        followArtist(input: $input) {
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
        artist: {
          id: artist.id,
          isFollowed: !artist.isFollowed,
          counts: {
            follows: artist.isFollowed // Not yet followed
              ? count - 1
              : count + 1,
          },
        },
      },
    },
    updater: (store, data) => {
      if (!data.followArtist?.artist) return

      const { artist } = data.followArtist

      const proxy = store.get(artist.id)

      if (!proxy) return

      const record = proxy.getLinkedRecord("counts")

      if (!record) return

      const nextCount = artist.isFollowed // Is followed now
        ? count + 1
        : count - 1

      record.setValue(nextCount, "follows")
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
  extends Omit<FollowArtistButtonProps, "artist"> {
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
            artist={props.artist}
          />
        )
      }}
    />
  )
}
