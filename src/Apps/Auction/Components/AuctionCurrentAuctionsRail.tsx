import { CellSaleFragmentContainer } from "Components/Cells/CellSale"
import { Rail } from "Components/Rail/Rail"
import { extractNodes } from "Utils/extractNodes"
import type { AuctionCurrentAuctionsRail_viewer$data } from "__generated__/AuctionCurrentAuctionsRail_viewer.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface AuctionCurrentAuctionsRailProps {
  viewer: AuctionCurrentAuctionsRail_viewer$data
}

const AuctionCurrentAuctionsRail: React.FC<
  React.PropsWithChildren<AuctionCurrentAuctionsRailProps>
> = ({ viewer }) => {
  const nodes = extractNodes(viewer.salesConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Rail
        title="Current Auctions"
        viewAllHref="/auctions"
        viewAllLabel="View all Auctions"
        alignItems="flex-start"
        getItems={() => {
          return nodes.map((node, index) => {
            return <CellSaleFragmentContainer sale={node} key={index} />
          })
        }}
      />
    </>
  )
}

export const AuctionCurrentAuctionsRailFragmentContainer =
  createFragmentContainer(AuctionCurrentAuctionsRail, {
    viewer: graphql`
      fragment AuctionCurrentAuctionsRail_viewer on Viewer {
        salesConnection(
          first: 30
          published: true
          live: true
          sort: LICENSED_TIMELY_AT_NAME_DESC
        ) {
          edges {
            node {
              ...CellSale_sale
            }
          }
        }
      }
    `,
  })
