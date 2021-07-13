import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export interface PartnersFilterProps {
  expanded?: boolean
  label?: string
}

export const PartnersFilter: React.FC<PartnersFilterProps> = ({
  expanded,
  label = "Galleries and institutions",
}) => {
  return (
    <ResultsFilter
      facetName="partnerIDs"
      slice="PARTNER"
      label={label}
      placeholder="Enter a gallery"
      expanded={expanded}
    />
  )
}
