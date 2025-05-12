import {
  Box,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Stack,
} from "@artsy/palette"

export const Order2CheckoutLoadingSkeleton = () => {
  return (
    <Skeleton aria-label="Checkout loading skeleton">
      <Stack gap={1} bg="mono5">
        <Order2CollapsibleOrderSummarySkeleton />
        <StepsSkeleton />
      </Stack>
    </Skeleton>
  )
}

const Order2CollapsibleOrderSummarySkeleton: React.FC = () => {
  return (
    <Flex height={60} py={1} px={2} backgroundColor="mono0">
      {/* Artwork image skeleton */}
      <SkeletonBox width={40} height={40} />

      {/* Artwork details skeleton */}
      <Box ml={1} flexGrow={1}>
        <Flex>
          <SkeletonText variant="xs" flexGrow={1}>
            Artist names
          </SkeletonText>
          {/* Price and chevron skeleton */}
          <Flex flexGrow={0} justifyContent={"flex-end"}>
            <SkeletonText variant="xs" mr={0.5}>
              Price
            </SkeletonText>
            <SkeletonBox width={18} height={16} mt="2px" />
          </Flex>
        </Flex>
        <SkeletonText variant="xs">Artwork title, date</SkeletonText>
      </Box>
    </Flex>
  )
}

const StepsSkeleton = () => {
  return (
    <Flex flexDirection="column" backgroundColor="mono0" p={2}>
      {/* Title Skeleton */}
      <Flex py={1}>
        {/* Step */}
        <SkeletonText flex={1} variant="sm-display">
          First step title
        </SkeletonText>

        {/* Rioght-aligned content */}
        <SkeletonText flex={0} variant="sm-display">
          Loading...
        </SkeletonText>
      </Flex>

      <Spacer y={2} />

      <SkeletonText variant="xs" mb={1}>
        Step content
      </SkeletonText>
      <SkeletonText variant="xs" mb={1}>
        And more ...
      </SkeletonText>

      <Spacer y={1} />
      <SkeletonText variant="sm-display" mb={1}>
        Second step title
      </SkeletonText>
      <SkeletonText variant="xs" mb={1}>
        Still more content
      </SkeletonText>
      <SkeletonText variant="xs" mb={1}>
        Yet more...
      </SkeletonText>
    </Flex>
  )
}
