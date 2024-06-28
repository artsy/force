import { Box, Image, Text } from "@artsy/palette"
import { DiscoveryMarketingCollection } from "Apps/ArtAdvisor/07-Curated-Discovery/types"
import { RouterLink } from "System/Components/RouterLink"
import { resize } from "Utils/resizer"
import { FC } from "react"

const IMAGE_HEIGHT = 240

interface MarketingCollectionProps {
  marketingCollection: DiscoveryMarketingCollection
}

export const MarketingCollection: FC<MarketingCollectionProps> = props => {
  const { marketingCollection } = props

  const resizedImage = resize(
    marketingCollection.imageUrl ||
      "https://www.artsy.net/images/missing_image.png",
    { height: IMAGE_HEIGHT }
  )

  return (
    <RouterLink
      to={`/collection/${marketingCollection.slug}`}
      textDecoration="none"
      overflow="hidden"
    >
      <Box>
        <Image src={resizedImage} height={IMAGE_HEIGHT} />
        <Text height={"4em"}>{marketingCollection.title}</Text>
      </Box>
    </RouterLink>
  )
}
