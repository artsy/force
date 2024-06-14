import { Column, GridColumns, Spacer } from "@artsy/palette"
import { OtherAuctions_salesConnection$data } from "__generated__/OtherAuctions_salesConnection.graphql"
import { OtherAuctionsQuery } from "__generated__/OtherAuctionsQuery.graphql"
import { SystemContext } from "System/Contexts/SystemContext"
import { renderWithLoadProgress } from "System/Relay/renderWithLoadProgress"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { AuctionCardFragmentContainer } from "Components/AuctionCard"
import { useContext } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { Header } from "./OtherWorks/Header"
import { extractNodes } from "Utils/extractNodes"

interface OtherAuctionsProps {
  salesConnection: OtherAuctions_salesConnection$data
}
export const OtherAuctions: React.FC<OtherAuctionsProps> = ({
  salesConnection,
}) => {
  const sales = extractNodes(salesConnection)

  return (
    <>
      <Header title="Other auctions" buttonHref={sd.APP_URL + "/auctions"} />

      <Spacer y={4} />

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
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <SystemQueryRenderer<OtherAuctionsQuery>
      lazyLoad
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
