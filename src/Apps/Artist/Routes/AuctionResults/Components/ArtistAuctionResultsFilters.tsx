import { ArtistAuctionResultsDrawer } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsDrawer"
import { ArtistAuctionResultsQuickMedium } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsQuickFilters/ArtistAuctionResultsQuickMedium"
import { ArtistAuctionResultsQuickPriceRange } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsQuickFilters/ArtistAuctionResultsQuickPriceRange"
import { ArtistAuctionResultsQuickYear } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsQuickFilters/ArtistAuctionResultsQuickYear"
import FilterIcon from "@artsy/icons/FilterIcon"
import { Box, HorizontalOverflow, Pill, Stack } from "@artsy/palette"
import type { FC } from "react"
import { useState } from "react"

interface ArtistAuctionResultsFiltersProps {
  showUpcomingAuctionResults: boolean
}

export const ArtistAuctionResultsFilters: FC<
  ArtistAuctionResultsFiltersProps
> = ({ showUpcomingAuctionResults }) => {
  const [mode, setMode] = useState<"Idle" | "Drawer">("Idle")

  return (
    <HorizontalOverflow minWidth={0}>
      <Stack gap={2} flexDirection="row">
        <Pill
          size="small"
          onClick={() => {
            setMode("Drawer")
          }}
          Icon={FilterIcon}
        >
          All Filters
        </Pill>

        <Box bg="mono30" width="1px" flexShrink={0} />

        <Stack gap={1} flexDirection="row">
          <ArtistAuctionResultsQuickMedium />
          <ArtistAuctionResultsQuickPriceRange />
          <ArtistAuctionResultsQuickYear />
        </Stack>
      </Stack>

      <ArtistAuctionResultsDrawer
        open={mode === "Drawer"}
        onClose={() => setMode("Idle")}
        showUpcomingAuctionResults={showUpcomingAuctionResults}
      />
    </HorizontalOverflow>
  )
}
