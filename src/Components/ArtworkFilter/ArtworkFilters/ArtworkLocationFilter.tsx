import { SelectedFiltersCountsLabels } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ResultsFilter } from "./ResultsFilter"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { getArtworkLocationSearchableText } from "Components/ArtworkFilter/Utils/getArtworkLocationSearchableText"

export interface ArtworkLocationFilterProps {
  expanded?: boolean
}

export const ArtworkLocationFilter: React.FC<
  React.PropsWithChildren<ArtworkLocationFilterProps>
> = props => {
  const { expanded } = props
  const enableEnhancedFilter = useFeatureFlag(
    "onyx_enhanced-artwork-location-filtering",
  )

  if (enableEnhancedFilter) {
    return <EnhancedArtworkLocationFilter expanded={expanded} />
  }

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

export const EnhancedArtworkLocationFilter: React.FC<
  React.PropsWithChildren<ArtworkLocationFilterProps>
> = props => {
  const { expanded } = props
  return (
    <ResultsFilter
      expanded={expanded}
      facetName="locationCities"
      filtersCountKey={SelectedFiltersCountsLabels.locationCities}
      label="Artwork Location"
      placeholder="Enter a city, country, or region"
      slice="LOCATION_CITY"
      searchableText={getArtworkLocationSearchableText}
      enableSelectAll
    />
  )
}
