import React from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { PastAuctions_salesConnection } from "v2/__generated__/PastAuctions_salesConnection.graphql"
import { AuctionArtworksRailFragmentContainer } from "../Components/AuctionArtworksRail/AuctionArtworksRail"

export interface PastAuctionsProps {
  salesConnection: PastAuctions_salesConnection
}

const PastAuctions: React.FC<PastAuctionsProps> = ({ salesConnection }) => {
  return (
    <Box>
      {salesConnection.edges.map(({ node }, index) => {
        return (
          <Box my={4} key={index}>
            <AuctionArtworksRailFragmentContainer sale={node} />
          </Box>
        )
      })}
    </Box>
  )
}

export const PastAuctionsFragmentContainer = createFragmentContainer(
  PastAuctions,
  {
    salesConnection: graphql`
      fragment PastAuctions_salesConnection on SaleConnection {
        edges {
          node {
            slug
            name
            href
            endAt
            ...AuctionArtworksRail_sale
          }
        }
      }
    `,
  }
)
