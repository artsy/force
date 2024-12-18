import * as React from "react"
import { SelectedFiltersCountsLabels } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ResultsFilter } from "./ResultsFilter"

export interface PartnersFilterProps {
  expanded?: boolean
  label?: string
}

export const PartnersFilter: React.FC<
  React.PropsWithChildren<PartnersFilterProps>
> = ({ expanded, label = "Galleries and Institutions" }) => {
  return (
    <ResultsFilter
      expanded={expanded}
      facetName="partnerIDs"
      filtersCountKey={SelectedFiltersCountsLabels.partnerIDs}
      label={label}
      placeholder="Enter a gallery"
      slice="PARTNER"
    />
  )
}
