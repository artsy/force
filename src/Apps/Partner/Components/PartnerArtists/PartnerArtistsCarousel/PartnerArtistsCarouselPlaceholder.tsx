import { Box, Flex, Shelf, SkeletonBox, SkeletonText } from "@artsy/palette"
import * as React from "react"

export interface PartnerArtistsCarouselPlaceholderProps {
  count: number
}

export const PartnerArtistsCarouselPlaceholder: React.FC<PartnerArtistsCarouselPlaceholderProps> = ({
  count,
}) => {
  return (
    <Shelf alignItems="flex-start">
      {[...Array(count)].map((_, i) => {
        return (
          <Box key={i}>
            <SkeletonBox height={240} width={320} />

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
    </Shelf>
  )
}
