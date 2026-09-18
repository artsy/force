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
  itemsLabel: string
}

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

const SmoothSwiper = styled(Swiper)`
  scroll-behavior: smooth;
`

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
