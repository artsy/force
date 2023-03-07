import React from "react"
import { Text, Clickable, Column, Flex, SkeletonBox, Box } from "@artsy/palette"
import { SelectArtworkItem } from "./SelectArtworkItem"

interface ArtworkItemProps {
  item: any
  onItemPress: (item: any) => void
}

export const ArtworkItem: React.FC<ArtworkItemProps> = ({
  item,
  onItemPress,
}) => {
  const [isSelected, setIsSelected] = React.useState(false)

  const onClick = () => {
    onItemPress(item)
    setIsSelected(!isSelected)
  }

  return (
    <Column span={[6, 4]}>
      <Clickable width="100%" onClick={onClick} role="option">
        <Flex flexDirection={"column"}>
          <SkeletonBox key={item.internalID} width="100%" height={200} mb={1} />

          <Flex justifyContent={"space-between"}>
            <Flex flexDirection={"column"}>
              <Text variant="sm-display">{item.artist.name}</Text>
              <Text variant="sm-display" color="black60">
                {item.title}
              </Text>
              <Text variant="sm" color="black60">
                {item.partner.name}
              </Text>
              <Text variant="sm">{item.price}</Text>
            </Flex>

            <Box ml="1">
              <SelectArtworkItem isSelected={isSelected} />
            </Box>
          </Flex>
        </Flex>
      </Clickable>
    </Column>
  )
}
