import { FC } from "react"
import { Box, Flex, Image } from "@artsy/palette"
import { DiscoveryArtwork } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArtworksRail"

interface ArtworkProps {
  artwork: DiscoveryArtwork
}

export const Artwork: FC<ArtworkProps> = props => {
  const { artwork } = props

  return (
    <Box>
      <Image src={artwork.imageUrl} height={300} />
      <Flex justifyContent="center">
        <a href={`/artwork/${artwork.slug}`} target="_blank">
          {artwork.title}
        </a>
      </Flex>
    </Box>
  )
}
