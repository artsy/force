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
      expanded={expanded}
      facetName="materialsTerms"
      filtersCountKey={SelectedFiltersCountsLabels.materialsTerms}
      label="Material"
      placeholder="Enter a material"
      slice="MATERIALS_TERMS"
    />
  )
}
