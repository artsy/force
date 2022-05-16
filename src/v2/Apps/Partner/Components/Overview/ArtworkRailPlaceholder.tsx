import {
  Box,
  BoxProps,
  Flex,
  Shelf,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { ARTWORK_CAROUSEL_ITEM_HEIGHT } from "./ArtworksRail"

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

      <Shelf alignItems="flex-start">
        {[...Array(count)].map((_, i) => {
          return (
            <Box width={[300, "100%"]} key={i}>
              <Box
                bg="black10"
                height={ARTWORK_CAROUSEL_ITEM_HEIGHT}
                width={[200, 400, 300, 350][i % 4]}
              >
                <SkeletonBox height="100%" width="100%" />
              </Box>

              <Flex
                mt={1}
                flexDirection="column"
                justifyContent="space-between"
              >
                <SkeletonText>Artwork Name</SkeletonText>
                <SkeletonText>Artwork Title</SkeletonText>
                <SkeletonText>Artwork Price</SkeletonText>
              </Flex>
            </Box>
          )
        })}
      </Shelf>
    </Box>
  )
}
