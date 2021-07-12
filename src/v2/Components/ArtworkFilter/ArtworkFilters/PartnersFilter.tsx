import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export interface PartnersFilterProps {
  expanded?: boolean
  label?: string
  placeholder?: string
}

export const PartnersFilter: React.FC<PartnersFilterProps> = ({
  expanded,
  label = "Galleries and institutions",
  placeholder = "Enter a gallery",
}) => {
  return (
    <ResultsFilter
      facetName="partnerIDs"
      slice="PARTNER"
      label={label}
      placeholder={placeholder}
      expanded={expanded}
    />
  )
}
