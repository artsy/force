import { Flex, Join, SkeletonBox, SkeletonText, Spacer } from "@artsy/palette"

export const SelectArtworkListItemPlaceholder = () => {
  return (
    <Flex p={1} flexDirection="row" alignItems="center">
      <SkeletonBox width={60} height={60} />

      <Spacer x={1} />

      <Flex flex={1} flexDirection="column">
        <SkeletonText variant="sm-display">Collection Name</SkeletonText>
        <SkeletonText variant="sm-display">6 artworks</SkeletonText>
      </Flex>

      <Spacer x={1} />

      <SkeletonBox width={24} height={24} borderRadius={24} />
    </Flex>
  )
}

export const SelectArtworkListsPlaceholder = () => {
  return (
    <Join separator={<Spacer y={1} />}>
      <SelectArtworkListItemPlaceholder />
      <SelectArtworkListItemPlaceholder />
      <SelectArtworkListItemPlaceholder />
    </Join>
  )
}
