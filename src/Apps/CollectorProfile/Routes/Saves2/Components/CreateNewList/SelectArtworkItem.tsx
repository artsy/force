import React from "react"
import { CheckCircleIcon, Box } from "@artsy/palette"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"

interface SelectArtworkItemProps {
  isSelected: boolean
}

const ICON_SIZE = 24

export const SelectArtworkItem: React.FC<SelectArtworkItemProps> = ({
  isSelected,
}) => {
  return (
    <Box width={ICON_SIZE} height={ICON_SIZE} ml={10}>
      {isSelected ? (
        <CheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
      ) : (
        <EmptyCheckCircleIcon width={ICON_SIZE} height={ICON_SIZE} />
      )}
    </Box>
  )
}
