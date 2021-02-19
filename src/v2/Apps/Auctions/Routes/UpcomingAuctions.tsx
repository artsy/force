import React from "react"
import { Box, Text, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { UpcomingAuctions_upcomingAuctions } from "v2/__generated__/UpcomingAuctions_upcomingAuctions.graphql"

export interface UpcomingAuctionsProps {
  upcomingAuctions: UpcomingAuctions_upcomingAuctions
}

const UpcomingAuctions: React.FC<UpcomingAuctionsProps> = ({
  upcomingAuctions,
}) => {
  return (
    <Box>
      <Text variant="largeTitle">Upcoming Auctions</Text>
      <Separator mt={1} mb={3} />
      {upcomingAuctions.edges.map(({ node }, index) => {
        return <Box my={4} key={index}></Box>
      })}
    </Box>
  )
}

export const UpcomingAuctionsFragmentContainer = createFragmentContainer(
  UpcomingAuctions,
  {
    upcomingAuctions: graphql`
      fragment UpcomingAuctions_upcomingAuctions on SaleConnection {
        edges {
          node {
            id
          }
        }
      }
    `,
  }
)
