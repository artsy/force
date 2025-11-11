import { ActionType, type ClickedHeader, ContextModule } from "@artsy/cohesion"
import {
  BaseTab,
  Box,
  Clickable,
  Separator,
  Spacer,
  Spinner,
  Text,
  useTheme,
} from "@artsy/palette"
import {
  ArtistAuctionResultsQueryRenderer,
  useScrollToTopOfAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResults"
import { MarketStatsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/Components/MarketStats"
import { ArtistOverviewQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { ArtistArtworkFilterQueryRenderer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { Z } from "Apps/Components/constants"
import { RouteTabs } from "Components/RouteTabs"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { useSectionReadiness } from "Utils/Hooks/useSectionReadiness"
import type { ArtistCombinedRoute_artist$data } from "__generated__/ArtistCombinedRoute_artist.graphql"
import type * as React from "react"
import { useMemo } from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface ArtistCombinedRouteProps {
  artist: ArtistCombinedRoute_artist$data
}

const ArtistCombinedRoute: React.FC<
  React.PropsWithChildren<ArtistCombinedRouteProps>
> = ({ artist }) => {
  const { handleScrollToTop } = useScrollToTopOfAuctionResults()

  const { jumpTo } = useJump()

  const { lazy, markReady, waitUntil, navigating } = useSectionReadiness([
    "artworks",
    "market",
    "auction",
    "about",
  ])

  const { theme } = useTheme()

  const loading = useMemo(() => {
    return Object.values(navigating).some(Boolean)
  }, [navigating])

  const tracking = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()

  const handleClick = (subject: string) => {
    const payload: ClickedHeader = {
      action: ActionType.clickedHeader,
      context_module: ContextModule.artistHeader,
      context_page_owner_type: contextPageOwnerType,
      subject,
    }

    tracking.trackEvent(payload)
  }

  return (
    <>
      {/* Temporarily hide from search engines */}
      <Meta name="robots" content="noindex, nofollow" />

      {loading && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          bg={theme.effects.backdrop}
          width={80}
          height={80}
          borderRadius={2}
          justifyContent="center"
          alignItems="center"
          zIndex={Z.toasts}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <Spinner />
        </Box>
      )}

      <RouteTabs data-test="navigationTabs">
        <BaseTab
          as={Clickable}
          disabled={navigating.artworks}
          onClick={async () => {
            // No prior sections; just jump.
            jumpTo("artistArtworksTop", { offset: 40 })
            handleClick("artworks")
          }}
        >
          Artworks
        </BaseTab>

        <BaseTab
          as={Clickable}
          disabled={navigating.auction}
          onClick={async () => {
            await waitUntil("auction")
            jumpTo("marketSignalsTop", { offset: 40 })
            handleClick("auction results")
          }}
        >
          Auction Results
        </BaseTab>

        <BaseTab
          as={Clickable}
          disabled={navigating.about}
          onClick={async () => {
            await waitUntil("about")
            jumpTo("artistAboutTop", { offset: 40 })
            handleClick("about")
          }}
        >
          About
        </BaseTab>
      </RouteTabs>

      <Spacer y={[2, 4]} />

      <Jump id="artistArtworksTop" />

      <Text variant="lg-display" as="h2">
        Artworks
      </Text>

      <Spacer y={2} />

      <ArtistArtworkFilterQueryRenderer
        id={artist.internalID}
        lazyLoad={lazy.artworks}
        onReady={() => markReady("artworks")}
      />

      <Separator my={4} />

      <Jump id="marketSignalsTop" />

      <MarketStatsQueryRenderer
        id={artist.internalID}
        onRendered={handleScrollToTop}
        onReady={() => markReady("market")}
        lazyLoad={lazy.market}
      />

      <Spacer y={6} />

      <Jump id="artistAuctionResultsTop" />

      <Text variant="lg-display" as="h2">
        Auction Results
      </Text>

      <Spacer y={2} />

      <ArtistAuctionResultsQueryRenderer
        id={artist.internalID}
        lazyLoad={lazy.auction}
        truncate
        onReady={() => markReady("auction")}
      />

      <Separator my={4} />

      <Jump id="artistAboutTop" />

      <ArtistOverviewQueryRenderer
        id={artist.internalID}
        lazyLoad={lazy.about}
        onReady={() => markReady("about")}
      />
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
