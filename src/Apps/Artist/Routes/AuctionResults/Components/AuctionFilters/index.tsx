import { Join, Spacer } from "@artsy/palette"
import { HideUpcomingFilter } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/HideUpcomingFilter"
import * as React from "react"
import { AuctionHouseFilter } from "./AuctionHouseFilter"
import { MediumFilter } from "./MediumFilter"
import { SizeFilter } from "./SizeFilter"
import { YearCreated } from "./YearCreated"
import { LocationFilter } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/LocationFilter"

export const AuctionFilters: React.FC<{
  showUpcomingAuctionResults: boolean
}> = ({ showUpcomingAuctionResults }) => {
  return (
    <>
      {showUpcomingAuctionResults && (
        <>
          <HideUpcomingFilter />
          <Spacer y={2} />
        </>
      )}

      <Join separator={<Spacer y={4} />}>
        <MediumFilter />
        <SizeFilter />
        <YearCreated />
        <AuctionHouseFilter />
        <LocationFilter />
      </Join>
    </>
  )
}
