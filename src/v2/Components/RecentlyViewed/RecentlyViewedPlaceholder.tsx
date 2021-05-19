import { Shelf, SkeletonBox, SkeletonText, Text } from "@artsy/palette"
import React from "react"
import { IMG_HEIGHT } from "../Artwork/ShelfArtwork"

export const RecentlyViewedPlaceholder: React.FC = () => {
  return (
    <>
      <Text variant="lg" mb={2}>
        Recently viewed
      </Text>

      <Shelf showProgress={false}>
        {[...new Array(10)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonBox
                width={200}
                height={[
                  // Cycle through random-ish looking heights bounded by the
                  // max IMG_HEIGHT for both mobile and desktop.
                  [
                    IMG_HEIGHT.mobile - 150,
                    IMG_HEIGHT.mobile - 100,
                    IMG_HEIGHT.mobile - 50,
                    IMG_HEIGHT.mobile,
                    IMG_HEIGHT.mobile - 33,
                  ][i % 5],
                  [
                    IMG_HEIGHT.desktop - 150,
                    IMG_HEIGHT.desktop - 100,
                    IMG_HEIGHT.desktop - 50,
                    IMG_HEIGHT.desktop,
                    IMG_HEIGHT.desktop - 33,
                  ][i % 5],
                ]}
                mb={1}
              />

              <SkeletonText variant="md">Artist Name</SkeletonText>
              <SkeletonText variant="md">Artwork Title</SkeletonText>
              <SkeletonText variant="xs">Partner Name</SkeletonText>
              <SkeletonText variant="xs">Price</SkeletonText>
            </React.Fragment>
          )
        })}
      </Shelf>
    </>
  )
}
