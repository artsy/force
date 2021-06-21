import React from "react"
import { Box, Shelf, SkeletonBox, SkeletonText } from "@artsy/palette"
import { IMG_HEIGHT } from "v2/Components/Artwork/ShelfArtwork"

export const AuctionArtworksRailPlaceholder: React.FC = () => (
  <Shelf>
    {[...new Array(10)].map((_, i) => {
      return (
        <Box key={i}>
          <SkeletonBox
            width={200}
            height={[IMG_HEIGHT.mobile, IMG_HEIGHT.desktop]}
            mb={1}
          />

          <SkeletonText variant="mediumText">Artist Name</SkeletonText>

          <SkeletonText variant="text">Artwork Title</SkeletonText>

          <SkeletonText variant="text">Price</SkeletonText>
        </Box>
      )
    })}
  </Shelf>
)
