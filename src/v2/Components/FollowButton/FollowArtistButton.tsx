import { AuthContextModule, Intent, ContextModule } from "@artsy/cohesion"
import { Box, ButtonProps, Popover } from "@artsy/palette"
import { FollowArtistButtonMutation } from "v2/__generated__/FollowArtistButtonMutation.graphql"
import { FollowArtistPopoverQueryRenderer } from "v2/Components/FollowArtistPopover"
import * as React from "react"
import { FollowArtistButton_artist } from "../../__generated__/FollowArtistButton_artist.graphql"
import { FollowArtistButtonQuery } from "../../__generated__/FollowArtistButtonQuery.graphql"
import { FollowButton } from "./Button"
import { createFragmentContainer, graphql } from "react-relay"
import { openAuthToSatisfyIntent } from "v2/Utils/openAuthModal"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useFollowButtonTracking } from "./useFollowButtonTracking"
import { useMutation } from "v2/Utils/Hooks/useMutation"

interface FollowArtistButtonProps extends Omit<ButtonProps, "variant"> {
  artist: FollowArtistButton_artist
  contextModule?: AuthContextModule
  triggerSuggestions?: boolean
}

const FollowArtistButton: React.FC<FollowArtistButtonProps> = ({
  artist,
  contextModule = ContextModule.artistHeader,
  triggerSuggestions = false,
  ...rest
}) => {
  const { isLoggedIn, mediator } = useSystemContext()

  const { trackFollow } = useFollowButtonTracking({
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

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      openAuthToSatisfyIntent(mediator!, {
        contextModule,
        entity: { name: artist.name!, slug: artist.slug },
        intent: Intent.followArtist,
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

    trackFollow(!!artist.isFollowed)
  }

  return (
    <Box data-test="followArtistButton">
      <Popover
        title="Other artists you might like"
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
              ref={anchorRef}
              isFollowed={!!artist.isFollowed}
              handleFollow={event => {
                handleClick(event)
                openSuggestions()
              }}
              buttonProps={rest}
            />
          )
        }}
      </Popover>
    </Box>
  )
}

export const FollowArtistButtonFragmentContainer = createFragmentContainer(
  FollowArtistButton,
  {
    artist: graphql`
      fragment FollowArtistButton_artist on Artist
        @argumentDefinitions(
          showFollowSuggestions: { type: "Boolean", defaultValue: false }
        ) {
        ...FollowArtistPopover_artist @include(if: $showFollowSuggestions)
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
      placeholder={<FollowButton buttonProps={rest} />}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.artist) {
          return <FollowButton buttonProps={rest} />
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
