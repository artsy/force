import { DefaultFilterPill, NonDefaultFilterPill } from "../types"

export interface LabelEntity {
  field: string
  label: string
  value: string
  [key: string]: any
}

export const convertLabelsToPills = (labels: LabelEntity[]) => {
  return labels.map(label => {
    if (label.field === "artistIDs") {
      return {
        isDefault: true,
        name: label.value,
        displayName: label.label,
      } as DefaultFilterPill
    }

    return {
      filterName: label.field,
      name: label.value,
      displayName: label.label,
    } as NonDefaultFilterPill
  })
}
