import { ActionType, type ClickedHeader, ContextModule } from "@artsy/cohesion"
import {
  BaseTab,
  Box,
  Clickable,
  FullBleed,
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
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Z } from "Apps/Components/constants"
import { RouteTabs } from "Components/RouteTabs"
import { Sticky } from "Components/Sticky"
import { useStickyBackdrop } from "Components/Sticky/useStickyBackdrop"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useRouter } from "System/Hooks/useRouter"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { useSectionReadiness } from "Utils/Hooks/useSectionReadiness"
import type { ArtistCombinedRoute_artist$data } from "__generated__/ArtistCombinedRoute_artist.graphql"
import type * as React from "react"
import { useEffect, useMemo, useRef } from "react"
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
  const backdrop = useStickyBackdrop()

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

  // Given the initial sub-path (/artist/:id/(auction-results|about)),
  // scroll to the appropriate section on initial load
  const {
    match: { location },
    router,
  } = useRouter()
  const section = location.pathname.split("/").pop()
  const scrolledToSection = useRef(false)

  useEffect(() => {
    if (scrolledToSection.current) return

    const scrollToSection = async () => {
      if (scrolledToSection.current) return

      scrolledToSection.current = true

      if (section === "auction-results") {
        await waitUntil("auction")
        jumpTo("marketSignalsTop")
        // Remove the subpath from the URL
        const newPath = location.pathname.replace(/\/auction-results$/, "")
        router.replace(newPath)
      } else if (section === "about") {
        await waitUntil("about")
        jumpTo("artistAboutTop")
        // Remove the subpath from the URL
        const newPath = location.pathname.replace(/\/about$/, "")
        router.replace(newPath)
      }
    }

    scrollToSection()
  }, [section, jumpTo, waitUntil, location.pathname, router])

  return (
    <>
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

      <Sticky retractGlobalNav>
        {({ scrollDirection }) => {
          return (
            <FullBleed style={backdrop[scrollDirection]}>
              <AppContainer>
                <HorizontalPadding pb={2}>
                  <RouteTabs data-test="navigationTabs" pt={2}>
                    <BaseTab
                      as={Clickable}
                      disabled={navigating.artworks}
                      onClick={async () => {
                        // No prior sections; just jump.
                        jumpTo("artistArtworksTop")
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
                        jumpTo("marketSignalsTop")
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
                        jumpTo("artistAboutTop")
                        handleClick("about")
                      }}
                    >
                      About
                    </BaseTab>
                  </RouteTabs>
                </HorizontalPadding>
              </AppContainer>
            </FullBleed>
          )
        }}
      </Sticky>

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
