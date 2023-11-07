import { ColorFilter } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { MediumFilter } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { SizeFilter } from "Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WaysToBuyFilter } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { AttributionClassFilter } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { ArtworkLocationFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { ArtistNationalityFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { PartnersFilter } from "Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { KeywordFilter } from "Components/ArtworkFilter/ArtworkFilters/KeywordFilter"
import { useSystemContext } from "System/useSystemContext"
import { Join, Spacer } from "@artsy/palette"
import { ProgressiveOnboardingAlertSelectFilter } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertSelectFilter"
import { ArtistSeriesFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistSeriesFilter"
import { useFeatureFlag } from "System/useFeatureFlag"

interface ArtistArtworkFiltersProps {}

export const ArtistArtworkFilters: React.FC<ArtistArtworkFiltersProps> = props => {
  const { user } = useSystemContext()
  const isArtistSeriesFilterEnabled = useFeatureFlag(
    "onyx_enable-artist-series-filter"
  )

  return (
    <Join separator={<Spacer y={4} />}>
      <KeywordFilter />
      {isArtistSeriesFilterEnabled && <ArtistSeriesFilter expanded />}
      <ArtistsFilter user={user} expanded />
      <ProgressiveOnboardingAlertSelectFilter>
        <AttributionClassFilter expanded />
      </ProgressiveOnboardingAlertSelectFilter>
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter />
      <ArtistNationalityFilter />
      <ArtworkLocationFilter />
      <TimePeriodFilter />
      <ColorFilter />
      <PartnersFilter />
    </Join>
  )
}
