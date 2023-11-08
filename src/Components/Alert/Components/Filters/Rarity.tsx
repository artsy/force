import { QuickMultipleSelectAlertFilter } from "Components/Alert/Components/Filters/QuickMultipleSelectAlertFilter"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { FC } from "react"

export const Rarity: FC = () => {
  return (
    <QuickMultipleSelectAlertFilter
      label="Rarity"
      criteriaKey="attributionClass"
      options={ATTRIBUTION_CLASS_OPTIONS}
    />
  )
}
