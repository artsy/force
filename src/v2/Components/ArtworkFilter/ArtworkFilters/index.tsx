import React from "react"
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

export const ArtworkFilters: React.FC = () => {
  return (
    <>
      <MediumFilter expanded />
      <MaterialsFilter expanded />
      <PriceRangeFilter />
      <AttributionClassFilter expanded />
      <SizeFilter />
      <WaysToBuyFilter />
      <ArtworkLocationFilter expanded />
      <ArtistNationalityFilter expanded />
      <TimePeriodFilter />
      <ColorFilter />
      <PartnersFilter />
    </>
  )
}
