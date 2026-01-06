import { Box, Separator, Spacer, Spinner, Text, useTheme } from "@artsy/palette"
import {
  ArtistAuctionResultsQueryRenderer,
  useScrollToTopOfAuctionResults,
} from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResults"
import { MarketStatsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/Components/MarketStats"
import { ArtistCombinedNav } from "Apps/Artist/Routes/Combined/Components/ArtistCombinedNav"
import { ArtistOverviewQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistOverview"
import { ArtistArtworkFilterQueryRenderer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import { Z } from "Apps/Components/constants"
import { useRouter } from "System/Hooks/useRouter"
import { useJump } from "Utils/Hooks/useJump"
import { Section, SectionNavProvider } from "Utils/Hooks/useSectionNav"
import { useSectionReadiness } from "Utils/Hooks/useSectionReadiness"
import type { ArtistCombinedRoute_artist$data } from "__generated__/ArtistCombinedRoute_artist.graphql"
import type * as React from "react"
import { useEffect, useMemo, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"

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
    <SectionNavProvider>
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

      <ArtistCombinedNav waitUntil={waitUntil} navigating={navigating} />

      <Spacer y={[2, 4]} />

      <Section id="artistArtworksTop">
        <Text variant="lg-display" as="h2">
          Artworks
        </Text>

        <Spacer y={2} />

        <ArtistArtworkFilterQueryRenderer
          id={artist.internalID}
          lazyLoad={lazy.artworks}
          onReady={() => markReady("artworks")}
        />
      </Section>

      <Separator my={4} />

      <Section id="marketSignalsTop">
        <MarketStatsQueryRenderer
          id={artist.internalID}
          onRendered={handleScrollToTop}
          onReady={() => markReady("market")}
          lazyLoad={lazy.market}
        />

        <Spacer y={6} />

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
      </Section>

      <Separator my={4} />

      <Section id="artistAboutTop">
        <ArtistOverviewQueryRenderer
          id={artist.internalID}
          lazyLoad={lazy.about}
          onReady={() => markReady("about")}
        />
      </Section>
    </SectionNavProvider>
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
