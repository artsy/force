import React, {
  Children,
  createRef,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled from "styled-components"
import { useCursor } from "use-cursor"
import { ShelfNext, ShelfPrevious } from "./ShelfNavigation"
import { ShelfScrollBar } from "./ShelfScrollBar"
import {
  FlexProps,
  visuallyDisableScrollbar,
  Box,
  BoxProps,
  CELL_GAP_PADDING_AMOUNT,
  ShelfNavigationProps,
  CarouselPaginateBy,
  Flex,
  FullBleed,
} from "@artsy/palette"
import { paginateCarousel } from "Components/Shelf/paginate"

/** ShelfProps */
export type ShelfProps = BoxProps & {
  alignItems?: FlexProps["alignItems"]
  showProgress?: boolean
  snap?: "none" | "start" | "end" | "center"
  children: JSX.Element | JSX.Element[]
  Next?: typeof ShelfNext | React.FC<ShelfNavigationProps>
  Previous?: typeof ShelfPrevious | React.FC<ShelfNavigationProps>
  onChange?(index: number): void
  paginateBy?: CarouselPaginateBy
  noFullBleed?: boolean
}

/**
 * A Shelf is a new kind of carousel...
 */
export const Shelf: React.FC<ShelfProps> = ({
  alignItems = "flex-end",
  showProgress = true,
  snap = "none",
  children,
  Previous = ShelfNext,
  Next = ShelfPrevious,
  onChange,
  paginateBy,
  noFullBleed = false,
  ...rest
}) => {
  const cells = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map(child => ({ child, ref: createRef<HTMLLIElement>() })),
    [children]
  )

  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const [mounted, setMounted] = useState(false)
  const [pages, setPages] = useState([0])
  const [offset, setOffset] = useState(0)
  const [atStart, setAtStart] = useState(true)

  const init = useCallback(() => {
    if (containerRef.current === null) return

    const { current: container } = containerRef

    // Set page-stops
    const values = cells.map(({ ref }, i) => {
      // If we have an offset we actually want to subtract it from
      // the first and last elements.
      if (offset !== 0 && (i === 0 || i === cells.length - 1)) {
        return Math.ceil(ref.current!.clientWidth - offset)
      }

      return ref.current!.clientWidth
    })

    setPages(
      paginateCarousel({
        // Here we use the container width instead of the viewport width.
        // The viewport has been extended to the full width of the window;
        // we want to scroll to the parent boundaries instead.
        viewport: container.clientWidth,
        values,
        paginateBy,
      })
    )

    // Set offset to accomodate full-bleed and line up initially with page-margins
    const { x } = container.getBoundingClientRect()
    setOffset(x)

    setMounted(true)
  }, [cells, offset, paginateBy])

  useEffect(() => {
    init()

    window.addEventListener("resize", init)
    return () => {
      window.removeEventListener("resize", init)
    }
  }, [init])

  const { index: pageIndex, setCursor } = useCursor({
    max: pages.length,
  })

  // Keep page cursor in sync with scroll position
  useEffect(() => {
    if (viewportRef.current === null) return

    const { current: viewport } = viewportRef

    const handler = () => {
      const nearestPage = pages.find((currentPage, i) => {
        const nextPage = pages[i + 1] ?? Infinity
        return (
          viewport.scrollLeft >= currentPage && viewport.scrollLeft < nextPage
        )
      })

      setCursor(pages.indexOf(nearestPage!))
      setAtStart(viewport.scrollLeft === 0)
    }

    viewport.addEventListener("scroll", handler, { passive: true })
    return () => {
      viewport.removeEventListener("scroll", handler)
    }
  }, [pages, setCursor])

  // Announce page changes
  useEffect(() => {
    onChange && onChange(pageIndex)
  }, [onChange, pageIndex])

  // Scroll to a specific page-stop
  const scrollToPage = (index: number) => {
    const xPosition = pages[index]
    scrollTo(xPosition)
  }

  const scrollTo = (xPosition: number) => {
    if (viewportRef.current === null) return

    const { current: viewport } = viewportRef

    if (viewport.scrollTo) {
      viewport.scrollTo({ left: xPosition, behavior: "smooth" })
      return
    }

    viewport.scrollLeft = xPosition
  }

  // One side-effect of scrolling to the next page index instead of
  // setting it directly is that you can't scroll to the next one via click until
  // you've arrived. We may want to reconsider this approach; though this is the
  // simplest way to keep these values in sync with one another.
  const handleNext = () => {
    scrollToPage(pageIndex + 1)
  }

  const handlePrev = () => {
    if (pageIndex === 0) {
      scrollTo(0)
      return
    }

    scrollToPage(pageIndex - 1)
  }

  const renderRails = () => {
    return (
      <Viewport ref={viewportRef as any}>
        <Rail as="ul" position="relative" alignItems={alignItems} mb={[2, 6]}>
          {cells.map(({ child, ref }, i) => {
            const isFirst = i === 0
            const isLast = i === cells.length - 1

            return (
              <Cell
                as="li"
                key={i}
                ref={ref as any}
                pl={noFullBleed ? undefined : isFirst ? offset : undefined}
                pr={!isLast ? CELL_GAP_PADDING_AMOUNT : offset}
                style={{ scrollSnapAlign: snap }}
              >
                {child}
              </Cell>
            )
          })}
        </Rail>
      </Viewport>
    )
  }

  return (
    <Container ref={containerRef as any} {...rest}>
      <Nav
        as="nav"
        // We can't position relative to the FullBleed rail —
        // so offset the bottom by the bottom margin + the height of the scrollbar.
        bottom={[23, 63]}
      >
        <Previous
          onClick={handlePrev}
          disabled={atStart}
          aria-label="Previous page"
        />

        <Next
          onClick={handleNext}
          disabled={pageIndex === pages.length - 1}
          aria-label="Next page"
        />
      </Nav>

      {noFullBleed ? (
        <Flex>{renderRails()}</Flex>
      ) : (
        <FullBleed
          // To prevent any page jank we initially partially disable this component
          // so that content is left aligned with the parent container and then once
          // we have the offset and page values; we reset it to actually full-bleed.
          // The `offset` will push the content up to the parent margin.
          {...(!mounted ? { left: null, right: null, marginLeft: null } : {})}
        >
          {renderRails()}
        </FullBleed>
      )}

      {showProgress && <ShelfScrollBar viewport={viewportRef.current} />}
    </Container>
  )
}

const Container = styled(Box)`
  position: relative;
  width: 100%;

  > nav {
    transition: opacity 250ms;
    transition-delay: 100ms;
    opacity: 0;
  }

  &:hover {
    > nav {
      opacity: 1;
    }
  }
`

const Nav = styled(Box)`
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
`

const Viewport = styled(Box)`
  display: flex;
  height: 100%;
  padding: 0;
  list-style: none;
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  ${visuallyDisableScrollbar}
`

const Rail = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 0;
  list-style: none;
  white-space: nowrap;
`

const Cell = styled(Box)`
  white-space: normal;
`
