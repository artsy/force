import { Stack, Text } from "@artsy/palette"
import { ArtistHeaderRecentAuctionResultItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResultItem"
import { ScrollableCardRail } from "Apps/Artist/Components/ArtistHeader/ScrollableCardRail"
import { RouterLink } from "System/Components/RouterLink"
import type { ArtistHeader_artist$data } from "__generated__/ArtistHeader_artist.graphql"
import type { FC } from "react"

type RecentAuctionResultsConnection = NonNullable<
  ArtistHeader_artist$data["recentAuctionResultsConnection"]
>
type RecentAuctionResultEdge = NonNullable<
  RecentAuctionResultsConnection["edges"]
>[number]
export type RecentAuctionResult = NonNullable<
  NonNullable<RecentAuctionResultEdge>["node"]
>

// The first few items are visible to everyone (including signed-out
// visitors and search crawlers) so the page still carries real commercial
// signal above the fold. Items past this point nudge signed-out visitors
// to sign up, matching the "teaser, then gate" pattern used elsewhere
// (e.g. Career Highlights/Market Insights vs. the full Auction Results tab).
export const VISIBLE_PRICE_COUNT = 3

export interface ArtistHeaderRecentAuctionResultsProps {
  artistSlug: string
  auctionResults: RecentAuctionResult[]
}

export const ArtistHeaderRecentAuctionResults: FC<
  ArtistHeaderRecentAuctionResultsProps
> = ({ artistSlug, auctionResults }) => {
  return (
    <Stack gap={1}>
      <Stack
        gap={1}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text variant="sm-display">Recent Auction Results</Text>

        <Text
          variant="xs"
          color="mono60"
          flexShrink={0}
          as={RouterLink}
          to={`/artist/${artistSlug}/auction-results?scroll_to_market_signals=true`}
        >
          View More
        </Text>
      </Stack>

      <ScrollableCardRail itemsLabel="auction results">
        {auctionResults.map((auctionResult, index) => {
          return (
            <ArtistHeaderRecentAuctionResultItem
              key={auctionResult.internalID}
              auctionResult={auctionResult}
              isPriceGated={index >= VISIBLE_PRICE_COUNT}
            />
          )
        })}
      </ScrollableCardRail>
    </Stack>
  )
}
