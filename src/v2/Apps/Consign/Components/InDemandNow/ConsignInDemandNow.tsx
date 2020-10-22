import React from "react"
import { Box, Separator, Text } from "@artsy/palette"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { useSystemContext } from "v2/Artsy"
import { graphql } from "react-relay"

import { ConsignInDemandNowQuery } from "v2/__generated__/ConsignInDemandNowQuery.graphql"
import { ConsignTopArtists } from "./ConsignTopArtists"

export const ConsignInDemandNow: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box>
      <Box>
        <Text variant="title">In demand now</Text>
        <Separator />
      </Box>

      <QueryRenderer<ConsignInDemandNowQuery>
        environment={relayEnvironment}
        variables={{
          artistInternalId: "4d8b928b4eb68a1b2c0001f2", // Picasso
          medium: "PAINTING",
        }}
        // FIXME: Must be logged in for diffusion data to work
        query={graphql`
          query ConsignInDemandNowQuery(
            $artistInternalId: ID!
            $medium: String!
          ) {
            marketPriceInsights(artistId: $artistInternalId, medium: $medium) {
              annualLotsSold
              annualValueSoldCents
              artistId
              artistName
              artsyQInventory
              createdAt
              demandRank
              demandTrend
              highRangeCents
              largeHighRangeCents
              largeLowRangeCents
              largeMidRangeCents
              liquidityRank
              lowRangeCents
              medianSaleToEstimateRatio
              medium
              mediumHighRangeCents
              mediumLowRangeCents
              mediumMidRangeCents
              midRangeCents
              sellThroughRate
              smallHighRangeCents
              smallLowRangeCents
              smallMidRangeCents
              updatedAt
            }
          }
        `}
        render={({ props, error }) => {
          // FIXME: Error handling
          if (error) {
            return null
          }
          // FIXME: Add skeleton loading state
          if (!props) {
            return null
          }

          return (
            <Box>
              <Box>Artist name: {props.marketPriceInsights?.artistName}</Box>
              <ConsignTopArtists />
            </Box>
          )
        }}
      />
    </Box>
  )
}
