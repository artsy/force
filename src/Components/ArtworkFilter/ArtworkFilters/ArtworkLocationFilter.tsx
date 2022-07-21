import * as React from "react"
import { SelectedFiltersCountsLabels } from "../ArtworkFilterContext"
import { ResultsFilter } from "./ResultsFilter"

export interface ArtworkLocationFilterProps {
  expanded?: boolean
}

export const ArtworkLocationFilter: React.FC<ArtworkLocationFilterProps> = ({
  expanded,
}) => {
  return (
    <ResultsFilter
      expanded={expanded}
      facetName="locationCities"
      filtersCountKey={SelectedFiltersCountsLabels.locationCities}
      label="Artwork Location"
      placeholder="Enter a city"
      slice="LOCATION_CITY"
    />
  )
}
