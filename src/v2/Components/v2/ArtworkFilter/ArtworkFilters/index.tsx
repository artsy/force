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

export const ArtworkFilters: React.FC = () => {
  const PartnerFilters = () => {
    if (getENV("ENABLE_NEW_ARTWORK_FILTERS")) {
      return <PartnersFilter />
    } else {
      return (
        <>
          <GalleryFilter />
          <InstitutionFilter />
        </>
      )
    }
  }

  return (
    <Box pr={2}>
      <MediumFilter />
      <AttributionClassFilter />
      <PriceRangeFilter />
      <WaysToBuyFilter />
      <PartnerFilters />
      {getENV("ENABLE_NEW_ARTWORK_FILTERS") && <ArtworkLocationFilter />}
      <SizeFilter />
      <TimePeriodFilter />
      <ColorFilter />
    </Box>
  )
}
