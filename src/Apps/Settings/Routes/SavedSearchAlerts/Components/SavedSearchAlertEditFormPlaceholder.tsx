import {
  Box,
  Flex,
  Text,
  Spacer,
  SkeletonText,
  SkeletonBox,
} from "@artsy/palette"
import { CriteriaPillsPlaceholder } from "Components/Alert/Components/CriteriaPills"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { times } from "lodash"

const CheckboxSkeleton: React.FC = ({ children }) => {
  return (
    <Flex alignItems="center">
      <SkeletonBox width={20} height={20} mr={1} />
      <SkeletonText>{children}</SkeletonText>
    </Flex>
  )
}

export const SavedSearchAlertEditFormPlaceholder = () => {
  return (
    <Box>
      <SkeletonText variant="xs" mb={0.5}>
        Name
      </SkeletonText>

      <SkeletonBox width="100%" height={50} />

      <Spacer y={4} />

      <SkeletonText variant="xs" mb={2}>
        Filters
      </SkeletonText>

      <Flex mb={4}>
        {times(5).map(index => (
          <SkeletonBox
            key={`filter-${index}`}
            width={70}
            height={30}
            mr={1}
            mb={1}
          />
        ))}
      </Flex>

      <CheckboxSkeleton>Email Alerts</CheckboxSkeleton>

      <Spacer y={4} />

      <CheckboxSkeleton>Mobile Alerts</CheckboxSkeleton>

      <Media greaterThan="md">
        <Spacer y={6} />
        <Flex>
          <SkeletonBox flex={1} height={50} />
          <Spacer x={2} />
          <SkeletonBox flex={1} height={50} />
        </Flex>
      </Media>

      <Media lessThan="md">
        <Spacer y={4} />
        <Flex>
          <SkeletonBox flex={1} height={50} />
          <Spacer y={1} />
          <SkeletonBox flex={1} height={50} />
        </Flex>
      </Media>
    </Box>
  )
}

export const NewSavedSearchAlertEditFormPlaceholder = () => {
  const enableSuggestedFilters = useFeatureFlag(
    "onyx_saved_searches_suggested_filters"
  )

  return (
    <Box flex={1} p={4}>
      <Text variant="lg" mb={4}>
        Edit Alert
      </Text>
      <SkeletonText variant="sm-display" mb={2}>
        Wi'll send you alerts for
      </SkeletonText>
      <CriteriaPillsPlaceholder />
      <Spacer y={4} />

      <SkeletonText variant="sm-display" mb={1}>
        Add Filters
      </SkeletonText>

      {enableSuggestedFilters ? (
        <SkeletonText variant="sm-display" mb={2}>
          More Filters
        </SkeletonText>
      ) : (
        <SkeletonText variant="sm-display" mb={2}>
          Including Price Range, Rarity, Medium, Color
        </SkeletonText>
      )}

      <Spacer y={4} />

      <SkeletonText variant="sm-display" mb={1}>
        Tell us more about what you’re looking for
      </SkeletonText>
      <SkeletonBox flex={1} height={120} mb={4} />

      <Spacer y={6} />

      <Flex alignItems="center" justifyContent="space-between">
        <SkeletonText>Email</SkeletonText>
        <SkeletonBox width={20} height={20} mr={1} />
      </Flex>

      <Spacer y={2} />

      <Flex alignItems="center" justifyContent="space-between">
        <SkeletonText>Push Notifications</SkeletonText>
        <SkeletonBox width={20} height={20} mr={1} />
      </Flex>

      <Media greaterThan="md">
        <Spacer y={6} />
        <Flex>
          <SkeletonBox flex={1} height={50} />
          <Spacer x={2} />
          <SkeletonBox flex={1} height={50} />
        </Flex>
      </Media>

      <Media lessThan="md">
        <Spacer y={4} />
        <Flex>
          <SkeletonBox flex={1} height={50} />
          <Spacer y={1} />
          <SkeletonBox flex={1} height={50} />
        </Flex>
      </Media>
    </Box>
  )
}
