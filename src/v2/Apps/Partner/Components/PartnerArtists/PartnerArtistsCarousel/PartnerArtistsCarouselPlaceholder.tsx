import { Box, Flex, SkeletonBox, SkeletonText } from "@artsy/palette"
import * as React from "react";
import { Carousel } from "../../Carousel/Carousel"
import { ResponsiveImage } from "./PartnerArtistsCarouselItem"

export interface PartnerArtistsCarouselPlaceholderProps {
  count: number
}

export const PartnerArtistsCarouselPlaceholder: React.FC<PartnerArtistsCarouselPlaceholderProps> = ({
  count,
}) => {
  return (
    <Carousel itemsPerViewport={[2, 2, 3, 4]}>
      {[...Array(count)].map((_, i) => {
        return (
          <Box width={[300, "100%"]} key={i}>
            <ResponsiveImage>
              <SkeletonBox height="100%" width="100%" />
            </ResponsiveImage>

            <Flex mt={1} justifyContent="space-between">
              <Flex>
                <SkeletonBox mr={1} height={45} width={45} borderRadius="50%" />
                <Flex flexDirection="column">
                  <SkeletonText>Artist Name</SkeletonText>
                  <SkeletonText>Artist brief</SkeletonText>
                </Flex>
              </Flex>
              <SkeletonBox height={30} width={60} />
            </Flex>
          </Box>
        )
      })}
    </Carousel>
  )
}
