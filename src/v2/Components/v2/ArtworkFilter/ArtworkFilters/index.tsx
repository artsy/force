import { Box } from "@artsy/palette"
import React from "react"

import { ColorFilter } from "./ColorFilter"
import { GalleryFilter } from "./GalleryFilter"
import { InstitutionFilter } from "./InstitutionFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeFilter } from "./SizeFilter"
import { SizeFilter2 } from "./SizeFilter2"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"
import { AttributionClassFilter } from "./AttributionClassFilter"
import { getENV } from "v2/Utils/getENV"
import { ArtworkLocationFilter } from "./ArtworkLocationFilter"
import { ArtistNationalityFilter } from "./ArtistNationalityFilter"
import { MaterialsFilter } from "./MaterialsFilter"
import { PartnersFilter } from "./PartnersFilter"

export const ArtworkFilters: React.FC = () => {
  const showNewFilters = getENV("ENABLE_NEW_ARTWORK_FILTERS")

  return (
    <Box pr={2}>
      <MediumFilter expanded />
      {showNewFilters && <MaterialsFilter expanded />}
      <PriceRangeFilter />
      <AttributionClassFilter expanded />
      {showNewFilters ? <SizeFilter2 /> : <SizeFilter />}
      <WaysToBuyFilter />
      {showNewFilters && <ArtworkLocationFilter expanded />}
      {showNewFilters && <ArtistNationalityFilter expanded />}
      <TimePeriodFilter />
      <ColorFilter />
      {showNewFilters ? (
        <PartnersFilter />
      ) : (
        <>
          <GalleryFilter />
          <InstitutionFilter />
        </>
      )}
    </Box>
  )
}
