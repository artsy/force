import { Box, Flex, Image } from "@artsy/palette"
import { DiscoveryMarketingCollection } from "Apps/ArtAdvisor/07-Curated-Discovery/types"
import { FC } from "react"

interface MarketingCollectionProps {
  marketingCollection: DiscoveryMarketingCollection
}

export const MarketingCollection: FC<MarketingCollectionProps> = ({
  marketingCollection,
}) => {
  return (
    <Box>
      <Image src={marketingCollection.imageUrl} height={300} />
      <Flex justifyContent="center">
        <a href={`/collection/${marketingCollection.slug}`} target="_blank">
          {marketingCollection.title}
        </a>
      </Flex>
    </Box>
  )
}
