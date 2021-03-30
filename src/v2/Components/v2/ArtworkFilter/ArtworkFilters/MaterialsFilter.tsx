import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export const MaterialsFilter: React.FC = () => {
  return (
    <ResultsFilter
      facetName="materialsTerms"
      slice="MATERIALS_TERMS"
      label="Materials"
      placeholder="Enter a material"
      expanded
    />
  )
}
