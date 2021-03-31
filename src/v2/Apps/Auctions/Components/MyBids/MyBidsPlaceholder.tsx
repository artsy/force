import React from "react"
import { Carousel } from "v2/Components/Carousel"

import {
  Box,
  StackableBorderBox,
  SkeletonBox,
  SkeletonText,
  Flex,
  Spacer,
  Text,
  Separator,
} from "@artsy/palette"

export const MyBidsPlaceholder = () => {
  return (
    <>
      <Separator />
      <Text py={3}>Active Bids and Watched Lots</Text>

      <Carousel arrowHeight={240}>
        {[...new Array(10)].map((_, i) => {
          return (
            <Box width={330} key={i}>
              <StackableBorderBox p={0}>
                <Box minHeight={100}>
                  <SkeletonBox width="100%" height={100} />
                </Box>
                <Box px={2} pb={2} pt={1}>
                  <SkeletonText variant="small">Tate Ward</SkeletonText>
                  <SkeletonText variant="title">
                    Artsy x Tate Ward: Street to Studio
                  </SkeletonText>
                  <Flex mt={1}>
                    <SkeletonText variant="small">
                      Closes Feb 11 at 12:00pm EST
                    </SkeletonText>
                  </Flex>
                </Box>
              </StackableBorderBox>
              <StackableBorderBox p={2}>
                <Flex width="100%">
                  <Flex alignItems="center" width="100%">
                    <Box backgroundColor="black60" width={50} height={50}>
                      <SkeletonBox width={50} height={50} />
                    </Box>
                    <Spacer mr={1} />
                    <Flex justifyContent="space-between" width="100%">
                      <Box>
                        <SkeletonText variant="text">
                          Tiffan Alfonseca
                        </SkeletonText>
                        <SkeletonText variant="caption">Lot 1</SkeletonText>
                      </Box>
                      <Box>
                        <SkeletonText variant="text">$200</SkeletonText>
                      </Box>
                    </Flex>
                  </Flex>
                </Flex>
              </StackableBorderBox>
            </Box>
          )
        })}
      </Carousel>
    </>
  )
}
