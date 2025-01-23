import { SelectedFiltersCountsLabels } from "Components/ArtworkFilter/ArtworkFilterContext"
import type * as React from "react"
import { ResultsFilter } from "./ResultsFilter"
import { getArtworkLocationSearchableText } from "Components/ArtworkFilter/Utils/getArtworkLocationSearchableText"

export interface ArtworkLocationFilterProps {
  expanded?: boolean
}

export const ArtworkLocationFilter: React.FC<
  React.PropsWithChildren<ArtworkLocationFilterProps>
> = ({ expanded }) => {
  return (
    <ResultsFilter
      expanded={expanded}
      facetName="locationCities"
      filtersCountKey={SelectedFiltersCountsLabels.locationCities}
      label="Artwork Location"
      placeholder="Enter a city, country or region"
      slice="LOCATION_CITY"
      searchableText={getArtworkLocationSearchableText}
      enableSelectAll
    />
  )
}
