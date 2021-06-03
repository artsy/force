import { Box, Shelf, SkeletonBox, SkeletonText, Text } from "@artsy/palette"
import React from "react"

export const LoadingPlaceholder: React.FC = () => {
  return (
    <>
      <Text variant="lg" my={4}>
        Iconic Collections
      </Text>
      <Shelf>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box key={i}>
              <SkeletonBox width={325} height={230} />
              <SkeletonText variant="md">Works on Paper</SkeletonText>
              <SkeletonText variant="md">From $500</SkeletonText>
            </Box>
          )
        })}
      </Shelf>
    </>
  )
}
