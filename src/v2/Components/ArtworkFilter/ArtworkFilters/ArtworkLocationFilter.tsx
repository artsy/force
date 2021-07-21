import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export interface ArtworkLocationFilterProps {
  expanded?: boolean
}

export const ArtworkLocationFilter: React.FC<ArtworkLocationFilterProps> = ({
  expanded,
}) => {
  return (
    <ResultsFilter
      facetName="locationCities"
      slice="LOCATION_CITY"
      label="Artwork Location"
      placeholder="Enter a city"
      expanded={expanded}
    />
  )
}
