import { BaseAlertFilter } from "Components/Alert/Components/Filters/BaseAlertFilter"
import { ATTRIBUTION_CLASS_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { FC } from "react"

export const Rarity: FC = () => {
  return (
    <BaseAlertFilter
      label="Rarity"
      criteriaKey="attributionClass"
      options={ATTRIBUTION_CLASS_OPTIONS}
    />
  )
}
