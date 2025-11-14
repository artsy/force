import { ContextModule, Intent } from "@artsy/cohesion"
import { Button } from "@artsy/palette"
import { fairOrganizerFollowMutation } from "Apps/FairOrginizer/Mutations/FairOrganizerFollowMutation"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { FairOrganizerFollowButton_fairOrganizer$data } from "__generated__/FairOrganizerFollowButton_fairOrganizer.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface FairOrganizerFollowButtonProps {
  fairOrganizer: FairOrganizerFollowButton_fairOrganizer$data
}

export const FairOrganizerFollowButton: React.FC<
  React.PropsWithChildren<FairOrganizerFollowButtonProps>
> = props => {
  const { fairOrganizer } = props
  const { profile } = fairOrganizer

  const { relayEnvironment, user } = useSystemContext()

  const { showAuthDialog } = useAuthDialog()

  const handleClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.preventDefault()

    const isAuthenticated = () => {
      if (user) {
        return true
      }

      showAuthDialog({
        options: {
          title: `Sign up or log in to follow ${fairOrganizer.name}`,
          afterAuthAction: {
            kind: "profile",
            action: "follow",
            objectId: fairOrganizer.slug,
          },
        },
        analytics: {
          intent: Intent.followPartner,
          contextModule: ContextModule.fairOrganizerHeader,
        },
      })
    }

    if (isAuthenticated() && profile) {
      await fairOrganizerFollowMutation(relayEnvironment, {
        id: profile.id,
        profileID: profile.internalID,
        isFollowed: !!profile.isFollowed,
      })
    }
  }

  return (
    <Button
      variant="secondaryBlack"
      size="large"
      display="block"
      width="100%"
      onClick={handleClick}
    >
      {profile?.isFollowed ? "Following" : "Follow"}
    </Button>
  )
}

export const FairOrganizerFollowButtonFragmentContainer =
  createFragmentContainer(FairOrganizerFollowButton, {
    fairOrganizer: graphql`
      fragment FairOrganizerFollowButton_fairOrganizer on FairOrganizer {
        slug
        name
        profile {
          id
          internalID
          isFollowed
        }
      }
    `,
  })
