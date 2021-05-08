import React from "react"
import {
  Box,
  BoxProps,
  Column,
  GridColumns,
  ProgressDots,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { ShowBannersRailContainer } from "./ShowBannersRail"

interface ShowBannersRailPlaceholderProps extends BoxProps {
  count: number
}

export const ShowBannersRailPlaceholder: React.FC<ShowBannersRailPlaceholderProps> = ({
  count,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <ShowBannersRailContainer>
        {[...Array(count)].map((_, i) => {
          return (
            <GridColumns gridRowGap={[3, 2]} key={i}>
              <Column span={6}>
                <SkeletonText variant="mediumText" mb={1}>
                  Show type
                </SkeletonText>
                <SkeletonText variant="largeTitle">Show name</SkeletonText>
                <SkeletonText variant="title">Exhibition period</SkeletonText>
                <SkeletonText variant="subtitle">Location</SkeletonText>
                <SkeletonText mt={1}>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullam
                </SkeletonText>
                <GridColumns mt={[2, 3]}>
                  <Column span={6}>
                    <SkeletonBox width="100%" height={40} />
                  </Column>
                </GridColumns>
              </Column>
              <Column span={6}>
                <SkeletonBox width="100%" height={[280, 480]} />
              </Column>
            </GridColumns>
          )
        })}
      </ShowBannersRailContainer>
      <ProgressDots mt={6} activeIndex={-1} amount={count} />
    </Box>
  )
}
