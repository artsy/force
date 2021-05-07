import React from "react"
import { Box, Shelf, SkeletonBox, SkeletonText } from "@artsy/palette"
import { MAX_IMG_HEIGHT } from "v2/Components/Artwork/ShelfArtwork"

interface FairExhibitorRailPlaceholderProps {
  done?: boolean
}

export const AuctionArtworksRailPlaceholder: React.FC<FairExhibitorRailPlaceholderProps> = ({
  done = true,
}) => (
  <Shelf>
    {[...new Array(10)].map((_, i) => {
      return (
        <Box key={i}>
          <SkeletonBox width={200} height={MAX_IMG_HEIGHT} mb={1} done={done} />

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
  </Shelf>
)
