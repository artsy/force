import { Box, Flex, Text } from "@artsy/palette"
import { FourUpImageLayout } from "Apps/CollectorProfile/Routes/Saves2/Components/FourUpImageLayout"
import { StackedImageLayout } from "Apps/CollectorProfile/Routes/Saves2/Components/StackedImageLayout"
import { FC } from "react"

const ITEM_DROP_SHADOW = "0px 2px 12px rgba(0, 0, 0, 0.13)"

interface SavesItemProps {
  title: string
  artworksCount: number
  isSelected?: boolean
  imagesLayout: "stacked" | "grid"
  onClick: () => void
}

export const SavesItem: FC<SavesItemProps> = ({
  title,
  artworksCount,
  isSelected,
  imagesLayout,
  onClick,
}) => {
  const imageURLs = []

  return (
    <Flex
      p={1}
      width={[138, 222]}
      height={[188, 272]}
      border="1px solid"
      borderRadius={10}
      flexDirection="column"
      justifyContent="space-between"
      borderColor={isSelected ? "brand" : "transparent"}
      style={isSelected ? { boxShadow: ITEM_DROP_SHADOW } : undefined}
      onClick={onClick}
    >
      {imagesLayout === "stacked" ? (
        <StackedImageLayout imageURLs={imageURLs} />
      ) : (
        <FourUpImageLayout imageURLs={imageURLs} />
      )}

      <Box>
        <Text variant={["xs", "sm-display"]} overflowEllipsis>
          {title}
        </Text>
        <Text variant={["xs", "sm-display"]} color="black60" overflowEllipsis>
          {`${artworksCount} Artworks`}
        </Text>
      </Box>
    </Flex>
  )
}
