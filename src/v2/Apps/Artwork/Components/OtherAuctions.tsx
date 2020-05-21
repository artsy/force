import { Box, Flex } from "@artsy/palette"
import { OtherAuctions_salesConnection } from "v2/__generated__/OtherAuctions_salesConnection.graphql"
import { OtherAuctionsQuery } from "v2/__generated__/OtherAuctionsQuery.graphql"
import { SystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { AuctionCardFragmentContainer as AuctionCard } from "v2/Components/AuctionCard"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "./OtherWorks/Header"

interface OtherAuctionsProps {
  salesConnection: OtherAuctions_salesConnection
}
export class OtherAuctions extends React.Component<OtherAuctionsProps> {
  render() {
    return (
      <Box mt={6}>
        <Header title="Other auctions" buttonHref={sd.APP_URL + "/auctions"} />
        <Flex flexWrap="wrap" mr={-2} width="100%">
          {this.props.salesConnection.edges.map(({ node: auction }, index) => {
            return (
              <Box pr={2} mb={[1, 4]} width={["100%", "25%"]} key={index}>
                <AuctionCard sale={auction} />
              </Box>
            )
          })}
        </Flex>
      </Box>
    )
  }
}

export const OtherAuctionsFragmentContainer = createFragmentContainer(
  OtherAuctions,
  {
    salesConnection: graphql`
      fragment OtherAuctions_salesConnection on SaleConnection {
        edges {
          node {
            ...AuctionCard_sale
          }
        }
      }
    `,
  }
)

export const OtherAuctionsQueryRenderer = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<OtherAuctionsQuery>
      environment={relayEnvironment}
      variables={{ first: 4, sort: "TIMELY_AT_NAME_ASC" }}
      query={graphql`
        query OtherAuctionsQuery($first: Int, $sort: SaleSorts) {
          salesConnection(first: $first, sort: $sort) {
            ...OtherAuctions_salesConnection
          }
        }
      `}
      render={renderWithLoadProgress(OtherAuctionsFragmentContainer)}
    />
  )
}
