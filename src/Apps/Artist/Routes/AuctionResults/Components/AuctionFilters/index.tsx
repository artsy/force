import { Join, Spacer } from "@artsy/palette"
import { HideUpcomingFilter } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/HideUpcomingFilter"
import * as React from "react"
import { AuctionHouseFilter } from "./AuctionHouseFilter"
import { MediumFilter } from "./MediumFilter"
import { SizeFilter } from "./SizeFilter"
import { YearCreated } from "./YearCreated"

export const AuctionFilters: React.FC = () => {
  return (
    <>
      <HideUpcomingFilter />
      <Spacer y={2} />
      <Join separator={<Spacer y={4} />}>
        <MediumFilter />
        <SizeFilter />
        <YearCreated />
        <AuctionHouseFilter />
      </Join>
    </>
  )
}
