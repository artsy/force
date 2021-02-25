import { Box } from "@artsy/palette"
import React from "react"

import { ColorFilter } from "./ColorFilter"
import { GalleryFilter } from "./GalleryFilter"
import { InstitutionFilter } from "./InstitutionFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SizeFilter } from "./SizeFilter"
import { TimePeriodFilter } from "./TimePeriodFilter"
import { WaysToBuyFilter } from "./WaysToBuyFilter"
import { AttributionClassFilter } from "./AttributionClassFilter"
import { getENV } from "v2/Utils/getENV"
import { PartnersFilter } from "./PartnersFilter"
import { ArtworkLocationFilter } from "./ArtworkLocationFilter"
import { ArtistNationalityFilter } from "./ArtistNationalityFilter"

export const ArtworkFilters: React.FC = () => {
  return (
    <Box pr={2}>
      <MediumFilter />
      <AttributionClassFilter />
      <PriceRangeFilter />
      <WaysToBuyFilter />
      {getENV("ENABLE_NEW_ARTWORK_FILTERS") ? (
        <>
          <PartnersFilter />
          <ArtworkLocationFilter />
          <ArtistNationalityFilter />
        </>
      ) : (
        <>
          <GalleryFilter />
          <InstitutionFilter />
        </>
      )}
      <SizeFilter />
      <TimePeriodFilter />
      <ColorFilter />
    </Box>
  )
}
