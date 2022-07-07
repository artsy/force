import React from "react"
import { SavedSearchAlertPills } from "./SavedSearchAlertPills"
import { FilterPill } from "../types"
import { useActiveFilterPills } from "../useActiveFilterPills"

interface ActiveFilterPillsProps {
  defaultPills?: FilterPill[]
}

export const ActiveFilterPills: React.FC<ActiveFilterPillsProps> = props => {
  const { defaultPills = [] } = props
  const { pills, removePill } = useActiveFilterPills(defaultPills)

  return <SavedSearchAlertPills items={pills} onDeletePress={removePill} />
}
