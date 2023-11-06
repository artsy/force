import * as React from "react"
import { ColorFilter } from "./ColorFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeFilter } from "./SizeFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"
import { AttributionClassFilter } from "./AttributionClassFilter"
import { ArtworkLocationFilter } from "./ArtworkLocationFilter"
import { ArtistNationalityFilter } from "./ArtistNationalityFilter"
import { MaterialsFilter } from "./MaterialsFilter"
import { PartnersFilter } from "./PartnersFilter"
import { ArtistsFilter } from "./ArtistsFilter"
import { Join, Spacer } from "@artsy/palette"
import { KeywordFilter } from "Components/ArtworkFilter/ArtworkFilters/KeywordFilter"

interface ArtworkFiltersProps {
  user?: User
}

// Some filters will be rendered only if there is the necessary data in aggregations (for example, ArtistsFilter)
export const ArtworkFilters: React.FC<ArtworkFiltersProps> = props => {
  const { user } = props

  return (
    <Join separator={<Spacer y={4} />}>
      <KeywordFilter />
      <ArtistsFilter user={user} expanded />
      <AttributionClassFilter expanded />
      <MediumFilter expanded />
      <PriceRangeFilter expanded />
      <SizeFilter expanded />
      <WaysToBuyFilter expanded />
      <MaterialsFilter expanded />
      <ArtistNationalityFilter expanded />
      <ArtworkLocationFilter expanded />
      <TimePeriodFilter expanded />
      <ColorFilter expanded />
      <PartnersFilter expanded />
    </Join>
  )
}
