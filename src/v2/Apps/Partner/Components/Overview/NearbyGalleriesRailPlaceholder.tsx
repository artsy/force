import {
  Box,
  BoxProps,
  Flex,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { Carousel } from "../Carousel"

export interface NearbyGalleriesRailPlaceholderProps extends BoxProps {
  count: number
}

export const NearbyGalleriesRailPlaceholder: React.FC<NearbyGalleriesRailPlaceholderProps> = ({
  count,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Flex mb={4} justifyContent="space-between" alignItems="center">
        <SkeletonText variant="lg-display">Nearby Galleries</SkeletonText>
      </Flex>

      <Carousel itemsPerViewport={[2, 2, 3]}>
        {[...Array(count)].map((_, i) => {
          return (
            <Box width={[300, "100%"]} key={i}>
              <ResponsiveBox
                aspectWidth={4}
                aspectHeight={3}
                maxWidth="100%"
                bg="black10"
              >
                <SkeletonBox height="100%" width="100%" />
              </ResponsiveBox>

              <Flex mt={1} justifyContent="space-between">
                <Box>
                  <SkeletonText variant="lg-display">Gallery Name</SkeletonText>
                  <SkeletonText>Gallery location</SkeletonText>
                </Box>
                <SkeletonBox height={32} width={90} />
              </Flex>
            </Box>
          )
        })}
      </Carousel>
    </Box>
  )
}
