import { Column, GridColumns, Spacer } from "@artsy/palette"
import { OtherAuctions_salesConnection } from "v2/__generated__/OtherAuctions_salesConnection.graphql"
import { OtherAuctionsQuery } from "v2/__generated__/OtherAuctionsQuery.graphql"
import { useSystemContext } from "v2/System"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { AuctionCardFragmentContainer } from "v2/Components/AuctionCard"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "./OtherWorks/Header"
import { extractNodes } from "v2/Utils/extractNodes"

interface OtherAuctionsProps {
  salesConnection: OtherAuctions_salesConnection
}
export const OtherAuctions: React.FC<OtherAuctionsProps> = ({
  salesConnection,
}) => {
  const sales = extractNodes(salesConnection)

  return (
    <>
      <Header title="Other auctions" buttonHref={sd.APP_URL + "/auctions"} />

      <Spacer mt={4} />

      <GridColumns gridRowGap={4}>
        {sales.map(sale => {
          return (
            <Column key={sale.internalID} span={3}>
              <AuctionCardFragmentContainer sale={sale} />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const OtherAuctionsFragmentContainer = createFragmentContainer(
  OtherAuctions,
  {
    salesConnection: graphql`
      fragment OtherAuctions_salesConnection on SaleConnection {
        edges {
          node {
            internalID
            ...AuctionCard_sale
          }
        }
      }
    `,
  }
)

export const OtherAuctionsQueryRenderer = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<OtherAuctionsQuery>
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
