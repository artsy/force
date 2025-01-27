import { Join, Spacer } from "@artsy/palette"
import { ArtistNationalityFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistNationalityFilter"
import { ArtistSeriesFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistSeriesFilter"
import { ArtistsFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { ArtworkLocationFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import { AttributionClassFilter } from "Components/ArtworkFilter/ArtworkFilters/AttributionClassFilter"
import { AvailabilityFilter } from "Components/ArtworkFilter/ArtworkFilters/AvailabilityFilter"
import { ColorFilter } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { FramedFilter } from "Components/ArtworkFilter/ArtworkFilters/FramedFilter"
import { KeywordFilter } from "Components/ArtworkFilter/ArtworkFilters/KeywordFilter"
import { MaterialsFilter } from "Components/ArtworkFilter/ArtworkFilters/MaterialsFilter"
import { MediumFilter } from "Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PartnersFilter } from "Components/ArtworkFilter/ArtworkFilters/PartnersFilter"
import { PriceRangeFilter } from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { SizeFilter } from "Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WaysToBuyFilter } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useSystemContext } from "System/Hooks/useSystemContext"

type ArtistArtworkFiltersProps = {}

export const ArtistArtworkFilters: React.FC<
  React.PropsWithChildren<ArtistArtworkFiltersProps>
> = props => {
  const enableShowOnlyFramedArtworksFilter = useFeatureFlag(
    "onyx_only_framed_artworks_filter",
  )
  const { user } = useSystemContext()

  return (
    <Join separator={<Spacer y={4} />}>
      <KeywordFilter />
      <ArtistsFilter user={user} expanded />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <ArtistSeriesFilter expanded />
      <SizeFilter expanded />
      <AvailabilityFilter />
      <WaysToBuyFilter expanded />
      <MaterialsFilter />
      <ArtistNationalityFilter />
      <ArtworkLocationFilter />
      <TimePeriodFilter />
      <ColorFilter />
      <PartnersFilter />
      {enableShowOnlyFramedArtworksFilter && <FramedFilter />}
    </Join>
  )
}
