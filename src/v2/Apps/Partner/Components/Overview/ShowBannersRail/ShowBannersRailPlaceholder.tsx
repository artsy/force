import {
  Box,
  BoxProps,
  Column,
  GridColumns,
  ProgressDots,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"

interface ShowBannersRailPlaceholderProps extends BoxProps {
  count: number
}

export const ShowBannersRailPlaceholder: React.FC<ShowBannersRailPlaceholderProps> = ({
  count,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <GridColumns gridRowGap={[3, 2]}>
        <Column span={6}>
          <SkeletonText variant="md" mb={1}>
            Show type
          </SkeletonText>
          <SkeletonText variant="xl">Show name</SkeletonText>
          <SkeletonText variant="lg">Exhibition period</SkeletonText>
          <SkeletonText variant="lg">Location</SkeletonText>
          <SkeletonText mt={1}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullam
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

      <ProgressDots mt={6} activeIndex={-1} amount={count} />
    </Box>
  )
}
