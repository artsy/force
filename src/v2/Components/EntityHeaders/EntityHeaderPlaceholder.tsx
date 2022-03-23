import { Flex, Skeleton, SkeletonBox, SkeletonText } from "@artsy/palette"
import { FC } from "react"

export const EntityHeaderPlaceholder: FC = () => {
  return (
    <Skeleton display="flex">
      <SkeletonBox width={45} height={45} borderRadius="50%" />

      <Flex ml={1} flexDirection="column" justifyContent="center">
        <SkeletonText variant="md">Artist Name</SkeletonText>
        <SkeletonText variant="xs">Nationality, b. 9999</SkeletonText>
      </Flex>
    </Skeleton>
  )
}
