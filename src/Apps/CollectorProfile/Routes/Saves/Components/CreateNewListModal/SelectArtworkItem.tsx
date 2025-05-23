import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"
import { Box } from "@artsy/palette"
import type { FC } from "react"

interface SelectArtworkItemProps {
  isSelected: boolean
}

const ICON_SIZE = 24

export const SelectArtworkItem: FC<
  React.PropsWithChildren<SelectArtworkItemProps>
> = ({ isSelected }) => {
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
