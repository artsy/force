import React from "react"
import { Box, SkeletonBox, SkeletonText } from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"
import { FAIR_EXHIBITOR_IMAGE_HEIGHT } from "./FairExhibitorRail"

interface FairExhibitorRailPlaceholderProps {
  done?: boolean
}

export const FairExhibitorRailPlaceholder: React.FC<FairExhibitorRailPlaceholderProps> = ({
  done = true,
}) => (
  <Carousel arrowHeight={FAIR_EXHIBITOR_IMAGE_HEIGHT}>
    {[...new Array(10)].map((_, i) => {
      return (
        <Box key={i}>
          <SkeletonBox
            width={220}
            height={FAIR_EXHIBITOR_IMAGE_HEIGHT}
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
)
