import { createFragmentContainer, graphql } from "react-relay"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { Rail } from "v2/Components/Rail"
import { extractNodes } from "v2/Utils/extractNodes"
import { AuctionBuyNowRail_sale } from "v2/__generated__/AuctionBuyNowRail_sale.graphql"

interface AuctionBuyNowRailProps {
  sale: AuctionBuyNowRail_sale
}

const AuctionBuyNowRail: React.FC<AuctionBuyNowRailProps> = ({ sale }) => {
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
        getItems={() => {
          return nodes.map((node, index) => {
            return (
              <ShelfArtworkFragmentContainer
                artwork={node.artwork!}
                key={index}
                lazyLoad
                // TODO
                // contextModule=""
              />
            )
          })
        }}
      />
    </>
  )
}

export const AuctionBuyNowRailFragmentContainer = createFragmentContainer(
  AuctionBuyNowRail,
  {
    sale: graphql`
      fragment AuctionBuyNowRail_sale on Sale {
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
