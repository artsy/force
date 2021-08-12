import React from "react"
import {
  Box,
  Column,
  Flex,
  GridColumns,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"

export const FairExhibitorsGroupPlaceholder: React.FC = () => {
  return (
    <Box>
      <GridColumns>
        {[...new Array(4)].map(() => {
          return (
            <Column span={[12, 4, 3]}>
              <Flex mb={1}>
                <SkeletonBox width={50} height={50} mr={1} />
                <Box>
                  <SkeletonText variant="md">Partner Name</SkeletonText>
                  <SkeletonText variant="md">Partner Address</SkeletonText>
                </Box>
              </Flex>

              <Media greaterThan="xs">
                <SkeletonBox mb={1}>
                  <ResponsiveBox
                    aspectWidth={400}
                    aspectHeight={250}
                    maxHeight={400}
                  />
                </SkeletonBox>
              </Media>
            </Column>
          )
        })}
      </GridColumns>
    </Box>
  )
}
