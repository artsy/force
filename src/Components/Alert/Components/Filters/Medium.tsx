import type { FC } from "react"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { QuickMultipleSelectAlertFilter } from "Components/Alert/Components/Filters/QuickMultipleSelectAlertFilter"

export const Medium: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <QuickMultipleSelectAlertFilter
      label="Medium"
      criteriaKey="additionalGeneIDs"
      options={MEDIUM_OPTIONS}
    />
  )
}
