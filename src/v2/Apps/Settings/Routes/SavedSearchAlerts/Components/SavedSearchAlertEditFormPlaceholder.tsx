import { Box, Flex, Spacer, SkeletonText, SkeletonBox } from "@artsy/palette"
import { Media } from "v2/Utils/Responsive"
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

      <Spacer mt={4} />

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

      <Spacer mt={4} />

      <CheckboxSkeleton>Mobile Alerts</CheckboxSkeleton>

      <Media greaterThan="md">
        <Spacer mt={6} />
        <Flex>
          <SkeletonBox flex={1} height={50} />
          <Spacer ml={2} />
          <SkeletonBox flex={1} height={50} />
        </Flex>
      </Media>

      <Media lessThan="md">
        <Spacer mt={4} />
        <Flex>
          <SkeletonBox flex={1} height={50} />
          <Spacer mt={1} />
          <SkeletonBox flex={1} height={50} />
        </Flex>
      </Media>
    </Box>
  )
}
