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
import { SignedFilter } from "Components/ArtworkFilter/ArtworkFilters/SignedFilter"
import { SizeFilter } from "Components/ArtworkFilter/ArtworkFilters/SizeFilter"
import { TimePeriodFilter } from "Components/ArtworkFilter/ArtworkFilters/TimePeriodFilter"
import { WaysToBuyFilter } from "Components/ArtworkFilter/ArtworkFilters/WaysToBuyFilter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Join, Spacer } from "@artsy/palette"

type ArtistArtworkFiltersProps = {}

export const ArtistArtworkFilters: React.FC<
  React.PropsWithChildren<ArtistArtworkFiltersProps>
> = _props => {
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
      <FramedFilter />
      <SignedFilter />
    </Join>
  )
}
