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
      {getENV("ENABLE_NEW_ARTWORK_FILTERS") ? <SizeFilter2 /> : <SizeFilter />}
      <TimePeriodFilter />
      <ColorFilter />
    </Box>
  )
}
