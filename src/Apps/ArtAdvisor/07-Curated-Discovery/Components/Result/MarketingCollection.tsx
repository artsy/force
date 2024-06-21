import { Box, Image } from "@artsy/palette"
import { DiscoveryMarketingCollections } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/MarketingCollectionsRail"
import { FC } from "react"

interface MarketingCollectionProps {
  marketingCollection: DiscoveryMarketingCollections
}

export const MarketingCollection: FC<MarketingCollectionProps> = ({
  marketingCollection,
}) => {
  return (
    <Box>
      <Image src={marketingCollection.imageUrl} height={300} />
      <a href={`/collection/${marketingCollection.slug}`} target="_blank">
        {marketingCollection.title}
      </a>
    </Box>
  )
}
