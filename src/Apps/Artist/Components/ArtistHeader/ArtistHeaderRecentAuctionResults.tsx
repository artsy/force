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
import { extractNodes } from "Utils/extractNodes"
import type { ArtistHeaderRecentAuctionResults_artist$key } from "__generated__/ArtistHeaderRecentAuctionResults_artist.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

export const VISIBLE_PRICE_COUNT = 3

export interface ArtistHeaderRecentAuctionResultsProps {
  artist: ArtistHeaderRecentAuctionResults_artist$key
}

export const ArtistHeaderRecentAuctionResults: FC<
  ArtistHeaderRecentAuctionResultsProps
> = ({ artist: artistRef }) => {
  const artist = useFragment(fragment, artistRef)
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
      destination_page_owner_id: artist.internalID,
      destination_page_owner_slug: artist.slug,
      type: "viewAll",
    }

    trackEvent(trackingEvent)
  }

  const auctionResults = extractNodes(artist.recentAuctionResultsConnection)

  if (auctionResults.length === 0) return null

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
          to={`${artist.href}/auction-results?scroll_to_market_signals=true`}
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

const fragment = graphql`
  fragment ArtistHeaderRecentAuctionResults_artist on Artist {
    internalID
    slug
    href
    recentAuctionResultsConnection: auctionResultsConnection(
      first: 10
      sort: DATE_DESC
      saleStartYear: $saleStartYear
      saleEndYear: $saleEndYear
      includeUnknownPrices: false
      allowUnspecifiedSaleDates: false
    ) {
      edges {
        node {
          internalID
          ...ArtistHeaderRecentAuctionResultItem_auctionResult
        }
      }
    }
  }
`
