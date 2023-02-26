import { createFragmentContainer, graphql } from "react-relay"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { extractNodes } from "Utils/extractNodes"
import { AuctionBuyNowRail_sale$data } from "__generated__/AuctionBuyNowRail_sale.graphql"

interface AuctionBuyNowRailProps {
  sale: AuctionBuyNowRail_sale$data
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
