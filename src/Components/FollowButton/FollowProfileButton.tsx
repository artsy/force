import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { FollowButton } from "./Button"
import { FollowProfileButton_profile$data } from "__generated__/FollowProfileButton_profile.graphql"
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
import { ModalType } from "Components/Authentication/Types"

interface FollowProfileButtonProps extends Omit<ButtonProps, "variant"> {
  profile: FollowProfileButton_profile$data
  contextModule?: AuthContextModule
  onFollow?: (followed: boolean) => void
}

const FollowProfileButton: React.FC<FollowProfileButtonProps> = ({
  profile,
  contextModule = ContextModule.partnerHeader,
  onFollow,
  ...rest
}) => {
  const { isLoggedIn } = useSystemContext()

  const { trackFollow } = useFollowButtonTracking({
    ownerType: OwnerType.profile,
    ownerId: profile.internalID,
    ownerSlug: profile.slug,
    contextModule,
  })

  const { submitMutation } = useMutation({
    mutation: graphql`
      mutation FollowProfileButtonMutation($input: FollowProfileInput!) {
        followProfile(input: $input) {
          profile {
            id
            isFollowed
          }
        }
      }
    `,
    optimisticResponse: {
      followProfile: {
        profile: {
          id: profile.id,
          isFollowed: !profile.isFollowed,
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
        current: {
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
        },
        legacy: {
          afterSignUpAction: {
            action: "follow",
            kind: "profile",
            objectId: profile.slug,
          },
          contextModule,
          copy: `Sign up to follow ${profile.name}`,
          intent: Intent.followPartner,
          mode: ModalType.signup,
          redirectTo: window.location.href,
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
    profile: graphql`
      fragment FollowProfileButton_profile on Profile {
        id
        slug
        name
        internalID
        isFollowed
      }
    `,
  }
)

interface FollowProfileButtonQueryRendererProps
  extends Omit<FollowProfileButtonProps, "profile"> {
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
            profile={props.profile}
          />
        )
      }}
    />
  )
}
