import React from "react"
import { auctionHeights } from "../Utils/auctionsHelpers"
import { Box, SkeletonBox, SkeletonText } from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"

interface FairExhibitorRailPlaceholderProps {
  done?: boolean
}

export const AuctionArtworksRailPlaceholder: React.FC<FairExhibitorRailPlaceholderProps> = ({
  done = true,
}) => (
  <Box height={auctionHeights.artworksRail}>
    <Carousel arrowHeight={auctionHeights.artworksImage}>
      {[...new Array(10)].map((_, i) => {
        return (
          <Box key={i}>
            <SkeletonBox
              width={220}
              height={auctionHeights.artworksImage}
              mb={1}
              done={done}
            />

            <SkeletonText variant="mediumText" done={done}>
              Artist Name
            </SkeletonText>

            <SkeletonText variant="text" done={done}>
              Artwork Title
            </SkeletonText>

            <SkeletonText variant="text" done={done}>
              Price
            </SkeletonText>
          </Box>
        )
      })}
    </Carousel>
  </Box>
)
