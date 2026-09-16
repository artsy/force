import {
  Box,
  ShelfNext,
  ShelfPrevious,
  ShelfScrollBar,
  Stack,
  Swiper,
  Text,
} from "@artsy/palette"
import { ArtistHeaderRecentAuctionResultItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderRecentAuctionResultItem"
import { RouterLink } from "System/Components/RouterLink"
import type { ArtistHeader_artist$data } from "__generated__/ArtistHeader_artist.graphql"
import { type FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"

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

// Reuses the same Swiper-based carousel (and matching header text sizes)
// as ArtistHeaderEditorial in this same right-rail column, rather than the
// Rail/Shelf component used by full-width rails elsewhere — Shelf wraps
// its content in Palette's FullBleed, which expands to 100vw once mounted
// and breaks a narrow sidebar column.
//
// Swiper only supports touch/trackpad swiping natively, with no visible
// affordance for a mouse-only visitor, so ShelfPrevious/ShelfNext — the
// same hover-to-reveal overlay arrows every other rail on the site uses —
// drive it here. Deliberately not via Swiper's own initialIndex/onChange:
// Swiper derives its index from overall scroll *percentage* across the
// total cell count, which is fine when one full-width cell fills the
// viewport (ArtistHeaderEditorial), but breaks down here where several
// cards are visible at once — right at the end, the last cell can't
// scroll to a "start-aligned" position (there's no more room), so the
// scroll gets clamped and Swiper's percentage-based guess lands on the
// wrong index, which then feeds back into our own state via onChange and
// desyncs the buttons. Scrolling the real DOM node directly (the same
// node ShelfScrollBar tracks) sidesteps that entirely.
export const ArtistHeaderRecentAuctionResults: FC<
  ArtistHeaderRecentAuctionResultsProps
> = ({ artistSlug, auctionResults }) => {
  const swiperWrapperRef = useRef<HTMLDivElement>(null)
  const [viewport, setViewport] = useState<HTMLDivElement | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const element = swiperWrapperRef.current
      ?.firstElementChild as HTMLDivElement | null

    setViewport(element ?? null)

    if (!element) return

    const updateEdges = () => {
      setAtStart(element.scrollLeft <= 0)
      setAtEnd(
        Math.ceil(element.scrollLeft + element.clientWidth) >=
          element.scrollWidth,
      )
    }

    updateEdges()

    element.addEventListener("scroll", updateEdges, { passive: true })
    window.addEventListener("resize", updateEdges)

    return () => {
      element.removeEventListener("scroll", updateEdges)
      window.removeEventListener("resize", updateEdges)
    }
  }, [])

  const scrollByOnePage = (direction: 1 | -1) => {
    const element = swiperWrapperRef.current
      ?.firstElementChild as HTMLDivElement | null

    element?.scrollBy({ left: element.clientWidth * direction })
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
        >
          View More
        </Text>
      </Stack>

      <RailOverlay>
        <Nav as="nav">
          <Previous
            aria-label="See previous auction results"
            disabled={atStart}
            onClick={() => scrollByOnePage(-1)}
          />

          <Next
            aria-label="See more auction results"
            disabled={atEnd}
            onClick={() => scrollByOnePage(1)}
          />
        </Nav>

        <Box ref={swiperWrapperRef}>
          <SmoothSwiper>
            {auctionResults.map((auctionResult, index) => {
              return (
                <ArtistHeaderRecentAuctionResultItem
                  key={auctionResult.internalID}
                  auctionResult={auctionResult}
                  isPriceGated={index >= VISIBLE_PRICE_COUNT}
                />
              )
            })}
          </SmoothSwiper>
        </Box>
      </RailOverlay>

      <ShelfScrollBar viewport={viewport} />
    </Stack>
  )
}

// Swiper's own button-driven navigation calls scrollIntoView() with no
// smooth behavior, and its scroll container has no scroll-behavior CSS
// either, so it jumps instantly. Shelf's arrows glide because Shelf's own
// scrollTo explicitly passes behavior: "smooth" — Swiper spreads
// unrecognized props onto its scroll container, so this CSS-only override
// gets the same result without forking Palette.
const SmoothSwiper = styled(Swiper)`
  scroll-behavior: smooth;
`

const RailOverlay = styled(Box)`
  position: relative;

  > nav {
    opacity: 0;
    transition: opacity 250ms;
  }

  &:hover > nav {
    opacity: 1;
  }
`

const Nav = styled(Box)`
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Previous = styled(ShelfPrevious)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  @media (hover: none) {
    display: none;
  }
`

const Next = styled(ShelfNext)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  @media (hover: none) {
    display: none;
  }
`
