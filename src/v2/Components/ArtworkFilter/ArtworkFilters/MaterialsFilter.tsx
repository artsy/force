import * as React from "react"
import { SelectedFiltersCountsLabels } from "../ArtworkFilterContext"
import { ResultsFilter } from "./ResultsFilter"

export interface MaterialsFilterProps {
  expanded?: boolean
}

export const MaterialsFilter: React.FC<MaterialsFilterProps> = ({
  expanded,
}) => {
  return (
    <ResultsFilter
      facetName="materialsTerms"
      slice="MATERIALS_TERMS"
      label="Material"
      placeholder="Enter a material"
      filtersCountKey={SelectedFiltersCountsLabels.materialsTerms}
      expanded={expanded}
    />
  )
}
