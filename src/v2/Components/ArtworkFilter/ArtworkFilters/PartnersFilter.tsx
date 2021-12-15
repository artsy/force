import * as React from "react"
import { SelectedFiltersCountsLabels } from "../ArtworkFilterContext"
import { ResultsFilter } from "./ResultsFilter"

export interface PartnersFilterProps {
  expanded?: boolean
  label?: string
}

export const PartnersFilter: React.FC<PartnersFilterProps> = ({
  expanded,
  label = "Galleries and Institutions",
}) => {
  return (
    <ResultsFilter
      facetName="partnerIDs"
      slice="PARTNER"
      label={label}
      placeholder="Enter a gallery"
      filtersCountKey={SelectedFiltersCountsLabels.partnerIDs}
      expanded={expanded}
    />
  )
}
