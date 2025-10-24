import { Separator, Spacer, Text } from "@artsy/palette"
import {
  ArtistAuctionResultsQueryRenderer,
  useScrollToTopOfAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResults"
import { MarketStatsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/Components/MarketStats"
import { ArtistOverviewQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { ArtistArtworkFilterQueryRenderer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { Jump } from "Utils/Hooks/useJump"
import type { ArtistCombinedRoute_artist$data } from "__generated__/ArtistCombinedRoute_artist.graphql"
import type * as React from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistCombinedRouteProps {
  artist: ArtistCombinedRoute_artist$data
}

const ArtistCombinedRoute: React.FC<
  React.PropsWithChildren<ArtistCombinedRouteProps>
> = ({ artist }) => {
  const { handleScrollToTop } = useScrollToTopOfAuctionResults()

  return (
    <>
      {/* Temporarily hide from search engines */}
      <Meta name="robots" content="noindex, nofollow" />

      <Separator my={4} />

      <Text variant="lg-display" as="h2">
        Artworks
      </Text>

      <Spacer y={2} />

      <ArtistArtworkFilterQueryRenderer id={artist.internalID} lazyLoad />

      <Separator my={4} />

      <Jump id="marketSignalsTop" />

      <MarketStatsQueryRenderer
        id={artist.internalID}
        onRendered={handleScrollToTop}
      />

      <Spacer y={6} />

      <Jump id="artistAuctionResultsTop" />

      <Text variant="lg-display" as="h2">
        Auction Results
      </Text>

      <Spacer y={2} />

      <ArtistAuctionResultsQueryRenderer
        id={artist.internalID}
        lazyLoad
        truncate
      />

      <Separator my={4} />

      <ArtistOverviewQueryRenderer id={artist.internalID} lazyLoad />
    </>
  )
}

export const ArtistCombinedRouteFragmentContainer = createFragmentContainer(
  ArtistCombinedRoute,
  {
    artist: graphql`
      fragment ArtistCombinedRoute_artist on Artist {
        id
        internalID
        href
      }
    `,
  },
)
