import { Box, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { PastEventRailCellFragmentContainer as PastEventRailCell } from "./PastEventRailCell"
import { PastEventsRail_fairs } from "v2/__generated__/PastEventsRail_fairs.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

interface PastEventsRailProps {
  fairs: PastEventsRail_fairs
}

export const PastEventsRail: React.FC<PastEventsRailProps> = props => {
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
          return <PastEventRailCell key={fair.id} fair={fair} />
        })}
      </Shelf>
      <Spacer mb={6} />
    </Box>
  )
}

export const PastEventsRailFragmentContainer = createFragmentContainer(
  PastEventsRail,
  {
    fairs: graphql`
      fragment PastEventsRail_fairs on FairConnection {
        edges {
          node {
            id
            ...PastEventRailCell_fair
          }
        }
      }
    `,
  }
)
