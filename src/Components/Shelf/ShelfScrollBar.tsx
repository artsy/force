import { themeGet } from "@styled-system/theme-get"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useClickScroll } from "./useClickScroll"
import { useDragScroll } from "./useDragScroll"
import { useMutationObserver, Box, BoxProps, Clickable } from "@artsy/palette"

interface ShelfScrollBarProps extends BoxProps {
  viewport?: HTMLDivElement | null
}

/**
 * A synthetic scrollbar
 */
export const ShelfScrollBar: React.FC<ShelfScrollBarProps> = React.memo(
  ({ viewport, ...rest }) => {
    const [{ scrollLeft, scrollWidth, clientWidth }, setScrollState] = useState<
      ScrollState
    >({
      scrollLeft: viewport?.scrollLeft ?? 0,
      scrollWidth: viewport?.scrollWidth ?? 1,
      clientWidth: viewport?.clientWidth ?? 1,
    })

    const trackRef = useRef<HTMLDivElement | null>(null)
    const thumbRef = useRef<HTMLButtonElement | null>(null)

    const trackWidth = trackRef.current?.clientWidth ?? 1

    const {
      progress,
      requiresScrolling,
      thumbOffset,
      thumbWidth,
    } = buildScrollBar({ trackWidth, scrollLeft, scrollWidth, clientWidth })

    // Update scrollState on scroll and resize
    useEffect(() => {
      if (!viewport) return

      const updateScrollState = () => {
        setScrollState({
          scrollLeft: viewport?.scrollLeft ?? 0,
          scrollWidth: viewport?.scrollWidth ?? 1,
          clientWidth: viewport?.clientWidth ?? 1,
        })
      }

      updateScrollState()

      viewport.addEventListener("scroll", updateScrollState, { passive: true })
      window.addEventListener("resize", updateScrollState)

      return () => {
        viewport.removeEventListener("scroll", updateScrollState)
        window.removeEventListener("resize", updateScrollState)
      }
    }, [viewport])

    useMutationObserver({
      element: viewport,
      onMutate: mutations => {
        // Check to see if any of the mutations has either added or removed nodes
        const hasMeaningfullyMutated = mutations.some(mutation => {
          return (
            mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0
          )
        })

        // Only update scroll state if something was added or removed
        if (!hasMeaningfullyMutated) return

        setScrollState({
          scrollLeft: viewport?.scrollLeft ?? 0,
          scrollWidth: viewport?.scrollWidth ?? 1,
          clientWidth: viewport?.clientWidth ?? 1,
        })
      },
    })

    useDragScroll({
      viewport,
      thumbRef,
      clientWidth,
      scrollWidth,
      scrollLeft,
      trackWidth,
    })

    useClickScroll({
      viewport,
      thumbRef,
      trackRef,
      scrollWidth,
      trackWidth,
    })

    return (
      <Track
        ref={trackRef as any}
        bg="black15"
        role="scrollbar"
        aria-orientation="vertical"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        {...rest}
      >
        {/* Pads out hit area. Click events will propagate to underlying trackRef */}
        <TrackHitArea />

        {requiresScrolling && (
          <Thumb
            position="relative"
            bg="black60"
            height="100%"
            borderRadius={3}
            width={thumbWidth}
            style={{
              transform: `translateX(${thumbOffset}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <HitArea ref={thumbRef as any} tabIndex={-1} aria-label="Thumb" />
          </Thumb>
        )}
      </Track>
    )
  }
)

ShelfScrollBar.displayName = "ShelfScrollBar"

const Track = styled(Box)`
  position: relative;
  height: 3px;
  width: 100%;
`

const TrackHitArea = styled(Box)`
  position: absolute;
  top: -10px;
  bottom: -10px;
  right: 0;
  left: 0;
  width: 100%;
`

const Thumb = styled(Box)``

const HitArea = styled(Clickable)`
  position: absolute;
  top: -10px;
  bottom: -10px;
  width: 100%;
  left: 0;
  opacity: 0;
  transition: opacity 250ms;

  &:hover {
    opacity: 1;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    background-color: ${themeGet("colors.black100")};
    /*
     * Positioning this using top/bottom and translate each have cross-browser
     * issues in Safari. Using a hard-coded height/negative margin works on all browsers.
     */
    top: 50%;
    margin-top: -1.5px;
    height: 3px;
  }
`

interface ScrollState {
  /** Left most scroll edge */
  scrollLeft: number
  /** Width of the underlying rail */
  scrollWidth: number
  /** Width of the viewport */
  clientWidth: number
}

export const buildScrollBar = ({
  trackWidth,
  scrollLeft,
  scrollWidth,
  clientWidth,
}: ScrollState & {
  /** Width of the scrollbar track */
  trackWidth: number
}) => {
  const progress = (scrollLeft / (scrollWidth - clientWidth || 1)) * 100

  // Sets up a scrollbar for viewport
  const percentageVisible = clientWidth / scrollWidth
  const thumbWidth = percentageVisible * clientWidth
  const percentageOffset = scrollLeft / (scrollWidth - clientWidth || 1)

  // Transform it down to whatever our actual track width is as
  // it's always smaller than the target viewport.
  const normalizedThumbWidth = (thumbWidth * trackWidth) / clientWidth
  const normalizedThumbOffset =
    percentageOffset * (trackWidth - normalizedThumbWidth)

  const requiresScrolling = percentageVisible < 1

  return {
    requiresScrolling,
    progress,
    percentageVisible,
    percentageOffset,
    thumbWidth: normalizedThumbWidth,
    thumbOffset: normalizedThumbOffset,
  }
}
