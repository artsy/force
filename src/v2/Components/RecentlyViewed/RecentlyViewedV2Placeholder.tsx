import { Separator, SkeletonBox, SkeletonText, Text } from "@artsy/palette"
import React from "react"
import { HEIGHT } from "./RecentlyViewedV2"
import { Carousel } from "../Carousel"

export const RecentlyViewedV2Placeholder: React.FC = () => {
  return (
    <>
      <Separator my={6} />

      <Text variant="subtitle" mb={3}>
        Recently viewed
      </Text>

      <Carousel>
        {[...new Array(10)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonBox
                width={[200, 250, 333, 175, 222][i % 5]}
                height={HEIGHT}
                mb={1}
              />

              <SkeletonText variant="mediumText">Artist Name</SkeletonText>
              <SkeletonText variant="text">Artwork Title</SkeletonText>
              <SkeletonText variant="text">Partner Name</SkeletonText>
              <SkeletonText variant="text">Price</SkeletonText>
            </React.Fragment>
          )
        })}
      </Carousel>
    </>
  )
}
