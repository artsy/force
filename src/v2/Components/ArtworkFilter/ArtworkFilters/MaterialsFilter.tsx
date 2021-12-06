import * as React from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { getFilterLabelWithCounts } from "../Utils/getFilterLabelWithCounts"
import { ResultsFilter } from "./ResultsFilter"

export interface MaterialsFilterProps {
  expanded?: boolean
}

export const MaterialsFilter: React.FC<MaterialsFilterProps> = ({
  expanded,
}) => {
  const { selectedFiltersCounts } = useArtworkFilterContext()
  const label = getFilterLabelWithCounts(
    "Material",
    selectedFiltersCounts.materialsTerms
  )

  return (
    <ResultsFilter
      facetName="materialsTerms"
      slice="MATERIALS_TERMS"
      label={label}
      placeholder="Enter a material"
      expanded={expanded}
    />
  )
}
