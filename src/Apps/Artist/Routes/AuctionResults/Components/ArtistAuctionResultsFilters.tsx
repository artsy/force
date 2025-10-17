import FilterIcon from "@artsy/icons/FilterIcon"
import { Box, HorizontalOverflow, Pill, Stack } from "@artsy/palette"
import { ArtistAuctionResultsDrawer } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsDrawer"
import { ArtistAuctionResultsQuickMedium } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsQuickFilters/ArtistAuctionResultsQuickMedium"
import { ArtistAuctionResultsQuickPriceRange } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsQuickFilters/ArtistAuctionResultsQuickPriceRange"
import { ArtistAuctionResultsQuickYear } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsQuickFilters/ArtistAuctionResultsQuickYear"
import { useState } from "react"

export const ArtistAuctionResultsFilters = () => {
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
      />
    </HorizontalOverflow>
  )
}
