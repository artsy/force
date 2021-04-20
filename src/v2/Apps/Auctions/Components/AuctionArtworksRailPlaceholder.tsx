import React from "react"
import { auctionHeights } from "../Utils/auctionsHelpers"
import { Box, SkeletonBox, SkeletonText } from "@artsy/palette"
import { Carousel, SwiperWithProgress } from "v2/Components/Carousel"
import { random } from "lodash"

interface FairExhibitorRailPlaceholderProps {
  done?: boolean
}

export const AuctionArtworksRailPlaceholder: React.FC<FairExhibitorRailPlaceholderProps> = ({
  done = true,
}) => (
  <Box>
    <SwiperWithProgress>
      {[...new Array(10)].map((_, i) => {
        return (
          <Box key={i}>
            <SkeletonBox
              width={200}
              height={random(200, 400)}
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
    </SwiperWithProgress>
  </Box>
)
