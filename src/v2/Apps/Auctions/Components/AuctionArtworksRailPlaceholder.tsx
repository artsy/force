import React from "react"
import { Box, SkeletonBox, SkeletonText } from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"
import { AUCTION_ARTWORKS_IMAGE_HEIGHT } from "./AuctionArtworksRail/AuctionArtworksRail"

interface FairExhibitorRailPlaceholderProps {
  done?: boolean
}

const AUCTION_ARTWORKS_RAIL_HEIGHT = 233

export const AuctionArtworksRailPlaceholder: React.FC<FairExhibitorRailPlaceholderProps> = ({
  done = true,
}) => (
  <Box height={AUCTION_ARTWORKS_RAIL_HEIGHT}>
    <Carousel arrowHeight={AUCTION_ARTWORKS_IMAGE_HEIGHT}>
      {[...new Array(10)].map((_, i) => {
        return (
          <Box key={i}>
            <SkeletonBox
              width={220}
              height={AUCTION_ARTWORKS_IMAGE_HEIGHT}
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
