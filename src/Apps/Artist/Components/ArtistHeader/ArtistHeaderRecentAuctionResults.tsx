import {
  ActionType,
  type ClickedAuctionResultItem,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Shelf, Stack, Text, THEME } from "@artsy/palette"
import { ArtistHeaderRecentAuctionResultItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResultItem"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import type { ArtistHeader_artist$data } from "__generated__/ArtistHeader_artist.graphql"
import type { FC } from "react"
import { useTracking } from "react-tracking"

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
  artistID: string
  artistSlug: string
  auctionResults: RecentAuctionResult[]
}

export const ArtistHeaderRecentAuctionResults: FC<
  ArtistHeaderRecentAuctionResultsProps
> = ({ artistID, artistSlug, auctionResults }) => {
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const { trackEvent } = useTracking()
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const handleViewMoreClick = () => {
    const trackingEvent: ClickedAuctionResultItem = {
      action: ActionType.clickedAuctionResultItem,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.artistAuctionResults,
      destination_page_owner_id: artistID,
      destination_page_owner_slug: artistSlug,
      type: "viewAll",
    }

    trackEvent(trackingEvent)
  }

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
          onClick={handleViewMoreClick}
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
