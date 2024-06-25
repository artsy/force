import { FC } from "react"
import { Box, Image, Link, Text } from "@artsy/palette"
import { DiscoveryArtwork } from "Apps/ArtAdvisor/07-Curated-Discovery/Components/Result/ArtworksRail"

interface ArtworkProps {
  artwork: DiscoveryArtwork
}

export const Artwork: FC<ArtworkProps> = props => {
  const { artwork } = props

  return (
    <Link href={`/artwork/${artwork.slug}`} target="artwork">
      <Box>
        <Image src={artwork.imageUrl} height={300} />
        <Box textAlign={"center"}>
          <Text>{artwork.title}</Text>
          <Text>{artwork.price}</Text>
        </Box>
      </Box>
    </Link>
  )
}
