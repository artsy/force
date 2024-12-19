import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { extractNodes } from "Utils/extractNodes"
import type { AuctionBuyNowRail_sale$data } from "__generated__/AuctionBuyNowRail_sale.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface AuctionBuyNowRailProps {
  sale: AuctionBuyNowRail_sale$data
}

const AuctionBuyNowRail: React.FC<
  React.PropsWithChildren<AuctionBuyNowRailProps>
> = ({ sale }) => {
  if (!sale.promotedSale) {
    return null
  }

  const nodes = extractNodes(sale.promotedSale.saleArtworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      title="Inquire"
      getItems={() => {
        return nodes.map((node, index) => {
          if (!node.artwork) {
            return <></>
          }
          return (
            <ShelfArtworkFragmentContainer
              artwork={node.artwork}
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
          saleArtworksConnection(first: 30) {
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
