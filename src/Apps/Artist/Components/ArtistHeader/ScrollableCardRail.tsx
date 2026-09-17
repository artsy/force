import {
  Box,
  type BoxProps,
  ShelfNext,
  ShelfPrevious,
  ShelfScrollBar,
  Stack,
  Swiper,
  SwiperCell,
} from "@artsy/palette"
import {
  type FC,
  type ForwardRefExoticComponent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react"
import styled from "styled-components"

export interface ScrollableCardRailProps {
  children: JSX.Element[]
  /** Used to build the prev/next button aria-labels, e.g. "auction results". */
  itemsLabel: string
}

// Shared by ArtistHeaderRecentAuctionResults and ArtistHeaderEditorial: a
// horizontally-scrollable row of cards with hover-reveal prev/next arrows
// and a scrollbar-style progress indicator, matching the same interaction
// pattern across both rails in the artist page's top-of-fold right rail.
//
// Built on Swiper rather than the Rail/Shelf component used by full-width
// rails elsewhere — Shelf wraps its content in FullBleed (expands to 100vw
// once mounted), which breaks a narrow sidebar column.
//
// Deliberately doesn't drive navigation via Swiper's own
// initialIndex/onChange: Swiper derives its index from overall scroll
// *percentage* across the total cell count, which is fine when one
// full-width cell fills the viewport, but breaks down once several cards
// are visible at once — right at the end, the last cell can't scroll to a
// "start-aligned" position (there's no more room), so the scroll gets
// clamped and Swiper's percentage-based guess lands on the wrong index,
// desyncing the buttons. Scrolling the real DOM node directly (the same
// node ShelfScrollBar tracks) sidesteps that entirely.
export const ScrollableCardRail: FC<ScrollableCardRailProps> = ({
  children,
  itemsLabel,
}) => {
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
      <RailOverlay>
        <Nav as="nav">
          <Previous
            aria-label={`See previous ${itemsLabel}`}
            disabled={atStart}
            onClick={() => scrollByOnePage(-1)}
          />

          <Next
            aria-label={`See more ${itemsLabel}`}
            disabled={atEnd}
            onClick={() => scrollByOnePage(1)}
          />
        </Nav>

        <Box ref={swiperWrapperRef}>
          <SmoothSwiper Cell={FlatGapSwiperCell}>{children}</SmoothSwiper>
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

// Swiper's default Cell applies a responsive gap ([1, 2], i.e. 10px on
// mobile but 20px on desktop) between cards. Both current consumers'
// cards use a flat 10px gap internally, so flatten this to match instead
// of letting it grow on desktop. Swiper still passes the original value
// through as the `pr` prop (or undefined for the last cell, to avoid
// trailing whitespace) — override only its value here.
const FlatGapSwiperCell: ForwardRefExoticComponent<BoxProps> = forwardRef(
  (props, ref) => {
    return (
      <SwiperCell {...props} ref={ref as any} pr={props.pr ? 1 : undefined} />
    )
  },
)

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
