import React from "react"
import { Pill } from "@artsy/palette"
import { FilterPill } from "Components/SavedSearchAlert/types"

export interface SavedSearchAlertPillsProps {
  items: FilterPill[]
  onDeletePress: (pill: FilterPill) => void
}

export const SavedSearchAlertPills: React.FC<SavedSearchAlertPillsProps> = props => {
  const { items, onDeletePress } = props

  return (
    <>
      {items.map(item => {
        const key = `filter-label-${item.field}-${item.value}`

        if (item.isDefault) {
          return (
            <Pill key={key} variant="filter" disabled>
              {item.displayValue}
            </Pill>
          )
        }

        return (
          <Pill key={key} variant="filter" onClick={() => onDeletePress(item)}>
            {item.displayValue}
          </Pill>
        )
      })}
    </>
  )
}
