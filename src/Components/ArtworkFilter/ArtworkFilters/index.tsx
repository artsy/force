import { Join, Spacer } from "@artsy/palette"
import { AvailabilityFilter } from "Components/ArtworkFilter/ArtworkFilters/AvailabilityFilter"
import { FramedFilter } from "Components/ArtworkFilter/ArtworkFilters/FramedFilter"
import { KeywordFilter } from "Components/ArtworkFilter/ArtworkFilters/KeywordFilter"
import { SignedFilter } from "Components/ArtworkFilter/ArtworkFilters/SignedFilter"
import { useFlag } from "@unleash/proxy-client-react"
import type * as React from "react"
import { ArtistNationalityFilter } from "./ArtistNationalityFilter"
import { ArtistsFilter } from "./ArtistsFilter"
import { ArtworkLocationFilter } from "./ArtworkLocationFilter"
import { AttributionClassFilter } from "./AttributionClassFilter"
import { ColorFilter } from "./ColorFilter"
import { MaterialsFilter } from "./MaterialsFilter"
import { MediumFilter } from "./MediumFilter"
import { PartnersFilter } from "./PartnersFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeFilter } from "./SizeFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"

interface ArtworkFiltersProps {
  user?: User
}

// Some filters will be rendered only if there is the necessary data in aggregations (for example, ArtistsFilter)
export const ArtworkFilters: React.FC<
  React.PropsWithChildren<ArtworkFiltersProps>
> = props => {
  const enableShowOnlyFramedArtworksFilter = useFlag(
    "onyx_only_framed_artworks_filter",
  )
  const { user } = props

  return (
    <Join separator={<Spacer y={4} />}>
      <KeywordFilter />
      <ArtistsFilter user={user} expanded />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <AvailabilityFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter expanded />
      <ArtistNationalityFilter expanded />
      <ArtworkLocationFilter expanded />
      <TimePeriodFilter expanded />
      <ColorFilter expanded />
      <PartnersFilter expanded />
      {enableShowOnlyFramedArtworksFilter && <FramedFilter expanded />}
      <SignedFilter expanded />
    </Join>
  )
}
