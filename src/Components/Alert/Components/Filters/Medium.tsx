import { QuickMultipleSelectAlertFilter } from "Components/Alert/Components/Filters/QuickMultipleSelectAlertFilter"
import { MEDIUM_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import type { FC } from "react"

export const Medium: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <QuickMultipleSelectAlertFilter
      label="Medium"
      criteriaKey="additionalGeneIDs"
      options={MEDIUM_OPTIONS}
    />
  )
}
