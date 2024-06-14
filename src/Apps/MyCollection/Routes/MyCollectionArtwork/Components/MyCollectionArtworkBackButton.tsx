import { Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"

export const MyCollectionArtworkBackButton = () => {
  return (
    <RouterLink textDecoration="none" to={"/collector-profile/my-collection"}>
      <Flex alignItems="center">
        <ChevronLeftIcon height={14} width={14} />
        <Media greaterThanOrEqual="sm">
          <Text variant="xs" pl={1}>
            Back to My Collection
          </Text>
        </Media>
      </Flex>
    </RouterLink>
  )
}
