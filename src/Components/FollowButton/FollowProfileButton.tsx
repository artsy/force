import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FollowButton, FollowButtonRenderProps } from "./Button"
import { FollowProfileButton_profile$data } from "__generated__/FollowProfileButton_profile.graphql"
import { FollowProfileButton_me$data } from "__generated__/FollowProfileButton_me.graphql"
import { ButtonProps } from "@artsy/palette"
import {
  Intent,
  AuthContextModule,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "./useFollowButtonTracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { FollowProfileButtonQuery } from "__generated__/FollowProfileButtonQuery.graphql"
import { useAuthDialog } from "Components/AuthDialog"

interface FollowProfileButtonProps extends Omit<ButtonProps, "variant"> {
  children?: FollowButtonRenderProps
  me: FollowProfileButton_me$data | null | undefined
  contextModule?: AuthContextModule
  onFollow?: (followed: boolean) => void
  profile: FollowProfileButton_profile$data
}

const FollowProfileButton: React.FC<FollowProfileButtonProps> = ({
  contextModule = ContextModule.partnerHeader,
  me,
  onFollow,
  profile,
  ...rest
}) => {
  const { isLoggedIn } = useSystemContext()

  const { trackFollow } = useFollowButtonTracking({
    ownerType: OwnerType.profile,
    ownerId: profile.internalID,
    ownerSlug: profile.slug,
    contextModule,
  })

  const profileCount = profile.counts?.follows ?? 0
  const meCount = me?.counts?.followedProfiles ?? 0

  const { submitMutation } = useMutation({
    mutation: graphql`
      mutation FollowProfileButtonMutation($input: FollowProfileInput!) {
        followProfile(input: $input) {
          me {
            id
            counts {
              followedProfiles
            }
          }
          profile {
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
      followProfile: {
        me: {
          id: me?.id ?? "logged-out",
          counts: {
            followedProfiles: profile.isFollowed ? meCount - 1 : meCount + 1,
          },
        },
        profile: {
          id: profile.id,
          isFollowed: !profile.isFollowed,
          counts: {
            follows: profile.isFollowed ? profileCount - 1 : profileCount + 1,
          },
        },
      },
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
            return `${action} to follow ${profile.name}`
          },
          afterAuthAction: {
            action: "follow",
            kind: "profile",
            objectId: profile.slug,
          },
        },
        analytics: {
          intent: Intent.followPartner,
          contextModule,
        },
      })

      return
    }

    submitMutation({
      variables: {
        input: {
          profileID: profile.internalID,
          unfollow: profile.isFollowed,
        },
      },
    })

    onFollow?.(!profile.isFollowed)
    trackFollow(!!profile.isFollowed)
  }

  return (
    <FollowButton
      isFollowed={!!profile.isFollowed}
      handleFollow={handleClick}
      aria-label={
        profile.isFollowed
          ? `Unfollow ${profile.name}`
          : `Follow ${profile.name}`
      }
      {...rest}
    />
  )
}

export const FollowProfileButtonFragmentContainer = createFragmentContainer(
  FollowProfileButton,
  {
    me: graphql`
      fragment FollowProfileButton_me on Me {
        id
        counts {
          followedProfiles
        }
      }
    `,
    profile: graphql`
      fragment FollowProfileButton_profile on Profile {
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

interface FollowProfileButtonQueryRendererProps
  extends Omit<FollowProfileButtonProps, "profile" | "me"> {
  id: string
}

export const FollowProfileButtonQueryRenderer: React.FC<FollowProfileButtonQueryRendererProps> = ({
  id,
  ...rest
}) => {
  return (
    <SystemQueryRenderer<FollowProfileButtonQuery>
      lazyLoad
      query={graphql`
        query FollowProfileButtonQuery($id: String!) {
          me {
            ...FollowProfileButton_me
          }
          profile(id: $id) {
            ...FollowProfileButton_profile
          }
        }
      `}
      placeholder={<FollowButton {...rest} />}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.profile) {
          return <FollowButton {...rest} />
        }

        return (
          <FollowProfileButtonFragmentContainer
            {...rest}
            me={props.me}
            profile={props.profile}
          />
        )
      }}
    />
  )
}
