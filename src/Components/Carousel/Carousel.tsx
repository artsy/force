import {
  Box,
  BoxProps,
  ChevronIcon,
  Skip,
  SpacingUnit,
  useUpdateEffect,
  VisuallyHidden,
} from "@artsy/palette"
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
import { ResponsiveValue, system } from "styled-system"
import { useCursor } from "use-cursor"
import {
  CarouselNavigationProps,
  CarouselNext,
  CarouselPrevious,
} from "./CarouselNavigation"
import { paginateCarousel } from "./paginate"

const RAIL_TRANSITION_MS = 500

const transition = system({ transition: true })

/** CarouselRailProps */
export type CarouselRailProps = BoxProps & {
  transition?: ResponsiveValue<string>
}

/** A `CarouselRail` slides back and forth within the viewport */
export const CarouselRail = styled(Box)<CarouselRailProps>`
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  white-space: nowrap;
  ${transition}
`

CarouselRail.defaultProps = {
  as: "ul",
  display: "flex",
  transition: `transform ${RAIL_TRANSITION_MS}ms`,
}

/** CarouselCellProps */
export type CarouselCellProps = BoxProps

/** A `CarouselCell` wraps a single child in the carousel */
export const CarouselCell = styled(Box)`
  white-space: normal;
`

CarouselCell.defaultProps = {
  as: "li",
}

/**
 * We share this spacing value with the `Swiper` component
 */
export const CELL_GAP_PADDING_AMOUNT: SpacingUnit[] = [1, 2]

const Container = styled(Box)`
  position: relative;
  width: 100%;
`

const Viewport = styled(Box)`
  width: 100%;
  overflow: hidden;
`

export interface CarouselProps extends BoxProps {
  initialIndex?: number
  children: React.ReactNode
  Next?: typeof CarouselNext | React.FC<CarouselNavigationProps>
  Previous?: typeof CarouselPrevious | React.FC<CarouselNavigationProps>
  Rail?: typeof CarouselRail | React.FC<CarouselRailProps>
  /**
   * If providing a custom `Cell` you must forward a ref so
   * that cell widths can be calculated.
   */
  Cell?: React.ForwardRefExoticComponent<CarouselCellProps>
  paginateBy?: "page" | "cell"
  onChange?(index: number): void
  onPageCountChange?(count: number): void
}

/**
 * A `Carousel` accepts children or a series of children that are JSX elements.
 * It presents them in a horizontal rail and when the width exceeds the width
 * of the viewport, it presents navigation arrows and allows a user to page
 * through them.
 */
export const Carousel: React.FC<CarouselProps> = ({
  initialIndex = 0,
  children,
  Previous = CarouselPrevious,
  Next = CarouselNext,
  Rail = CarouselRail,
  Cell = CarouselCell,
  paginateBy = "page",
  onChange,
  onPageCountChange,
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const startRef = useRef<HTMLButtonElement | null>(null)
  const endRef = useRef<HTMLButtonElement | null>(null)

  const cells = useMemo(
    () =>
      Children.toArray(children)
        .filter(isValidElement)
        .map(child => ({ child, ref: createRef<HTMLDivElement>() })),
    [children]
  )

  const [pages, setPages] = useState([0])

  const { index, handleNext, handlePrev, setCursor } = useCursor({
    initialCursor: initialIndex,
    max: pages.length,
  })

  const init = useCallback(() => {
    const { current: viewport } = viewportRef
    const values = cells.map(({ ref }) => ref.current!.clientWidth)
    setPages(
      paginateCarousel({
        viewport: viewport!.clientWidth,
        values,
        paginateBy,
      })
    )
  }, [cells, paginateBy])

  useEffect(() => {
    init()
    window.addEventListener("resize", init)
    return () => {
      window.removeEventListener("resize", init)
    }
  }, [cells, init])

  const skipToEnd = () => {
    if (!endRef.current) return
    endRef.current.focus()
    setCursor(pages.length - 1)
  }

  const skipToStart = () => {
    if (!startRef.current) return
    startRef.current.focus()
    setCursor(0)
  }

  const handleKeydown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (!containerRef.current) return

      // Only triggers keyboard navigation if component is in focus
      if (!containerRef.current.contains(document.activeElement)) {
        return
      }

      switch (key) {
        case "ArrowRight":
          handleNext()
          break
        case "ArrowLeft":
          handlePrev()
          break
        default:
          break
      }
    },
    [handleNext, handlePrev]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [handleKeydown])

  useUpdateEffect(() => {
    onChange && onChange(index)
    console.log("[debug] Yess ::")
  }, [onChange, index])

  useUpdateEffect(() => {
    onPageCountChange && onPageCountChange(pages.length)
  }, [onPageCountChange, pages.length])

  const offset = `-${pages[index]}px`

  return (
    <Container ref={containerRef as any} {...rest}>
      <Skip ref={startRef} onClick={skipToEnd} width="100%" mb={1}>
        Skip to end of content
      </Skip>

      <nav>
        <Previous
          onClick={handlePrev}
          disabled={index === 0}
          aria-label="Previous page"
        >
          <ChevronIcon direction="left" width={15} height={15} />
        </Previous>

        <Next
          onClick={handleNext}
          disabled={index === pages.length - 1}
          aria-label="Next page"
        >
          <ChevronIcon direction="right" width={15} height={15} />
        </Next>
      </nav>

      <Viewport ref={viewportRef as any}>
        <Rail style={{ transform: `translateX(${offset})` }}>
          {cells.map(({ child, ref }, i) => {
            return (
              <Cell key={i} ref={ref} pr={1}>
                {child}
              </Cell>
            )
          })}
        </Rail>
      </Viewport>

      <Skip ref={endRef} onClick={skipToStart} width="100%" mt={1}>
        Skip to beginning of content
      </Skip>

      <VisuallyHidden aria-live="polite" aria-atomic="true">
        Page {index + 1} of {pages.length}
      </VisuallyHidden>
    </Container>
  )
}
