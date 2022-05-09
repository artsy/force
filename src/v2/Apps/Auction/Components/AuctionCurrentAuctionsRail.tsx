import { createFragmentContainer, graphql } from "react-relay"
import { CellSaleFragmentContainer } from "v2/Components/Cells/CellSale"
import { Rail } from "v2/Components/Rail"
import { extractNodes } from "v2/Utils/extractNodes"
import { AuctionCurrentAuctionsRail_viewer } from "v2/__generated__/AuctionCurrentAuctionsRail_viewer.graphql"

interface AuctionCurrentAuctionsRailProps {
  viewer: AuctionCurrentAuctionsRail_viewer
}

const AuctionCurrentAuctionsRail: React.FC<AuctionCurrentAuctionsRailProps> = ({
  viewer,
}) => {
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

export const AuctionCurrentAuctionsRailFragmentContainer = createFragmentContainer(
  AuctionCurrentAuctionsRail,
  {
    viewer: graphql`
      fragment AuctionCurrentAuctionsRail_viewer on Viewer {
        salesConnection(
          first: 99
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
  }
)
