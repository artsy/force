import * as React from "react"
import { Button } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerFollowButton_fairOrganizer$data } from "__generated__/FairOrganizerFollowButton_fairOrganizer.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { fairOrganizerFollowMutation } from "Apps/FairOrginizer/Mutations/FairOrganizerFollowMutation"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"

interface FairOrganizerFollowButtonProps {
  fairOrganizer: FairOrganizerFollowButton_fairOrganizer$data
}

export const FairOrganizerFollowButton: React.FC<FairOrganizerFollowButtonProps> = props => {
  const { fairOrganizer } = props
  const { profile } = fairOrganizer

  const { relayEnvironment, user } = useSystemContext()

  const { showAuthDialog } = useAuthDialog()

  const handleClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault()

    const isAuthenticated = () => {
      if (user) {
        return true
      }

      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to follow ${fairOrganizer.name}`
          },
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

    if (isAuthenticated()) {
      await fairOrganizerFollowMutation(relayEnvironment!, {
        id: profile!.id,
        profileID: profile!.internalID,
        isFollowed: !!profile!.isFollowed,
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

export const FairOrganizerFollowButtonFragmentContainer = createFragmentContainer(
  FairOrganizerFollowButton,
  {
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
  }
)
