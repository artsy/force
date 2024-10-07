import { graphql, useFragment } from "react-relay"
import { ShelfArtwork } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { extractNodes } from "Utils/extractNodes"
import { AuctionBuyNowRail_sale$key } from "__generated__/AuctionBuyNowRail_sale.graphql"

interface AuctionBuyNowRailProps {
  sale: AuctionBuyNowRail_sale$key
}

export const AuctionBuyNowRail: React.FC<AuctionBuyNowRailProps> = ({
  sale,
}) => {
  const saleData = useFragment(SALE_FRAGMENT, sale)
  if (!saleData.promotedSale) {
    return null
  }

  const nodes = extractNodes(saleData.promotedSale.saleArtworksConnection)

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
            <ShelfArtwork
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

const SALE_FRAGMENT = graphql`
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
`
