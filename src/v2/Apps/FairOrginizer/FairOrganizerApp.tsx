import React from "react"
import { Text, Title } from "@artsy/palette"
import { FairOrganizerFollowButtonFragmentContainer as FairOrganizerFollowButton } from "./Components/FairOrganizerFollowButton"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerApp_fair } from "v2/__generated__/FairOrganizerApp_fair.graphql"

interface FairOrganizerAppProps {
  fair: FairOrganizerApp_fair
}

export const FairOrganizerApp: React.FC<FairOrganizerAppProps> = props => {
  const { fair } = props

  return (
    <>
      <Title>Fair Organizer | Artsy</Title>
      <Text as="h1" variant="lg" pt={4}>
        Fair Organizer
      </Text>
      <FairOrganizerFollowButton fair={fair} />
    </>
  )
}

export const FairOrganizerAppFragmentContainer = createFragmentContainer(
  FairOrganizerApp,
  {
    fair: graphql`
      fragment FairOrganizerApp_fair on Fair {
        ...FairOrganizerFollowButton_fair
      }
    `,
  }
)
