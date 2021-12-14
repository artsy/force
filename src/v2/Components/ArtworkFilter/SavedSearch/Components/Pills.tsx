import React from "react"
import { CloseIcon, Pill } from "@artsy/palette"
import { FilterPill } from "../Utils/FilterPillsContext"

const CLOSE_ICON_SIZE = 15

interface PillsProps {
  items: FilterPill[]
  onDeletePress: (pill: FilterPill) => void
}

export const Pills: React.FC<PillsProps> = props => {
  const { items, onDeletePress } = props

  return (
    <>
      {items.map(item => (
        <Pill
          key={`filter-label-${item.name}`}
          variant="textSquare"
          mx={0.5}
          mb={1}
          onClick={() => onDeletePress(item)}
        >
          {item.displayName}
          {!item.isDefault && (
            <CloseIcon
              fill="currentColor"
              width={CLOSE_ICON_SIZE}
              height={CLOSE_ICON_SIZE}
              ml={0.5}
            />
          )}
        </Pill>
      ))}
    </>
  )
}
