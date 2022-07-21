import React from "react"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"
import { FilterPill } from "../types"
import { useActiveFilterPills } from "../useActiveFilterPills"
import { Flex } from "@artsy/palette"

export interface ActiveFilterPillsProps {
  defaultPills?: FilterPill[]
}

const PILL_HORIZONTAL_MARGIN_SIZE = 0.5

export const ActiveFilterPills: React.FC<ActiveFilterPillsProps> = props => {
  const { defaultPills = [] } = props
  const { pills, removePill } = useActiveFilterPills(defaultPills)

  if (pills.length === 0) {
    return null
  }

  return (
    <Flex
      flexWrap="wrap"
      mx={-PILL_HORIZONTAL_MARGIN_SIZE}
      mb={4}
      data-testid="artworkGridFilterPills"
    >
      <SavedSearchAlertPills items={pills} onDeletePress={removePill} />
    </Flex>
  )
}
