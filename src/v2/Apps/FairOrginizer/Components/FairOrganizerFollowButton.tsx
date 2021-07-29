import React from "react"
import { Button } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerFollowButton_fair } from "v2/__generated__/FairOrganizerFollowButton_fair.graphql"
import { useSystemContext } from "v2/System"
import { fairOrganizerFollowMutation } from "../Mutations/FairOrganizerFollowMutation"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"

interface FairOrganizerFollowButtonProps {
  fair: FairOrganizerFollowButton_fair
}

export const FairOrganizerFollowButton: React.FC<FairOrganizerFollowButtonProps> = props => {
  const { fair } = props
  const { profile } = fair
  const { relayEnvironment, user, mediator } = useSystemContext()

  const handleClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.preventDefault()

    const isAuthenticated = () => {
      if (user) {
        return true
      }

      openAuthToFollowSave(mediator!, {
        // TODO: Replace on Fair Organizer
        contextModule: ContextModule.fairInfo,
        entity: {
          slug: fair.slug,
          name: fair.name!,
        },
        // TODO: Replace on followFair
        intent: Intent.followGene,
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
    <Button variant="secondaryOutline" size="large" onClick={handleClick}>
      {profile?.isFollowed ? "Following" : "Follow"}
    </Button>
  )
}

export const FairOrganizerFollowButtonFragmentContainer = createFragmentContainer(
  FairOrganizerFollowButton,
  {
    fair: graphql`
      fragment FairOrganizerFollowButton_fair on Fair {
        id
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
