import { FC } from "react"
import { CheckCircleIcon, Box } from "@artsy/palette"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"

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
        <CheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <EmptyCheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </Box>
  )
}
