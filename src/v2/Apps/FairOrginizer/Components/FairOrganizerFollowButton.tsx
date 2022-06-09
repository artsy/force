import * as React from "react"
import { Button } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerFollowButton_fairOrganizer } from "v2/__generated__/FairOrganizerFollowButton_fairOrganizer.graphql"
import { useSystemContext } from "v2/System"
import { fairOrganizerFollowMutation } from "../Mutations/FairOrganizerFollowMutation"
import { openAuthToSatisfyIntent } from "v2/Utils/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"

interface FairOrganizerFollowButtonProps {
  fairOrganizer: FairOrganizerFollowButton_fairOrganizer
}

export const FairOrganizerFollowButton: React.FC<FairOrganizerFollowButtonProps> = props => {
  const { fairOrganizer } = props
  const { profile } = fairOrganizer
  const { relayEnvironment, user, mediator } = useSystemContext()

  const handleClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault()

    const isAuthenticated = () => {
      if (user) {
        return true
      }

      openAuthToSatisfyIntent(mediator!, {
        contextModule: ContextModule.fairOrganizerHeader,
        entity: {
          slug: fairOrganizer.slug,
          name: fairOrganizer.name!,
        },
        intent: Intent.followPartner,
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
