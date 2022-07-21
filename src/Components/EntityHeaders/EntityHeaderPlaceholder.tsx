import {
  BoxProps,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { FC } from "react"

export interface EntityHeaderPlaceholderProps extends BoxProps {
  displayAvatar?: boolean
}

export const EntityHeaderPlaceholder: FC<EntityHeaderPlaceholderProps> = ({
  displayAvatar = true,
  ...rest
}) => {
  return (
    <Skeleton display="flex" {...rest}>
      {displayAvatar && (
        <SkeletonBox width={45} height={45} borderRadius="50%" mr={1} />
      )}

      <Flex flexDirection="column" justifyContent="center">
        <SkeletonText variant="sm-display">Artist Name</SkeletonText>
        <SkeletonText variant="xs">Nationality, b. 9999</SkeletonText>
      </Flex>
    </Skeleton>
  )
}
