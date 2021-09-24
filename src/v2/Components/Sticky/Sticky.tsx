import styled from "styled-components"
import { Box, useIsomorphicLayoutEffect } from "@artsy/palette"
import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useSticky } from "./StickyProvider"
import { useNavBarHeight } from "../NavBar/useNavBarHeight"

interface StickyProps {
  /**
   * Maintains the original dimensions and horizontal position on page.
   * Useful for sidebars.
   **/
  proportional?: boolean
  /**
   * Sticks only within the bounds of the containing element.
   * Useful for split screen editorial.
   **/
  contained?: boolean
}

interface Rect {
  right: number
  left: number
  width: number
  height: number
}

const DEFAULT_RECT: Rect = {
  right: 0,
  left: 0,
  width: 0,
  height: 0,
}

enum State {
  Pending,
  AtTop,
  AtBottom,
}

/**
 * Wrap a component to have it stick below the main nav.
 * Use render props `{({ stuck }) => {}` to swap styles.
 */
export const Sticky: React.FC<StickyProps> = ({
  children,
  proportional,
  contained,
}) => {
  const topSentinelRef = useRef<HTMLDivElement | null>(null)
  const bottomSentinelRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const placeholderRef = useRef<HTMLDivElement | null>(null)

  const [state, setState] = useState<State>(State.Pending)
  const [rect, setRect] = useState<Rect>(DEFAULT_RECT)

  const { mobile, desktop } = useNavBarHeight()

  // Returns the container that can be safely used to gauge size
  // for each possible state
  const getEl = useCallback(() => {
    return {
      [State.Pending]: containerRef.current,
      [State.AtTop]: placeholderRef.current,
      [State.AtBottom]: contentRef.current,
    }[state]
  }, [state])

  // Set initial rect
  useEffect(() => {
    if (!containerRef.current) return
    setRect(containerRef.current.getBoundingClientRect())
  }, [])

  const [visibilities, setVisisbilities] = useState({
    top: false,
    bottom: false,
  })

  // Observe edges
  useEffect(() => {
    if (topSentinelRef.current === null) return
    if (contained && bottomSentinelRef.current === null) return
    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setVisisbilities(prevState => ({
            ...prevState,
            [entry.target === topSentinelRef.current
              ? "top"
              : "bottom"]: entry.isIntersecting,
          }))
        })
      },
      { threshold: [0, 1] }
    )

    observer.observe(topSentinelRef.current)

    // Only observe the bottom edge if contained
    if (contained && bottomSentinelRef.current) {
      observer.observe(bottomSentinelRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [contained])

  // Stick/un-stick
  useEffect(() => {
    if (!containerRef.current) return

    const el = getEl()

    // If we are tracking two different edges
    if (contained) {
      switch (true) {
        case visibilities.top && !visibilities.bottom:
          setRect(el!.getBoundingClientRect())
          setState(State.Pending)
          return
        case visibilities.top && visibilities.bottom:
          setRect(el!.getBoundingClientRect())
          setState(State.Pending)
          return
        case !visibilities.top && visibilities.bottom:
          setRect(el!.getBoundingClientRect())
          setState(State.AtTop)
          return
        case !visibilities.top && !visibilities.bottom:
          setRect(el!.getBoundingClientRect())
          setState(State.AtBottom)
          return
      }

      return
    }

    // Otherwise we're just tracking the top edge
    setState(visibilities.top ? State.Pending : State.AtTop)
  }, [contained, getEl, visibilities])

  const { offsetTop, registerSticky, deregisterSticky } = useSticky()

  // Register/deregister sticky
  useEffect(() => {
    registerSticky(containerRef.current?.clientHeight)
    return deregisterSticky
  }, [registerSticky, deregisterSticky])

  const content =
    typeof children === "function"
      ? children({ stuck: state !== State.Pending })
      : children
  const placeholder = cloneElement(content as JSX.Element)

  // Keeps rect in sync
  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      if (
        !containerRef.current ||
        (state === State.AtTop && !placeholderRef.current)
      ) {
        return
      }

      const el = getEl()

      setRect(el!.getBoundingClientRect())
    }

    window.addEventListener("resize", handleResize, { passive: true })
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [getEl, state])

  return (
    <Box {...(contained ? { height: "100%", position: "relative" } : {})}>
      <Sentinel
        ref={topSentinelRef as any}
        top={[-(mobile + offsetTop), -(desktop + offsetTop)]}
      />

      <Container
        ref={containerRef as any}
        bg="white100"
        {...{
          [State.Pending]: {
            top: [mobile + offsetTop, desktop + offsetTop],
          },
          [State.AtTop]: {
            position: "fixed" as any,
            top: [mobile + offsetTop, desktop + offsetTop],
          },
          [State.AtBottom]: {
            display: "flex",
            alignItems: "flex-end",
            height: "100%",
          },
        }[state]}
      >
        <div
          ref={contentRef}
          style={{
            ...(proportional && state === State.AtTop
              ? {
                  position: "absolute",
                  right: `${rect.right}px`,
                  left: `${rect.left}px`,
                  width: `${rect.width}px`,
                  height: `${rect.height}px`,
                }
              : {
                  width: "100%",
                }),
          }}
        >
          {content}
        </div>
      </Container>

      {state === State.AtTop && (
        // Inserts a copy of the underlying content to prevent scroll from changing
        // as well as allowing us to track the size
        <div ref={placeholderRef} style={{ opacity: 0, pointerEvents: "none" }}>
          {placeholder}
        </div>
      )}

      {contained && (
        <Sentinel
          ref={bottomSentinelRef as any}
          position="absolute"
          bottom={[mobile + offsetTop, desktop + offsetTop]}
          style={{ marginBottom: `${rect.height}px` }}
        />
      )}
    </Box>
  )
}

export const Container = styled(Box)`
  z-index: 1;
  left: 0;
  right: 0;
`

// This <div> is positioned such that when it leaves the top of
// the browser the <Container> reaches it's `top` value and sticking.
const Sentinel = styled(Box)`
  width: 100%;
  height: 0;
`

Sentinel.defaultProps = {
  position: "relative",
}
