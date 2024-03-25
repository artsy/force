import {
  Flex,
  Text,
  Spacer,
  SkeletonText,
  SkeletonBox,
  Skeleton,
} from "@artsy/palette"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { CriteriaPillsPlaceholder } from "Components/Alert/Components/CriteriaPills"
import { Modal } from "Components/Alert/Components/Modal/Modal"
import { Media } from "Utils/Responsive"

export const SavedSearchAlertEditFormPlaceholder: React.FC<{
  onCloseClick?: () => void
}> = ({ onCloseClick }) => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <Skeleton flex={1} p={4}>
          <SavedSearchAlertEditFormPlaceholderContext />
        </Skeleton>
      </Media>
      <Media lessThan="md">
        <AlertProvider isEditMode>
          <Skeleton flex={1} p={4}>
            <Modal onClose={onCloseClick} backgroundColor="white100">
              <Skeleton px={2}>
                <SavedSearchAlertEditFormPlaceholderContext />
              </Skeleton>
            </Modal>
          </Skeleton>
        </AlertProvider>
      </Media>
    </>
  )
}

const SavedSearchAlertEditFormPlaceholderContext = () => {
  return (
    <>
      <Media greaterThanOrEqual="md">
        <Text variant="lg" mb={4}>
          Edit Alert
        </Text>
      </Media>
      <SkeletonText variant="sm-display" mb={2}>
        We'll send you alerts for
      </SkeletonText>
      <CriteriaPillsPlaceholder />
      <Spacer y={4} />

      <SkeletonText variant="sm-display" mb={1}>
        Add Filters
      </SkeletonText>

      <SkeletonText variant="sm-display" mb={2}>
        More Filters
      </SkeletonText>

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
    </>
  )
}
