import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export interface PartnersFilterProps {
  expanded?: boolean
}

export const PartnersFilter: React.FC<PartnersFilterProps> = ({ expanded }) => {
  return (
    <ResultsFilter
      facetName="partnerIDs"
      slice="PARTNER"
      label="Galleries and institutions"
      placeholder="Enter a gallery"
      expanded={expanded}
    />
  )
}
