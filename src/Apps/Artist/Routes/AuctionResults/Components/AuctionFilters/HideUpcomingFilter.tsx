import { Checkbox } from "@artsy/palette"
import {
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/AuctionResultsFilterContext"
import type * as React from "react"

export const HideUpcomingFilter: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { setFilter } = useAuctionResultsFilterContext()
  const { hideUpcoming } = useCurrentlySelectedFiltersForAuctionResults()

  return (
    <Checkbox
      selected={hideUpcoming}
      onSelect={hideUpcoming => {
        setFilter?.("hideUpcoming", hideUpcoming)
      }}
    >
      Hide upcoming auctions
    </Checkbox>
  )
}
