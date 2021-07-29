import React from "react"
import { Button } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerFollowButton_fair } from "v2/__generated__/FairOrganizerFollowButton_fair.graphql"

interface FairOrganizerFollowButtonProps {
  fair: FairOrganizerFollowButton_fair
}

export const FairOrganizerFollowButton: React.FC<FairOrganizerFollowButtonProps> = props => {
  const { fair } = props
  const { profile } = fair

  const handleClick = () => {
    console.log("[debug] follow button press")
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
        profile {
          internalID
          isFollowed
        }
      }
    `,
  }
)
