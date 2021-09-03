import React from "react"
import {
  Box,
  Column,
  Flex,
  GridColumns,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"

export const FairExhibitorsGroupPlaceholder: React.FC = () => {
  return (
    <Box>
      <GridColumns>
        {[...new Array(4)].map((_, i) => {
          return (
            <Column key={i} span={[12, 6, 3]}>
              <Flex mb={1}>
                <SkeletonBox width={50} height={50} mr={1} />
                <Box>
                  <SkeletonText variant="md">Partner Name</SkeletonText>
                  <SkeletonText variant="md">Partner Address</SkeletonText>
                </Box>
                <SkeletonText variant="lg" m="auto" mt={0} mr={0}>
                  Follow
                </SkeletonText>
              </Flex>
            </Column>
          )
        })}
      </GridColumns>
    </Box>
  )
}
