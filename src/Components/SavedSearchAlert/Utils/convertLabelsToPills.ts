import { FilterPill } from "../types"

export interface LabelEntity {
  field: string
  displayValue: string
  value: string
  [key: string]: any
}

export const convertLabelsToPills = (labels: LabelEntity[]): FilterPill[] => {
  return labels.map(label => ({
    isDefault: label.field === "artistIDs",
    field: label.field,
    value: label.value,
    displayValue: label.displayValue,
  }))
}
