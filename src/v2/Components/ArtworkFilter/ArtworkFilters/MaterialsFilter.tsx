import React from "react"
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
      expanded={expanded}
    />
  )
}
