import { ChevronIcon, Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"

export const MyCollectionArtworkBackButton = () => {
  return (
    <RouterLink textDecoration="none" to={"/collector-profile/my-collection"}>
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
