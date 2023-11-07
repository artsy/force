import { FC } from "react"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { BaseAlertFilter } from "Components/Alert/Components/Filters/BaseAlertFilter"

export const Medium: FC = () => {
  return (
    <BaseAlertFilter
      expanded
      label="Medium"
      criteriaKey="additionalGeneIDs"
      options={MEDIUM_OPTIONS}
    />
  )
}
