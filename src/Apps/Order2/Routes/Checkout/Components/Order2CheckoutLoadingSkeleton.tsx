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
        <GenericStepSkeleton />
        <GenericStepSkeleton />
        <GenericStepSkeleton />
        <GenericStepSkeleton />
        <GenericStepSkeleton />
        <GenericStepSkeleton />
      </Stack>
    </Skeleton>
  )
}

const Order2CollapsibleOrderSummarySkeleton: React.FC = () => {
  return (
    <Box backgroundColor="mono0">
      <Flex py={1} px={2} justifyContent="space-between" alignItems="center">
        {/* Artwork image skeleton */}
        <SkeletonBox width={40} height={40} />

        {/* Artwork details skeleton */}
        <Box flex={1} ml={1} mr={2}>
          <SkeletonText variant="xs" mb={0.5}>
            Artist names
          </SkeletonText>
          <SkeletonText variant="xs">Artwork title, date</SkeletonText>
        </Box>

        {/* Price and chevron skeleton */}
        <Flex flexShrink={0} alignItems="center">
          <SkeletonText variant="xs" width={50} mr={0.5}>
            Order total
          </SkeletonText>
          <SkeletonBox width={18} height={18} />
        </Flex>
      </Flex>

      {/* Collapsible content skeleton */}
      <Box px={2} overflow="hidden">
        <Spacer y={1} />
        <SkeletonText variant="xs" width="80%" mb={1} />
        <SkeletonText variant="xs" width="60%" />
        <Spacer y={1} />
      </Box>
    </Box>
  )
}

const GenericStepSkeleton: React.FC = () => {
  return (
    <Flex flexDirection="column" backgroundColor="mono0" p={2}>
      {/* Title Skeleton */}
      <SkeletonText variant="sm-display" width="50%" mb={1}>
        Step Title
      </SkeletonText>

      <Flex py={1}>
        {/* Description Skeleton */}
        <SkeletonText flex={1} variant="xs">
          Step details
        </SkeletonText>
        <Spacer y={2} />

        {/* Placeholder for additional content */}
        <SkeletonText flex={0} variant="xs">
          Step content
        </SkeletonText>
      </Flex>
    </Flex>
  )
}
