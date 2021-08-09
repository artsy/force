import { Box, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairOrganizerPastEventRailCellFragmentContainer as FairOrganizerPastEventRailCell } from "./FairOrganizerPastEventRailCell"
import { FairOrganizerPastEventsRail_fairs } from "v2/__generated__/FairOrganizerPastEventsRail_fairs.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

interface FairOrganizerPastEventsRailProps {
  fairs: FairOrganizerPastEventsRail_fairs
}

export const FairOrganizerPastEventsRail: React.FC<FairOrganizerPastEventsRailProps> = props => {
  const { fairs } = props
  const pastFairs = extractNodes(fairs)

  if (pastFairs.length === 0) {
    return null
  }

  return (
    <Box mt={2}>
      <Text variant="lg" as="h3" mb={4}>
        Past Events
      </Text>
      <Shelf>
        {pastFairs.map(fair => {
          return <FairOrganizerPastEventRailCell key={fair.id} fair={fair} />
        })}
      </Shelf>
      <Spacer mb={6} />
    </Box>
  )
}

export const FairOrganizerPastEventsRailFragmentContainer = createFragmentContainer(
  FairOrganizerPastEventsRail,
  {
    fairs: graphql`
      fragment FairOrganizerPastEventsRail_fairs on FairConnection {
        edges {
          node {
            id
            ...FairOrganizerPastEventRailCell_fair
          }
        }
      }
    `,
  }
)
