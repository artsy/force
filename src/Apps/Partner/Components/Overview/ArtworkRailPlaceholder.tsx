import { Box, BoxProps, Flex, Shelf, SkeletonText } from "@artsy/palette"
import { ShelfArtworkPlaceholder } from "Components/Artwork/ShelfArtwork"

export interface ArtworksRailPlaceholderProps extends BoxProps {
  count: number
}

export const ArtworksRailPlaceholder: React.FC<ArtworksRailPlaceholderProps> = ({
  count,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <SkeletonText variant="lg-display">Featured Artworks</SkeletonText>

        <SkeletonText>View all</SkeletonText>
      </Flex>

      <Shelf>
        {[...Array(count)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })}
      </Shelf>
    </Box>
  )
}
