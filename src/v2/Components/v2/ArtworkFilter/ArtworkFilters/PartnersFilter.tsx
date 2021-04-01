import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export const PartnersFilter: React.FC = () => {
  return (
    <ResultsFilter
      facetName="partnerIDs"
      slice="PARTNER"
      label="Galleries and institutions"
      placeholder="Enter a gallery"
      expanded
    />
  )
}
