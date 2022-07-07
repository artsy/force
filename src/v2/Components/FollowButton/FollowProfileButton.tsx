import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System/useSystemContext"
import { FollowButton } from "./Button"
import { FollowProfileButton_profile } from "v2/__generated__/FollowProfileButton_profile.graphql"
import { ButtonProps } from "@artsy/palette"
import { openAuthToSatisfyIntent } from "v2/Utils/openAuthModal"
import { Intent, AuthContextModule, ContextModule } from "@artsy/cohesion"
import { useMutation } from "v2/Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "./useFollowButtonTracking"

interface FollowProfileButtonProps extends Omit<ButtonProps, "variant"> {
  profile: FollowProfileButton_profile
  contextModule?: AuthContextModule
  onFollow?: (followed: boolean) => void
}

const FollowProfileButton: React.FC<FollowProfileButtonProps> = ({
  profile,
  contextModule = ContextModule.partnerHeader,
  onFollow,
  ...rest
}) => {
  const { isLoggedIn, mediator } = useSystemContext()

  const { trackFollow } = useFollowButtonTracking({
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

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (!isLoggedIn) {
      openAuthToSatisfyIntent(mediator!, {
        entity: { name: profile.name!, slug: profile.slug },
        contextModule,
        intent: Intent.followPartner,
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

// TODO: QueryRenderer (requires top-level profile field in Metaphysics)
