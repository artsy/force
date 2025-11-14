import { HideUpcomingFilter } from "Apps/Artist/Routes/AuctionResults/Components/AuctionFilters/HideUpcomingFilter"
import { Join, Spacer } from "@artsy/palette"
import type * as React from "react"
import { AuctionHouseFilter } from "./AuctionHouseFilter"
import { CurrencyFilter } from "./CurrencyFilter"
import { KeywordFilter } from "./KeywordFilter"
import { MediumFilter } from "./MediumFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { SaleEndYearFilter } from "./SaleEndYearFilter"
import { SizeFilter } from "./SizeFilter"
import { YearCreated } from "./YearCreated"

export const AuctionFilters: React.FC<
  React.PropsWithChildren<{
    showUpcomingAuctionResults: boolean
  }>
> = ({ showUpcomingAuctionResults }) => {
  return (
    <>
      {showUpcomingAuctionResults && (
        <>
          <HideUpcomingFilter />
          <Spacer y={2} />
        </>
      )}

      <Join separator={<Spacer y={4} />}>
        <KeywordFilter />
        <MediumFilter />
        <SizeFilter />
        <YearCreated />
        <CurrencyFilter />
        <PriceRangeFilter />
        <SaleEndYearFilter />
        <AuctionHouseFilter />
      </Join>
    </>
  )
}
