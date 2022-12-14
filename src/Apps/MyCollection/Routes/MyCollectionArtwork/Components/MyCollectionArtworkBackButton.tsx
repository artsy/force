import { ChevronIcon, Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"

export const MyCollectionArtworkBackButton = () => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  return (
    <RouterLink
      textDecoration="none"
      to={
        isCollectorProfileEnabled
          ? "/collector-profile/my-collection"
          : "/settings/my-collection"
      }
    >
      <Flex alignItems="center">
        <ChevronIcon height={14} width={14} direction="left" />
        <Media greaterThanOrEqual="sm">
          <Text variant="xs" pl={1}>
            Back to My Collection
          </Text>
        </Media>
      </Flex>
    </RouterLink>
  )
}
