import { SelectedFiltersCountsLabels } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ResultsFilter } from "./ResultsFilter"
import { useFlag } from "@unleash/proxy-client-react"
import { getArtworkLocationSearchableText } from "Components/ArtworkFilter/Utils/getArtworkLocationSearchableText"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { FilterSelectChangeState } from "@artsy/palette"
import {
  ActionType,
  ContextModule,
  CommercialFilterSelectedAll,
} from "@artsy/cohesion"

export interface ArtworkLocationFilterProps {
  expanded?: boolean
}

export const ArtworkLocationFilter: React.FC<
  React.PropsWithChildren<ArtworkLocationFilterProps>
> = props => {
  const { expanded } = props
  const enableEnhancedFilter = useFlag(
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
  const tracking = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const handleSelectAll = (state: FilterSelectChangeState) => {
    const event: CommercialFilterSelectedAll = {
      action: ActionType.commercialFilterSelectedAll,
      context_module: ContextModule.artworkGrid,
      context_owner_type: contextPageOwnerType,
      context_owner_id: contextPageOwnerId,
      context_owner_slug: contextPageOwnerSlug,
      facet: "locationCities",
      query: state.query,
    }

    tracking.trackEvent(event)
  }

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
      onSelectAll={handleSelectAll}
    />
  )
}
