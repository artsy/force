import React from "react"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"
import { useActiveFilterPills } from "Components/SavedSearchAlert/useActiveFilterPills"
import { Flex } from "@artsy/palette"

export interface ActiveFilterPillsProps {}

export const ActiveFilterPills: React.FC<ActiveFilterPillsProps> = () => {
  const { pills, removePill } = useActiveFilterPills()

  if (pills.length === 0) {
    return null
  }

  return (
    <Flex flexWrap="wrap" data-testid="artworkGridFilterPills" gap={1}>
      <SavedSearchAlertPills items={pills} onDeletePress={removePill} />
    </Flex>
  )
}
