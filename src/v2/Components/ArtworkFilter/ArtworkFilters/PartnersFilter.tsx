import * as React from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { getFilterLabelWithCounts } from "../Utils/getFilterLabelWithCounts"
import { ResultsFilter } from "./ResultsFilter"

export interface PartnersFilterProps {
  expanded?: boolean
  label?: string
}

export const PartnersFilter: React.FC<PartnersFilterProps> = ({
  expanded,
  label = "Galleries and Institutions",
}) => {
  const { selectedFiltersCounts } = useArtworkFilterContext()

  const filterLabel = getFilterLabelWithCounts(
    label,
    selectedFiltersCounts.partnerIDs
  )

  return (
    <ResultsFilter
      facetName="partnerIDs"
      slice="PARTNER"
      label={filterLabel}
      placeholder="Enter a gallery"
      expanded={expanded}
    />
  )
}
