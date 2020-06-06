import React from "react"
import { AuctionHouseFilter } from "./AuctionHouseFilter"
import { MediumFilter } from "./MediumFilter"
import { SizeFilter } from "./SizeFilter"
import { YearCreated } from "./YearCreated"
import { useAuctionResultsFilterContext } from "v2/Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"

export const AuctionFilters: React.FC = () => {
  return (
    <>
      <MediumFilter />
      <SizeFilter useFilterContext={useAuctionResultsFilterContext} />
      <YearCreated />
      <AuctionHouseFilter />
    </>
  )
}
