import { createFragmentContainer, graphql } from "react-relay"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { Rail } from "v2/Components/Rail"
import { extractNodes } from "v2/Utils/extractNodes"
import { AuctionPromotedSaleRail_sale } from "v2/__generated__/AuctionPromotedSaleRail_sale.graphql"

interface AuctionPromotedSaleRailProps {
  sale: AuctionPromotedSaleRail_sale
}

const AuctionPromotedSaleRail: React.FC<AuctionPromotedSaleRailProps> = ({
  sale,
}) => {
  if (!sale.promotedSale) {
    return null
  }

  const nodes = extractNodes(sale.promotedSale.saleArtworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Rail
        title="Buy Now"
        viewAllLabel="View All"
        viewAllHref={sale.promotedSale.href!}
        viewAllOnClick={() => {
          // TODO
          // Track promoted sale view all click
        }}
        getItems={() => {
          return nodes.map((node, index) => {
            return (
              <ShelfArtworkFragmentContainer
                artwork={node.artwork!}
                key={index}
                lazyLoad
              />
            )
          })
        }}
      />
    </>
  )
}

export const AuctionPromotedSaleRailFragmentContainer = createFragmentContainer(
  AuctionPromotedSaleRail,
  {
    sale: graphql`
      fragment AuctionPromotedSaleRail_sale on Sale {
        promotedSale {
          href
          internalID
          name
          saleArtworksConnection(first: 99) {
            edges {
              node {
                artwork {
                  ...ShelfArtwork_artwork
                }
              }
            }
          }
        }
      }
    `,
  }
)
