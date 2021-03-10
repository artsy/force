import React from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { UpcomingAuctions_salesConnection } from "v2/__generated__/UpcomingAuctions_salesConnection.graphql"
import { AuctionArtworksRailFragmentContainer } from "../Components/AuctionArtworksRail/AuctionArtworksRail"

export interface UpcomingAuctionsProps {
  salesConnection: UpcomingAuctions_salesConnection
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
      fragment UpcomingAuctions_salesConnection on SaleConnection {
        edges {
          node {
            slug
            name
            href
            status
            formattedStartDateTime
            eventStartAt
            ...AuctionArtworksRail_sale
          }
        }
      }
    `,
  }
)
