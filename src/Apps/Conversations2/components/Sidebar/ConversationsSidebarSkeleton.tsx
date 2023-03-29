import {
  Box,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  StackableBorderBox,
  Text,
  Pill,
} from "@artsy/palette"

export const ConversationsSidebarSkeleton = () => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box p={2} borderBottom="1px solid" borderBottomColor="black15">
        <Text variant="lg" mb={2}>
          Conversations
        </Text>

        <Flex pr={2} pb={1}>
          <Skeleton>
            <Pill size="small" mr={2} disabled>
              All
            </Pill>
            <Pill size="small" mr={2} disabled>
              New
            </Pill>

            <Pill size="small" disabled>
              Replied
            </Pill>
          </Skeleton>
        </Flex>
      </Box>

      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <ConversationSkeleton
          key={`skeleton-conversation-${index}`}
          index={index}
        />
      ))}
    </Flex>
  )
}

const ConversationSkeleton: React.FC<{ index: number }> = ({ index }) => {
  const borderTop = index !== 0 ? {} : { borderTop: 0 }

  return (
    <StackableBorderBox
      flexDirection="column"
      style={{ borderLeft: 0, borderRight: 0, ...borderTop }}
    >
      <Skeleton>
        <Flex alignItems="center">
          <SkeletonBox width={50} height={50} />

          <Flex flexDirection="column" mx={1} flex={1}>
            <SkeletonText variant="xs">Collector Name</SkeletonText>
            <SkeletonText variant="xs">Artists Name</SkeletonText>
            <SkeletonText variant="xs">
              Some skeleton artwork 2023, Feb
            </SkeletonText>
          </Flex>

          <Flex flexDirection="column" alignSelf="flex-start">
            <SkeletonText variant="xs">Inquiry</SkeletonText>
            <SkeletonText variant="xs">22 Feb, 2023</SkeletonText>
          </Flex>
        </Flex>
      </Skeleton>
    </StackableBorderBox>
  )
}
