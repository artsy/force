import React from "react"
import { Box, Text, Separator } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { UpcomingAuctions_upcomingAuctions } from "v2/__generated__/UpcomingAuctions_upcomingAuctions.graphql"
import { CurrentAuctions_salesConnection } from "v2/__generated__/CurrentAuctions_salesConnection.graphql"
import { AuctionArtworksRailFragmentContainer } from "../Components/AuctionArtworksRail/AuctionArtworksRail"

export interface UpcomingAuctionsProps {
  salesConnection: CurrentAuctions_salesConnection
}

const UpcomingAuctions: React.FC<UpcomingAuctionsProps> = ({
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

export const UpcomingAuctionsFragmentContainer = createFragmentContainer(
  UpcomingAuctions,
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
