import React from "react"
import {
  Text,
  CheckCircleIcon,
  Clickable,
  Column,
  Flex,
  SkeletonBox,
  Box,
} from "@artsy/palette"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"

interface ArtworkItemProps {
  item: any
  onItemPress: (item: any) => void
}

const ICON_SIZE = 24

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
    <Column span={4}>
      <Clickable width="100%" onClick={onClick} role="option">
        <Flex flexDirection={"column"}>
          <SkeletonBox key={item.internalID} width={197} height={200} mb={1} />

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

            <Box width={ICON_SIZE} height={ICON_SIZE} ml={10}>
              {isSelected ? (
                <CheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
              ) : (
                <EmptyCheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
              )}
            </Box>
          </Flex>
        </Flex>
      </Clickable>
    </Column>
  )
}
