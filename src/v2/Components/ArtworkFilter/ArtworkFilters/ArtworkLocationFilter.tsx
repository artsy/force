import * as React from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { getFilterLabelWithCounts } from "../Utils/getFilterLabelWithCounts"
import { ResultsFilter } from "./ResultsFilter"

export interface ArtworkLocationFilterProps {
  expanded?: boolean
}

export const ArtworkLocationFilter: React.FC<ArtworkLocationFilterProps> = ({
  expanded,
}) => {
  const { selectedFiltersCounts } = useArtworkFilterContext()
  const label = getFilterLabelWithCounts(
    "Artwork Location",
    selectedFiltersCounts.locationCities
  )

  return (
    <ResultsFilter
      facetName="locationCities"
      slice="LOCATION_CITY"
      label={label}
      placeholder="Enter a city"
      expanded={expanded}
    />
  )
}
