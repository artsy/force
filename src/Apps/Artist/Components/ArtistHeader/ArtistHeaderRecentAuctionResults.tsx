import { Shelf, Stack, Text, THEME } from "@artsy/palette"
import { ArtistHeaderRecentAuctionResultItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResultItem"
import { RouterLink } from "System/Components/RouterLink"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
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

export const VISIBLE_PRICE_COUNT = 3

export interface ArtistHeaderRecentAuctionResultsProps {
  artistSlug: string
  auctionResults: RecentAuctionResult[]
}

export const ArtistHeaderRecentAuctionResults: FC<
  ArtistHeaderRecentAuctionResultsProps
> = ({ artistSlug, auctionResults }) => {
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

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

      <Shelf gap={1} fullBleed={!!isMobile}>
        {auctionResults.map((auctionResult, index) => {
          return (
            <ArtistHeaderRecentAuctionResultItem
              key={auctionResult.internalID}
              auctionResult={auctionResult}
              isPriceGated={index >= VISIBLE_PRICE_COUNT}
            />
          )
        })}
      </Shelf>
    </Stack>
  )
}
