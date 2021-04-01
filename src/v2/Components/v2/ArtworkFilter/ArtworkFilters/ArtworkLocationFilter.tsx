import React from "react"
import { ResultsFilter } from "./ResultsFilter"

export const ArtworkLocationFilter: React.FC = () => {
  return (
    <ResultsFilter
      facetName="locationCities"
      slice="LOCATION_CITY"
      label="Artwork location"
      placeholder="Enter a city"
      expanded
    />
  )
}
