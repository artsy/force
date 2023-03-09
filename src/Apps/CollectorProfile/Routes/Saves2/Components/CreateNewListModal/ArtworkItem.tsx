import { FC } from "react"
import { Text, Clickable, Flex, SkeletonBox, Box } from "@artsy/palette"
import { SelectArtworkItem } from "./SelectArtworkItem"

interface ArtworkItemProps {
  item: any
  selected: boolean
  onItemClick: (artworkID: string) => void
}

export const ArtworkItem: FC<ArtworkItemProps> = ({
  item,
  selected,
  onItemClick,
}) => {
  const onClick = () => {
    onItemClick(item.internalID)
  }

  return (
    <Clickable width="100%" onClick={onClick}>
      <Flex flexDirection="column">
        <SkeletonBox key={item.internalID} width="100%" height={200} mb={1} />

        <Flex justifyContent="space-between">
          <Flex flexDirection="column">
            <Text variant="sm-display">{item.artist.name}</Text>
            <Text variant="sm-display" color="black60">
              {item.title}
            </Text>
            <Text variant="sm" color="black60">
              {item.partner.name}
            </Text>
            <Text variant="sm">{item.price}</Text>
          </Flex>

          <Box ml={1}>
            <SelectArtworkItem isSelected={selected} />
          </Box>
        </Flex>
      </Flex>
    </Clickable>
  )
}
