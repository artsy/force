import React from "react"
import { Box, Text, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { PastAuctions_pastAuctions } from "v2/__generated__/PastAuctions_pastAuctions.graphql"

export interface PastAuctionsProps {
  pastAuctions: PastAuctions_pastAuctions
}

export const PastAuctions: React.FC<PastAuctionsProps> = ({ pastAuctions }) => {
  return (
    <Box>
      <Text variant="largeTitle">Past Auctions</Text>
      <Separator mt={1} mb={3} />
      {pastAuctions.edges.map(({ node }, index) => {
        return <Box my={4} key={index}></Box>
      })}
    </Box>
  )
}

export const PastAuctionsFragmentContainer = createFragmentContainer(
  PastAuctions,
  {
    pastAuctions: graphql`
      fragment PastAuctions_pastAuctions on SaleConnection {
        edges {
          node {
            id
          }
        }
      }
    `,
  }
)
