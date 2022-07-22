import { SkeletonBox, SkeletonText } from "@artsy/palette"
import * as React from "react"
import { IMG_HEIGHT } from "../Artwork/ShelfArtwork"
import { Rail } from "../Rail"

export const RecentlyViewedPlaceholder: React.FC = () => {
  return (
    <Rail
      title="Recently Viewed"
      getItems={() => {
        return [...new Array(10)].map((_, i) => {
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

              <SkeletonText variant="sm-display">Artist Name</SkeletonText>
              <SkeletonText variant="sm-display">Artwork Title</SkeletonText>
              <SkeletonText variant="xs">Partner Name</SkeletonText>
              <SkeletonText variant="xs">Price</SkeletonText>
            </React.Fragment>
          )
        })
      }}
    />
  )
}
