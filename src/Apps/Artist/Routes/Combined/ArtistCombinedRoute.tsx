import { BaseTab, Separator, Spacer, Text } from "@artsy/palette"
import {
  ArtistAuctionResultsQueryRenderer,
  useScrollToTopOfAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResults"
import { MarketStatsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/Components/MarketStats"
import { ArtistOverviewQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { ArtistArtworkFilterQueryRenderer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { RouteTabs } from "Components/RouteTabs"
import { Jump, useJump } from "Utils/Hooks/useJump"
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

  const { jumpTo } = useJump()

  return (
    <>
      {/* Temporarily hide from search engines */}
      <Meta name="robots" content="noindex, nofollow" />

      <RouteTabs data-test="navigationTabs">
        <BaseTab onClick={() => jumpTo("artistArtworksTop", { offset: 40 })}>
          Artworks
        </BaseTab>

        <BaseTab onClick={() => jumpTo("marketSignalsTop", { offset: 40 })}>
          Auction Results
        </BaseTab>

        <BaseTab onClick={() => jumpTo("artistAboutTop", { offset: 40 })}>
          About
        </BaseTab>
      </RouteTabs>

      <Spacer y={[2, 4]} />

      <Jump id="artistArtworksTop" />

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

      <Jump id="artistAboutTop" />

      <ArtistOverviewQueryRenderer id={artist.internalID} lazyLoad />
    </>
  )
}

export const ArtistCombinedRouteFragmentContainer = createFragmentContainer(
  ArtistCombinedRoute,
  {
    artist: graphql`
      fragment ArtistCombinedRoute_artist on Artist {
        internalID
      }
    `,
  },
)
