import React from "react"
import { Box, Text, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { CurrentAuctions_currentAuctions } from "v2/__generated__/CurrentAuctions_currentAuctions.graphql"

export interface CurrentAuctionsProps {
  currentAuctions: CurrentAuctions_currentAuctions
}

const CurrentAuctions: React.FC<CurrentAuctionsProps> = ({
  currentAuctions,
}) => {
  return (
    <Box>
      <Text variant="largeTitle">Current Auctions</Text>
      <Separator mt={1} mb={3} />
      {currentAuctions.edges.map(({ node }, index) => {
        return <Box my={4} key={index}></Box>
      })}
    </Box>
  )
}

export const CurrentAuctionsFragmentContainer = createFragmentContainer(
  CurrentAuctions,
  {
    currentAuctions: graphql`
      fragment CurrentAuctions_currentAuctions on SaleConnection {
        edges {
          node {
            id
          }
        }
      }
    `,
  }
)
