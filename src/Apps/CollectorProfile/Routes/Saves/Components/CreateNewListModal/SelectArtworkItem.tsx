import { FC } from "react"
import { Box } from "@artsy/palette"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"

interface SelectArtworkItemProps {
  isSelected: boolean
}

const ICON_SIZE = 24

export const SelectArtworkItem: FC<SelectArtworkItemProps> = ({
  isSelected,
}) => {
  return (
    <Box width={ICON_SIZE} height={ICON_SIZE}>
      {isSelected ? (
        <CheckmarkStrokeIcon width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <EmptyCheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </Box>
  )
}
