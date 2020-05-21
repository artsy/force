import { FeaturedAuctions_auctions } from "v2/__generated__/FeaturedAuctions_auctions.graphql"
import {
  FeaturedRail,
  FeaturedRailCarousel,
  RailMetadata,
} from "v2/Apps/FeatureAKG/Components/FeaturedRails"
import { AnalyticsSchema } from "v2/Artsy"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface FeaturedAuctionsRailProps {
  auctions: FeaturedAuctions_auctions
  railMetadata: RailMetadata
}

const FeaturedAuctionsRail: React.FC<FeaturedAuctionsRailProps> = props => {
  const { title, subtitle, items } = props.railMetadata
  const { auctions } = props

  if (!auctions?.edges?.length) {
    return null
  }

  const itemsForCarousel = auctions.edges.map(auction => {
    const matchingAuctionFromSpreadsheet = items.find(
      item => item.id === auction.node.slug
    )

    if (matchingAuctionFromSpreadsheet) {
      return {
        ...auction,
        imageSrc: matchingAuctionFromSpreadsheet.image_src,
        subtitle: "Auction",
        title: auction.node.name,
        href: auction.node.href,
      }
    } else {
      return null
    }
  })

  if (compact(itemsForCarousel).length > 0) {
    return (
      <FeaturedRail title={title} subtitle={subtitle}>
        <FeaturedRailCarousel
          itemsForCarousel={compact(itemsForCarousel)}
          contextModule={AnalyticsSchema.ContextModule.BrowseAuctions}
        />
      </FeaturedRail>
    )
  } else {
    return null
  }
}

export const FeaturedAuctionsRailFragmentContainer = createFragmentContainer(
  FeaturedAuctionsRail,
  {
    auctions: graphql`
      fragment FeaturedAuctions_auctions on SaleConnection {
        edges {
          node {
            slug
            name
            href
          }
        }
      }
    `,
  }
)
