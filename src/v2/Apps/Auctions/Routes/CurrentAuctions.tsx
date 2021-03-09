import React from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { CurrentAuctions_salesConnection } from "v2/__generated__/CurrentAuctions_salesConnection.graphql"
import { AuctionArtworksRailFragmentContainer } from "../Components/AuctionArtworksRail/AuctionArtworksRail"

export interface CurrentAuctionsProps {
  salesConnection: CurrentAuctions_salesConnection
}

const CurrentAuctions: React.FC<CurrentAuctionsProps> = ({
  salesConnection,
}) => {
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

export const CurrentAuctionsFragmentContainer = createFragmentContainer(
  CurrentAuctions,
  {
    salesConnection: graphql`
      fragment CurrentAuctions_salesConnection on SaleConnection {
        edges {
          node {
            slug
            name
            href
            liveStartAt
            ...AuctionArtworksRail_sale
          }
        }
      }
    `,
  }
)
